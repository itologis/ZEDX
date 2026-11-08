const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const babel = require("@babel/core");

const scriptDirectory = path.dirname(require.resolve("./check-content-coverage.cjs"));
const sourceRoot = `${path.resolve(scriptDirectory, "../src")}${path.sep}`;
const previousJsLoader = Module._extensions[".js"];

Module._extensions[".js"] = (loadedModule, filename) => {
  if (!filename.startsWith(sourceRoot)) {
    previousJsLoader(loadedModule, filename);
    return;
  }

  const source = fs.readFileSync(filename, "utf8");
  const compiled = babel.transformSync(source, {
    plugins: ["@babel/plugin-transform-modules-commonjs"],
    filename,
  });
  loadedModule._compile(compiled.code, filename);
};

const storage = new Map();
const asyncStoragePath = require.resolve("@react-native-async-storage/async-storage");
require.cache[asyncStoragePath] = {
  id: asyncStoragePath,
  filename: asyncStoragePath,
  loaded: true,
  exports: {
    getItem: async (key) => storage.get(key) ?? null,
    setItem: async (key, value) => storage.set(key, value),
    removeItem: async (key) => storage.delete(key),
  },
};

const { LANGUAGES } = require("../src/data/languages");
const { LESSONS } = require("../src/data/lessons");
const { PRACTICE } = require("../src/data/practice");
const { getAllQuestions, QUIZZES } = require("../src/data/quiz");
const { parseInlineCode } = require("../src/utils/inlineCode");
const {
  getMissedQuestions,
  getPracticeDone,
  getQuizProgress,
  recordQuizAnswer,
  savePracticeDone,
  saveQuizPassed,
} = require("../src/data/progress");

async function checkContentCoverage() {
  const languageKeys = new Set(LANGUAGES.map(({ key }) => key));

  assert.equal(languageKeys.size, LANGUAGES.length, "Language keys must be unique");

  for (const language of LANGUAGES) {
    const levelKeys = new Set();

    for (const level of language.data.levels ?? []) {
      assert.ok(!levelKeys.has(level.level), `${language.key} has duplicate ${level.level}`);
      levelKeys.add(level.level);

      assert.ok(
        QUIZZES[language.key]?.[level.level],
        `Missing ${language.key} ${level.level} quiz`,
      );

      const quiz = QUIZZES[language.key][level.level];
      assert.ok(quiz.questions.length > 0, `${language.key} ${level.level} quiz is empty`);
      assert.ok(
        Number.isInteger(quiz.passingScore) &&
          quiz.passingScore > 0 &&
          quiz.passingScore <= quiz.questions.length,
        `${language.key} ${level.level} has an invalid passing score`,
      );

      for (const question of quiz.questions) {
        assert.equal(
          question.options.length,
          4,
          `${language.key} ${level.level} questions must have four options`,
        );
        assert.ok(
          Number.isInteger(question.correct) &&
            question.correct >= 0 &&
            question.correct < question.options.length,
          `${language.key} ${level.level} question has an invalid correct option`,
        );
      }

      for (const topic of level.topics ?? []) {
        assert.ok(topic.id, `${language.key} ${level.level} contains a topic without an id`);
        assert.ok(
          PRACTICE[topic.id],
          `Missing practice exercise for ${language.key} topic ${topic.id}`,
        );
      }
    }

    assert.deepEqual(
      Object.keys(QUIZZES[language.key] ?? {}).sort(),
      [...levelKeys].sort(),
      `${language.key} quiz levels must match its content levels`,
    );
  }

  for (const languageKey of Object.keys(QUIZZES)) {
    assert.ok(languageKeys.has(languageKey), `Quiz data exists for unknown language ${languageKey}`);
  }

  // A language listed in LESSONS opts its topics into the chapter layout, so
  // every topic in that language must have lessons. Half-authored tracks fail
  // the check instead of silently rendering the old single-page layout.
  const topicIdsByLanguage = new Map(
    LANGUAGES.map((language) => [
      language.key,
      new Set(
        (language.data.levels ?? []).flatMap((level) =>
          (level.topics ?? []).map((topic) => topic.id),
        ),
      ),
    ]),
  );

  let lessonCount = 0;
  let wrongCount = 0;

  for (const [languageKey, topics] of Object.entries(LESSONS)) {
    assert.ok(
      languageKeys.has(languageKey),
      `Lesson data exists for unknown language ${languageKey}`,
    );

    const knownTopics = topicIdsByLanguage.get(languageKey);

    for (const topicId of Object.keys(topics)) {
      assert.ok(
        knownTopics.has(topicId),
        `Lessons for ${languageKey} reference unknown topic ${topicId}`,
      );

      const lessons = topics[topicId];
      assert.ok(
        Array.isArray(lessons) && lessons.length >= 2,
        `${languageKey}/${topicId} needs at least two lessons`,
      );

      const titles = new Set();

      lessons.forEach((lesson, index) => {
        const label = `${languageKey}/${topicId} lesson ${index + 1}`;

        assert.ok(
          typeof lesson.title === "string" && lesson.title.trim(),
          `${label} is missing a title`,
        );
        assert.ok(
          !titles.has(lesson.title),
          `${label} repeats the title "${lesson.title}"`,
        );
        titles.add(lesson.title);

        const paragraphs = Array.isArray(lesson.body)
          ? lesson.body
          : [lesson.body];
        assert.ok(
          paragraphs.length > 0 &&
            paragraphs.every(
              (paragraph) => typeof paragraph === "string" && paragraph.trim(),
            ),
          `${label} needs body text`,
        );

        for (const paragraph of paragraphs) {
          const { unclosed } = parseInlineCode(paragraph);
          assert.equal(
            unclosed,
            0,
            `${label} has an unclosed [[ ]] inline-code marker`,
          );
        }

        if (lesson.example != null) {
          assert.ok(
            typeof lesson.example.code === "string" &&
              lesson.example.code.trim(),
            `${label} example needs code`,
          );
        }

        if (lesson.gotcha != null) {
          assert.ok(
            typeof lesson.gotcha === "string" && lesson.gotcha.trim(),
            `${label} gotcha must be text`,
          );
        }

        // Every lesson carries a counter-example: the broken version of the
        // snippet above plus a line of prose saying what breaks.
        assert.ok(
          lesson.wrong &&
            typeof lesson.wrong.code === "string" &&
            lesson.wrong.code.trim(),
          `${label} needs a wrong-code comparison`,
        );
        assert.ok(
          typeof lesson.wrong.why === "string" && lesson.wrong.why.trim(),
          `${label} wrong-code comparison needs an explanation`,
        );
        wrongCount += 1;

        lessonCount += 1;
      });
    }

    for (const topicId of knownTopics) {
      assert.ok(topics[topicId], `Missing lessons for ${languageKey} topic ${topicId}`);
    }
  }

  for (const topicId of Object.keys(PRACTICE)) {
    assert.ok(
      LANGUAGES.some((language) =>
        language.data.levels?.some((level) =>
          level.topics?.some((topic) => topic.id === topicId),
        ),
      ),
      `Practice exercise ${topicId} does not match a known topic`,
    );
  }

  for (const languageKey of ["php", "sql"]) {
    const level = "L1";
    const question = getAllQuestions().find(
      (item) => item._lang === languageKey && item._level === level,
    );
    const topic = LANGUAGES.find(({ key }) => key === languageKey).data.levels[0].topics[0];

    await saveQuizPassed(languageKey, level);
    assert.equal((await getQuizProgress(languageKey))[level], true);

    await savePracticeDone(languageKey, topic.id);
    assert.ok((await getPracticeDone(languageKey)).includes(topic.id));

    await recordQuizAnswer(languageKey, level, question.question, false);
    assert.ok(
      (await getMissedQuestions()).some(
        (item) => item._lang === languageKey && item.question === question.question,
      ),
    );

    await recordQuizAnswer(languageKey, level, question.question, true);
    assert.ok(
      !(await getMissedQuestions()).some(
        (item) => item._lang === languageKey && item.question === question.question,
      ),
    );
  }

  console.log(
    `Content coverage passed: ${LANGUAGES.length} languages, ${Object.keys(PRACTICE).length} practice exercises, ${lessonCount} lessons (${wrongCount} wrong-code comparisons), and quiz/progress/review flows.`,
  );
}

checkContentCoverage().catch((error) => {
  console.error("Content coverage failed:", error);
  process.exitCode = 1;
});
