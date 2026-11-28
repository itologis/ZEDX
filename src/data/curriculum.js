// Curriculum changes that affect saved learner data live in one place.
// Keep topic IDs stable when moving a topic between levels.

export const BEGINNER_TOPIC_MOVES = Object.freeze({
  html: ["h6", "h7", "h8", "h9", "h10"],
  css: ["c5", "c18"],
  java: ["j10", "j16", "j17", "j18"],
  python: ["p6", "p16", "p17", "p18"],
  javascript: ["js6", "js8", "js9", "js17"],
  php: ["php6", "php8", "php16"],
  sql: ["sql6"],
});

export const PROGRESS_MIGRATION_VERSION = 2;

// Every level pool has a new version after the Beginner and Intermediate rebuild.
export const QUIZ_POOL_VERSIONS = Object.freeze({
  html: { L1: 2, L2: 3, L3: 2 },
  css: { L1: 2, L2: 3, L3: 2 },
  java: { L1: 2, L2: 3, L3: 2 },
  python: { L1: 2, L2: 3, L3: 2 },
  javascript: { L1: 2, L2: 3, L3: 2 },
  php: { L1: 2, L2: 3, L3: 2 },
  sql: { L1: 2, L2: 3, L3: 2 },
});

export const ASSESSMENT_POOL_VERSION = 3;
