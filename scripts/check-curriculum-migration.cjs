const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const babel = require("@babel/core");

const scriptDirectory = path.dirname(require.resolve("./check-curriculum-migration.cjs"));
const sourceRoot = path.resolve(scriptDirectory, "../src") + path.sep;
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
let failNextWriteFor = null;
let failNextReadFor = null;
const asyncStoragePath = require.resolve("@react-native-async-storage/async-storage");

require.cache[asyncStoragePath] = {
  id: asyncStoragePath,
  filename: asyncStoragePath,
  loaded: true,
  exports: {
    getItem: async (key) => {
      if (key === failNextReadFor) {
        failNextReadFor = null;
        throw new Error("Simulated storage read failure");
      }
      return storage.get(key) ?? null;
    },
    setItem: async (key, value) => {
      if (key === failNextWriteFor) {
        failNextWriteFor = null;
        throw new Error("Simulated storage write failure");
      }

      storage.set(key, value);
    },
    removeItem: async (key) => storage.delete(key),
  },
};

const {
  getAssessmentResult,
  getMissedQuestions,
  getProgress,
  getQuizProgress,
  migrateCurriculumProgress,
  resetQuizProgress,
  saveProgress,
  recordQuizAnswer,
  saveAssessmentResult,
  savePracticeDone,
  saveQuizPassed,
  toggleBookmark,
} = require("../src/data/progress");
const { ASSESSMENT_POOL_VERSION, QUIZ_POOL_VERSIONS } = require("../src/data/curriculum");

const setJson = (key, value) => storage.set(key, JSON.stringify(value));
const getJson = (key) => JSON.parse(storage.get(key));

async function run() {
  const originalConsoleError = console.error;
  // Normal progress reads automatically run the versioned topic migration.
  setJson("progress_html", { L1: ["h1"], L2: ["h6", "h16"], L3: [] });
  const readMigrated = await getProgress("html");
  assert.deepEqual(readMigrated.L1, ["h1", "h6"]);
  assert.deepEqual(readMigrated.L2, ["h16"]);
  assert.equal(getJson("curriculum_migration_html"), 2);

  // Empty storage is initialized without inventing completed topics.
  assert.equal(await migrateCurriculumProgress("javascript"), true);
  assert.deepEqual(getJson("progress_javascript"), { L1: [], L2: [] });
  assert.equal(getJson("curriculum_migration_javascript"), 2);

  // Existing and already-completed IDs are merged without duplicates.
  setJson("progress_python", {
    L1: ["p1", "p6"],
    L2: ["p6", "p16", "p18", "p9", "p9"],
    L3: ["p19"],
    preservedField: "keep-me",
  });
  setJson("bookmarks", [{ languageKey: "python", topicId: "p6" }]);
  setJson("practice_python", ["p6"]);
  setJson("last_topic", { languageKey: "python", topicId: "p18" });
  setJson("missed_questions", [
    "python|L2|Which method removes whitespace from both ends of a Python string?",
    "python|L2|An obsolete question that no longer exists",
  ]);

  assert.equal(await migrateCurriculumProgress("python"), true);
  const migratedPython = getJson("progress_python");
  assert.deepEqual(migratedPython.L1, ["p1", "p6", "p16", "p18"]);
  assert.deepEqual(migratedPython.L2, ["p9"]);
  assert.deepEqual(migratedPython.L3, ["p19"]);
  assert.equal(migratedPython.preservedField, "keep-me");
  assert.equal(getJson("curriculum_migration_python"), 2);

  const snapshot = storage.get("progress_python");
  assert.equal(await migrateCurriculumProgress("python"), true);
  assert.equal(storage.get("progress_python"), snapshot, "A second migration must be a no-op");

  assert.deepEqual(getJson("bookmarks"), [{ languageKey: "python", topicId: "p6" }]);
  assert.deepEqual(getJson("practice_python"), ["p6"]);
  assert.deepEqual(getJson("last_topic"), { languageKey: "python", topicId: "p18" });

  // Failed bookmark reads must not replace the bookmark list with an empty one.
  setJson("bookmarks", [{ languageKey: "python", topicId: "p6" }]);
  failNextReadFor = "bookmarks";
  console.error = () => {};
  await assert.rejects(toggleBookmark("python", "p18"));
  console.error = originalConsoleError;
  assert.deepEqual(getJson("bookmarks"), [{ languageKey: "python", topicId: "p6" }]);

  // Failed practice-list reads must not erase earlier completed exercises.
  setJson("practice_python", ["p6"]);
  failNextReadFor = "practice_python";
  console.error = () => {};
  assert.equal(await savePracticeDone("python", "p16"), false);
  console.error = originalConsoleError;
  assert.deepEqual(getJson("practice_python"), ["p6"]);

  // Failed missed-question reads must not overwrite the learner's review list.
  setJson("missed_questions", ["python|L1|Existing missed question"]);
  failNextReadFor = "missed_questions";
  console.error = () => {};
  assert.equal(await recordQuizAnswer("python", "L1", "A new question", false), false);
  console.error = originalConsoleError;
  assert.deepEqual(getJson("missed_questions"), ["python|L1|Existing missed question"]);
  setJson("missed_questions", [
    "python|L2|Which method removes whitespace from both ends of a Python string?",
    "python|L2|An obsolete question that no longer exists",
  ]);
  const currentMisses = await getMissedQuestions();
  assert.equal(currentMisses.length, 1);
  assert.equal(currentMisses[0]._lang, "python");
  assert.equal(currentMisses[0]._level, "L1");
  assert.equal(
    getJson("missed_questions")[0],
    "python|L1|Which method removes whitespace from both ends of a Python string?",
  );
  assert.equal(getJson("missed_questions").length, 1);

  // Concurrent requests for the same language share a single migration.
  setJson("progress_php", { L1: ["php1"], L2: ["php6", "php7"], L3: [] });
  const concurrent = await Promise.all([
    migrateCurriculumProgress("php"),
    migrateCurriculumProgress("php"),
    migrateCurriculumProgress("php"),
  ]);
  assert.deepEqual(concurrent, [true, true, true]);
  assert.deepEqual(getJson("progress_php").L1, ["php1", "php6"]);
  assert.deepEqual(getJson("progress_php").L2, ["php7"]);

  // If the marker write fails after progress is saved, a retry completes safely.
  setJson("progress_sql", { L1: ["sql1"], L2: ["sql6", "sql7"], L3: [] });
  failNextWriteFor = "curriculum_migration_sql";
  console.error = () => {};
  assert.equal(await migrateCurriculumProgress("sql"), false);
  console.error = originalConsoleError;
  assert.deepEqual(getJson("progress_sql").L1, ["sql1", "sql6"]);
  assert.deepEqual(getJson("progress_sql").L2, ["sql7"]);
  assert.equal(storage.has("curriculum_migration_sql"), false);

  // A failed progress write must never be followed by a migration marker.
  setJson("progress_sql", { L1: ["sql1"], L2: ["sql6", "sql7"], L3: [] });
  failNextWriteFor = "progress_sql";
  console.error = () => {};
  assert.equal(await migrateCurriculumProgress("sql"), false);
  console.error = originalConsoleError;
  assert.equal(storage.has("curriculum_migration_sql"), false);
  assert.deepEqual(getJson("progress_sql").L2, ["sql6", "sql7"]);
  assert.equal(await migrateCurriculumProgress("sql"), true);
  assert.equal(getJson("curriculum_migration_sql"), 2);

  // A read failure must not be treated as empty progress or mark migration done.
  setJson("progress_css", { L1: ["c1"], L2: ["c5", "c9"], L3: [] });
  failNextReadFor = "progress_css";
  console.error = () => {};
  assert.equal(await migrateCurriculumProgress("css"), false);
  console.error = originalConsoleError;
  assert.equal(storage.has("curriculum_migration_css"), false);
  assert.deepEqual(getJson("progress_css").L2, ["c5", "c9"]);
  assert.equal(await migrateCurriculumProgress("css"), true);
  assert.deepEqual(getJson("progress_css").L1, ["c1", "c5"]);
  assert.deepEqual(getJson("progress_css").L2, ["c9"]);

  // Failed reads during a later save must not replace the saved completion map.
  setJson("curriculum_migration_java", 2);
  setJson("progress_java", { L1: ["j1"], L2: ["j17"], L3: ["j20"] });
  failNextReadFor = "progress_java";
  console.error = () => {};
  assert.equal(await saveProgress("java", "L1", "j2"), false);
  console.error = originalConsoleError;
  assert.deepEqual(getJson("progress_java"), {
    L1: ["j1"],
    L2: ["j17"],
    L3: ["j20"],
  });

  // All legacy passes expire because the corresponding level pools changed.
  setJson("quiz_python", { L1: true, L2: true, L3: true });
  assert.deepEqual(await getQuizProgress("python"), {
    L1: false,
    L2: false,
    L3: false,
  });

  // A failed version write must not turn an old boolean pass into a current pass.
  setJson("quiz_java", { L1: true });
  failNextWriteFor = "quiz_versions_java";
  console.error = () => {};
  assert.equal(await saveQuizPassed("java", "L1"), false);
  console.error = originalConsoleError;
  assert.equal(getJson("quiz_java").L1, true);
  assert.equal(storage.has("quiz_versions_java"), false);
  assert.equal((await getQuizProgress("java")).L1, false);

  // Failed quiz-map reads must not erase passes saved for other levels.
  setJson("quiz_php", { L1: true, L2: true });
  setJson("quiz_versions_php", { L1: 1, L2: 2 });
  failNextReadFor = "quiz_php";
  console.error = () => {};
  assert.equal(await saveQuizPassed("php", "L3"), false);
  console.error = originalConsoleError;
  assert.deepEqual(getJson("quiz_php"), { L1: true, L2: true });
  assert.deepEqual(getJson("quiz_versions_php"), { L1: 1, L2: 2 });

  assert.equal(await saveQuizPassed("python", "L1"), true);
  assert.equal(getJson("quiz_versions_python").L1, QUIZ_POOL_VERSIONS.python.L1);
  assert.equal((await getQuizProgress("python")).L1, true);
  assert.equal(await saveQuizPassed("python", "L2"), true);
  assert.equal(getJson("quiz_versions_python").L2, QUIZ_POOL_VERSIONS.python.L2);
  assert.equal((await getQuizProgress("python")).L2, true);
  assert.equal(await resetQuizProgress("python", "L2"), true);
  assert.equal((await getQuizProgress("python")).L2, false);
  assert.equal(Object.prototype.hasOwnProperty.call(getJson("quiz_versions_python"), "L2"), false);
  assert.equal(await resetQuizProgress("python", "L1"), true);
  assert.equal((await getQuizProgress("python")).L1, false);

  // A failed reset read leaves both the pass and its version untouched.
  setJson("quiz_sql", { L1: true });
  setJson("quiz_versions_sql", { L1: QUIZ_POOL_VERSIONS.sql.L1 });
  failNextReadFor = "quiz_sql";
  console.error = () => {};
  assert.equal(await resetQuizProgress("sql", "L1"), false);
  console.error = originalConsoleError;
  assert.deepEqual(getJson("quiz_sql"), { L1: true });
  assert.deepEqual(getJson("quiz_versions_sql"), {
    L1: QUIZ_POOL_VERSIONS.sql.L1,
  });

  // Scored placement results from the old pool are stale; intentional skips remain.
  setJson("assessment_python", {
    completed: true,
    startingLevel: "L3",
    scores: { L1: { score: 5, total: 5 } },
  });
  assert.equal(await getAssessmentResult("python"), null);

  setJson("assessment_html", {
    completed: true,
    skipped: true,
    startingLevel: "L1",
  });
  assert.equal((await getAssessmentResult("html")).skipped, true);

  assert.equal(await saveAssessmentResult("java", {
    startingLevel: "L2",
    scores: { L1: { score: 4, total: 5 } },
  }), true);
  const currentAssessment = await getAssessmentResult("java");
  assert.equal(currentAssessment.assessmentVersion, ASSESSMENT_POOL_VERSION);
  assert.equal(currentAssessment.startingLevel, "L2");

  console.log("PASS  Empty storage initializes safely without inventing progress");
  console.log("PASS  Promoted topic progress moves from L2 to L1 without losing other IDs");
  console.log("PASS  Existing L1/L2 duplicates are deduplicated safely");
  console.log("PASS  Migration is idempotent and concurrent calls are coalesced");
  console.log("PASS  Interrupted migration resumes after a failed marker write");
  console.log("PASS  Failed progress writes do not produce a migration marker");
  console.log("PASS  Storage read failures never mark incomplete migrations as complete");
  console.log("PASS  Failed progress-save reads preserve all completion buckets");
  console.log("PASS  Failed quiz-save and reset reads preserve existing level passes");
  console.log("PASS  Bookmark, practice, and missed-question read failures preserve saved lists");
  console.log("PASS  Bookmarks, practice completion, and last topic are preserved");
  console.log("PASS  Missed questions are re-keyed when wording survives at a new level and obsolete ones drop out");
  console.log("PASS  Legacy quiz passes expire when their current pool version changes");
  console.log("PASS  New quiz passes are versioned and reset cleanly");
  console.log("PASS  Stale scored placement results expire while skipped assessments remain skipped");
  console.log("PASS  New placement results store the current pool version");
  console.log("All curriculum migration checks passed.");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
