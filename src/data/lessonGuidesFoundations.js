// Guided teaching notes for the second topic in each language's beginner track.
// Each lesson follows: learning goal -> explanation -> worked steps -> retrieval check.

const makeGuide = (goal, body, walkthrough, check) => ({
  goal,
  body,
  walkthrough,
  check,
});

export const FOUNDATION_LESSON_GUIDES = {
  html: {
    h2: [
      makeGuide(
        "Use heading levels to give a page a clear structure that readers can scan and assistive technology can navigate.",
        [
          "HTML has six heading elements, from [[<h1>]] to [[<h6>]]. The number describes the heading's place in the document structure, not its font size. An [[<h1>]] is the main heading, while an [[<h2>]] introduces a section beneath it and an [[<h3>]] can introduce a subsection inside that section.",
          "Headings create a meaningful outline of the content. People often scan a page by its headings, and screen readers can offer a list of headings for quick navigation. Choose a heading because it describes the section that follows, then use CSS when you want to change how that heading looks.",
        ],
        [
          { label: "Name the page", code: "<h1>Field Guide</h1>", detail: "This is the main heading for the page. It tells readers what the whole document is about, rather than styling an ordinary line of text." },
          { label: "Start a section and a subsection", code: "<h2>Getting started</h2>\n<h3>Install the tools</h3>", detail: "The h2 starts a major section. The h3 is a smaller section inside it, so the heading levels describe a parent-and-child relationship." },
        ],
        {
          question: "Which heading should introduce a subsection inside an h2 section?",
          options: ["<h1>", "<h3>", "<h6>"],
          correct: 1,
          explanation: "An h3 is one level below h2, so it communicates that the new section belongs inside the h2 section.",
        },
      ),
      makeGuide(
        "Keep heading levels in a sensible order so the page outline communicates the relationship between sections.",
        [
          "When a section begins, choose the next heading level based on its place in the outline. A page title is commonly an h1, its main sections use h2, and a subsection inside one of those sections uses h3. If a subsection needs its own subsection, continue to h4.",
          "Do not choose a heading just because its default size looks right. Jumping from h2 straight to h4 suggests that an h3 parent section exists when it does not. The browser will still display the page, but the structure becomes harder to understand. Use CSS to control appearance without changing the meaning.",
        ],
        [
          { label: "Build a parent section", code: "<h1>Recipes</h1>\n<h2>Bread</h2>", detail: "The page begins with its main title, then introduces Bread as one of its main sections." },
          { label: "Add the next level down", code: "<h3>Sourdough</h3>\n<h3>Flatbread</h3>", detail: "Both headings are subsections of Bread. They share the same level because neither one is nested inside the other." },
        ],
        {
          question: "A heading is currently h2 and you are adding a subsection directly beneath it. Which element is the best fit?",
          options: ["<h3>", "<h4>", "<h1>"],
          correct: 0,
          explanation: "Use the next level, h3, for a direct subsection of an h2. The other choices skip levels or incorrectly restart the hierarchy.",
        },
      ),
      makeGuide(
        "Decide when content deserves a semantic heading and when it only needs visual emphasis.",
        [
          "A heading introduces a section that has its own topic, such as Ingredients, Shipping, or Frequently asked questions. The content after that heading belongs to the section until another heading at the same or a higher level begins. This gives the document a structure that is useful beyond its visual appearance.",
          "Not every large or bold sentence is a heading. A short warning inside a paragraph may need [[<strong>]], while a real section title should use an h1–h6 element. Likewise, do not use a heading only to make text bigger. Pick the element for meaning, then use CSS for visual design.",
        ],
        [
          { label: "Use a heading for a new section", code: "<h2>Shipping</h2>\n<p>Orders usually leave the warehouse within one day.</p>", detail: "Shipping is a distinct topic with content beneath it, so it deserves a heading that readers can find in the page structure." },
          { label: "Use emphasis inside a sentence", code: "<p><strong>Note:</strong> Orders are not shipped on public holidays.</p>", detail: "The word Note emphasizes part of a paragraph; it does not introduce a separate section, so strong is more appropriate than a heading." },
        ],
        {
          question: "A paragraph contains the phrase 'Important:' before a warning. It does not introduce a new section. Which element fits the phrase?",
          options: ["<h2>", "<strong>", "<h4>"],
          correct: 1,
          explanation: "Strong marks important inline text. A heading should introduce a section, not merely make a word stand out.",
        },
      ),
    ],
  },
  css: {
    c2: [
      makeGuide(
        "Choose an element, class, or ID selector based on which HTML elements should receive a style.",
        [
          "A CSS selector identifies the HTML elements a rule should affect. An element selector such as [[p]] matches every paragraph. A class selector begins with a dot, as in [[.card]], and matches elements whose class list contains that name. An ID selector begins with a hash, as in [[#main]], and matches the element with that ID.",
          "Classes are the usual choice for reusable visual patterns because many elements can share the same class. An ID is intended to identify one unique element in a document and is often used for fragment links. The punctuation matters: leaving off the dot changes a class selector into an element selector.",
        ],
        [
          { label: "Style every paragraph", code: "p {\n  line-height: 1.6;\n}", detail: "The selector p targets all paragraph elements. Every matching paragraph receives the line-height declaration." },
          { label: "Reuse a class for cards", code: ".card {\n  padding: 16px;\n}\n\n#main {\n  max-width: 720px;\n}", detail: "The dot targets a class named card, which can be shared by several elements. The hash targets the element whose ID is main." },
        ],
        {
          question: "Three different elements should share the same card styling. Which selector is the best fit?",
          options: ["card", ".card", "#card"],
          correct: 1,
          explanation: "A class selector is reusable, so several elements can use class=\"card\" and receive the same styles.",
        },
      ),
      makeGuide(
        "Read spaces and commas in selectors correctly to target related elements without styling extra content.",
        [
          "A space between selectors means descendant: [[article p]] matches paragraph elements anywhere inside an article, including paragraphs nested in other elements. A comma groups separate selectors, so [[h1, h2]] applies the same declarations to all h1 elements and all h2 elements.",
          "These two patterns are not interchangeable. [[article, p]] selects every article and every paragraph, while [[article p]] selects only paragraphs that are inside an article. The child combinator [[>]] is more specific: [[article > p]] matches paragraphs that are direct children of an article.",
        ],
        [
          { label: "Target paragraphs inside articles", code: "article p {\n  margin-bottom: 12px;\n}", detail: "The space means that p must be somewhere inside article. Paragraphs outside an article are not selected by this rule." },
          { label: "Share a rule across two heading types", code: "h1,\nh2 {\n  font-family: sans-serif;\n}", detail: "The comma starts a second independent selector. Both heading types receive the same font without needing to be nested together." },
        ],
        {
          question: "You want to style only paragraphs that appear inside an article. Which selector should you use?",
          options: ["article, p", "article p", "article + p"],
          correct: 1,
          explanation: "A space selects descendants. The comma selects articles and paragraphs separately, while plus targets an adjacent sibling.",
        },
      ),
      makeGuide(
        "Understand why one CSS rule wins when multiple selectors match the same element.",
        [
          "Specificity helps the browser compare selectors that set the same property on the same element. For common selectors, an ID selector has more specificity than a class selector, and a class selector has more specificity than an element selector. A selector with more specific parts can therefore override a simpler one.",
          "Specificity is not the whole cascade: origin, importance, cascade layers, and source order also matter. For two ordinary author rules with equal importance and specificity, the later declaration wins. Prefer simple, reusable classes instead of making selectors increasingly complicated to force a style to apply.",
        ],
        [
          { label: "Set a class style", code: ".notice {\n  color: gray;\n}", detail: "This class rule gives elements with the notice class gray text. It is a reusable starting point for the design." },
          { label: "A more specific ID rule wins", code: "#notice {\n  color: navy;\n}", detail: "If the same element matches both ordinary rules, the ID selector has greater specificity than the class selector, so navy wins even if the class rule appears later." },
        ],
        {
          question: "An element matches both .notice and #notice rules. Both are ordinary declarations from the same stylesheet. Which selector has greater specificity?",
          options: [".notice", "#notice", "They always have equal specificity"],
          correct: 1,
          explanation: "An ID selector has greater specificity than a class selector in the usual selector-specificity comparison.",
        },
      ),
    ],
  },
  java: {
    j2: [
      makeGuide(
        "Choose a Java data type that matches the kind of value a variable needs to store.",
        [
          "Java is statically typed: a variable declaration states its type, and the compiler checks that assignments and operations are compatible. Common primitive types include [[int]] for whole numbers, [[double]] for decimal numbers, [[boolean]] for true or false, and [[char]] for one character. Java has eight primitive types in total.",
          "A [[String]] is not a primitive; it is a reference type used for text. Once a local variable has been declared, you cannot assign a completely unrelated type to it. Pick the type that matches the data, and remember that a local variable must be assigned before you read it.",
        ],
        [
          { label: "Declare a whole-number variable", code: "int age = 18;", detail: "The type int tells Java that age stores an integer value. The equals sign assigns 18 to the variable when it is declared." },
          { label: "Declare other common types", code: "double price = 19.5;\nboolean active = true;\nString name = \"Mina\";", detail: "The first value is decimal, the second is true or false, and the last is text. String is capitalised because it is a class, not a primitive keyword." },
        ],
        {
          question: "Which type should you use for a true-or-false value in Java?",
          options: ["int", "boolean", "String"],
          correct: 1,
          explanation: "The primitive boolean type stores one of two values: true or false. int stores whole numbers, while String stores text.",
        },
      ),
      makeGuide(
        "Distinguish automatic widening conversions from explicit casts that may lose information.",
        [
          "Java can automatically widen some numeric values to another numeric type, such as converting an [[int]] to a [[double]]. That particular conversion preserves every int value exactly and does not need a cast. Other widening conversions can lose precision: a long can hold integers too large for double to represent every digit exactly.",
          "Converting in the opposite direction is narrowing because information may be lost. Java requires an explicit cast for a conversion such as double to int. Casting a decimal number to int removes the fractional part; it does not round to the nearest integer. Use [[Math.round()]] when rounding is what you intend.",
        ],
        [
          { label: "Widen an integer automatically", code: "int count = 7;\ndouble total = count;", detail: "Java can store the integer value as a double automatically. The value becomes 7.0, so no explicit cast is needed." },
          { label: "Cast when narrowing", code: "double price = 19.95;\nint whole = (int) price;\nlong rounded = Math.round(price);", detail: "The cast makes whole equal to 19 by discarding the decimal part. Math.round instead produces the nearest whole-number value, 20." },
        ],
        {
          question: "What value does (int) 8.9 produce in Java?",
          options: ["9", "8", "A compile-time error"],
          correct: 1,
          explanation: "Casting a positive double to int truncates the fractional part. It produces 8; it does not round the value to 9.",
        },
      ),
      makeGuide(
        "Use final to prevent reassignment and static final for class-level constants.",
        [
          "The [[final]] keyword means that a variable can be assigned only once. A final local variable may receive its value when it is declared or later, but it must be assigned before it is read. After that assignment, another assignment is rejected by the compiler.",
          "A value shared by the whole class is commonly declared [[static final]] and named in uppercase with underscores, such as [[MAX_ITEMS]]. This is a naming convention as well as a useful signal to readers. For a final object reference, the reference cannot point to a different object, although the object's contents may still be changeable.",
        ],
        [
          { label: "Make a local value final", code: "final int limit = 10;\n// limit = 20; // compiler error", detail: "The first assignment fixes limit at 10. The commented-out second assignment is not allowed because final prevents reassignment." },
          { label: "Declare a class constant", code: "static final int MAX_ITEMS = 100;", detail: "static makes this field belong to the class rather than to each object. final prevents reassignment, and the uppercase name signals a constant by convention." },
        ],
        {
          question: "What happens when code tries to assign a second value to a final int that was already initialised?",
          options: ["The value is silently replaced", "The compiler reports an error", "Java creates a second variable automatically"],
          correct: 1,
          explanation: "A final variable can only be assigned once. A second assignment is rejected during compilation.",
        },
      ),
    ],
  },
  python: {
    p2: [
      makeGuide(
        "Create variables with assignment and understand that a Python name can be rebound to a value of another type.",
        [
          "In Python, assignment with [[=]] binds a name to an object. You do not write a type before the variable name. The value has a type, and Python lets the same name be rebound later to a different value, including one with a different type.",
          "For example, a name can refer to the integer 3 and later refer to the text \"three\". That flexibility does not mean a name exists before it is assigned. Trying to read an unassigned name raises [[NameError]], so give a variable a value before using it.",
        ],
        [
          { label: "Assign an integer", code: "count = 3\nprint(count)", detail: "The assignment creates the name count and binds it to the integer 3. print then reads the value and displays 3." },
          { label: "Rebind the same name", code: "count = \"three\"\nprint(count)", detail: "The name now refers to a string instead of the earlier integer. Python does not require a separate declaration when the value's type changes." },
        ],
        {
          question: "What does the second assignment do in count = 3 followed by count = \"three\"?",
          options: ["It converts the text back to an integer", "It rebinds count to a string", "It creates a syntax error"],
          correct: 1,
          explanation: "Python allows a name to be rebound. After the second assignment, count refers to the string value \"three\".",
        },
      ),
      makeGuide(
        "Recognise common Python types and convert values explicitly when an operation needs a different type.",
        [
          "Python includes several built-in types: [[int]] for whole numbers, [[float]] for decimal numbers, [[str]] for text, and [[bool]] for true or false. Collections include [[list]], [[tuple]], [[dict]], and [[set]]. Use [[type(value)]] when you need to inspect the type of a value while learning or debugging.",
          "Conversion functions create a value of another type when the input can be converted. For example, [[int(\"42\")]] makes an integer, while [[str(42)]] makes text. Conversion can fail: [[int(\"forty\")]] raises ValueError because the text does not represent an integer.",
        ],
        [
          { label: "Convert text into a number", code: "age_text = \"18\"\nage = int(age_text)\nprint(age + 1)", detail: "int converts the digit characters into the integer 18. The program can then add 1 and display 19." },
          { label: "Convert a number into text", code: "score = 95\nmessage = \"Score: \" + str(score)\nprint(message)", detail: "str changes the integer to text before concatenation. Without the conversion, Python cannot join a string and an integer with the plus operator." },
        ],
        {
          question: "Which expression converts the integer 25 into the string \"25\"?",
          options: ["int(25)", "str(25)", "type(25)"],
          correct: 1,
          explanation: "str(value) converts a value to text. int(25) remains an integer, while type(25) returns information about its type.",
        },
      ),
      makeGuide(
        "Write valid, readable variable names and use multiple assignment to unpack values clearly.",
        [
          "A Python identifier can contain letters, digits, and underscores, but it cannot begin with a digit. Names are case-sensitive, so [[user_name]] and [[User_Name]] are different identifiers. Avoid reserved words such as [[class]] and [[for]], because Python uses them as part of its syntax.",
          "Python commonly uses [[snake_case]] for variable and function names. You can assign several names in one statement when the values line up, such as [[x, y = 1, 2]]. This is called unpacking. The number of names must match the number of values, or Python raises a ValueError.",
        ],
        [
          { label: "Use a readable valid name", code: "first_place = \"Ari\"\nprint(first_place)", detail: "The name begins with a letter and uses an underscore to separate words. This follows the usual Python style for variables." },
          { label: "Assign and swap two values", code: "x, y = 1, 2\nx, y = y, x\nprint(x, y)", detail: "The first line unpacks two values into two names. The second swaps them in one statement, so the output becomes 2 1." },
        ],
        {
          question: "Which variable name is valid in Python?",
          options: ["2nd_place", "first_place", "class"],
          correct: 1,
          explanation: "first_place starts with a letter and uses an underscore. A name cannot begin with a digit, and class is a reserved keyword.",
        },
      ),
    ],
  },
  javascript: {
    js2: [
      makeGuide(
        "Choose between const and let based on whether a variable binding needs to be reassigned.",
        [
          "[[const]] declares a binding that cannot be reassigned, while [[let]] declares one that can be reassigned. Both are block-scoped, which means they are limited to the nearest pair of braces. Use const by default when the binding will stay the same, and use let when the variable needs a new value later.",
          "[[var]] is older and function-scoped, so it behaves differently around blocks and declarations. You will still see it in existing projects, but let and const are clearer choices for most modern code. Remember that const protects the binding, not every object stored through that binding.",
        ],
        [
          { label: "Use const for a value that will not be rebound", code: "const maxAttempts = 3;", detail: "The name maxAttempts cannot later be assigned a different value. This makes the code's intent clear to anyone reading it." },
          { label: "Use let when the value changes", code: "let attempts = 0;\nattempts = attempts + 1;\nconsole.log(attempts);", detail: "The attempts binding is reassigned after the first declaration, so let is appropriate. The console displays 1." },
        ],
        {
          question: "A counter starts at 0 and must increase after each attempt. Which declaration should you use?",
          options: ["const", "let", "var is required"],
          correct: 1,
          explanation: "The counter needs to be reassigned as it increases, so let expresses that intent. const would prevent the reassignment.",
        },
      ),
      makeGuide(
        "Understand block scope and why let or const cannot be read before their declaration.",
        [
          "A block is a section of code surrounded by braces, such as the body of an if statement or a loop. Variables declared with [[let]] and [[const]] belong to that block. Code outside the block cannot use those names, which helps prevent unrelated parts of a program from interfering with each other.",
          "A let or const declaration cannot be read before the declaration line runs. The region from the start of the block up to that line is called the temporal dead zone. Reading the name there throws a [[ReferenceError]]. Put the declaration before the code that needs the value.",
        ],
        [
          { label: "Keep a value inside its block", code: "if (true) {\n  const message = \"Ready\";\n  console.log(message);\n}", detail: "message is declared and used inside the same block, so the read is valid. Code after the closing brace cannot access this block-scoped name." },
          { label: "Declare before reading", code: "const message = \"Ready\";\nconsole.log(message);", detail: "The declaration happens before the read. Moving the console.log above the const line would cause a ReferenceError." },
        ],
        {
          question: "What happens when code reads a const variable before its declaration in the same block?",
          options: ["It reads undefined", "It throws a ReferenceError", "It automatically moves the declaration"],
          correct: 1,
          explanation: "A let or const binding is unavailable during its temporal dead zone. Reading it before declaration throws ReferenceError.",
        },
      ),
      makeGuide(
        "Recognise shadowing and predict which variable a name refers to inside and outside a block.",
        [
          "Shadowing happens when a name declared in an inner scope has the same name as one in an outer scope. Inside the inner block, the inner declaration takes precedence. The outer variable still exists, but the repeated name temporarily refers to the inner binding.",
          "This is different from changing the outer variable. A new block-scoped const or let creates another binding, so leaving the block reveals the original outer value again. Shadowing can be legal, but using different names is often clearer when the two values represent different things.",
        ],
        [
          { label: "Declare an outer value", code: "let score = 10;", detail: "This score belongs to the surrounding scope. It remains available after an inner block finishes." },
          { label: "Create an inner binding with the same name", code: "{\n  const score = 99;\n  console.log(score); // 99\n}\nconsole.log(score); // 10", detail: "Inside the braces, the inner const hides the outer score. After the closing brace, the inner binding is out of scope and the outer value is visible again." },
        ],
        {
          question: "After the inner block ends in the example, what value does the outer score still hold?",
          options: ["99", "10", "undefined"],
          correct: 1,
          explanation: "The inner const shadows the outer name only inside its block. It does not reassign the outer let variable, which remains 10.",
        },
      ),
    ],
  },
  php: {
    php2: [
      makeGuide(
        "Create PHP variables correctly and remember that variable names are case-sensitive.",
        [
          "A PHP variable starts with a dollar sign, followed by a name such as [[$name]] or [[$total]]. Assign a value with [[=]], then use the variable name when you need that value. Unlike many declarations in Java, PHP does not require you to write the variable's type before its name.",
          "Variable names are case-sensitive. [[$name]], [[$Name]], and [[$NAME]] are three different names, even though they look similar. Keep spelling and capitalisation consistent, and assign a variable before reading it so your code does not rely on an undefined value.",
        ],
        [
          { label: "Create and use a variable", code: "<?php\n$name = \"Mina\";\necho $name;", detail: "The dollar sign marks the variable name. The string is assigned to name, and echo sends its value to the output." },
          { label: "Notice the capital letter difference", code: "<?php\n$name = \"Mina\";\n$Name = \"Ari\";\necho $name;\necho $Name;", detail: "PHP treats name and Name as separate variables. The two echo statements therefore output two different values." },
        ],
        {
          question: "You assign a value to $username. Which variable name refers to that same variable?",
          options: ["$userName", "$USERNAME", "$username"],
          correct: 2,
          explanation: "PHP variable names are case-sensitive. Only the exact spelling and capitalisation $username refers to the variable you assigned.",
        },
      ),
      makeGuide(
        "Recognise PHP's changing variable types and convert values explicitly when the next operation needs it.",
        [
          "PHP associates a type with the value stored in a variable, and the same variable can later hold a different type. For example, [[$count]] can first contain the integer 5 and then contain the string \"five\". Functions such as [[gettype()]] can help you inspect a value while learning.",
          "PHP sometimes converts compatible values during an operation, a behaviour known as type juggling. Do not depend on an unclear conversion when the result matters. Convert deliberately with [[(int)]], [[(float)]], or [[(string)]], and validate input before using it in calculations.",
        ],
        [
          { label: "Inspect a variable's type", code: "<?php\n$count = 5;\necho gettype($count); // integer", detail: "gettype reports the kind of value currently stored in count. Here the output is integer because 5 is an integer literal." },
          { label: "Convert text into an integer", code: "<?php\n$quantityText = \"5\";\n$quantity = (int) $quantityText;\necho $quantity + 1; // 6", detail: "The cast converts the digit string to an integer before the addition. Explicit conversion makes the intended operation easier to see." },
        ],
        {
          question: "Which PHP expression explicitly converts the string \"12\" to an integer?",
          options: ["(int) \"12\"", "gettype(\"12\")", "(string) 12"],
          correct: 0,
          explanation: "The int cast converts the numeric text to an integer. gettype only reports a type, and the string cast converts in the opposite direction.",
        },
      ),
      makeGuide(
        "Add parameter and return type declarations so PHP functions communicate the values they expect and produce.",
        [
          "PHP lets a function declare the types expected for its parameters and the type it should return. In [[function add(int $a, int $b): int]], both inputs are declared as integers and the colon says the function returns an integer. These declarations make a function's contract visible to readers and help PHP detect incompatible values.",
          "By default, PHP may coerce compatible scalar values in some typed calls. [[declare(strict_types=1)]] enables strict scalar type checking for calls made from that file, so most mismatched scalar arguments raise [[TypeError]] instead of being coerced. An integer is still accepted for a float parameter. Put the declare statement at the top of the PHP file, immediately after the opening tag.",
        ],
        [
          { label: "Declare the function contract", code: "<?php\ndeclare(strict_types=1);\n\nfunction add(int $a, int $b): int {\n    return $a + $b;\n}", detail: "Each parameter must be an integer and the return value is declared as an integer. The strict_types declaration makes scalar argument checking stricter for calls from this file." },
          { label: "Call the function with matching values", code: "$total = add(4, 6);\necho $total; // 10", detail: "Both arguments are integers, so the call matches the parameter declarations. The function returns their sum, which is stored in total." },
        ],
        {
          question: "In function add(int $a, int $b): int, what does the int after the closing parenthesis declare?",
          options: ["The type of the first argument", "The function's return type", "The type of every variable in the file"],
          correct: 1,
          explanation: "The colon introduces a return type declaration. It tells PHP that add is expected to return an integer value.",
        },
      ),
    ],
  },
  sql: {
    sql2: [
      makeGuide(
        "Filter query results with WHERE by writing a condition that each row must satisfy.",
        [
          "A [[WHERE]] clause filters rows returned by a query. The database checks the condition for each row and keeps rows where the condition is true. Use comparison operators such as [[=]], [[<>]], [[<]], and [[>=]] to compare a column with a value.",
          "Write text values as string literals inside single quotes, such as [['Ada']]. Numeric values are written without quotes, such as [[18]]. Single quotes are the portable SQL style for text; double quotes are commonly used for identifiers like column or table names, though some database engines have compatibility settings.",
        ],
        [
          { label: "Return only active users", code: "SELECT name\nFROM users\nWHERE active = 1;", detail: "The query checks each row's active column. Only rows where active equals 1 are included in the result." },
          { label: "Filter by a text value", code: "SELECT name\nFROM users\nWHERE city = 'Manila';", detail: "The city column is compared with the text literal Manila. The single quotes mark the value as text rather than a column name." },
        ],
        {
          question: "Which WHERE condition compares the city column with the text value Manila?",
          options: ["WHERE city = Manila", "WHERE city = 'Manila'", "WHERE 'city' = Manila"],
          correct: 1,
          explanation: "Use the column name without quotes and place the text value in single quotes. That makes SQL compare city with the string Manila.",
        },
      ),
      makeGuide(
        "Combine several WHERE conditions with AND and OR, using parentheses to make the intended grouping clear.",
        [
          "[[AND]] requires both connected conditions to be true. [[OR]] requires at least one condition to be true. SQL evaluates AND before OR, so a condition such as [[a OR b AND c]] is interpreted as [[a OR (b AND c)]]. That order can surprise you when you read the query from left to right.",
          "Use parentheses whenever a query mixes AND and OR. Parentheses show which conditions belong together and protect the result from a misunderstanding during later edits. Think of each parenthesised group as one decision before combining it with the rest of the filter.",
        ],
        [
          { label: "Require both conditions", code: "SELECT *\nFROM orders\nWHERE status = 'pending'\n  AND paid = 1;", detail: "A row must be pending and paid. If either condition is false, the row is not returned." },
          { label: "Group alternatives before adding another rule", code: "SELECT *\nFROM orders\nWHERE (status = 'active' OR status = 'pending')\n  AND paid = 1;", detail: "The parentheses allow either status, then AND requires paid to equal 1. Both status choices must still pass the payment condition." },
        ],
        {
          question: "You want active OR pending orders, but only when paid = 1. Which grouping expresses that rule?",
          options: ["status = 'active' OR (status = 'pending' AND paid = 1)", "(status = 'active' OR status = 'pending') AND paid = 1", "status = 'active' AND status = 'pending' AND paid = 1"],
          correct: 1,
          explanation: "The parentheses group the two accepted statuses first. The final AND then requires every returned order to be paid.",
        },
      ),
      makeGuide(
        "Test for missing SQL values with IS NULL instead of comparing NULL with an equals sign.",
        [
          "SQL uses [[NULL]] to represent a value that is missing or unknown. It is not the same as zero, an empty string, or false. Because the value is unknown, an ordinary comparison such as [[email = NULL]] does not evaluate to true, so it will not find rows with a missing email.",
          "Use [[IS NULL]] to find rows whose value is missing and [[IS NOT NULL]] to find rows that have a value. SQL conditions can evaluate to true, false, or unknown. In a WHERE clause, only rows whose condition is true are kept, which is why comparing a column with NULL using equals does not work.",
        ],
        [
          { label: "Find rows with no email value", code: "SELECT name\nFROM users\nWHERE email IS NULL;", detail: "IS NULL is the dedicated test for a missing or unknown email value. Matching rows are returned even though email is not an ordinary text value." },
          { label: "Find rows that do have an email", code: "SELECT name\nFROM users\nWHERE email IS NOT NULL;", detail: "IS NOT NULL keeps rows with a known, non-NULL email value. It is the opposite test of IS NULL." },
        ],
        {
          question: "Which condition correctly finds users whose email column has no value?",
          options: ["WHERE email = NULL", "WHERE email IS NULL", "WHERE email = ''"],
          correct: 1,
          explanation: "IS NULL tests for SQL's missing or unknown value. An equals comparison with NULL is unknown, and an empty string is a different value.",
        },
      ),
    ],
  },
};
