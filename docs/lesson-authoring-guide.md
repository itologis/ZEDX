# Lesson authoring standard

ZEDX is a learning app, not a glossary. A lesson is only useful when a learner can explain an idea, predict what code will do, and use the idea in a small task.

## Required lesson flow

1. **Learning goal** — a concrete action the learner should be able to perform by the end. Avoid goals such as “understand variables.” Prefer “create a variable, update it, and predict the value it holds.”
2. **Plain-language explanation** — define the concept, explain why it exists, and distinguish it from nearby concepts. Introduce jargon only after explaining it.
3. **Worked example** — use a small, realistic example. Walk through at least two meaningful steps. Each step explains what the code means and what changes when it runs or is interpreted.
4. **Visible result** — state the output, rendered effect, returned value, or shape of the result. Do not make learners guess what a snippet does unless the lesson is explicitly asking them to predict it.
5. **Common mistake** — show a plausible mistake and explain the cause, not just that the code is wrong.
6. **Retrieval check** — ask the learner to predict, choose, or diagnose something. Give a clear explanation after an answer. Wrong answers should teach, not merely say “try again.”
7. **Application** — end the topic with a short task that asks the learner to change or create something, rather than only recall a keyword.

## Content rules

- Write for someone who has never seen the term before. A short definition is not a lesson.
- Explain the *reason* behind syntax and the *effect* it has.
- Keep examples small enough to read on a phone. Show one new idea at a time.
- Use one consistent example domain across a topic where possible, so the learner can focus on the programming concept rather than new story details.
- Include inputs and outputs for executable examples. For markup and styles, describe the visible or structural result.
- Make distractors plausible and diagnose the misconception behind them.
- State the language or database dialect when behaviour differs. SQL examples in ZEDX should be validated against SQLite unless a lesson explicitly says otherwise.
- Check snippets for copy/paste validity. Prefer current official documentation when a language version or browser behaviour matters.
- Keep animation supportive. A motion should communicate hierarchy, direction, selection, or feedback, not delay reading.

## Current rollout

The first topic in each of the seven language tracks is the initial guided-content pilot. Those 21 lessons use the structured `goal`, `body`, `walkthrough`, and `check` fields in `src/data/lessonGuides.js`. The content coverage script enforces that structure for the pilot. Remaining topics still need to be rewritten to this standard; do not mark a topic as fully upgraded until its lessons have guided examples and checks too.
