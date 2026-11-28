const assert = require("node:assert/strict");
const Module = require("node:module");
const path = require("node:path");
const babel = require("@babel/core");

const sourceRoot = path.resolve(__dirname, "../src") + path.sep;
const previousJsLoader = Module._extensions[".js"];

Module._extensions[".js"] = (loadedModule, filename) => {
  if (!filename.startsWith(sourceRoot)) {
    previousJsLoader(loadedModule, filename);
    return;
  }

  const source = require("node:fs").readFileSync(filename, "utf8");
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
const {
  DEBUGGING_LAB,
  DEBUGGING_LAB_LEVELS,
  getDebuggingChallengeCount,
  getDebuggingChallenges,
} = require("../src/data/debuggingLab");
const {
  getDebuggingLabProgress,
  saveDebuggingLabSolved,
} = require("../src/data/progress");

async function checkDebuggingLab() {
  const expectedLanguages = [
    "html",
    "css",
    "java",
    "python",
    "javascript",
    "php",
    "sql",
  ];
  const languageKeys = LANGUAGES.map((language) => language.key).sort();

  assert.deepEqual(languageKeys, [...expectedLanguages].sort());
  assert.deepEqual(
    Object.keys(DEBUGGING_LAB).sort(),
    [...expectedLanguages].sort(),
    "Every supported language must have debugging challenges",
  );

  let totalChallenges = 0;
  const allIds = new Set();
  const correctAnswerPositions = new Set();

  for (const languageKey of expectedLanguages) {
    const levelKeys = Object.keys(DEBUGGING_LAB[languageKey]).sort();
    assert.deepEqual(
      levelKeys,
      DEBUGGING_LAB_LEVELS.map((level) => level.id).sort(),
      languageKey + " must cover all three difficulty levels",
    );

    for (const level of DEBUGGING_LAB_LEVELS) {
      const challenges = getDebuggingChallenges(languageKey, level.id);
      assert.equal(
        challenges.length,
        2,
        languageKey + " " + level.id + " must have two challenges",
      );

      for (const challenge of challenges) {
        const label = languageKey + "/" + challenge.id;

        assert.ok(challenge.id && challenge.title, label + " needs an id and title");
        assert.ok(!allIds.has(challenge.id), "Duplicate challenge id: " + challenge.id);
        allIds.add(challenge.id);

        assert.ok(challenge.focus.trim(), label + " needs a focus label");
        assert.ok(
          typeof challenge.goal === "string" && challenge.goal.trim().length >= 20,
          label + " needs a clear plain-language goal",
        );
        assert.ok(challenge.prompt.trim(), label + " needs an instruction");
        assert.ok(challenge.hint.trim(), label + " needs a hint");
        assert.ok(
          challenge.explanation.trim().length >= 60,
          label + " needs a useful explanation",
        );

        assert.ok(
          Array.isArray(challenge.code) && challenge.code.length >= 2,
          label + " needs multiple code lines",
        );
        assert.ok(
          Number.isInteger(challenge.bugLine) &&
            challenge.bugLine >= 1 &&
            challenge.bugLine <= challenge.code.length,
          label + " has an invalid one-based bug line",
        );

        assert.ok(
          Array.isArray(challenge.fixes) && challenge.fixes.length === 3,
          label + " must have three repair choices",
        );
        assert.equal(
          new Set(challenge.fixes).size,
          3,
          label + " repair choices must be unique",
        );
        assert.ok(
          Number.isInteger(challenge.correctFix) &&
            challenge.correctFix >= 0 &&
            challenge.correctFix < challenge.fixes.length,
          label + " has an invalid correct repair index",
        );
        assert.ok(
          Array.isArray(challenge.fixFeedback) &&
            challenge.fixFeedback.length === challenge.fixes.length,
          label + " must explain each repair option",
        );
        challenge.fixFeedback.forEach((message, index) => {
          if (index === challenge.correctFix) return;
          assert.ok(
            typeof message === "string" && message.trim().length >= 35,
            label + " option " + index + " needs a specific wrong-answer explanation",
          );
        });
        correctAnswerPositions.add(challenge.correctFix);
        assert.notEqual(
          challenge.fixes[challenge.correctFix].trim(),
          challenge.code[challenge.bugLine - 1].trim(),
          label + " correct repair must change the faulty line",
        );

        totalChallenges += 1;
      }
    }

    assert.equal(
      getDebuggingChallengeCount(languageKey),
      6,
      languageKey + " must expose all six challenges",
    );
  }

  assert.equal(totalChallenges, 42);
  assert.equal(allIds.size, totalChallenges);
  assert.deepEqual(
    [...correctAnswerPositions].sort(),
    [0, 1, 2],
    "Correct repairs must not always appear in the same option position",
  );

  storage.set("progress_python", JSON.stringify({ L1: ["existing-topic"] }));
  assert.deepEqual(await getDebuggingLabProgress("python"), []);

  assert.equal(await saveDebuggingLabSolved("python", "python-l1-01"), true);
  assert.equal(await saveDebuggingLabSolved("python", "python-l1-01"), true);
  assert.equal(await saveDebuggingLabSolved("html", "html-l1-01"), true);

  assert.deepEqual(
    await getDebuggingLabProgress("python"),
    ["python-l1-01"],
    "Solved challenges should be unique and scoped to their language",
  );
  assert.deepEqual(
    await getDebuggingLabProgress("html"),
    ["html-l1-01"],
    "One language must not inherit another language's solved IDs",
  );
  assert.equal(
    storage.get("progress_python"),
    JSON.stringify({ L1: ["existing-topic"] }),
    "Debugging Lab writes must not mutate lesson progress",
  );

  console.log(
    "Debugging Lab checks passed: " +
      LANGUAGES.length +
      " languages, " +
      DEBUGGING_LAB_LEVELS.length +
      " levels each, " +
      totalChallenges +
      " challenges, and isolated/idempotent local progress.",
  );
}

checkDebuggingLab().catch((error) => {
  console.error("Debugging Lab checks failed:", error);
  process.exitCode = 1;
});
