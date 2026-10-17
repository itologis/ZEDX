# SyntaxLibrary

A mobile app for learning programming-language syntax in short sessions. SyntaxLibrary covers **seven languages** — HTML, CSS, Java, Python, JavaScript, PHP, and SQL — each organized into three levels (L1–L3) of topics, fill-in-the-blank practice, and quizzes, plus an initial assessment, progress tracking, saved topics, and search.

Built with [Expo](https://docs.expo.dev/) (SDK 57) and React Native — runs on Android, iOS, and web. Content is bundled with the app, so it works offline.

## How the content fits together

- `src/data/<language>.js` — one file per language. Each has three levels, and each level holds topics (`id`, `title`, `syntax`, `description`).
- `src/data/practice.js` — one fill-in-the-blank exercise per topic, with two wrong options and an explanation.
- `src/data/quiz.js` — per-language, per-level quizzes (four options per question, a passing score) and the question pool the initial assessment draws from.
- `src/data/languages.js` — the registry the screens read from; topics are discovered automatically, so adding a topic needs no screen changes.

After any content change, run the coverage checker:

```bash
npm run check:content
```

It verifies that every topic has a practice exercise, every level has a quiz with four-option questions and a valid passing score, quiz levels match content levels, and every practice entry belongs to a real topic — and it exercises the progress/review flows.

## Screens

Home · Intro (language overview) · Levels · Topic · Quiz · Quizzes · Assessment · Search · Saved

## Getting started

```bash
npm install
npm start          # Expo dev server
npm run android    # or: npm run ios / npm run web
```

## Project layout

- `App.js` — app shell, navigation, and the Home dev-tools panel (`SHOW_DEV_TOOLS`, kept for testing builds until store release).
- `src/screens/` — one file per screen.
- `src/components/` — shared UI: `GlassCard`, `Screen`, `Header`, `BottomNav`, `FadeIn`, `MoltenBackground`, `EmptyState`, `BackButton`, `SyntaxCard`.
- `src/theme.js` — theme colors and per-language accents.
- `src/data/progress.js` — local progress (quiz passes, completed practice, missed questions) stored with AsyncStorage; nothing leaves the device.
- `scripts/check-content-coverage.cjs` — the coverage checker behind `npm run check:content`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` / `npm run ios` / `npm run web` | Start on a specific platform |
| `npm run lint` | ESLint via `expo lint` |
| `npm run check:content` | Validate content coverage + progress/review flows |

## Notes

- The project started under the working name **ZEDX**; the in-app title still says ZEDX in places, while `app.json` and the repo use **SyntaxLibrary** (pre-release cleanup item).
- `src/data/render_test.js` is a stale scratch file (old absolute paths, not wired to any script) — safe to ignore; most current `expo lint` warnings trace to it.
