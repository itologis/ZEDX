const q = (question, options, correct, explanation) => ({
  question,
  options,
  correct,
  explanation,
});

export const shuffle = (items) => {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

// Shuffles the answer options and keeps track of which one is correct
export const shuffleOptions = (item) => {
  const tagged = item.options.map((text, i) => ({
    text,
    isCorrect: i === item.correct,
  }));

  const shuffled = shuffle(tagged);

  return {
    ...item,
    options: shuffled.map((o) => o.text),
    correct: shuffled.findIndex((o) => o.isCorrect),
  };
};

const RAW = {
  css: {
    L1: {
      passingScore: 3,
      questions: [
        q(
          "What does CSS stand for?",
          [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Style Sheets",
            "Color Style Syntax",
          ],
          0,
          "CSS stands for Cascading Style Sheets. The other three expansions are made up.",
        ),
        q(
          "Which selector targets an element by its ID?",
          [".class", "#id", "*", "element"],
          1,
          "# targets an id. A dot targets a class, * targets everything, and a bare name targets a tag.",
        ),
        q(
          "What property changes text color?",
          ["font-color", "text-color", "color", "background-color"],
          2,
          "color sets the text color. font-color and text-color do not exist, and background-color paints the background.",
        ),
        q(
          "Which unit is relative to the parent element's font size?",
          ["px", "em", "rem", "vw"],
          1,
          "em scales with the parent's font size. px is fixed, rem uses the root font size, and vw uses the viewport width.",
        ),
        q(
          "What does 'cascading' mean in CSS?",
          [
            "Styles flow like water",
            "More specific rules override general ones",
            "CSS is only for waterfalls",
            "All styles are equal",
          ],
          1,
          "When rules conflict, the cascade picks a winner using specificity and order, so more specific rules beat general ones.",
        ),
      ],
    },
    L2: {
      passingScore: 3,
      questions: [
        q(
          "Which is NOT part of the Box Model?",
          ["Margin", "Padding", "Background", "Border"],
          2,
          "The box model is content, padding, border and margin. Background is a style that paints the box, not one of its layers.",
        ),
        q(
          "Which property adds space inside an element, between content and border?",
          ["margin", "padding", "gap", "outline"],
          1,
          "padding is the space inside the border. margin is outside it, gap sits between flex or grid items, and outline is drawn outside the border.",
        ),
        q(
          "Which pseudo-class targets a hovered element?",
          ["a:visited", "a:active", "a:hover", "a:focus"],
          2,
          ":hover applies while the pointer is over the element. :active is while pressing, :focus is while focused, and :visited is for visited links.",
        ),
        q(
          "What does 'box-sizing: border-box' do?",
          [
            "Includes padding and border in width/height",
            "Excludes padding from width/height",
            "Adds a shadow to the box",
            "Makes the box round",
          ],
          0,
          "border-box makes width and height include the padding and border, so the box stays the size you set.",
        ),
        q(
          "Which property makes text bold?",
          ["font-weight", "text-style", "font-bold", "bold"],
          0,
          "font-weight controls boldness (for example bold or 700). The other names are not CSS properties.",
        ),
      ],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What does 'grid-template-columns: 1fr 1fr 1fr' do?",
          [
            "Creates 3 equal columns",
            "Creates 1 column with 3 rows",
            "Creates 3 unequal columns",
            "Creates a single column",
          ],
          0,
          "Each 1fr is an equal share of the free space, so three of them make three equal columns.",
        ),
        q(
          "Which media query targets phones?",
          [
            "@media (min-width: 1024px)",
            "@media (max-width: 600px)",
            "@media (orientation: landscape)",
            "@media (print)",
          ],
          1,
          "max-width: 600px applies on narrow screens like phones. min-width: 1024px targets large screens, and the others check orientation or printing.",
        ),
        q(
          "How do you define a CSS variable?",
          [
            "$color: blue;",
            "--color: blue;",
            "@color: blue;",
            "var(color: blue);",
          ],
          1,
          "Custom properties start with two dashes, like --color, and are read with var(--color). $ is Sass and @ is for at-rules.",
        ),
        q(
          "What does 'transform: scale(1.1)' do?",
          [
            "Moves the element",
            "Rotates the element",
            "Makes the element 10% bigger",
            "Makes the element 10% smaller",
          ],
          2,
          "scale(1.1) multiplies the size by 1.1, which is 10% bigger. translate moves and rotate rotates.",
        ),
        q(
          "What is the 'gap' property used for?",
          [
            "Adds space between flex/grid items",
            "Adds space inside an element",
            "Adds a border around items",
            "Creates a gap in text",
          ],
          0,
          "gap sets the space between items in flex and grid layouts. Padding adds space inside an element and border draws a line.",
        ),
      ],
    },
  },

  html: {
    L1: {
      passingScore: 3,
      questions: [
        q(
          "What does HTML stand for?",
          [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language",
          ],
          0,
          "HTML is HyperText Markup Language. The others are made up.",
        ),
        q(
          "Which tag creates a hyperlink?",
          ["<link>", "<a>", "<href>", "<url>"],
          1,
          "<a> (anchor) makes links, with the destination in href. <link> connects stylesheets, and <href> and <url> are not tags.",
        ),
        q(
          "What is the correct HTML tag for a paragraph?",
          ["<paragraph>", "<p>", "<text>", "<para>"],
          1,
          "The paragraph tag is just <p>. The longer names do not exist.",
        ),
        q(
          "Which tag is used for the largest heading?",
          ["<heading>", "<h1>", "<head>", "<h6>"],
          1,
          "<h1> is the largest heading and <h6> the smallest. <head> holds page metadata, not visible text.",
        ),
        q(
          "What does the <br> tag do?",
          [
            "Creates bold text",
            "Creates a line break",
            "Creates a horizontal line",
            "Creates a paragraph",
          ],
          1,
          "<br> inserts a line break. Bold is <b>, a horizontal line is <hr>, and a paragraph is <p>.",
        ),
      ],
    },
    L2: {
      passingScore: 3,
      questions: [
        q(
          "Which tag is used for an unordered list?",
          ["<ul>", "<ol>", "<li>", "<list>"],
          0,
          "<ul> is an unordered (bulleted) list. <ol> is numbered and <li> is a single item inside either.",
        ),
        q(
          "What does the <img> tag use for the image source?",
          ["src", "href", "link", "source"],
          0,
          "<img> uses src for the image file. href is for links.",
        ),
        q(
          "Which tag is used for a table row?",
          ["<td>", "<tr>", "<th>", "<table>"],
          1,
          "<tr> is a table row. <td> is a data cell and <th> is a header cell.",
        ),
        q(
          "What does HTML5 refer to?",
          [
            "The fifth major version of HTML",
            "A JavaScript framework",
            "A CSS preprocessor",
            "A database format",
          ],
          0,
          "HTML5 is the fifth major version of HTML. It is a markup standard, not a framework, preprocessor or database.",
        ),
        q(
          "Which tag is used for a division/container?",
          ["<div>", "<span>", "<section>", "<article>"],
          0,
          "<div> is the generic block container. <span> is inline, and section and article carry semantic meaning.",
        ),
      ],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What is the purpose of the <canvas> tag?",
          ["Draw graphics", "Display images", "Play videos", "Create forms"],
          0,
          "<canvas> is a drawing surface you paint on with JavaScript. Images, video and forms have their own tags.",
        ),
        q(
          "Which attribute is used for inline CSS?",
          ["style", "class", "id", "css"],
          0,
          "The style attribute holds inline CSS. class and id are for selectors, and there is no css attribute.",
        ),
        q(
          "What does the <meta> tag do?",
          [
            "Provides metadata",
            "Creates a link",
            "Adds an image",
            "Creates a table",
          ],
          0,
          "<meta> gives metadata about the page, such as its character encoding and description.",
        ),
        q(
          "Which tag is used for semantic meaning of a header?",
          ["<header>", "<head>", "<h1>", "<top>"],
          0,
          "<header> is the semantic tag for introductory content. <head> is the document metadata section.",
        ),
        q(
          "What does the <nav> tag represent?",
          [
            "Navigation links",
            "Network settings",
            "New article",
            "Normal text",
          ],
          0,
          "<nav> marks a block of navigation links.",
        ),
      ],
    },
  },

  java: {
    L1: {
      passingScore: 3,
      questions: [
        q(
          "What is the entry point of a Java program?",
          [
            "public static void main(String[] args)",
            "public void main()",
            "static void main()",
            "void main()",
          ],
          0,
          "The JVM starts a program at public static void main(String[] args). Leave out any part and it will not be found.",
        ),
        q(
          "Which keyword is used to create a class?",
          ["class", "interface", "struct", "object"],
          0,
          "class declares a class. interface declares a contract, and struct and object are not Java keywords for this.",
        ),
        q(
          "What is the size of an int in Java?",
          ["8 bits", "16 bits", "32 bits", "64 bits"],
          2,
          "A Java int is always 32 bits. A short is 16 bits and a long is 64 bits.",
        ),
        q(
          "Which type stores whole numbers in Java?",
          ["int", "String", "boolean", "double"],
          0,
          "int holds whole numbers. String holds text, boolean holds true or false, and double holds decimals.",
        ),
        q(
          "Which statement prints a line to the console?",
          ["System.out.println()", "print()", "console.log()", "echo()"],
          0,
          "Java prints with System.out.println(). console.log() is JavaScript and echo is PHP or shell.",
        ),
      ],
    },
    L2: {
      passingScore: 3,
      questions: [
        q(
          "Which keyword is used to create a constant?",
          ["final", "static", "const", "constant"],
          0,
          "final lets a variable be assigned only once. const is reserved but unused, and static means shared by the class.",
        ),
        q(
          "What is polymorphism in Java?",
          [
            "One interface, multiple implementations",
            "Multiple inheritance",
            "Data hiding",
            "Code reusability",
          ],
          0,
          "Polymorphism lets one type be implemented in many ways. Data hiding is encapsulation.",
        ),
        q(
          "Which keyword is used to catch exceptions?",
          ["try", "catch", "finally", "throw"],
          1,
          "catch handles the exception. try wraps risky code, finally always runs, and throw raises an exception.",
        ),
        q(
          "What is the default value of a boolean in Java?",
          ["true", "false", "null", "0"],
          1,
          "Boolean fields default to false. Primitives cannot be null, and 0 is for numbers.",
        ),
        q(
          "Which collection is used for key-value pairs?",
          ["ArrayList", "HashMap", "LinkedList", "HashSet"],
          1,
          "HashMap stores key-value pairs. ArrayList and LinkedList are ordered lists, and HashSet holds unique values.",
        ),
      ],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What is the purpose of the 'synchronized' keyword?",
          [
            "Thread safety",
            "Memory management",
            "Exception handling",
            "Performance optimization",
          ],
          0,
          "synchronized lets only one thread run a block at a time, which protects shared data.",
        ),
        q(
          "What does the @Override annotation do?",
          [
            "Marks a method as overriding a parent method",
            "Deletes a method",
            "Makes a method static",
            "Hides a method",
          ],
          0,
          "@Override tells the compiler the method replaces a parent method, so typos get caught.",
        ),
        q(
          "What is a lambda expression in Java?",
          ["An anonymous function", "A variable", "A class", "A method"],
          0,
          "A lambda is a short anonymous function, like name -> System.out.println(name).",
        ),
        q(
          "What does JVM stand for?",
          [
            "Java Virtual Machine",
            "Java Variable Manager",
            "Java Validation Module",
            "Java Version Manager",
          ],
          0,
          "JVM is the Java Virtual Machine, which runs compiled Java bytecode.",
        ),
        q(
          "Which framework is used for dependency injection?",
          ["Spring", "Hibernate", "Struts", "JSF"],
          0,
          "Spring is built around dependency injection. Hibernate is for mapping objects to databases.",
        ),
      ],
    },
  },

  python: {
    L1: {
      passingScore: 3,
      questions: [
        q(
          "How do you print in Python?",
          ["console.log()", "print()", "System.out.println()", "echo()"],
          1,
          "Python prints with print(). console.log() is JavaScript and System.out.println() is Java.",
        ),
        q(
          "Which symbol is used for comments in Python?",
          ["//", "#", "/* */", "--"],
          1,
          "Python comments start with #. // and /* */ are C-style and -- is SQL.",
        ),
        q(
          "Which keyword starts a conditional in Python?",
          ["when", "if", "check", "cond"],
          1,
          "if starts a conditional. The others are not Python keywords.",
        ),
        q(
          "Which keyword is used to define a function in Python?",
          ["function", "def", "fun", "define"],
          1,
          "def defines a function in Python. function is JavaScript and fun is Kotlin.",
        ),
        q(
          "What does len() do in Python?",
          [
            "Gets the length of an object",
            "Gets the last element",
            "Gets the first element",
            "Gets the data type",
          ],
          0,
          "len() returns how many items an object holds.",
        ),
      ],
    },
    L2: {
      passingScore: 3,
      questions: [
        q(
          "What is a dictionary in Python?",
          [
            "Key-value pairs",
            "An ordered list",
            "A set of unique values",
            "A tuple of values",
          ],
          0,
          "Dictionaries map keys to values. Lists are ordered sequences and sets hold unique values.",
        ),
        q(
          "How do you add an item to the end of a list?",
          ["list.add(x)", "list.append(x)", "list.push(x)", "list.insert(x)"],
          1,
          "append(x) adds to the end. add is for sets, push is JavaScript, and insert needs a position.",
        ),
        q(
          "What is the output of 3 ** 2 in Python?",
          ["6", "9", "1", "5"],
          1,
          "** is the exponent operator, so 3 ** 2 is 9. 6 would be 3 * 2.",
        ),
        q(
          "Which function is used to read user input?",
          ["input()", "scan()", "read()", "get()"],
          0,
          "input() reads text typed by the user.",
        ),
        q(
          "What is a tuple in Python?",
          ["An immutable sequence", "A mutable list", "A dictionary", "A set"],
          0,
          "Tuples are ordered but cannot be changed after creation. Lists are the mutable ones.",
        ),
      ],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What is a decorator in Python?",
          [
            "A function that modifies another function",
            "A design pattern",
            "A data type",
            "An error handler",
          ],
          0,
          "A decorator wraps another function to add behavior, and is applied with @name.",
        ),
        q(
          "What is a lambda in Python?",
          [
            "A small anonymous function",
            "A module import",
            "A class definition",
            "A loop type",
          ],
          0,
          "lambda creates a small unnamed function, like lambda x: x + 1.",
        ),
        q(
          "Which statement is used for exception handling?",
          ["try-except", "try-catch", "catch-except", "try-finally"],
          0,
          "Python uses try-except. try-catch is Java and JavaScript.",
        ),
        q(
          "What is a generator in Python?",
          [
            "An iterator that yields values",
            "A list with lazy evaluation",
            "A function that returns a list",
            "A data structure",
          ],
          0,
          "A generator uses yield to produce values one at a time instead of building a whole list.",
        ),
        q(
          "What is the GIL in Python?",
          [
            "Global Interpreter Lock",
            "General Input/Output",
            "Graphics Interface Library",
            "Global Iteration Loop",
          ],
          0,
          "The GIL is a lock that lets only one thread run Python bytecode at a time.",
        ),
      ],
    },
  },
  javascript: {
    L1: {
      passingScore: 3,
      questions: [
        q(
          "Which function displays a message in the console?",
          ["print()", "console.log()", "display()", "show()"],
          1,
          "console.log() writes to the console. print() is Python, and display() and show() are not JavaScript functions.",
        ),
        q(
          "Which keyword declares a variable that can be reassigned?",
          ["const", "fixed", "let", "static"],
          2,
          "let allows reassignment. const cannot be reassigned, and fixed is not a keyword.",
        ),
        q(
          'What is the data type of "Hello"?',
          ["Number", "Boolean", "String", "Object"],
          2,
          "Text in quotes is a String.",
        ),
        q(
          "Which operator checks equality without type conversion?",
          ["=", "==", "===", "!="],
          2,
          "=== compares value and type. == converts types first, and a single = assigns a value.",
        ),
        q(
          "Which statement repeats code while a condition is true?",
          ["if", "while", "switch", "return"],
          1,
          "while keeps looping as long as its condition is true. if runs once, and switch picks a branch.",
        ),
      ],
    },
    L2: {
      passingScore: 3,
      questions: [
        q(
          "Which keyword defines a function?",
          ["func", "function", "method", "define"],
          1,
          "function declares a function. func and define are not JavaScript keywords.",
        ),
        q(
          "Which is a valid arrow function?",
          [
            "function => (a) { return a; }",
            "const double = (n) => n * 2;",
            "arrow(n) => n",
            "const double = > n * 2",
          ],
          1,
          "An arrow function is (params) => result. The others have the arrow or keyword in the wrong place.",
        ),
        q(
          "What is the index of the first array element?",
          ["0", "1", "-1", "It has no index"],
          0,
          "Array indexes start at zero.",
        ),
        q(
          "How do you access the name property of person?",
          ["person->name", "person(name)", "person.name", "person::name"],
          2,
          "Dot notation (person.name) reads a property. -> and :: belong to other languages.",
        ),
        q(
          "What does Array.filter() return?",
          [
            "A new array containing matching elements",
            "Always a number",
            "The original array with every item changed",
            "A single string",
          ],
          0,
          "filter() builds a new array of the items that pass the test and leaves the original alone.",
        ),
      ],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What does object destructuring allow you to do?",
          [
            "Delete every property",
            "Extract properties into variables",
            "Convert an object into a string automatically",
            "Prevent all property changes",
          ],
          1,
          "const { name } = person pulls properties out into their own variables.",
        ),
        q(
          "What does the spread syntax use?",
          ["...", "::", "**", "=>"],
          0,
          "Spread is three dots, like [...first, 3, 4]. => is an arrow function and ** is exponentiation.",
        ),
        q(
          "What does a Promise represent?",
          [
            "A guaranteed successful result",
            "An eventual result of an asynchronous operation",
            "A loop",
            "A class constructor only",
          ],
          1,
          "A Promise stands for a result that will arrive later, and it can succeed or fail.",
        ),
        q(
          "Which keyword is used to wait for a promise inside an async function?",
          ["wait", "yield", "await", "pause"],
          2,
          "await pauses the async function until the promise settles.",
        ),
        q(
          "Which statement imports a named export?",
          [
            'include add from "./math.js";',
            'import { add } from "./math.js";',
            'require add "./math.js";',
            'using add from "./math.js";',
          ],
          1,
          'Named imports use import { name } from "file".',
        ),
      ],
    },
  },
};

// Shuffle the answer options once when the app starts
export const QUIZZES = Object.fromEntries(
  Object.entries(RAW).map(([lang, levels]) => [
    lang,
    Object.fromEntries(
      Object.entries(levels).map(([level, quiz]) => [
        level,
        { ...quiz, questions: quiz.questions.map(shuffleOptions) },
      ]),
    ),
  ]),
);

// Every question from every language and level, tagged with where it came from
export const getAllQuestions = () => {
  const all = [];

  for (const [lang, levels] of Object.entries(QUIZZES)) {
    for (const [level, quiz] of Object.entries(levels)) {
      for (const question of quiz.questions) {
        all.push({ ...question, _lang: lang, _level: level });
      }
    }
  }

  return all;
};
