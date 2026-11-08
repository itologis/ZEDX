# ZEDX

A mobile app for learning programming-language syntax in short sessions. ZEDX covers **seven languages** — HTML, CSS, Java, Python, JavaScript, PHP, and SQL — each organized into three levels (L1–L3) of topics, fill-in-the-blank practice, and quizzes, plus an initial assessment, progress tracking, saved topics, and search.

Built with [Expo](https://docs.expo.dev/) (SDK 58) and React Native — runs on Android, iOS, and web. Content is bundled with the app, so it works offline.

## How the content fits together

- `src/data/<language>.js` — one file per language. Each has three levels, and each level holds topics (`id`, `title`, `syntax`, `description`).
- `src/data/lessons/<language>.js` — chapter content, keyed by topic id. Every topic in every track is a three-step chapter (`title`, `body`, `example`, `wrong`, `gotcha`). `wrong` is the counter-example: the broken version of the snippet, with a line of prose saying what fails. All seven languages are authored end-to-end (108 topics × 3 lessons, 324 lessons total).
- `src/data/lessons/index.js` — the lesson registry. A language listed there must cover every one of its topics; half-authored tracks fail the content check.
- `src/data/practice.js` — one fill-in-the-blank exercise per topic, with two wrong options and an explanation.
- `src/data/quiz.js` — per-language, per-level quizzes (four options per question, a passing score) and the question pool the initial assessment draws from.
- `src/data/languages.js` — the registry the screens read from; topics are discovered automatically, so adding a topic needs no screen changes.

After any content change, run the coverage checker:

```bash
npm run check:content
```

It verifies that every topic has a practice exercise, every level has a quiz with four-option questions and a valid passing score, quiz levels match content levels, every practice entry belongs to a real topic, every lessons entry covers a real topic with three well-formed steps and a wrong-code comparison — and it exercises the progress/review flows.

## Design

The UI follows the "Manual" direction: IBM Plex Sans + Mono, paper/ink palettes with dark as the default, one vermilion accent, 7px language swatches, 2px radius, and rules instead of cards. Type carries the hierarchy; there are no gradients, shadows, or blur.

## Screens

Home · Intro (language overview) · Levels · Topic (chapter with lessons) · Quiz · Quizzes · Assessment · Search · Saved

The bottom tabs stay available on browse screens (Home, Intro, Levels, Topic) so any lesson is one tap from Learn, Search, Quizzes, or Saved. The assessment and quiz keep the nav hidden; they are focused flows that confirm before leaving.

## Getting started

```bash
npm install
npm start          # Expo dev server
npm run android    # or: npm run ios / npm run web
```

## Project layout

- `App.js` — app shell, navigation, and the Home dev-tools panel (`SHOW_DEV_TOOLS`, kept for testing builds until store release).
- `src/screens/` — one file per screen.
- `src/components/` — shared UI: `TopBar`, `Screen`, `BottomNav`, `FadeIn`, `SectionHead`, `FieldLabel`, `Rule`, `CodePlate`, `OptionRow`, `Button`, `IndexRow`, `ContinueStrip`, `ThemeToggle`.
- `src/theme.js` — light/dark palettes, Plex type scale, spacing, and the 7px language swatches; `ThemeProvider`/`useTheme` persist the theme in AsyncStorage (`zedx_theme`).
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

- The project was renamed from **SyntaxLibrary** to **ZEDX** on 2026-11-02 (app name/slug, package name, folder, in-app brand, icon/favicon/splash assets). The `app.json` URL scheme, Android package, and EAS `projectId` still use the old identifiers; changing them affects deep links, Play identity, and EAS linkage, so that is a separate decision.
- `src/data/render_test.js` is a stale scratch file (old absolute paths, not wired to any script) — safe to ignore; most current `expo lint` warnings trace to it.
