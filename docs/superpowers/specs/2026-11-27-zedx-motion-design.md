# ZEDX — Motion, Breadcrumbs, and Empty States

**Date:** 2026-11-27
**Status:** proposed
**Project:** ZEDX (Expo SDK 58 / React Native 0.88)

## Intent

Make ZEDX feel like a modern, deliberate reading instrument without breaking
"The Manual" design language: paper and ink, rules instead of cards, no
gradients, shadows, or blur. This adds a coherent motion language, compact
location breadcrumbs, and purposeful empty states. It also corrects
`AGENTS.md`, which still pointed at the SDK 54 docs.

## Why now

The app is visually complete, but:

- motion is a single 160 ms fade with no sense of direction;
- deep screens show little location context beyond a Back label;
- empty states are one-line dead ends with no next step.

Ryuu asked for smooth, modern, distinctive motion and questioned whether
breadcrumbs are needed at all.

## Goals

- A small motion system with tokens and reusable primitives.
- Direction-aware page transitions, staggered content reveals, a sliding tab
  indicator, and restrained press/answer feedback.
- A compact breadcrumb "running head" on Intro, Levels, and Topic.
- A reusable empty state that says why it is empty and offers one action.
- Reduced-motion support everywhere.
- Keep fallback A (RN `Animated` timing) cheap: all motion stays behind a few
  component APIs, so screens do not change if the implementation is swapped.

## Non-goals

- No React Navigation refactor; keep the custom state machine in `App.js`.
- No shared-element morphs, page curls, parallax, confetti, or looping motion.
- No gradients, shadows, blur, new palette, or new dependencies.
- No changes to data, progress, quiz scoring, or lesson content.
- No animated theme switch in v1.
- No breadcrumbs on tab roots or focused quiz/assessment flows.

## Constraints

- Expo SDK 58, RN 0.88, React 19.3.
- Reanimated 4.7.1 and react-native-worklets 0.13.0 are already installed.
  Expo's `babel-preset-expo` auto-configures the Worklets plugin (Expo SDK 58
  docs, updated Sep 2026); no `babel.config.js` is needed.
- Reanimated 4 targets the New Architecture, which SDK 58 uses.
- Web is a supported target and must be checked.
- Existing `FadeIn` already respects reduced motion; every new animation must
  do the same via `ReduceMotion.System`.
- There is no UI test suite; verification is lint, content check, and manual
  web/Android passes.

## Approaches considered

**A — Quiet typesetting (RN `Animated` timing).** 180–220 ms fades and 8 px
rises, direction-aware slide, small stagger. Safe, no new dependencies, but it
reads "polished" rather than distinctive.

**B — Editorial springs (Reanimated) — chosen.** Low-bounce springs for spatial
motion, short timings for opacity, and a "typesetting" language: pages set,
lines rise, rules draw, the tab indicator glides. Modern because it is
physical, different because it is typographic.

**C — Full page-turn / shared elements.** Rejected: fragile on web and
Android, and it clashes with the flat print aesthetic.

**Fallback:** if B does not feel right, swap the implementations behind
`PageTransition`, `FadeIn`, `Rule`, `BottomNav`, `Button`, and `OptionRow` to
A's timing curves. Screens and layout stay untouched.

## Motion language — "typesetting"

Principles:

- Motion explains hierarchy: forward travels one way, back the other, tab
  switches crossfade.
- Pages are set, not swiped: a new page enters 14 px in the travel direction
  with a low-bounce spring and a 180 ms fade.
- Content sets line by line: blocks rise 8 px and fade over 180 ms, staggered
  28 ms, capped at five blocks (140 ms maximum).
- Rules draw from the left over 180 ms where `Rule` is used (empty states in
  v1).
- Feedback is physical but quiet: press scale 0.98, answer selection 1.01,
  light haptic on selection (native only).
- No bounce beyond a settle, no looping motion, no motion on frequent
  interactions beyond opacity and scale.

Tokens live in `src/motion.js`:

```js
DURATION = { fast: 140, base: 180, slow: 240 }
SPRING = {
  page:   { damping: 26, stiffness: 300, mass: 0.9 },
  settle: { damping: 22, stiffness: 280, mass: 0.9 },
  press:  { damping: 18, stiffness: 320, mass: 0.7 },
}
STAGGER = 28
MAX_STAGGERED = 5
```

Every config passes `reduceMotion: ReduceMotion.System`.

Components:

- **`PageTransition`** wraps screen content in `App.js`. On route-key change it
  animates `translateX` from ±14 (direction) to 0 with `SPRING.page`, and
  opacity 0 → 1 with `withTiming(DURATION.base)`. Tab switches use no
  translate. The old page unmounts immediately; the incoming page covers the
  paper background. This is incoming-only by design; a frozen outgoing
  snapshot is a possible phase 2 if it feels abrupt.
- **`FadeIn`** is rewritten with Reanimated and keeps its current props
  (`duration`, `delay`, `from: "up" | "none" | "scale"`). Used for content
  blocks and quiz question changes.
- **`Rule`** gains an optional `animate` prop: `scaleX` 0 → 1 from the left
  with `withTiming(DURATION.base)`. v1 uses it only inside `EmptyState`;
  `SectionHead` is not refactored. Section-head rule draws are phase 2.
- **`BottomNav`** renders one absolute indicator and animates `translateX`
  between tabs with `SPRING.settle`; width is 56% of the tab width. Measure
  the bar with `onLayout`. When `active` is null (Intro/Levels/Topic), the
  indicator fades out; when a tab becomes active from null, it is placed at
  the target and fades in, never gliding from a stale position.
- **`OptionRow`** springs to 1.01 on selection and back; calls
  `Haptics.selectionAsync()` on pick (guarded off web). Color and mark changes
  stay immediate.
- **`Button`** adds a press scale of 0.98 with `SPRING.press`; opacity feedback
  stays.
- **Direction tracking** in `App.js`: add `direction` to screen state
  (`"forward" | "back" | "none"`). The navigation handler sets it explicitly;
  it is not inferred from a depth map. Tab switches and theme changes use
  `"none"`.

  | From → To | Direction |
  | --- | --- |
  | Home / Search / Saved → Intro | forward |
  | Home / Search / Saved → Topic | forward |
  | Intro → Levels | forward |
  | Intro → Assessment | forward |
  | Assessment → Levels | forward (flow completion) |
  | Assessment → Intro | back |
  | Levels → Topic | forward |
  | Levels → Quiz | forward |
  | Quizzes → Quiz | forward |
  | Quizzes → Review | forward |
  | Topic → Levels | back |
  | Topic → Home / Search / Saved | back |
  | Quiz → Levels / Quizzes | back |
  | Review → Quizzes | back |
  | Intro / Levels → Home | back |
  | Tab switch (Home / Search / Saved / Quizzes) | none |
  | Theme toggle / same-route refresh | none |

## Breadcrumbs

Decision: add a compact running head, not a full trail. NN/g's mobile guidance
(last reviewed Sep 2026) says breadcrumbs must not wrap, must keep 44 dp
targets, and can be shortened to the last level(s). ZEDX is three levels deep,
so the minimal version earns its space.

`Breadcrumbs` component:

- Props: `items: [{ label, onPress? }]`, `style`.
- One line only: `numberOfLines={1}`, `flexShrink`, 10 px mono uppercase
  (`TYPO.label`), slash separators.
- Ancestors are muted; the last segment is ink. Any segment with an `onPress`
  is tappable (`accessibilityRole="link"`, 44 dp target via `minHeight` plus
  `hitSlop`); a segment without one is plain text. The page title below is the
  current page, so it is never repeated in the trail.
- Placement: directly below `TopBar`, above the scroll view, on Intro, Levels,
  and Topic. Horizontal padding 24, vertical padding 10. No extra rule, since
  `TopBar` already draws one.
- Trails:
  - Intro: `HOME / PYTHON` — HOME tappable; PYTHON is the page, plain.
  - Levels: `HOME / PYTHON` — HOME tappable; PYTHON is the page, plain.
  - Topic: `HOME / PYTHON / LEVEL 2` — all three tappable; the topic title
    below is the page, and LEVEL 2 is the immediate section.
- Taps: HOME → home tab; PYTHON → intro; LEVEL 2 → levels.
- Not on Home, Search, Saved, Quizzes, Quiz, Assessment, or Review.
- Long labels: current label ellipsizes; ancestors keep natural width; never
  wrap.

## Empty states

`EmptyState` component:

- Props: `eyebrow`, `title`, `body`, `actionLabel`, `onAction`, `style`.
- Layout: centered, max width 320, vertical padding 40. A 28 px accent rule
  (animated draw), eyebrow in accent, title in `TYPO.h2`, body in `TYPO.small`,
  and one outline `Button` action.
- Entrance: `FadeIn` 8 px rise plus rule draw; respects reduced motion.
- Copy rules: say why it is empty, what to do next, one action; never "No
  data", never exclamation marks.

Screens:

- **Saved:** "Nothing marked yet" / "Tap Save on any topic and it will wait for
  you here." / "Browse topics" → Home. Needs an `onBrowse` prop from `App.js`.
- **Search, no results:** "Nothing matches “{query}”" / "Try a shorter word, or
  search by language." / "Clear search" → `onQueryChange("")`. The no-query
  hint stays a single quiet line, because the input is the action.
- **Quiz unavailable:** defensive-only — no current route reaches it, because
  Levels and Quizzes only list levels that have a quiz. Keep it unreachable;
  restyle with `EmptyState` and a generic "Go back" action.
- **Topic missing:** defensive-only — `goTopic` returns silently on a failed
  lookup, and Saved drops unresolved bookmarks. Keep it unreachable; restyle
  with `EmptyState` and a generic "Go back" action.
- Saved and Levels load errors keep their existing retry states; they only
  adopt `EmptyState` spacing if it is trivial.

## File plan

New:

- `src/motion.js`
- `src/components/PageTransition.js`
- `src/components/Breadcrumbs.js`
- `src/components/EmptyState.js`

Changed:

- `App.js`
- `src/components/FadeIn.js`
- `src/components/BottomNav.js`
- `src/components/Rule.js`
- `src/components/Button.js`
- `src/components/OptionRow.js`
- `src/screens/IntroScreen.js`
- `src/screens/LevelsScreen.js`
- `src/screens/TopicScreen.js`
- `src/screens/SavedScreen.js`
- `src/screens/SearchScreen.js`
- `src/screens/QuizScreen.js`
- `AGENTS.md` (already corrected to v58.0.0)

No new packages.

## Verification

- `npm run lint`
- `npm run check:content`
- `npm run web`: forward/back/tab transitions, breadcrumb taps, empty states,
  reduced motion (browser setting), no console warnings.
- Android device/emulator if available: same, plus haptics.
- Confirm no layout shift on first paint and no stuck animations after rapid
  navigation.

## Left to the builder

- Tune the spring values on a real device; keep them central in `src/motion.js`.
- Decide whether the Button press scale ships in v1 (small, recommended).
- Animated theme switch is deferred.
