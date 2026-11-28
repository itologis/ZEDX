# ZEDX Curriculum Expansion

## Goal
Expand the seven existing language tracks from the original 108-topic catalog, especially concepts learners meet in senior-high-school programming and database courses. Preserve the app's existing lesson model: three lessons per topic, a worked example, a wrong-code comparison, one practice exercise, and level quizzes that test the added material.

## Research basis and scope
- DepEd's 2026 Strengthened SHS Computer Programming (Java) guide includes algorithms, flowcharts, pseudocode, operators, Scanner/PrintStream I/O, sorting algorithms, collections, file operations, Swing GUI work, layout managers, and event handling.
- DepEd's 2026 Strengthened SHS Computer Programming (.NET Technology) guide includes HTML, CSS, responsive web layouts, JavaScript operators, events, DOM nodes, and web application work.
- DepEd's 2026 Strengthened SHS Computer Programming (Oracle Database) guide includes DBMS concepts, data models, entities/attributes/relationships, schema design and normalization, SQL functions, DISTINCT, joins, subqueries, DML, constraints, set operators, privileges, PL/SQL, CRUD integration, and stored procedures.
- TESDA's Programming (Java) NC III standard additionally documents OO analysis/design, UML, JDBC database applications, and performance considerations.

The strengthened SHS rollout is phased. DepEd states that Grade 12 learners in non-pilot schools continue the existing SHS curriculum in SY 2026–2027. This map is therefore a broad learning reference, not a claim that every school uses the same syllabus.

## Implemented additions

### HTML (8)
**Intermediate**
- Form Controls, Validation & Constraint Attributes
- Frames, Iframes & Embedded Content
- Native Interactive Elements
- Custom Data Attributes

**Advanced**
- Script Loading & Module Scripts
- Template Elements & DOM Cloning
- Web Components & Shadow DOM
- HTML Resource Security Attributes

### CSS (8)
**Beginner after prerequisite promotion**
- Display Modes & Normal Flow

**Intermediate**
- Float & Clear
- Gradients & Opacity
- Borders, Outlines & Shadows

**Advanced**
- CSS Math Functions
- Transforms & Transform Origin
- Keyframe Animations
- Cascade Layers & Feature Queries

### Java (10)
**Beginner after prerequisite promotion**
- Algorithms, Flowcharts & Pseudocode
- Operators & Expressions
- Console Input & Output

**Intermediate**
- Sorting & Searching Algorithms

**Advanced**
- Java Collections Framework
- File I/O
- Swing GUI Development & Event Handling
- OO Analysis & UML Modeling
- JDBC Database Connectivity
- Advanced Concurrency Utilities

### Python (8)
**Beginner after prerequisite promotion**
- Operators & Expressions
- Input & Output
- String Methods & Text Processing

**Intermediate**
- Classes & Objects

**Advanced**
- Modules & Packages
- Virtual Environments & Package Management
- Type Hints & Static Checking
- Testing & Debugging

### JavaScript (8)
**Beginner after prerequisite promotion**
- Operators & Expressions

**Intermediate**
- String Methods & Template Literals
- DOM Manipulation
- Events & Event Delegation

**Advanced**
- JSON Serialization
- Browser Storage APIs
- Event Loop & Microtasks
- Web Workers & WebSockets

### PHP (8)
**Beginner after prerequisite promotion**
- Operators & Expressions

**Intermediate**
- Constants & Scope
- Cookies & HTTP Headers
- JSON Encoding & Decoding

**Advanced**
- Filesystem Operations & Uploads
- Namespaces & Composer
- REST API Endpoints
- Authentication & Password Hashing

### SQL (8)
**Intermediate**
- Database Design, ERDs & Normalization
- DISTINCT & Set Operations
- Single-Row & Date Functions
- CASE Expressions

**Advanced**
- ALTER TABLE & Constraints
- DCL: Users, Roles & Privileges
- PL/SQL Blocks, Variables & Control Flow
- Cursors, Procedures, Functions & Triggers

## Quality gates
- Every new topic ID is unique and resolves in the language catalog.
- Every new topic has three lesson chapters, worked examples, and wrong-code comparisons. The identified review defects in examples, prompts, answers, and explanations were corrected. Structural coverage checks verify presence and registration, while independent subject-matter review remains valuable for future maintenance.
- Every new topic has one practice exercise.
- Every Beginner topic has a topic-tagged L1 question; every Intermediate topic has topic-tagged L2 coverage. Each L2 pool contains eight questions per language, and passing scores use the two-thirds rule.
- Run `npm run check:content`, `npm run check:answers`, lint, and `git diff --check` before review.
- Keep this work on `feat/curriculum-expansion`; do not push or merge until the user reviews the changes.


## Final implementation status

The expansion adds 58 topics across the seven tracks. The final catalog contains **166 topics, 498 lesson chapters, and 166 practice exercises**.

The final level distribution is:
- Beginner: 58 topics.
- Intermediate: 42 topics.
- Advanced: 66 topics.

Twenty-three existing or newly added foundational topics were promoted into Beginner, retaining their original topic IDs. The final order is documented in docs/beginner-readiness-map.md.

All 58 Beginner topics now have three guided lesson entries each, for **174 guided lesson entries**. Each language has one self-directed capstone brief in the final Beginner lesson. Capstones show a task, deliverable, acceptance criteria, and a self-check; they are not automatically graded or tracked as completed.

The shared quiz registry is the sole quiz source. Beginner and Intermediate questions carry topic IDs so coverage can be checked against the catalog. Intermediate pools contain eight questions per language. Quiz pools and scored placement results are versioned.

Saved progress migration:
- Moves the 23 promoted topic IDs from L2 completion buckets to L1.
- Preserves unrelated completion IDs, bookmarks, practice records, and last-topic references.
- Re-keys missed questions only when the exact question still exists, and drops obsolete questions.
- Runs before normal progress reads, is idempotent, and does not mark a migration complete after a failed storage read or write.
- Invalidates outdated quiz passes and scored placement results while preserving intentional assessment skips.

The obsolete inline quiz objects were removed from language catalogs. src/data/quiz.js is the single registry used by quiz and assessment screens.

Validation completed successfully:
- npm run lint
- npm run check:content
- npm run check:answers (8/8)
- npm run check:migration
- JavaScript syntax checks for data and test files
- git diff --check

The changes remain uncommitted on feat/curriculum-expansion. Nothing has been pushed or merged.

## Beginner readiness follow-up

The readiness map has been implemented. It records the exact Beginner sequence and remaining level boundaries, including why CSS combinators and PHP form/request handling remain Intermediate. It also records the quiz, capstone, and saved-data migration decisions.

See docs/beginner-readiness-map.md for the detailed topic order, teaching outcomes, question-pool policy, and migration behavior.
