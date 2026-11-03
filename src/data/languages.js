import css from "./css";
import html from "./html";
import java from "./java";
import javascript from "./javascript";
import php from "./php";
import python from "./python";
import sql from "./sql";

// Colours live in the theme (`colors.lang[key]`) so each theme can use its own
// print-safe swatch set.
export const LANGUAGES = [
  { key: "html", label: "HTML", data: html },
  { key: "css", label: "CSS", data: css },
  { key: "java", label: "Java", data: java },
  { key: "python", label: "Python", data: python },
  { key: "javascript", label: "JavaScript", data: javascript },
  { key: "php", label: "PHP", data: php },
  { key: "sql", label: "SQL", data: sql },
];

export const getLanguage = (key) => LANGUAGES.find((l) => l.key === key);

// Every topic across every language, flattened into one list
export const getAllTopics = () => {
  const all = [];

  for (const lang of LANGUAGES) {
    for (const level of lang.data.levels || []) {
      for (const topic of level.topics || []) {
        all.push({
          languageKey: lang.key,
          languageLabel: lang.label,
          level: level.level,
          levelLabel: level.label,
          topic,
        });
      }
    }
  }

  return all;
};

export const findTopic = (languageKey, topicId) =>
  getAllTopics().find(
    (item) => item.languageKey === languageKey && item.topic.id === topicId,
  ) || null;
