# ZEDX Motion, Breadcrumbs, and Empty States Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a spring-based "typesetting" motion language, compact breadcrumbs, and purposeful empty states to ZEDX without changing its paper-and-ink design.

**Architecture:** Reanimated 4.7.1 drives a small set of primitives (`PageTransition`, `FadeIn`, `Rule`, `BottomNav`, `Button`, `OptionRow`) configured from central tokens in `src/motion.js`. `App.js` sets the transition direction explicitly on every navigation. Breadcrumbs and empty states are new presentational components wired into existing screens.

**Tech Stack:** Expo SDK 58, React Native 0.88, React 19.3, Reanimated 4.7.1, react-native-worklets 0.13.0, expo-haptics.

**Spec:** `docs/superpowers/specs/2026-11-27-zedx-motion-design.md`

## Global Constraints

- Expo SDK 58 / RN 0.88 / React 19.3; do not add packages.
- Reanimated 4.7.1 and react-native-worklets 0.13.0 are already installed. `babel-preset-expo` auto-configures the Worklets plugin; do not add `babel.config.js`.
- Every animation passes `reduceMotion: ReduceMotion.System`.
- No gradients, shadows, blur, or palette changes.
- No React Navigation refactor; keep the `App.js` state navigation.
- No changes to data, progress, quiz scoring, or lesson content.
- Breadcrumbs only on Intro, Levels, and Topic.
- Empty-state copy: why it is empty, one next step, one action. No "No data", no exclamation marks.
- Animate transform and opacity only, except the `Rule` scaleX draw.
- `AGENTS.md` already points at `https://docs.expo.dev/versions/v58.0.0/`; no task needed.

## Before You Start

Commit the spec, this plan, and the `AGENTS.md` correction so the design travels
with the work:

```bash
git add AGENTS.md docs/superpowers/specs/2026-11-27-zedx-motion-design.md docs/superpowers/plans/2026-11-27-zedx-motion-breadcrumbs-empty-states.md
git commit -m "docs: add ZEDX motion design and implementation plan"
```

## Review Focus

1. **Rapid navigation while a spring is running** — no stuck or overlapping transitions; the newest screen wins and the final position is always 0.
2. **Reduced Motion enabled** — no translate or scale; content is visible immediately.
3. **Web** — Reanimated transforms and `scaleX` rules render; haptics are skipped without warnings.
4. **Small screens and long language names** — breadcrumbs stay on one line and tappable segments keep 44 dp targets.
5. **Loading versus empty** — Saved, Search, and Quizzes never flash an empty state before their async read resolves.

---

### Task 1: Motion tokens and Reanimated FadeIn

**Files:**
- Create: `src/motion.js`
- Modify: `src/components/FadeIn.js`

**Interfaces:**
- Produces: `DURATION = { fast: 140, base: 180, slow: 240 }`
- Produces: `SPRING = { page: { damping: 26, stiffness: 300, mass: 0.9 }, settle: { damping: 22, stiffness: 280, mass: 0.9 }, press: { damping: 18, stiffness: 320, mass: 0.7 } }`
- Produces: `STAGGER = 28`, `MAX_STAGGERED = 5`
- Produces: `FadeIn({ children, style, duration = DURATION.base, delay = 0, from = "up" })` — same props as today.

- [x] **Step 1: Create `src/motion.js`**

```js
export const DURATION = { fast: 140, base: 180, slow: 240 };

export const SPRING = {
  page: { damping: 26, stiffness: 300, mass: 0.9 },
  settle: { damping: 22, stiffness: 280, mass: 0.9 },
  press: { damping: 18, stiffness: 320, mass: 0.7 },
};

export const STAGGER = 28;
export const MAX_STAGGERED = 5;
```

- [x] **Step 2: Rewrite `FadeIn.js` with Reanimated**

Keep the same public props. Use `useSharedValue` for opacity, translateY, and scale; `useAnimatedStyle` returns `opacity` plus a `transform` array. On mount, animate with `withTiming`:

- `from === "up"` starts `translateY` at `8`, otherwise `0`.
- `from === "scale"` starts `scale` at `0.98`, otherwise `1`.
- Opacity always starts at `0` and animates to `1`.
- Config: `{ duration, delay, easing: Easing.out(Easing.cubic), reduceMotion: ReduceMotion.System }`.
- Remove the `AccessibilityInfo` listener and the `reduceMotion === null` early return; `ReduceMotion.System` handles the preference.
- Render `Animated.View` with `style={[style, animatedStyle]}`.

- [x] **Step 3: Run lint**

Run: `npm run lint`
Expected: no new errors; existing `render_test.js` warnings are acceptable.

- [ ] **Step 4: Verify on web**

Run: `npm run web`
Expected: Home content still fades up; quiz question changes still fade; with browser Reduced Motion enabled, content appears immediately with no movement.

- [x] **Step 5: Commit**

```bash
git add src/motion.js src/components/FadeIn.js
git commit -m "feat: add motion tokens and Reanimated fade-in"
```

---

### Task 2: PageTransition and direction tracking

**Files:**
- Create: `src/components/PageTransition.js`
- Modify: `App.js`

**Interfaces:**
- Produces: `PageTransition({ direction = "none", children, style })` where `direction` is `"forward" | "back" | "none"`.
- `App.js` adds `const [direction, setDirection] = useState("none")` and:

```js
const navigate = useCallback((next, dir = "none") => {
  setDirection(dir);
  setScreen(next);
}, []);
```

- All existing screen handlers gain a trailing `dir` argument with the defaults below.

- [x] **Step 1: Create `PageTransition.js`**

- Initial `translateX`: `14` for `"forward"`, `-14` for `"back"`, `0` for `"none"`.
- Animate `translateX` to `0` with `withSpring(0, { ...SPRING.page, reduceMotion: ReduceMotion.System })`.
- Animate opacity from `0` to `1` with `withTiming(1, { duration: DURATION.base, easing: Easing.out(Easing.cubic), reduceMotion: ReduceMotion.System })`.
- Return `Animated.View` with `style={[styles.fill, style, animatedStyle]}` and `styles.fill = { flex: 1 }`.

- [x] **Step 2: Add direction state and `navigate` in `App.js`**

Replace direct `setScreen` calls in the navigation handlers with `navigate(...)` and these directions:

| Handler | Direction |
| --- | --- |
| `handleNavigate(tab, dir = "none")` | passed through; BottomNav passes only the tab |
| `goQuizzes(dir = "none")` | passed through |
| `goIntro(languageKey, dir = "forward")` | passed through |
| `goLevels(languageKey, dir = "forward")` | passed through |
| `goAssessment(languageKey, dir = "forward")` | passed through |
| `goTopic(...)` | always `"forward"` |
| `closeTopic()` | `"back"` to Levels or to `screen.from` |
| `goQuiz(...)` | always `"forward"` |
| `goReview()` | always `"forward"` |
| `handleStartLearning()` | `"forward"` to Levels or Assessment |

Update the callers:

- `IntroScreen` `onBack`: `handleNavigate("home", "back")`
- `LevelsScreen` `onBack`: `goIntro(language.key, "back")`
- `AssessmentScreen` `onBack`: `goIntro(language.key, "back")`
- `AssessmentScreen` `onComplete`: `goLevels(language.key, "forward")`
- `QuizScreen` `onBack`: `screen.from === "quizzes" ? goQuizzes("back") : goLevels(language.key, "back")`
- `QuizScreen` review `onBack`: `goQuizzes("back")`
- `SavedScreen` `onBrowse`: `handleNavigate("home")` (tab switch, `"none"`)

- [x] **Step 3: Replace the keyed `FadeIn` shell**

In `App.js`, replace:

```jsx
<FadeIn key={screenTransitionKey} style={styles.content} duration={160} from="none">
  {content}
</FadeIn>
```

with:

```jsx
<PageTransition key={screenTransitionKey} direction={direction} style={styles.content}>
  {content}
</PageTransition>
```

Keep the `FadeIn` import for the bottom navigation wrapper.

- [x] **Step 4: Run lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 5: Verify on web**

Run: `npm run web`
Expected: Home → Intro slides forward; Back slides back; tab switches crossfade; Search → Topic slides forward; Topic → Levels slides back; Quizzes → Quiz slides forward; Review → Quizzes slides back. Rapidly tap Back and forward links: the newest screen settles at `translateX: 0`, with no stuck offset.

- [x] **Step 6: Commit**

```bash
git add src/components/PageTransition.js App.js
git commit -m "feat: add direction-aware page transitions"
```

---

### Task 3: Breadcrumbs

**Files:**
- Create: `src/components/Breadcrumbs.js`
- Modify: `src/screens/IntroScreen.js`, `src/screens/LevelsScreen.js`, `src/screens/TopicScreen.js`, `App.js`

**Interfaces:**
- Produces: `Breadcrumbs({ items, style })` where `items` is `[{ label: string, onPress?: () => void }]`.
- `IntroScreen` gains `onHome`.
- `LevelsScreen` gains `onHome`.
- `TopicScreen` gains `onHome`, `onIntro`, `onLevels`.

- [x] **Step 1: Create `Breadcrumbs.js`**

- Row: `flexDirection: "row"`, `alignItems: "center"`, `paddingHorizontal: 24`, `paddingVertical: 10`, `minHeight: 44`, `overflow: "hidden"`.
- Each item: a `TouchableOpacity` when `onPress` exists, otherwise a plain `Text`. Tappable items use `accessibilityRole="link"`, `minHeight: 44`, `justifyContent: "center"`, and `hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}`.
- Text: `TYPO.label`, `numberOfLines={1}`, `ellipsizeMode="tail"`. Ancestors use `colors.muted`; the last item uses `colors.ink`.
- Separator: a `Text` containing `/`, `TYPO.label`, `colors.ruleStrong`, `marginHorizontal: 8`.
- Do not add a bottom border; `TopBar` already draws the rule.

- [x] **Step 2: Wire `IntroScreen`**

Add `onHome` to the props. Immediately after `<TopBar ... />`, render:

```jsx
<Breadcrumbs
  items={[
    { label: "Home", onPress: onHome },
    { label: languageLabel },
  ]}
/>
```

- [x] **Step 3: Wire `LevelsScreen`**

Add `onHome` to the props. Immediately after `<TopBar ... />`, render:

```jsx
<Breadcrumbs
  items={[
    { label: "Home", onPress: onHome },
    { label: languageName },
  ]}
/>
```

- [x] **Step 4: Wire `TopicScreen`**

Add `onHome`, `onIntro`, and `onLevels` to the props. Immediately after the main `<TopBar ... />` (the one with Save), render:

```jsx
<Breadcrumbs
  items={[
    { label: "Home", onPress: onHome },
    { label: languageLabel || language?.label || languageKey, onPress: onIntro },
    { label: placement?.levelLabel || "Level", onPress: onLevels },
  ]}
/>
```

The topic title below is the current page, so it is not repeated.

- [x] **Step 5: Pass the callbacks from `App.js`**

- Intro: `onHome={() => handleNavigate("home", "back")}`
- Levels: `onHome={() => handleNavigate("home", "back")}`
- Topic: `onHome={() => handleNavigate("home", "back")}`, `onIntro={() => goIntro(language.key, "back")}`, `onLevels={() => goLevels(language.key, "back")}`

- [x] **Step 6: Run lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 7: Verify on web**

Run: `npm run web`
Expected: Intro shows `HOME / PYTHON`; Levels shows `HOME / PYTHON`; Topic shows `HOME / PYTHON / LEVEL 2`. The trail never wraps. HOME goes Home, PYTHON goes Intro, LEVEL 2 goes Levels, each with the back transition. Long names such as JavaScript still fit on one line and ellipsize if needed.

- [x] **Step 8: Commit**

```bash
git add src/components/Breadcrumbs.js src/screens/IntroScreen.js src/screens/LevelsScreen.js src/screens/TopicScreen.js App.js
git commit -m "feat: add compact breadcrumb running head"
```

---

### Task 4: BottomNav indicator

**Files:**
- Modify: `src/components/BottomNav.js`

**Interfaces:**
- Same props: `{ active, onNavigate }`.

- [x] **Step 1: Replace the per-tab indicator**

- Keep the four `TouchableOpacity` items and remove the indicator `View` from inside the active item.
- Add `const [barWidth, setBarWidth] = useState(0)` and attach `onLayout` to the bar.
- Compute `const activeIndex = TABS.findIndex((tab) => tab.key === active)`.
- Shared values: `translateX`, `opacity`.
- `useEffect` on `activeIndex` and `barWidth`:
  - If `activeIndex < 0`, animate `opacity` to `0` with `withTiming(DURATION.fast)`.
  - If the previous active was null (or this is the first render), set `translateX` to the target without animation and fade `opacity` to `1`.
  - Otherwise animate `translateX` to the target with `withSpring(..., SPRING.settle)`.
  - Every config includes `reduceMotion: ReduceMotion.System`.
- Render one absolute `Animated.View`:
  - `top: 0`, `height: 2`, `backgroundColor: colors.accent`, `pointerEvents: "none"`.
  - Width: `(barWidth / TABS.length) * 0.56`.
  - Target X: `activeIndex * (barWidth / TABS.length) + (barWidth / TABS.length) * 0.22`.
  - Hide it while `barWidth === 0`.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 3: Verify on web**

Run: `npm run web`
Expected: switching tabs glides the accent mark; Intro/Levels/Topic hide it; returning to a tab shows it at the target without sliding from a stale position.

- [x] **Step 4: Commit**

```bash
git add src/components/BottomNav.js
git commit -m "feat: animate the bottom tab indicator"
```

---

### Task 5: EmptyState and screens

**Files:**
- Create: `src/components/EmptyState.js`
- Modify: `src/screens/SavedScreen.js`, `src/screens/SearchScreen.js`, `src/screens/QuizScreen.js`, `src/screens/TopicScreen.js`, `App.js`

**Interfaces:**
- Produces: `EmptyState({ eyebrow, title, body, actionLabel, onAction, style })`.
- `SavedScreen` gains `onBrowse`; `App.js` passes `onBrowse={() => handleNavigate("home")}`.

- [x] **Step 1: Create `EmptyState.js`**

- Outer `View`: `alignItems: "center"`, `paddingVertical: 40`, `paddingHorizontal: 24`, plus `style`.
- Inner `View`: `maxWidth: 320`, `alignItems: "center"`.
- Wrap in `FadeIn from="up" duration={DURATION.base}`.
- A `Rule` with `animate` and `style={{ width: 28, marginBottom: 16 }}`.
- Eyebrow: `TYPO.label`, `colors.accent`.
- Title: `TYPO.h2`, `colors.ink`, `textAlign: "center"`, `marginTop: 8`.
- Body: `TYPO.small`, `colors.body`, `textAlign: "center"`, `marginTop: 8`.
- Action: `Button variant="secondary"` with `onPress={onAction}` and `marginTop: 20`, rendered only when `actionLabel` and `onAction` exist.

- [x] **Step 2: Update `Rule` for the animated draw**

Add an optional `animate = false` prop. When true, render an `Animated.View` with `useSharedValue(0)`, animate `scaleX` to `1` with `withTiming(1, { duration: DURATION.base, easing: Easing.out(Easing.cubic), reduceMotion: ReduceMotion.System })`, and set `transformOrigin: "left"` plus `transform: [{ scaleX }]`. When false, keep the current plain `View`.

- [x] **Step 3: Saved empty state**

Replace the existing empty `<Text>` with:

```jsx
<EmptyState
  eyebrow="Saved"
  title="Nothing marked yet"
  body="Tap Save on any topic and it will wait for you here."
  actionLabel="Browse topics"
  onAction={onBrowse}
/>
```

Add `onBrowse` to the component props.

- [x] **Step 4: Search no-results state**

Replace the no-results `<Text>` with:

```jsx
<EmptyState
  eyebrow="Search"
  title={`Nothing matches “${query}”`}
  body="Try a shorter word, or search by language."
  actionLabel="Clear search"
  onAction={() => onQueryChange("")}
/>
```

Keep the no-query hint as the existing single quiet line.

- [x] **Step 5: Quiz unavailable and Topic missing**

Both branches are defensive-only; keep them unreachable. Replace their content with:

```jsx
<EmptyState
  eyebrow="Quiz"
  title="No quiz here yet"
  body="This level's questions are still being written."
  actionLabel="Go back"
  onAction={onBack}
/>
```

```jsx
<EmptyState
  eyebrow="Topic"
  title="This page is missing"
  body="The topic you followed is no longer in the index."
  actionLabel="Go back"
  onAction={onBack}
/>
```

- [x] **Step 6: Pass `onBrowse` from `App.js`**

```jsx
<SavedScreen
  onOpenTopic={...}
  onBrowse={() => handleNavigate("home")}
/>
```

- [x] **Step 7: Run lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 8: Verify on web**

Run: `npm run web`
Expected: Saved with no bookmarks shows the new state and Browse topics goes Home; Search with a nonsense query shows the state and Clear search empties the input; neither flashes empty before loading completes.

- [x] **Step 9: Commit**

```bash
git add src/components/EmptyState.js src/components/Rule.js src/screens/SavedScreen.js src/screens/SearchScreen.js src/screens/QuizScreen.js src/screens/TopicScreen.js App.js
git commit -m "feat: add purposeful empty states"
```

---

### Task 6: Press and answer feedback

**Files:**
- Modify: `src/components/Button.js`
- Modify: `src/components/OptionRow.js`

**Interfaces:**
- Same props on both components.

- [x] **Step 1: Button press scale**

Replace `TouchableOpacity` with `Pressable` and wrap its content in an `Animated.View`, or use `Animated.createAnimatedComponent(Pressable)`. Keep the existing style array, `disabled` handling, `accessibilityRole="button"`, and `accessibilityState`. Add a shared `scale` value:

- `onPressIn`: `withSpring(0.98, { ...SPRING.press, reduceMotion: ReduceMotion.System })`
- `onPressOut`: `withSpring(1, { ...SPRING.press, reduceMotion: ReduceMotion.System })`
- Apply `transform: [{ scale }]` to the animated view.
- Remove `activeOpacity` (Pressable does not use it); keep the visual style otherwise unchanged.

- [x] **Step 2: OptionRow selection spring and haptic**

Use the same `Pressable` + `Animated.View` pattern with a `1.01` press scale. In `onPress`, call:

```js
if (Platform.OS !== "web") {
  Haptics.selectionAsync().catch(() => {});
}
onPress?.();
```

Keep the existing `state` color/mark logic and accessibility props.

- [x] **Step 3: Run lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 4: Verify on web and Android**

Run: `npm run web` and, if available, `npm run android`
Expected: buttons scale gently; quiz options scale and show the correct/wrong marks; Android gives a light selection haptic; web logs no haptics warning.

- [x] **Step 5: Commit**

```bash
git add src/components/Button.js src/components/OptionRow.js
git commit -m "feat: add quiet press and answer feedback"
```

---

### Task 7: Final verification and documentation

**Files:**
- Modify: `README.md` (Design section)

- [x] **Step 1: Run the full checks**

Run: `npm run lint && npm run check:content`
Expected: lint has no new errors; content coverage passes.

- [ ] **Step 2: Run the web smoke test**

Run: `npm run web`
Expected: every route works; forward/back directions match the table; tab indicator glides; breadcrumbs navigate; empty states show and clear; Reduced Motion disables movement; rapid navigation never leaves a stuck transform.

- [x] **Step 3: Update the README Design section**

Add one sentence after the existing design paragraph:

> Motion is spring-based and typographic: pages set, lines rise, rules draw. A compact running head on Intro, Levels, and Topic keeps the hierarchy visible.

- [x] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: describe the motion and breadcrumb language"
```

---

## Self-Review

- **Spec coverage:** motion tokens, `PageTransition`, `FadeIn`, `Rule`, `BottomNav`, `Button`, `OptionRow`, direction table, breadcrumbs, empty states, and verification are each covered by a task.
- **Step scan:** every step names one file and one checkable action; no "handle edge cases" or TBD.
- **Type consistency:** `PageTransition` takes `direction`; `Breadcrumbs` takes `items`; `EmptyState` takes `eyebrow`, `title`, `body`, `actionLabel`, `onAction`; all match the wiring steps.
- **Review Focus:** rapid navigation is checked in Task 2; Reduced Motion in Tasks 1 and 7; web/haptics in Tasks 4 and 6; breadcrumb fit in Task 3; loading-vs-empty in Task 5.
- **Proportion:** the plan names interfaces and exact values; component bodies are left to the implementer.
