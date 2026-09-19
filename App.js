import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import IntroScreen from "./src/screens/IntroScreen";
import LevelsScreen from "./src/screens/LevelsScreen";
import QuizScreen from "./src/screens/QuizScreen";
import TopicScreen from "./src/screens/TopicScreen";

import cssData from "./src/data/css";
import htmlData from "./src/data/html";
import javaData from "./src/data/java";
import { saveQuizPassed } from "./src/data/progress";
import pythonData from "./src/data/python";

const DATA_MAP = {
  html: { data: htmlData, color: "#f38ba8", key: "html" },
  css: { data: cssData, color: "#89b4fa", key: "css" },
  java: { data: javaData, color: "#fab387", key: "java" },
  python: { data: pythonData, color: "#a6e3a1", key: "python" },
};

export default function App() {
  const [screen, setScreen] = useState({ name: "home" });

  const goHome = () => setScreen({ name: "home" });
  const goIntro = (languageKey) => setScreen({ name: "intro", languageKey });
  const goLevels = (languageKey) => setScreen({ name: "levels", languageKey });
  const goTopic = (languageKey, topic) => setScreen({ name: "topic", languageKey, topic });
  const goQuiz = (languageKey, levelId) => setScreen({ name: "quiz", languageKey, levelId });

  const handleQuizPass = async (languageKey, levelId) => {
    console.log(`🎉 Quiz passed for ${languageKey} - ${levelId}, saving...`);
    await saveQuizPassed(languageKey, levelId);
    console.log(`✅ Saved! Going back to levels...`);
    goLevels(languageKey);
  };

  let content;

  if (screen.name === "home") {
    content = <HomeScreen onSelectLanguage={goIntro} />;
  } else if (screen.name === "intro") {
    const { data, color } = DATA_MAP[screen.languageKey];
    content = (
      <IntroScreen
        intro={data.intro}
        accentColor={color}
        onBack={goHome}
        onStart={() => goLevels(screen.languageKey)}
      />
    );
  } else if (screen.name === "levels") {
    const { data, color, key } = DATA_MAP[screen.languageKey];
    content = (
      <LevelsScreen
        languageData={data}
        accentColor={color}
        languageKey={key}
        onBack={() => goIntro(screen.languageKey)}
        onOpenTopic={(topic) => goTopic(screen.languageKey, topic)}
        onOpenQuiz={goQuiz}
      />
    );
  } else if (screen.name === "topic") {
    const { color } = DATA_MAP[screen.languageKey];
    content = (
      <TopicScreen
        topic={screen.topic}
        accentColor={color}
        onBack={() => goLevels(screen.languageKey)}
      />
    );
  } else if (screen.name === "quiz") {
    const { color, key } = DATA_MAP[screen.languageKey];
    content = (
      <QuizScreen
        languageKey={key}
        levelId={screen.levelId}
        accentColor={color}
        onBack={() => goLevels(screen.languageKey)}
        onPass={() => handleQuizPass(key, screen.levelId)}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      {content}
    </>
  );
}