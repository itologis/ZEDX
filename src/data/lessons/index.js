import css from "./css";
import html from "./html";
import java from "./java";
import javascript from "./javascript";
import php from "./php";
import python from "./python";
import sql from "./sql";
import { LESSON_GUIDES as INTRO_LESSON_GUIDES } from "../lessonGuides";
import { FOUNDATION_LESSON_GUIDES } from "../lessonGuidesFoundations";
import { BEGINNER_REMAINDER_GUIDES } from "../lessonGuidesBeginnerRemainder";
import { PROMOTED_BEGINNER_GUIDES } from "../lessonGuidesPromoted";

// One file per language, keyed by topic id. A language listed here must cover
// every one of its topics — the content check enforces it.
export const LESSONS = { css, html, java, javascript, php, python, sql };

export const LESSON_GUIDES = Object.fromEntries(
  Object.keys(INTRO_LESSON_GUIDES).map((languageKey) => [
    languageKey,
    {
      ...INTRO_LESSON_GUIDES[languageKey],
      ...FOUNDATION_LESSON_GUIDES[languageKey],
      ...BEGINNER_REMAINDER_GUIDES[languageKey],
      ...PROMOTED_BEGINNER_GUIDES[languageKey],
    },
  ]),
);

export const getLessons = (languageKey, topicId) => {
  const lessons = LESSONS[languageKey]?.[topicId];
  if (!lessons) return null;

  const guides = LESSON_GUIDES[languageKey]?.[topicId] || [];
  return lessons.map((lesson, index) => ({
    ...lesson,
    ...(guides[index] || {}),
  }));
};

export default LESSONS;
