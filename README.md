# ZEDX

A mobile app for learning programming syntax in short sessions.

ZEDX covers **seven languages** — HTML, CSS, Java, Python, JavaScript, PHP, and SQL. Each language has three levels (L1–L3), and each level has topics you can read, practice, and take a quiz on. All the content is bundled in the app, so it works offline.

Built with Expo (SDK 58) and React Native. Runs on Android, iOS, and web.

## What's inside

- **166 topics** across the seven languages: 58 Beginner, 42 Intermediate, and 66 Advanced.
- **Lessons** — every topic has three lesson chapters with explanations, working examples, and wrong-code comparisons. All 58 Beginner topics include guided goals, plain-language explanations, worked walkthroughs, and comprehension checks. Each language also has a self-directed Beginner capstone.
- **Practice** — one fill-in-the-blank exercise per topic, with an explanation.
- **Quizzes** — per language and per level, with topic-tagged Beginner and Intermediate coverage, four options per question, and a two-thirds passing threshold.
- **Initial assessment** — a starting test to see where a student is.
- **Progress** — lesson completion, practice, quiz passes, bookmarks, and missed questions are saved on the device. Curriculum migrations preserve completed topic IDs when topics change levels.
- **Saved topics** and **search** — so any lesson is one tap away.
- **Offline** — no internet needed, nothing leaves the phone.

## Screens

Home · Intro · Levels · Topic · Quiz · Quizzes · Assessment · Search · Saved

The bottom tabs stay visible on browse screens (Home, Intro, Levels, Topic). The assessment and quiz hide the tabs and confirm before you leave, since they're focused flows.

## How to run

```bash
npm install
npm start          # Expo dev server
npm run android    # or: npm run ios / npm run web
```

## Project layout

- `App.js` — app shell, navigation, and the Home dev-tools panel (`SHOW_DEV_TOOLS`).
- `src/screens/` — one file per screen.
- `src/components/` — shared UI pieces: `TopBar`, `Screen`, `BottomNav`, `FadeIn`, `SectionHead`, `FieldLabel`, `Rule`, `CodePlate`, `OptionRow`, `Button`, `PressableScale`, `IndexRow`, `ContinueStrip`, `ThemeToggle`.
- `src/theme.js` — light and dark palettes, IBM Plex type scale, spacing, and the 7px language swatches. The chosen theme is saved with AsyncStorage (`zedx_theme`).
- `src/data/<language>.js` — the topics for each language. Every language has three levels, and every level has topics with an `id`, `title`, `syntax`, and `description`.
- `src/data/lessons/<language>.js` — the chapter content for each topic, keyed by topic id. Every chapter has three steps (`title`, `body`, `example`, `wrong`, `gotcha`).
- `src/data/lessonGuides*.js` — guided teaching notes for Beginner lessons: learning goals, explanations, worked walkthroughs, comprehension checks, and capstone briefs.
- `src/data/practice.js` — one fill-in-the-blank exercise per topic, with two wrong options and an explanation.
- `src/data/quiz.js` — the per-language, per-level quizzes and the question pool the assessment draws from.
- `src/data/languages.js` — the list of languages the screens read from. Topics are picked up automatically, so adding a topic needs no screen changes.
- `src/data/progress.js` — progress, quiz versions, assessment versions, and idempotent curriculum migrations stored with AsyncStorage.
- `src/data/curriculum.js` — promoted topic IDs and saved-data version constants.
- `scripts/check-content-coverage.cjs` — the coverage checker behind `npm run check:content`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` / `npm run ios` / `npm run web` | Start on a specific platform |
| `npm run lint` | ESLint via expo lint |
| `npm run check:content` | Check that the content is complete and the progress flows work |
| `npm run check:answers` | Check correct/wrong feedback wiring, retry resets, and assessment answer visibility |
| `npm run check:migration` | Test curriculum progress migration, quiz/assessment versioning, and missed-question re-keying |

## Design

Plain and readable: IBM Plex Sans and Mono, a paper and ink palette with dark as the default, one vermilion accent, and rules instead of cards. No gradients, shadows, or blur. Motion is spring-based and typographic: pages set, lines rise, rules draw. Shared press-scale feedback keeps navigation, topic rows, lesson tabs, and saved-topic actions responsive without stacking extra effects on answer choices or buttons. A compact running head on Intro, Levels, and Topic keeps the hierarchy visible.

## License

ZEDX is distributed under the [MIT License](LICENSE). You may use, modify, and redistribute the project, provided the copyright and license notice is retained in redistributed copies. Third-party libraries, fonts, and assets remain subject to their own licenses.

## Notes

- The project was renamed from **SyntaxLibrary** to **ZEDX** on 2026-11-02 — app name, slug, package name, folder, brand, and the icon, favicon, and splash assets. The `app.json` URL scheme, the Android package, and the EAS `projectId` still use the old identifiers. Changing those affects deep links, the Play identity, and the EAS link, so it's kept as a separate decision.
- `src/data/render_test.js` is an old scratch file that isn't wired to anything — safe to ignore. Most `expo lint` warnings come from it.
