import { COLORS } from "../theme";
import css from "./css";
import html from "./html";
import java from "./java";
import javascript from "./javascript";
import php from "./php";
import python from "./python";
import sql from "./sql";

export const LANGUAGES = [
  { key: "html", label: "HTML", color: COLORS.html, data: html },
  { key: "css", label: "CSS", color: COLORS.css, data: css },
  { key: "java", label: "Java", color: COLORS.java, data: java },
  { key: "python", label: "Python", color: COLORS.python, data: python },
  {
    key: "javascript",
    label: "JavaScript",
    color: COLORS.javascript,
    data: javascript,
  },
  { key: "php", label: "PHP", color: COLORS.php, data: php },
  { key: "sql", label: "SQL", color: COLORS.sql, data: sql },
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
          color: lang.color,
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
