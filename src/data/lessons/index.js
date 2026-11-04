import html from "./html";

// One file per language, keyed by topic id. Languages that have no lessons
// entry keep the single-page topic layout.
export const LESSONS = { html };

export const getLessons = (languageKey, topicId) =>
  LESSONS[languageKey]?.[topicId] || null;

export default LESSONS;
