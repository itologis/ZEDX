# ZEDX Beginner Readiness Map

## Design principle

Beginner (L1) is the prerequisite layer for the expanded Intermediate (L2) and Advanced (L3) tracks. Its job is not to contain a fixed number of topics. It must teach and assess the concepts a learner needs before those concepts are used as assumptions in later lessons.

Design backwards:

1. List the concepts used by L2 and L3.
2. Identify the prerequisites needed to understand those concepts.
3. Teach those prerequisites in L1, in a sensible learning order.
4. Check that learners can apply them in a small, independent task.
5. Keep specialized applications and deeper variations in L2/L3.

A topic belongs in L1 when it is a reusable foundation, not merely because it is easy. A concept can stay in L2 when the L1 foundations are sufficient to begin learning it there.

## Shared L1 readiness outcomes

By the end of L1, a learner should be able to:

- Read the language's basic syntax and recognize its file or document structure.
- Work with values, variables, data types, operators, and expressions.
- Accept or identify simple input and produce observable output.
- Make decisions with conditions and repeat work with loops.
- Break a small problem into ordered steps, trace its execution, and explain the expected result.
- Use the basic data structures that later topics depend on.
- Write and call reusable functions or methods where the language uses them.
- Recognize common errors, test simple cases, and correct straightforward mistakes.
- Complete a small task without simply copying a finished example.

## Approved L1 order and promotions

The following is the proposed final Beginner order. Existing topic IDs are deliberately preserved. These are the topics to promote from L2 to L1 before any catalog changes are made.

| Track | Ordered L1 topics | Promotions from L2 |
|---|---|---|
| HTML | h1 Basic Structure → h2 Headings → h3 Paragraphs → h10 Semantic HTML → h9 Div & Span → h4 Links → h5 Images → h6 Lists → h7 Tables → h8 Forms | h6, h7, h8, h9, h10 |
| CSS | c1 Basic Rule Syntax → c2 Selectors → c17 Comments → c4 Colors → c14 Units → c5 Box Model → c18 Display Modes & Normal Flow | c5, c18 |
| Java | j1 Hello World → j2 Variables → j17 Operators & Expressions → j16 Algorithms, Flowcharts & Pseudocode → j18 Console Input & Output → j4 If Statements → j5 Loops → j3 Methods → j10 Arrays | j10, j16, j17, j18 |
| Python | p1 Hello World → p2 Variables → p16 Operators & Expressions → p17 Input & Output → p3 If Statements → p4 Loops → p5 Functions → p6 Lists → p18 String Methods & Text Processing | p6, p16, p17, p18 |
| JavaScript | js1 Hello World → js2 Variables → js3 Data Types → js17 Operators & Expressions → js4 If Statements → js5 Loops → js6 Functions → js8 Arrays → js9 Objects | js6, js8, js9, js17 |
| PHP | php1 Hello World → php2 Variables → php16 Operators & Expressions → php3 If Statements → php4 Loops → php5 Functions → php6 Arrays → php8 String Functions | php6, php8, php16 |
| SQL | sql6 CREATE TABLE → sql4 INSERT → sql1 SELECT → sql2 WHERE → sql3 ORDER BY & LIMIT → sql5 UPDATE & DELETE | sql6 |

This promotes 23 existing topics: HTML 5, CSS 2, Java 4, Python 4, JavaScript 4, PHP 3, and SQL 1. It produces L1 topic counts of 10, 7, 9, 9, 9, 8, and 6 respectively. The counts are a result of prerequisite coverage, not a target.

## Explicit level-boundary decisions

### HTML

Promote lists, tables, forms, generic containers, and semantic elements. These are core document-building skills used throughout web development.

Keep form constraint validation, iframe sandboxing and permissions, advanced native interactive elements, custom data attributes, script loading, templates, Shadow DOM, and resource security in L2/L3. Those topics build on a learner already being able to create and structure a document.

Keep h15 Semantic Structure in L3. It should be treated as a deeper application of h10, focusing on document outline, skip links, landmark naming, and more detailed accessibility decisions rather than repeating the introductory semantic-element overview.

### CSS

Promote the box model and basic display/normal-flow behavior. They explain how ordinary elements occupy space before learners encounter flexbox, grid, positioning, and responsive layouts.

Keep c3 Combinators in L2. L1 c2 teaches element, class, ID, grouped, and basic descendant selectors. c3 develops more precise child and sibling relationships and selector-maintenance trade-offs. The L1 guide should not teach child and sibling combinators as required knowledge.

Keep advanced typography, backgrounds, pseudo-classes/elements, float/clear, gradients, shadows, math functions, transforms, keyframes, cascade layers, and feature queries in L2/L3.

### Java

Promote arrays, algorithmic thinking, operators, and console I/O. These are direct prerequisites for sorting/searching, collections, file work, and most small console programs.

Keep classes/objects, inheritance, interfaces, exceptions, sorting/searching implementations, collections, file handling, GUI programming, UML, JDBC, streams, and concurrency in L2/L3.

### Python

Promote lists, operators, console I/O, and core string methods. These are required to understand common program input, data processing, and later collection/file topics.

Keep dictionaries and tuples in L2, along with file I/O, comprehensions, classes, modules, environments, type checking, testing, decorators, generators, exceptions, and context managers.

### JavaScript

Promote functions, arrays, objects, and operators. L1 covers function declarations and calls, basic array operations, object properties, and ordinary expressions.

Keep arrow functions, deeper array methods, classes, destructuring, spread/rest, promises, async/await, modules, DOM/events, JSON, storage, event loop, workers, and WebSockets in L2/L3.

### PHP

Promote indexed arrays, core string operations, and operators. These foundations support associative arrays and later request-handling work.

Keep php9 Forms ($_GET & $_POST) in L2. It is the first server/web bridge: request methods, superglobals, input validation, and safe output escaping are introduced there. Those concepts are not prerequisites for the other L2 foundations. L1 must, however, prepare learners with arrays, strings, comparisons, and the null-coalescing operator so php9 can build on known language constructs.

Keep associative arrays, forms/request data, include/require, constants/scope, cookies/headers, JSON, filesystem, Composer, APIs, classes, exceptions, PDO, sessions, and authentication in L2/L3.

### SQL

Promote basic CREATE TABLE so learners understand tables, columns, data types, and primary-key vocabulary before database design, joins, and constraints.

Keep deeper ERD/normalization work, multi-table relationships, joins, grouping, set operations, functions, CASE, schema alteration, privileges, transactions, PL/SQL, and stored program units in L2/L3. The Beginner version of CREATE TABLE should stay focused on a small table, sensible basic types, and a primary key. Vendor-specific auto-numbering and more involved foreign-key design should not dominate the introductory lessons.

## Lesson and guided-walkthrough requirements

The existing ZEDX model remains:

- Three lesson chapters per topic.
- Each lesson has a clear goal, plain-language explanation, worked example, and meaningful wrong-code comparison.
- Every topic has one practice exercise.
- Every L1 lesson has a guided walkthrough with at least two or three concrete steps and a retrieval check.

The 23 promoted topics add 69 guided lesson entries to the existing 105. The completed Beginner curriculum now has 174 guided lesson entries across all 58 L1 topics.

The promoted lessons were reviewed and revised for Beginner scope. Keep these boundaries in future edits:
- CSS box model and display lessons should explain basic boxes, normal flow, block/inline/inline-block, and hiding content without requiring advanced layout knowledge.
- Java arrays and Scanner should begin with creation, indexing, basic input, and output; avoid making edge cases the first explanation.
- JavaScript functions and objects should teach declarations/calls, parameters/returns, object literals, and property access; closures, optional chaining, and advanced mutation/copy behavior belong in later levels.
- PHP strings should begin with concatenation and common text operations; multibyte details can be introduced as a caution rather than the main learning objective.
- SQL CREATE TABLE should teach a small, comprehensible table before discussing dialect-specific identity syntax or complex relationships.

## Quiz and placement assessment plan

Quiz questions are stored centrally in src/data/quiz.js. The obsolete inline quiz objects have been removed from language catalogs. The shared registry is the only source used by quiz and assessment screens.

The completed L1/L2 quiz structure follows these rules:

1. Every Beginner topic has at least one L1 question tagged with its topic ID.
2. Questions test the current level's objectives. Basic lists, tables, arrays, operators, input/output, and object fundamentals belong in Beginner; deeper applications stay in Intermediate.
3. Each Intermediate pool contains eight questions, with coverage tags matching its catalog topics.
4. L3 questions remain focused on advanced objectives. In HTML, introductory semantic elements are distinct from the deeper document-outline and accessibility work retained in h15.
5. Passing scores use the two-thirds rule, rounded up. Pool versions are stored alongside pass results so an old pass cannot silently satisfy a changed quiz.

The placement assessment draws from all three level quiz pools and uses each level's passing score to calculate a recommended starting level. Therefore, a changed question pool changes placement results even if the screen itself does not change.

## Beginner capstone mechanism

Each language now has one small, independent, integrative task at the end of L1. The existing practice format is a single-answer exercise and is not enough to represent this task.

One optional capstone brief is attached to the final guided lesson in the last L1 topic for each language. Each brief contains:
- A clear real-world-sized task.
- A deliverable the learner can build or write independently.
- Three to five acceptance criteria covering multiple L1 foundations.
- A self-check prompt rather than an automatically graded answer.

TopicScreen renders each brief as a distinct Beginner Capstone panel. It is self-directed and is not counted as another topic or as a quiz. Do not add completion tracking until there is a clear product need; completing the final Beginner topic remains separate from claiming a capstone is done.

## Progress and migration design

Progress is stored by language and level in progress_<language> objects. Completion is recorded as topic IDs inside L1/L2/L3 arrays.

The versioned, idempotent migration for the 23 promoted IDs is implemented. It moves their IDs from each language's L2 completion array into L1, preserves unrelated IDs, and prevents duplicates.
The migration runs before normal progress reads and saves. Its marker is written only after the transformed progress has been saved successfully. A partially completed migration safely resumes.
Bookmarks, practice-completed IDs, and last-topic records are preserved because they use stable language/topic IDs rather than a level bucket. Last-topic lookup resolves against the current catalog.
Missed-question records are re-keyed only when the exact question text still exists in a current pool; obsolete questions fall out of the review list.
Quiz passes are versioned per language and level. Existing booleans without a matching current version are stale and do not count as a pass. The stored boolean map shape remains compatible with existing UI readers.
Scored placement results are versioned. A result from an older question pool cannot recommend a starting level. A previously skipped assessment remains skipped because it contains no score and defaults the learner to Beginner.
The migration tests cover partial progress, duplicate completion IDs, repeated and concurrent execution, interrupted writes, failed storage reads, bookmarks, practice records, last-topic navigation, missed-question review, and quiz/assessment version changes.

The migration is connected to normal progress reads and was completed before the catalog changes were applied.

## Completed implementation sequence

1. Finalize the readiness map and L1/L2 boundaries.
2. Implement and test versioned progress, quiz-pass, and placement-assessment migration.
3. Add 69 guided lesson entries and seven capstone briefs with a shared display panel.
4. Rebuild topic-tagged L1/L2 quiz pools and rebalance Intermediate to eight questions per language.
5. Move the 23 topics, reorder the remaining Intermediate topics, and revise promoted lessons for Beginner scope.
6. Remove obsolete inline catalog quizzes after confirming all quiz consumers use the central registry.
7. Update README and curriculum documentation to reflect the final structure.
8. Run lint, content coverage, answer-feedback, syntax, migration, quiz-version, and diff checks.

Optional future coverage opportunities identified in the independent review include HTML accessibility/ARIA and responsive images; CSS specificity and cascade; Java string handling and testing; JavaScript error handling and fetch/HTTP; PHP date/time; and SQL NULL semantics and data types. These are possible future additions, not confirmed defects in the current curriculum.

Do not push or merge until the full change set has been reviewed.
