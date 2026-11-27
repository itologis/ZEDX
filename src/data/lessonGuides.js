// Guided teaching notes for the first topic in each language track.
// These turn short reference entries into a teachable sequence:
// learning goal -> plain-language explanation -> worked steps -> retrieval check.
export const LESSON_GUIDES = {
  html: {
    h1: [
      {
        goal: "Build a complete HTML document and explain what each major part is responsible for.",
        body: [
          "HTML is the structure of a web page. It tells the browser which pieces are headings, paragraphs, links, images, and other content. It does not decide the page's colours or layout; CSS handles that.",
          "A normal document has four big pieces. The DOCTYPE declaration tells the browser to use modern standards. The html element wraps the document. The head stores information about the page, while the body contains the content people see.",
        ],
        walkthrough: [
          { label: "Tell the browser which standard to use", code: "<!DOCTYPE html>", detail: "This is a declaration, not an HTML element. Put it first. It tells the browser to use standards mode instead of the old quirks mode." },
          { label: "Create the document root", code: "<html lang=\"en\">", detail: "All the document's HTML elements belong inside this root element. The lang attribute identifies the page's language, which helps screen readers pronounce words correctly." },
          { label: "Separate information from visible content", code: "<head>...</head>\n<body>...</body>", detail: "The head contains page information such as the tab title. The body contains the actual headings, paragraphs, links, and images." },
        ],
        check: {
          question: "You want the words 'Welcome to my page' to appear in the page itself. Where should the h1 go?",
          options: ["Inside <head>", "Inside <body>", "Above <!DOCTYPE html>"],
          correct: 1,
          explanation: "Visible page content belongs in body. The head is for metadata, such as the document title and character encoding.",
        },
      },
      {
        goal: "Distinguish content that appears on the page from information used by the browser and other tools.",
        body: [
          "Think of head as the page's information label and body as the page itself. The head can tell the browser the tab title, character encoding, and which CSS file to load. Those instructions are useful, but they are not ordinary page content.",
          "The body is where visible content belongs. A heading placed in head does not become a hidden heading on the page; it is simply in the wrong part of the document. Put the title element in head and the h1 in body.",
        ],
        walkthrough: [
          { label: "Give the browser a tab title", code: "<head>\n  <title>My Recipe Book</title>\n</head>", detail: "The title is shown in the browser tab and used for bookmarks. It is not the large heading inside the page." },
          { label: "Put the reader-facing heading in the body", code: "<body>\n  <h1>My Recipe Book</h1>\n</body>", detail: "This h1 is visible page content. It tells the reader what the page is about." },
        ],
        check: {
          question: "Which element belongs in head because it sets the text shown on the browser tab?",
          options: ["<title>", "<h1>", "<p>"],
          correct: 0,
          explanation: "title names the document in the browser interface. h1 and p are content elements that belong in body.",
        },
      },
      {
        goal: "Recognise which document tags browsers can infer and which declaration you should still write yourself.",
        body: [
          "Browsers are forgiving. When a simple HTML file leaves out html, head, or body tags, the browser can often infer those elements while parsing the page. That is why a short fragment may still appear to work.",
          "Do not confuse browser recovery with good document structure. Write the full skeleton so the next person can understand the file and so metadata has a clear home. Keep the DOCTYPE: leaving it out can trigger quirks mode, where older layout rules behave differently.",
        ],
        walkthrough: [
          { label: "A short fragment can still render", code: "<h1>Hello</h1>\n<p>Welcome!</p>", detail: "The browser can create the missing document structure around this fragment. That convenience is why incomplete examples sometimes appear to work." },
          { label: "A complete file is clearer", code: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head><title>Hello</title></head>\n  <body><h1>Hello</h1></body>\n</html>", detail: "The complete version makes the document mode, metadata, and visible content explicit. Use this structure for real pages." },
        ],
        check: {
          question: "Which part can a browser often infer when it is omitted from a simple document?",
          options: ["The <!DOCTYPE html> declaration", "The <html> element", "The page's correct title text"],
          correct: 1,
          explanation: "Browsers can infer structural elements such as html, head, and body. They cannot guess the title or replace the DOCTYPE declaration you should provide.",
        },
      },
    ],
  },
  css: {
    c1: [
      {
        goal: "Read and write a CSS rule by identifying its target, properties, values, and punctuation.",
        body: [
          "CSS changes how HTML elements look and how they are laid out. A rule has two main parts: a selector and a declaration block. The selector chooses which elements receive the styles; the declarations describe the changes.",
          "Inside the braces, each declaration is written as a property, a colon, a value, and a semicolon. The property is what you are changing, such as color. The value is the setting, such as navy. A rule can contain several declarations.",
        ],
        walkthrough: [
          { label: "Choose what to style", code: "p", detail: "This selector targets every paragraph element on the page. A class selector such as .note would target elements with that class instead." },
          { label: "Open the declaration block", code: "p {\n  color: navy;\n  font-size: 18px;\n}", detail: "The braces contain the declarations. color is the property and navy is its value. font-size is another property, with 18px as its value." },
          { label: "Close the rule", code: "}", detail: "The closing brace ends the block. Each declaration ends with a semicolon so the browser can separate one setting from the next." },
        ],
        check: {
          question: "In the declaration color: navy;, which part is the property?",
          options: ["color", "navy", "The semicolon"],
          correct: 0,
          explanation: "color is the property being changed. navy is the value assigned to that property.",
        },
      },
      {
        goal: "Apply one set of styles to several targets without accidentally changing what the selector matches.",
        body: [
          "A comma separates selectors in a group. That means each selector is an independent target for the same declaration block. For example, h1, h2 styles all h1 elements and all h2 elements.",
          "A space means something different: it selects a descendant. article p targets paragraphs somewhere inside an article. Read punctuation in selectors carefully. A comma means 'this target and that target'; a space means 'inside'.",
        ],
        walkthrough: [
          { label: "A comma creates a group", code: "h1,\nh2 {\n  color: darkgreen;\n}", detail: "Both h1 elements and h2 elements receive the same color. Neither heading needs to contain the other." },
          { label: "A space describes a relationship", code: "article p {\n  line-height: 1.6;\n}", detail: "This only matches paragraphs that are descendants of an article. Paragraphs elsewhere are not selected." },
        ],
        check: {
          question: "You want every h1 and every h2 to use the same font. Which selector does that?",
          options: ["h1 h2", "h1, h2", "h1 + h2"],
          correct: 1,
          explanation: "The comma groups two independent selectors. A space looks for an h2 nested inside an h1, while + targets an adjacent sibling.",
        },
      },
      {
        goal: "Predict which CSS declaration wins when multiple rules target the same element.",
        body: [
          "The cascade is the process the browser uses to decide which styles apply when rules overlap. It considers things such as origin, importance, specificity, and source order. For two ordinary author rules with equal specificity, the later declaration wins.",
          "Do not assume that the last rule always wins. A more specific selector can beat a less specific one even when it appears earlier. Start with simple class selectors and avoid reaching for !important to fix every conflict.",
        ],
        walkthrough: [
          { label: "The first rule sets a colour", code: ".note { color: gray; }", detail: "This rule gives every element with class note a gray text color." },
          { label: "An equally specific later rule replaces it", code: ".note { color: darkred; }", detail: "Both selectors have the same specificity, so source order breaks the tie. The later darkred declaration wins." },
          { label: "Specificity can change the result", code: "#notice { color: navy; }", detail: "An ID selector is more specific than a class selector. If the same element matches both ordinary rules, the ID rule wins despite appearing earlier." },
        ],
        check: {
          question: "Two ordinary .note rules have equal specificity. The second says color: darkred. Which colour applies?",
          options: ["Gray from the first rule", "Dark red from the later rule", "Both colours blend"],
          correct: 1,
          explanation: "When the competing declarations have equal origin, importance, and specificity, the later source order wins.",
        },
      },
    ],
  },
  java: {
    j1: [
      {
        goal: "Recognise Java's entry point and explain why its method signature must match exactly.",
        body: [
          "A Java application needs a starting point. For a traditional command-line class, the Java launcher looks for a main method with the expected signature: public static void main(String[] args). Execution begins inside that method.",
          "Each word has a job. public makes the method accessible to the launcher, static lets it run without creating an object first, and void means it returns no value. String[] args receives command-line arguments as an array of text values.",
        ],
        walkthrough: [
          { label: "Declare the class", code: "public class Main {", detail: "The class groups the program's code. Because it is public, the source file should be named Main.java, including the same capitalisation." },
          { label: "Declare the entry point", code: "public static void main(String[] args) {", detail: "The launcher recognises this method signature. Removing static or changing the parameter type means it is no longer the standard entry point." },
          { label: "Run the first statement", code: "System.out.println(\"Hello, world\");", detail: "This sends the text to standard output and then moves to a new line. The method body runs from top to bottom." },
        ],
        check: {
          question: "Why is main declared static in a simple Java application?",
          options: ["So the launcher can call it without creating a Main object", "So it can return a String", "So the method runs before the class is compiled"],
          correct: 0,
          explanation: "static makes main belong to the class itself, so the launcher can call it without first constructing an instance.",
        },
      },
      {
        goal: "Explain the difference between Java source code, compiled class files, and running a program.",
        body: [
          "You write Java source code in a .java file. The Java compiler, javac, checks that source and produces bytecode in a .class file. The Java launcher then starts the program using the compiled class.",
          "For a public class named Main, save the file as Main.java. Compile it with javac Main.java, then run it with java Main. When launching it, write the class name rather than adding the .class extension.",
        ],
        walkthrough: [
          { label: "Save the source", code: "Main.java", detail: "This is the file a person edits. Its name must match the public class name." },
          { label: "Compile the source", code: "javac Main.java", detail: "The compiler checks the source and writes Main.class when compilation succeeds. A compile error must be fixed before the program can run." },
          { label: "Launch the compiled class", code: "java Main", detail: "The launcher loads the class and starts the main method. Do not type java Main.class." },
        ],
        check: {
          question: "Which command compiles Main.java into bytecode?",
          options: ["java Main", "javac Main.java", "run Main.java"],
          correct: 1,
          explanation: "javac is the compiler. java launches an already compiled class.",
        },
      },
      {
        goal: "Predict the difference between printing a value and joining values into a string.",
        body: [
          "System.out.print writes text without adding a line break. System.out.println writes the text and then moves to the next line. Both are ways to send output to the console, not to create text inside a graphical window.",
          "The + operator can add numbers or join strings. Once a string is part of a left-to-right expression, the following + operations may become string concatenation. Use parentheses when you want arithmetic to happen before joining the result to text.",
        ],
        walkthrough: [
          { label: "Calculate first", code: "int total = 5 + 3;", detail: "Both operands are integers, so + performs arithmetic. total now stores the number 8." },
          { label: "Join the label and number", code: "System.out.println(\"Total: \" + total);", detail: "The string and the number are joined into one output line. The result is Total: 8." },
          { label: "Notice why parentheses matter", code: "\"Total: \" + 5 + 3", detail: "This is evaluated from left to right. After the string is joined with 5, the final + joins 3 as text, producing Total: 53." },
        ],
        check: {
          question: "What does System.out.println(\"Score: \" + 4 + 2); print?",
          options: ["Score: 6", "Score: 42", "A compile error"],
          correct: 1,
          explanation: "The expression is evaluated left to right. First the string joins with 4, then the resulting string joins with 2. Use (4 + 2) for arithmetic first.",
        },
      },
    ],
  },
  python: {
    p1: [
      {
        goal: "Print text and values, and distinguish what Python displays from what a variable stores.",
        body: [
          "print() sends a representation of its arguments to standard output, usually the terminal. It is useful for showing a result while a program runs, but it does not create text on a website or save a value in a variable by itself.",
          "Text values need quotes because the quotes tell Python that the characters are literal text. Numbers are written without quotes when you want them treated as numbers. Separate multiple print arguments with commas; Python puts a space between them by default and moves to a new line after the call.",
        ],
        walkthrough: [
          { label: "Print a string literal", code: "print(\"Hello, world\")", detail: "The quoted characters form a string. print displays the text without displaying the quote marks." },
          { label: "Print more than one value", code: "name = \"Ada\"\nage = 36\nprint(name, age)", detail: "The variable name holds text and age holds a number. The comma passes two separate arguments, so print displays Ada 36 with a space between them." },
          { label: "Read the output", code: "Ada 36", detail: "This is what appears in the terminal. The values still live in their variables after printing." },
        ],
        check: {
          question: "What does print(\"Level\", 3) display by default?",
          options: ["Level3", "Level 3", "\"Level\", 3"],
          correct: 1,
          explanation: "print separates multiple arguments with a space by default. It displays the string's contents and the number, not the quote marks or comma.",
        },
      },
      {
        goal: "Use comments to explain intent and understand why indentation matters more than blank lines.",
        body: [
          "A comment starts with # and continues to the end of that line. Python ignores the comment when it runs the program. Use comments to explain a decision or a non-obvious reason, not to repeat every line in English.",
          "A blank line does not change a program's meaning; it separates related sections for people reading the file. Indentation is different: Python uses indentation to determine which statements belong inside a function, loop, or conditional block. A misplaced indent can change the program or cause an error.",
        ],
        walkthrough: [
          { label: "Add a comment", code: "# Show the welcome message", detail: "The # makes this line a comment. Python skips it and continues to the next statement." },
          { label: "Run the statement", code: "print(\"Welcome\")", detail: "This line is executable code, so it prints Welcome." },
          { label: "Separate ideas", code: "print(\"Welcome\")\n\nprint(\"Choose a lesson\")", detail: "The blank line improves readability but does not alter the order or result of the two print calls." },
        ],
        check: {
          question: "Which character begins a regular single-line Python comment?",
          options: ["//", "#", "<!--"],
          correct: 1,
          explanation: "Python uses # for comments. // is the floor-division operator, and <!-- is HTML comment syntax.",
        },
      },
      {
        goal: "Build strings from variables and expressions using f-strings, including basic number formatting.",
        body: [
          "An f-string is a string with an f before its opening quote. Inside it, braces mark places where Python evaluates an expression and inserts the result. This avoids awkwardly joining text and values with +.",
          "You can put a variable, a calculation, or a function call inside the braces. A colon introduces a format specification. For example, :.2f formats a number as a decimal with two digits after the decimal point. The formatting changes how the value is displayed, not the number stored in the variable.",
        ],
        walkthrough: [
          { label: "Create values", code: "name = \"Ada\"\nprice = 19.5", detail: "name stores text. price stores a floating-point number." },
          { label: "Insert variables", code: "message = f\"{name} paid {price}\"", detail: "The expressions inside braces are evaluated, then their values are inserted into the new string." },
          { label: "Format the decimal", code: "print(f\"{name} paid ${price:.2f}\")", detail: "The .2f format displays price with exactly two digits after the decimal point. The output is Ada paid $19.50." },
        ],
        check: {
          question: "What does f\"{price:.2f}\" display when price is 19.5?",
          options: ["19.5", "19.50", "price:.2f"],
          correct: 1,
          explanation: ".2f means fixed-point notation with two digits after the decimal point, so the displayed value is 19.50.",
        },
      },
    ],
  },
  javascript: {
    js1: [
      {
        goal: "Use console.log to inspect values and understand where that output appears.",
        body: [
          "console.log() writes information to the JavaScript console. Developers use it to inspect a value, check whether a branch ran, or understand what a function returned. It is a debugging aid, not a way to put text on the page for visitors.",
          "You can pass several arguments separated by commas. The console displays them together while keeping values such as numbers and objects inspectable. JavaScript is case-sensitive, so console.log and Console.log are different names; only the correctly cased built-in works.",
        ],
        walkthrough: [
          { label: "Log a message", code: "console.log(\"Hello, world\");", detail: "The text appears in the browser's developer console or the runtime terminal, not in the page layout." },
          { label: "Inspect a value", code: "const score = 42;\nconsole.log(score);", detail: "The variable is evaluated first. The console receives the number 42, not the letters s-c-o-r-e." },
          { label: "Label several values", code: "console.log(\"score:\", score);", detail: "The comma sends two arguments. This makes the output easier to recognise while debugging." },
        ],
        check: {
          question: "You want to inspect a variable while debugging a web page. Where will console.log show its message?",
          options: ["Inside the page body automatically", "In the developer console", "In the HTML source file"],
          correct: 1,
          explanation: "console.log writes to the developer console. To show content on the page, JavaScript must update the document or use another UI mechanism.",
        },
      },
      {
        goal: "Recognise statements and avoid relying on automatic semicolon insertion to separate every line.",
        body: [
          "A statement is an instruction JavaScript can execute, such as declaring a variable or calling a function. Semicolons mark the end of many statements. JavaScript can insert some semicolons automatically, but this process follows specific rules rather than simply ending every statement at a newline.",
          "For beginners, writing semicolons after statements is a predictable habit. It is especially helpful before a new line that begins with parentheses, brackets, or a template literal, because those characters can continue the expression above instead of starting a new one.",
        ],
        walkthrough: [
          { label: "End the assignment", code: "const label = \"items\";", detail: "The semicolon clearly ends the variable declaration." },
          { label: "Start a separate statement", code: "[1, 2, 3].forEach((n) => console.log(n));", detail: "The semicolon above makes it clear that this array expression is a new statement, not an attempt to index the string stored in label." },
        ],
        check: {
          question: "Why is a semicolon useful after const label = \"items\"?",
          options: ["It tells JavaScript the statement has ended", "It converts the string into an array", "It makes the variable editable"],
          correct: 0,
          explanation: "A semicolon marks the end of the statement and prevents the next line from being interpreted as a continuation in ambiguous cases.",
        },
      },
      {
        goal: "Write and recognise JavaScript comments without confusing them with executable code.",
        body: [
          "A single-line comment begins with //. JavaScript ignores the rest of that line. A block comment begins with /* and ends with */; it can cover several lines. Comments are useful for recording why a decision was made or warning about a non-obvious constraint.",
          "Comments do not run and cannot change a variable's value. Keep them accurate: a comment that describes behaviour the code no longer has is worse than no comment because it teaches the next reader the wrong thing.",
        ],
        walkthrough: [
          { label: "Comment one line", code: "// The API returns cents", detail: "Everything after // on this line is ignored by the JavaScript parser." },
          { label: "Keep the explanation beside the code", code: "const price = cents / 100;", detail: "The code performs the conversion. The comment above explains why the division is needed." },
          { label: "Comment a larger section", code: "/*\n  Temporary fallback while the service\n  is unavailable.\n*/", detail: "The block comment can span multiple lines and ends only at */." },
        ],
        check: {
          question: "Which syntax starts a JavaScript single-line comment?",
          options: ["#", "//", "<!--"],
          correct: 1,
          explanation: "JavaScript uses // for a single-line comment and /* ... */ for a block comment.",
        },
      },
    ],
  },
  php: {
    php1: [
      {
        goal: "Identify which parts of a PHP file are executed by the server and how echo sends output.",
        body: [
          "PHP is commonly used on a web server. When the server processes a PHP file, code between <?php and ?> is executed. Text outside those tags is treated as output and can be sent to the browser as part of the response.",
          "echo writes text into that response. The browser receives the generated HTML or text, not the PHP source code itself. Finish PHP statements with semicolons. A PHP-only file can omit the closing tag at the end, which helps avoid accidental whitespace after the program.",
        ],
        walkthrough: [
          { label: "Enter PHP mode", code: "<?php", detail: "This opening tag tells the PHP interpreter that the following content is PHP code." },
          { label: "Send text to the response", code: "echo \"Hello, world\";", detail: "The server executes echo and includes Hello, world in the response sent to the browser." },
          { label: "Understand what the browser receives", code: "Hello, world", detail: "The browser sees the output. It does not receive the PHP instructions that produced it." },
        ],
        check: {
          question: "When a server runs echo \"Hello\"; inside a PHP block, what does the browser receive?",
          options: ["The PHP source code", "The output text Hello", "A new PHP file"],
          correct: 1,
          explanation: "PHP executes on the server. echo writes its text into the response, so the browser receives the output rather than the server-side source code.",
        },
      },
      {
        goal: "Predict when a PHP string will insert a variable's value and when it will keep the dollar sign as text.",
        body: [
          "PHP double-quoted strings can interpolate simple variables. If $name contains Ada, the string \"Hello, $name\" becomes Hello, Ada. This is useful when building messages from data.",
          "Single-quoted strings generally keep variable names as literal text, so 'Hello, $name' stays exactly that. Use braces when the variable boundary is unclear or when accessing a more complex expression. This difference is about how the string is parsed, not about whether the variable exists.",
        ],
        walkthrough: [
          { label: "Store a value", code: "$name = \"Ada\";", detail: "The variable $name now contains the text Ada." },
          { label: "Interpolate in double quotes", code: "echo \"Hello, $name\";", detail: "PHP replaces $name with its value. The output is Hello, Ada." },
          { label: "Keep text literal with single quotes", code: "echo 'Hello, $name';", detail: "Single quotes do not interpolate ordinary variables. The output contains the literal characters $name." },
        ],
        check: {
          question: "If $name contains Ada, what does echo 'Hi, $name'; output?",
          options: ["Hi, Ada", "Hi, $name", "A syntax error"],
          correct: 1,
          explanation: "Single-quoted PHP strings keep the variable name as literal text. Use double quotes when you want simple variable interpolation.",
        },
      },
      {
        goal: "Use PHP's line and block comments, and distinguish PHP comments from HTML comments.",
        body: [
          "PHP supports // and # for comments that run to the end of the line. Use /* and */ for a block comment that can span several lines. The interpreter ignores comment text while executing the program.",
          "HTML comments use <!-- and -->, but they are not PHP comment syntax. Outside PHP mode they become part of the HTML output. Inside a PHP block they are not a valid substitute for // or /* ... */ and can cause a parse error.",
        ],
        walkthrough: [
          { label: "Write a line comment", code: "// Convert cents into currency units", detail: "PHP ignores the remainder of this line. The comment explains the reason for the calculation below." },
          { label: "Run the actual statement", code: "$price = $cents / 100;", detail: "This assignment executes. The comment does not create or change the $cents variable." },
          { label: "Use a block comment for several lines", code: "/*\n  Keep this fallback until\n  the new endpoint is ready.\n*/", detail: "The comment begins at /* and ends at */. Everything inside is ignored by PHP." },
        ],
        check: {
          question: "Which syntax creates a PHP block comment?",
          options: ["<!-- note -->", "/* note */", "// note //"],
          correct: 1,
          explanation: "PHP block comments begin with /* and end with */. HTML comments are for HTML markup, not PHP code.",
        },
      },
    ],
  },
  sql: {
    sql1: [
      {
        goal: "Read a basic SELECT query and predict which columns and rows appear in its result.",
        body: [
          "A database table stores records in rows and fields in columns. SELECT chooses which columns to show in the result, while FROM tells the database which table to read. The result is a new table-shaped result set; the query does not change the stored records.",
          "List only the columns you need so the result is easier to understand and carries less unnecessary data. SELECT * asks for every column, which is handy while exploring a table but is usually too broad for application code. Without a WHERE condition, every row from the chosen table is included.",
        ],
        walkthrough: [
          { label: "Choose the output columns", code: "SELECT name, email", detail: "The result will contain two columns: name and email. The order here is the order in the result." },
          { label: "Choose the source table", code: "FROM users;", detail: "The database reads rows from users. Because there is no WHERE clause, no rows are filtered out." },
          { label: "Predict the result shape", code: "name | email\n-----|------\nAda  | ada@example.com\nLin  | lin@example.com", detail: "Each matching user contributes one result row, but only the selected columns are shown. Your actual rows depend on the data stored in users." },
        ],
        check: {
          question: "A table has id, name, and email. What columns appear for SELECT name, email FROM users;?",
          options: ["Only name and email", "All three columns", "Only id"],
          correct: 0,
          explanation: "The SELECT list controls which columns appear in the result. FROM chooses the table those columns are read from.",
        },
      },
      {
        goal: "Rename a result column and calculate a new value without changing the table itself.",
        body: [
          "An alias gives a column or expression a temporary name in the query result. Write it with AS, such as price * quantity AS total. The database still stores the original columns as price and quantity; the alias only labels the value returned by this query.",
          "Expressions can be selected just like ordinary columns. For each row, price * quantity calculates a total. A readable alias makes that calculated result easier for the program or person reading the query to identify.",
        ],
        walkthrough: [
          { label: "Calculate from stored columns", code: "price * quantity", detail: "For a row with price 12 and quantity 3, the expression evaluates to 36." },
          { label: "Name the calculated result", code: "SELECT price * quantity AS total\nFROM order_items;", detail: "The result column is labelled total. This does not create a permanent total column in the order_items table." },
        ],
        check: {
          question: "What does AS total do in price * quantity AS total?",
          options: ["Creates a permanent table column", "Names the calculated result in this query", "Changes the stored price"],
          correct: 1,
          explanation: "AS creates an alias in the result set. It does not alter the table schema or update stored values.",
        },
      },
      {
        goal: "Use SELECT for a simple calculation and recognise when a query needs a FROM table.",
        body: [
          "SELECT can evaluate a literal value or expression without reading from a table in databases such as SQLite. This is useful for checking a calculation or testing a function. For example, SELECT 1 + 1 AS result; returns one row with a column named result and the value 2.",
          "The asterisk is different from a calculation: SELECT * means 'all columns' from a table in the FROM clause. It cannot describe which table's columns to return when no table is named.",
        ],
        walkthrough: [
          { label: "Ask the database to calculate", code: "SELECT 1 + 1 AS result;", detail: "SQLite evaluates 1 + 1 and returns the value 2. No stored table is needed for this expression." },
          { label: "Use the table wildcard with a source", code: "SELECT * FROM users;", detail: "Here * has a clear meaning: return all columns from every row in users." },
          { label: "Notice what is missing", code: "SELECT *;", detail: "There is no table whose columns can be expanded. Use a specific expression without FROM, or name a table after FROM." },
        ],
        check: {
          question: "Which query calculates 6 × 7 in SQLite without reading a table?",
          options: ["SELECT 6 * 7 AS answer;", "SELECT *;", "FROM numbers;"],
          correct: 0,
          explanation: "SELECT can evaluate an expression by itself in SQLite. The alias answer labels the result column.",
        },
      },
    ],
  },
};
