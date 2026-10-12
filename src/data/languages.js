import css from "./css";
import html from "./html";
import java from "./java";
import python from "./python";

export const LANGUAGES = [
  { key: "html", label: "HTML", color: "#f38ba8", data: html },
  { key: "css", label: "CSS", color: "#89b4fa", data: css },
  { key: "java", label: "Java", color: "#fab387", data: java },
  { key: "python", label: "Python", color: "#a6e3a1", data: python },
];

export const getLanguage = (key) => LANGUAGES.find((l) => l.key === key);

// Every topic across every language, flattened into one list
export const getAllTopics = () => {
  const all = [];

  for (const lang of LANGUAGES) {
    for (const level of lang.data.levels) {
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
