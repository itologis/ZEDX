const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) =>
  fs.readFileSync(path.join(root, file), "utf8");

const feedback = read("src/components/AnswerFeedback.js");
const options = read("src/components/OptionRow.js");
const practice = read("src/screens/TopicScreen.js");
const lessonCheck = read("src/components/LessonCheck.js");
const quiz = read("src/screens/QuizScreen.js");
const assessment = read("src/screens/AssessmentScreen.js");

const checks = [
  [
    "Correct and wrong feedback both have dedicated animation sequences",
    /if \(correct\)[\s\S]*?withSequence\([\s\S]*?return;[\s\S]*?withSequence\(/.test(feedback),
  ],
  [
    "Feedback animations respect system reduced-motion settings",
    /ReduceMotion\.System/.test(feedback),
  ],
  [
    "Wrong options wobble and settle, while correct/wrong states have visible marks",
    /state === "wrong"[\s\S]*?withSequence/.test(options) &&
      /state === "correct"/.test(options) &&
      /state === "wrong"/.test(options),
  ],
  [
    "Option feedback respects system reduced-motion settings",
    /ReduceMotion\.System/.test(options),
  ],
  [
    "Practice uses shared option and answer feedback components",
    /<OptionRow\b/.test(practice) &&
      /<AnswerFeedback\b/.test(practice) &&
      /key=\{choice\}/.test(practice),
  ],
  [
    "Lesson checks use shared feedback and remount it when the answer changes",
    /<OptionRow\b/.test(lessonCheck) &&
      /<AnswerFeedback\b/.test(lessonCheck) &&
      /key=\{selected\}/.test(lessonCheck),
  ],
  [
    "Quizzes and review quizzes use the shared feedback and reset it for each question",
    /<OptionRow\b/.test(quiz) &&
      /<AnswerFeedback\b/.test(quiz) &&
      /<FadeIn key=\{current\}/.test(quiz),
  ],
  [
    "Placement assessment keeps answers editable and does not reveal correctness early",
    /setSelectedOption\(index\)/.test(assessment) &&
      /handleOptionSelect\(index\)/.test(assessment) &&
      !/AnswerFeedback/.test(assessment),
  ],
];

let failures = 0;

for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}  ${name}`);
  if (!passed) failures += 1;
}

if (failures > 0) {
  console.error(`\n${failures} answer-feedback regression check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${checks.length} answer-feedback integration checks passed.`);
}
