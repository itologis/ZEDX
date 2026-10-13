// Render + interaction smoke tests for the real ZEDX screens and App.js navigation.
// react-native / expo modules are replaced by tiny stand-ins (see ./stubs); everything else is the real code.
import AsyncStorage from "@react-native-async-storage/async-storage";
import fs from "fs";
import TestRenderer, { act } from "react-test-renderer";

import App from "/home/claude/zedx_new/App";
import { LANGUAGES, findTopic } from "/home/claude/zedx_new/src/data/languages";
import { PRACTICE } from "/home/claude/zedx_new/src/data/practice";
import {
    getAssessmentResult,
    getMissedQuestions,
    getPracticeDone,
    getProgress,
    hasCompletedAssessment,
    toggleBookmark
} from "/home/claude/zedx_new/src/data/progress";
import { QUIZZES } from "/home/claude/zedx_new/src/data/quiz";
import AssessmentScreen from "/home/claude/zedx_new/src/screens/AssessmentScreen";
import HomeScreen from "/home/claude/zedx_new/src/screens/HomeScreen";
import IntroScreen from "/home/claude/zedx_new/src/screens/IntroScreen";
import LevelsScreen from "/home/claude/zedx_new/src/screens/LevelsScreen";
import QuizScreen from "/home/claude/zedx_new/src/screens/QuizScreen";
import QuizzesScreen from "/home/claude/zedx_new/src/screens/QuizzesScreen";
import SavedScreen from "/home/claude/zedx_new/src/screens/SavedScreen";
import SearchScreen from "/home/claude/zedx_new/src/screens/SearchScreen";
import TopicScreen from "/home/claude/zedx_new/src/screens/TopicScreen";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const origError = console.error;
console.error = (...a) => {
  // surface React warnings (keys, act, prop types) as test failures instead of hiding them
  warnings.push(a.map(String).join(" ").slice(0, 200));
};
const warnings = [];

const results = [];
const check = (group, name, pass, detail = "") =>
  results.push({ group, name, pass: !!pass, detail });

// ---------------------------------------------------------------- helpers
const flush = async () => {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
};
const render = async (el) => {
  let r;
  await act(async () => {
    r = TestRenderer.create(el);
  });
  await flush();
  return r;
};
const hosts = (r, type) => r.root.findAll((n) => n.type === type);
const textOf = (n) =>
  (n.children || [])
    .map((c) => (typeof c === "string" ? c : textOf(c)))
    .join("");
const all = (r) => textOf(r.root);
const press = async (node) => {
  if (node.props.disabled) throw new Error("tried to press a disabled control");
  await act(async () => {
    node.props.onPress();
  });
  await flush();
};
const pressables = (r) => hosts(r, "TouchableOpacity");
const findPress = (r, pred) =>
  pressables(r).find((n) => pred(textOf(n).trim(), n));
const pressText = async (r, t, exact = true) => {
  const n = findPress(r, (txt) => (exact ? txt === t : txt.includes(t)));
  if (!n) throw new Error(`no pressable with text ${JSON.stringify(t)}`);
  await press(n);
};
const type = async (r, value) => {
  const input = hosts(r, "TextInput")[0];
  await act(async () => {
    input.props.onChangeText(value);
  });
  await flush();
};
const reset = () => AsyncStorage._store.clear();
const lang = (k) => LANGUAGES.find((l) => l.key === k);
const questionLookup = (languageKey, text) => {
  for (const [lv, quiz] of Object.entries(QUIZZES[languageKey]))
    for (const q of quiz.questions)
      if (q.question === text) return { q, level: lv };
  return null;
};

// ------------------------------------------------------------------ Home
{
  reset();
  const picked = [];
  const r = await render(
    <HomeScreen
      onSelectLanguage={(k) => picked.push(k)}
      onOpenTopic={() => {}}
    />,
  );
  const t = all(r);
  check("HomeScreen", 'header says "7 available"', t.includes("7 available"));
  check(
    "HomeScreen",
    "a tile is rendered for every language incl. PHP and SQL",
    ["HTML", "CSS", "Java", "Python", "JavaScript", "PHP", "SQL"].every((n) =>
      t.includes(n),
    ) &&
      pressables(r).filter((n) => /\d+ levels?/.test(textOf(n))).length === 7,
  );
  const phpTile = findPress(
    r,
    (txt) =>
      txt.startsWith("P") && txt.includes("PHP") && txt.includes("3 levels"),
  );
  await press(phpTile);
  const sqlTile = findPress(
    r,
    (txt) => txt.includes("SQL") && txt.includes("3 levels"),
  );
  await press(sqlTile);
  check(
    "HomeScreen",
    "tapping the PHP and SQL tiles calls onSelectLanguage('php') then ('sql')",
    JSON.stringify(picked) === '["php","sql"]',
    JSON.stringify(picked),
  );
  await type(r, "sql");
  const tilesAfter = pressables(r).filter((n) => /\d+ levels?/.test(textOf(n)));
  check(
    "HomeScreen",
    "typing 'sql' in the language search leaves only the SQL tile",
    tilesAfter.length === 1 && textOf(tilesAfter[0]).includes("SQL"),
  );
  await type(r, "php");
  check(
    "HomeScreen",
    "typing 'php' leaves only the PHP tile",
    pressables(r).filter((n) => /\d+ levels?/.test(textOf(n))).length === 1 &&
      all(r).includes("PHP"),
  );
  await type(r, "zzz");
  check(
    "HomeScreen",
    "no match shows the empty state",
    all(r).includes("No languages found"),
  );
}

// ---------------------------------------------------------------- Search
{
  const openedTopics = [];
  const mk = (query, filter) =>
    render(
      <SearchScreen
        query={query}
        filter={filter}
        onOpenTopic={(l, id) => openedTopics.push([l, id])}
        onOpenLanguage={() => {}}
      />,
    );
  let r = await mk("", "all");
  const chips = pressables(r).map((n) => textOf(n).trim());
  check(
    "SearchScreen",
    "filter chips include All + one per language (8 chips, incl. PHP and SQL)",
    chips.length === 8 && chips.includes("PHP") && chips.includes("SQL"),
    chips.join(","),
  );
  r = await mk("php", "all");
  const rows = pressables(r).filter((n) =>
    /^(PHP|SQL|HTML|CSS|Java|Python|JavaScript) ·/.test(textOf(n)),
  );
  check(
    "SearchScreen",
    'searching "php" finds the language card and all 15 PHP topics',
    all(r).includes("Open PHP") &&
      rows.length === 15 &&
      rows.every((n) => textOf(n).startsWith("PHP ·")),
    `${rows.length} rows`,
  );
  r = await mk("sql", "all");
  const rows2 = pressables(r).filter((n) =>
    /^(PHP|SQL|HTML|CSS|Java|Python|JavaScript) ·/.test(textOf(n)),
  );
  check(
    "SearchScreen",
    'searching "sql" finds the 15 SQL topics plus the PHP PDO topic that mentions SQL',
    all(r).includes("Open SQL") &&
      rows2.filter((n) => textOf(n).startsWith("SQL ·")).length === 15 &&
      rows2.some((n) => textOf(n).includes("PDO & Prepared Statements")),
    `${rows2.length} rows`,
  );
  r = await mk("sql", "php");
  const rows3 = pressables(r).filter((n) => /^(PHP|SQL) ·/.test(textOf(n)));
  check(
    "SearchScreen",
    'filter chip "PHP" + query "sql" returns only the PDO topic',
    rows3.length === 1 &&
      textOf(rows3[0]).includes("PDO & Prepared Statements"),
  );
  r = await mk("select", "sql");
  const first = pressables(r).find((n) => /^SQL ·/.test(textOf(n)));
  check(
    "SearchScreen",
    'query "select" in SQL ranks the SELECT topic first (title match)',
    first && textOf(first).includes("SELECT"),
  );
  await press(first);
  check(
    "SearchScreen",
    "tapping a result opens it with (languageKey, topicId)",
    JSON.stringify(openedTopics) === '[["sql","sql1"]]',
    JSON.stringify(openedTopics),
  );
  r = await mk("left join", "all");
  check(
    "SearchScreen",
    'multi-word query "left join" finds JOINs',
    all(r).includes("JOINs"),
  );
}

// ---------------------------------------------------------------- Quizzes
{
  reset();
  const opened = [];
  const r = await render(
    <QuizzesScreen
      onOpenQuiz={(l, lv) => opened.push([l, lv])}
      onOpenReview={() => {}}
    />,
  );
  const t = all(r);
  check(
    "QuizzesScreen",
    "a section exists for every language, with PHP and SQL showing 0/3 passed",
    ["HTML", "CSS", "Java", "Python", "JavaScript", "PHP", "SQL"].every((n) =>
      t.includes(n),
    ) && (t.match(/0\/3 passed/g) || []).length === 7,
  );
  const rows = pressables(r).filter((n) => /Not taken/.test(textOf(n)));
  check(
    "QuizzesScreen",
    "21 quiz rows (7 languages x 3 levels)",
    rows.length === 21,
    String(rows.length),
  );
  const phpRows = rows.filter((n) => /^L2 · Intermediate/.test(textOf(n)));
  await press(phpRows[5]); // 6th language = PHP
  await press(phpRows[6]); // 7th language = SQL
  check(
    "QuizzesScreen",
    "tapping L2 rows of PHP and SQL opens ('php','L2') and ('sql','L2')",
    JSON.stringify(opened) === '[["php","L2"],["sql","L2"]]',
    JSON.stringify(opened),
  );
}

// ----------------------------------------------------------------- Intro
{
  let started = 0;
  const r = await render(
    <IntroScreen
      intro={lang("sql").data.intro}
      accentColor={lang("sql").color}
      onBack={() => {}}
      onStart={() => started++}
    />,
  );
  const t = all(r);
  check(
    "IntroScreen",
    "shows the SQL title, tagline, description and 4 use cases",
    t.includes("SQL") &&
      t.includes("Ask questions of your data.") &&
      t.includes("Structured Query Language") &&
      t.includes("Querying and reporting on data") &&
      t.includes("Data analysis and business intelligence"),
  );
  await pressText(r, "Start learning");
  check("IntroScreen", '"Start learning" calls onStart', started === 1);
}

// ---------------------------------------------------------------- Levels
{
  reset();
  const opened = [];
  const quizzes = [];
  const php = lang("php");
  const r = await render(
    <LevelsScreen
      languageData={php.data}
      accentColor={php.color}
      languageKey="php"
      onBack={() => {}}
      onOpenTopic={(t) => opened.push(t)}
      onOpenQuiz={(l, lv) => quizzes.push([l, lv])}
    />,
  );
  const t = all(r);
  const titles = php.data.levels.flatMap((l) => l.topics.map((x) => x.title));
  check(
    "LevelsScreen",
    "all 15 PHP topic titles and the 3 level headings are shown",
    titles.every((x) => t.includes(x)) &&
      ["Beginner", "Intermediate", "Advanced"].every((x) => t.includes(x)) &&
      t.includes("0/5"),
  );
  check(
    "LevelsScreen",
    'three quiz buttons are shown ("Take Beginner/Intermediate/Advanced quiz")',
    [
      "Take Beginner quiz",
      "Take Intermediate quiz",
      "Take Advanced quiz",
    ].every((x) => t.includes(x)),
  );
  await pressText(r, "PDO & Prepared Statements", false);
  const topic = opened[0];
  check(
    "LevelsScreen",
    "opening a topic hands App the topic with its level (_level) and a completion callback",
    topic &&
      topic.id === "php14" &&
      topic._level === "L3" &&
      typeof topic._onComplete === "function",
  );
  await topic._onComplete();
  const prog = await getProgress("php");
  check(
    "LevelsScreen",
    "completing the topic saves progress under progress_php and the screen refreshes (1/5 in L3)",
    JSON.stringify(prog) === '{"L3":["php14"]}' && all(r).includes("1/5"),
    JSON.stringify(prog),
  );
  await pressText(r, "Take Advanced quiz");
  check(
    "LevelsScreen",
    "the quiz button opens ('php','L3')",
    JSON.stringify(quizzes) === '[["php","L3"]]',
  );
  // sql too
  const sql = lang("sql");
  const r2 = await render(
    <LevelsScreen
      languageData={sql.data}
      accentColor={sql.color}
      languageKey="sql"
      onBack={() => {}}
      onOpenTopic={() => {}}
      onOpenQuiz={() => {}}
    />,
  );
  const sqlTitles = sql.data.levels.flatMap((l) =>
    l.topics.map((x) => x.title),
  );
  check(
    "LevelsScreen",
    "all 15 SQL topic titles and 3 quiz buttons are shown for sql",
    sqlTitles.every((x) => all(r2).includes(x)) &&
      (all(r2).match(/Take \w+ quiz/g) || []).length === 3,
  );
}

// ----------------------------------------------------------------- Topic
{
  reset();
  const php = lang("php");
  const found = findTopic("php", "php14");
  let completed = 0,
    back = 0;
  const topic = {
    ...found.topic,
    _level: found.level,
    _onComplete: async () => {
      completed++;
    },
  };
  const r = await render(
    <TopicScreen
      topic={topic}
      languageKey="php"
      accentColor={php.color}
      onBack={() => back++}
    />,
  );
  const t = all(r);
  check(
    "TopicScreen",
    "shows title, level, description, syntax and the practice card",
    t.includes("PDO & Prepared Statements") &&
      t.includes("Level: L3") &&
      t.includes("Syntax") &&
      t.includes("PRACTICE") &&
      t.includes(PRACTICE.php14.q) &&
      t.includes("$stmt = $pdo->prepare"),
  );
  await pressText(r, "query");
  check(
    "TopicScreen",
    "a wrong practice answer shows 'Not quite, try another.'",
    all(r).includes("Not quite, try another."),
  );
  check(
    "TopicScreen",
    "a wrong answer is not saved as practised",
    (await getPracticeDone("php")).length === 0,
  );
  await pressText(r, "prepare");
  check(
    "TopicScreen",
    "the right answer shows 'Correct.' and the explanation",
    all(r).includes("Correct.") && all(r).includes(PRACTICE.php14.why),
  );
  check(
    "TopicScreen",
    "the right answer is saved under practice_php",
    (await getPracticeDone("php")).includes("php14"),
  );
  await pressText(r, "Mark as Read");
  check(
    "TopicScreen",
    "Mark as Read asks for confirmation first",
    all(r).includes("Mark as read?"),
  );
  await pressText(r, "Yes!");
  check(
    "TopicScreen",
    "confirming calls _onComplete once and goes back",
    completed === 1 && back === 1,
  );
  // every new topic renders its practice card with exactly 3 options
  let allOk = true;
  for (const key of ["php", "sql"]) {
    for (const lv of lang(key).data.levels)
      for (const tp of lv.topics) {
        const rr = await render(
          <TopicScreen
            topic={{ ...tp, _level: lv.level }}
            languageKey={key}
            accentColor="#fff"
            onBack={() => {}}
          />,
        );
        const tt = all(rr);
        const opts = [PRACTICE[tp.id].a, ...PRACTICE[tp.id].w];
        if (
          !(
            tt.includes(tp.title) &&
            tt.includes("PRACTICE") &&
            tt.includes(PRACTICE[tp.id].q) &&
            opts.every((o) =>
              pressables(rr).some((n) => textOf(n).trim() === o),
            )
          )
        ) {
          allOk = false;
          console.log("topic render problem:", tp.id);
        }
      }
  }
  check(
    "TopicScreen",
    "all 30 PHP/SQL topics render with title, syntax and a practice card showing all 3 options",
    allOk,
  );
}

// ------------------------------------------------------------ Assessment
for (const key of ["php", "sql"]) {
  for (const mode of ["right", "wrong"]) {
    reset();
    const L = lang(key);
    let completedWith = "none";
    const r = await render(
      <AssessmentScreen
        languageKey={key}
        languageData={L.data}
        accentColor={L.color}
        onBack={() => {}}
        onComplete={(res) => (completedWith = res ? "result" : "empty")}
      />,
    );
    check(
      "AssessmentScreen",
      `${key}/${mode}: starts at "Question 1 of 15"`,
      all(r).includes("Question 1 of 15"),
    );
    for (let i = 0; i < 15; i++) {
      const qText = hosts(r, "Text")
        .map(textOf)
        .find((s) => questionLookup(key, s));
      const { q } = questionLookup(key, qText);
      const correctText = q.options[q.correct];
      const optionNodes = pressables(r).filter((n) =>
        q.options.includes(textOf(n).trim()),
      );
      const choose =
        mode === "right"
          ? optionNodes.find((n) => textOf(n).trim() === correctText)
          : optionNodes.find((n) => textOf(n).trim() !== correctText);
      await press(choose);
      await pressText(r, i === 14 ? "See Results" : "Next Question");
    }
    const t = all(r);
    const stored = await getAssessmentResult(key);
    const expectedLevel = mode === "right" ? "Advanced" : "Beginner";
    check(
      "AssessmentScreen",
      `${key}/${mode}: finishing shows "Assessment Complete" and recommends ${expectedLevel}`,
      t.includes("Assessment Complete") && t.includes(expectedLevel),
      t.slice(0, 80),
    );
    check(
      "AssessmentScreen",
      `${key}/${mode}: per-level scores are ${mode === "right" ? "5 / 5" : "0 / 5"} and the result is stored under assessment_${key}`,
      (t.match(mode === "right" ? /5 \/ 5/g : /0 \/ 5/g) || []).length === 3 &&
        stored?.completed === true &&
        stored.startingLevel === (mode === "right" ? "L3" : "L1") &&
        (await hasCompletedAssessment(key)),
    );
    await pressText(r, "Start Learning");
    check(
      "AssessmentScreen",
      `${key}/${mode}: "Start Learning" calls onComplete`,
      completedWith === "result",
    );
  }
}

// ------------------------------------------------------------------ Quiz
{
  for (const [key, level] of [
    ["php", "L2"],
    ["sql", "L1"],
  ]) {
    for (const mode of ["right", "wrong"]) {
      reset();
      const L = lang(key);
      let passes = 0,
        backs = 0;
      const r = await render(
        <QuizScreen
          languageKey={key}
          levelId={level}
          accentColor={L.color}
          onBack={() => backs++}
          onPass={() => passes++}
        />,
      );
      check(
        "QuizScreen",
        `${key} ${level}: start card shows 5 questions and passing score 3/5`,
        all(r).includes("Level quiz") && all(r).includes("3/5"),
      );
      await pressText(r, "Start quiz");
      for (let i = 0; i < 5; i++) {
        const qText = hosts(r, "Text")
          .map(textOf)
          .find((s) => questionLookup(key, s));
        const { q } = questionLookup(key, qText);
        const correctText = q.options[q.correct];
        const nodes = pressables(r).filter((n) =>
          q.options.includes(
            textOf(n)
              .replace(/\s+[✓✕]$/, "")
              .trim(),
          ),
        );
        const choose =
          mode === "right"
            ? nodes.find((n) => textOf(n).trim() === correctText)
            : nodes.find((n) => textOf(n).trim() !== correctText);
        await press(choose);
        await pressText(r, i === 4 ? "See results" : "Next question");
      }
      const t = all(r);
      if (mode === "right") {
        check(
          "QuizScreen",
          `${key} ${level}: all correct -> "Passed!", 5 / 5, onPass fired once`,
          t.includes("Passed!") && t.includes("5 / 5") && passes === 1,
        );
        check(
          "QuizScreen",
          `${key} ${level}: nothing lands in the missed list`,
          (await getMissedQuestions()).length === 0,
        );
      } else {
        check(
          "QuizScreen",
          `${key} ${level}: all wrong -> "Keep learning", 0 / 5, onPass NOT fired`,
          t.includes("Keep learning") && t.includes("0 / 5") && passes === 0,
        );
        const missed = await getMissedQuestions();
        check(
          "QuizScreen",
          `${key} ${level}: the 5 missed questions are stored and tagged ${key}/${level}`,
          missed.length === 5 &&
            missed.every((m) => m._lang === key && m._level === level),
          String(missed.length),
        );
        // Review mode, exactly how App.js opens it
        const rv = await render(
          <QuizScreen
            customQuestions={missed}
            title="Review"
            onBack={() => {}}
          />,
        );
        check(
          "QuizScreen",
          `Review mode opens with the missed ${key.toUpperCase()} questions (tag "${key.toUpperCase()} · ${level}")`,
          all(rv).includes("Review") &&
            all(rv).includes(`${key.toUpperCase()} · ${level}`) &&
            all(rv).includes("1 of 5"),
        );
      }
    }
  }
}

// ----------------------------------------------------------------- Saved
{
  reset();
  await toggleBookmark("php", "php5");
  await toggleBookmark("sql", "sql3");
  const r = await render(<SavedScreen onOpenTopic={() => {}} />);
  const t = all(r);
  check(
    "SavedScreen",
    "bookmarked PHP and SQL topics are listed with their language and level tag",
    t.includes("PHP · Beginner") &&
      t.includes("Functions") &&
      t.includes("SQL · Beginner") &&
      t.includes("ORDER BY & LIMIT"),
  );
  const star = findPress(
    r,
    (txt, n) => n.props.accessibilityLabel === "Remove Functions from saved",
  );
  await press(star);
  check(
    "SavedScreen",
    "removing a bookmark updates the list",
    !all(r).includes("Functions") && all(r).includes("ORDER BY & LIMIT"),
  );
}

// ------------------------------------------------- the whole app, via App.js
{
  reset();
  const r = await render(<App />);
  check(
    "App.js (full app)",
    "boots on Home with 7 languages",
    all(r).includes("ZEDX") && all(r).includes("7 available"),
  );
  // Home -> PHP intro -> assessment -> back
  const phpTile = findPress(
    r,
    (txt) => txt.includes("PHP") && txt.includes("3 levels"),
  );
  await press(phpTile);
  check(
    "App.js (full app)",
    "PHP tile -> Intro screen for PHP",
    all(r).includes("Introduction") &&
      all(r).includes("Build dynamic websites on the server."),
  );
  await pressText(r, "Start learning");
  check(
    "App.js (full app)",
    '"Start learning" (assessment not taken yet) -> Assessment with 15 questions',
    all(r).includes("Initial Assessment") &&
      all(r).includes("Question 1 of 15"),
  );
  await pressText(r, "← Quit", false);
  check(
    "App.js (full app)",
    "Quit returns to the PHP intro",
    all(r).includes("Introduction"),
  );
  // after an assessment exists, Start learning goes straight to Levels
  await AsyncStorage.setItem(
    "assessment_php",
    JSON.stringify({ completed: true, scores: {}, startingLevel: "L2" }),
  );
  await pressText(r, "Start learning");
  check(
    "App.js (full app)",
    "with a stored assessment, Start learning goes straight to Levels (L2 recommended)",
    all(r).includes("Levels") &&
      all(r).includes("Recommended starting point") &&
      all(r).includes("Arrays") &&
      all(r).includes("Sessions"),
  );
  await pressText(r, "Take Intermediate quiz");
  check(
    "App.js (full app)",
    "Levels -> PHP L2 quiz start card",
    all(r).includes("Level quiz") && all(r).includes("Passing score"),
  );
  await pressText(r, "← Back", false);
  await pressText(r, "Associative Arrays", false);
  check(
    "App.js (full app)",
    "Levels -> topic screen for php7",
    all(r).includes("Associative Arrays") &&
      all(r).includes("Level: L2") &&
      all(r).includes("PRACTICE"),
  );
  await pressText(r, "← Back", false);
  await pressText(r, "← PHP", false);
  check(
    "App.js (full app)",
    "back from Levels returns to the PHP intro",
    all(r).includes("Introduction"),
  );
  await pressText(r, "← Back", false);
  check(
    "App.js (full app)",
    "back from the intro returns Home",
    all(r).includes("7 available"),
  );
  // bottom tabs
  await pressText(r, "Quizzes");
  check(
    "App.js (full app)",
    "Quizzes tab lists PHP and SQL sections",
    all(r).includes("Review missed questions") &&
      all(r).includes("PHP") &&
      all(r).includes("SQL"),
  );
  await pressText(r, "Search");
  await type(r, "window");
  check(
    "App.js (full app)",
    'Search tab: "window" finds the SQL Window Functions topic',
    all(r).includes("Window Functions") && all(r).includes("SQL · Advanced"),
  );
  const result = findPress(
    r,
    (txt) => txt.startsWith("SQL ·") && txt.includes("Window Functions"),
  );
  await press(result);
  check(
    "App.js (full app)",
    "tapping the search result opens the SQL topic",
    all(r).includes("Topic Details") &&
      all(r).includes("OVER (ORDER BY age DESC)") &&
      all(r).includes("Level: L3"),
  );
  await pressText(r, "← Back", false);
  check(
    "App.js (full app)",
    "back returns to Search (query kept)",
    all(r).includes("Window Functions") && all(r).includes("Search"),
  );
  await pressText(r, "Learn");
  // DEV tools: still present, lists every language, and is wrapped in the new ScrollView
  await pressText(r, "DEV");
  const t = all(r);
  check(
    "App.js (full app)",
    "DEV box still opens and lists Show/Reset buttons for all 7 languages incl. PHP and SQL",
    t.includes("DEV TOOLS") &&
      t.includes("Show PHP Assessment") &&
      t.includes("Show SQL Assessment") &&
      t.includes("Reset PHP") &&
      t.includes("Reset SQL") &&
      (t.match(/Show \w+ Assessment/g) || []).length === 7 &&
      (t.match(/Reset (HTML|CSS|Java|Python|JavaScript|PHP|SQL)/g) || [])
        .length === 7,
  );
  const panel = r.root
    .findAll((n) => n.type === "ScrollView")
    .find((n) => textOf(n).includes("Assessment testing"));
  check(
    "App.js (full app)",
    "the DEV list sits inside a ScrollView and the header/close button stay outside it",
    !!panel && !textOf(panel).includes("DEV TOOLS"),
  );
  await pressText(r, "Show SQL Assessment");
  check(
    "App.js (full app)",
    'DEV "Show SQL Assessment" opens the SQL assessment',
    all(r).includes("Initial Assessment") &&
      all(r).includes("Question 1 of 15"),
  );
}

console.error = origError;
check(
  "React warnings",
  "no React warnings/errors were logged during all of the above (keys, act(), props)",
  warnings.length === 0,
  warnings.slice(0, 3).join(" || "),
);

const passed = results.filter((r) => r.pass).length;
fs.writeFileSync(
  "/home/claude/work/render_result.json",
  JSON.stringify({ passed, total: results.length, results }, null, 1),
);
for (const r of results.filter((x) => !x.pass))
  console.log("FAIL:", r.group, "-", r.name, "|", r.detail);
for (const g of [...new Set(results.map((r) => r.group))]) {
  const rs = results.filter((r) => r.group === g);
  console.log(
    `${g.padEnd(20)} ${rs.filter((r) => r.pass).length}/${rs.length}`,
  );
}
console.log(`TOTAL ${passed}/${results.length}`);
process.exit(passed === results.length ? 0 : 1);
