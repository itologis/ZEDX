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
      passingScore: 5,
      questions: [
        {
                "topicId": "c1",
                "question": "Where do CSS declarations appear inside a rule?",
                "options": [
                        "Inside curly braces",
                        "Inside angle brackets",
                        "After a colon only",
                        "Inside parentheses"
                ],
                "correct": 0,
                "explanation": "A CSS rule has a selector followed by a declaration block enclosed in curly braces."
        },
        {
                "topicId": "c2",
                "question": "Which selector targets an element with id=\"panel\"?",
                "options": [
                        "#panel",
                        ".panel",
                        "panel",
                        "*panel"
                ],
                "correct": 0,
                "explanation": "The # prefix selects an element by its id. A dot selects a class."
        },
        {
                "topicId": "c17",
                "question": "Which syntax starts a CSS comment?",
                "options": [
                        "/*",
                        "//",
                        "<!--",
                        "**"
                ],
                "correct": 0,
                "explanation": "CSS comments begin with /* and end with */."
        },
        {
                "topicId": "c4",
                "question": "Which property changes the color of text?",
                "options": [
                        "color",
                        "background",
                        "font-style",
                        "text-fill"
                ],
                "correct": 0,
                "explanation": "color sets the foreground text color. background controls the background."
        },
        {
                "topicId": "c14",
                "question": "Which unit is relative to the root element's font size?",
                "options": [
                        "rem",
                        "em",
                        "px",
                        "vw"
                ],
                "correct": 0,
                "explanation": "rem is relative to the root font size. em is relative to the relevant element's font size."
        },
        {
                "topicId": "c5",
                "question": "Which box-model layer creates space between the content and the border?",
                "options": [
                        "padding",
                        "margin",
                        "outline",
                        "gap"
                ],
                "correct": 0,
                "explanation": "Padding is inside the border around the content. Margin is outside the border."
        },
        {
                "topicId": "c18",
                "question": "Which display value normally starts a new line and takes the available width?",
                "options": [
                        "block",
                        "inline",
                        "none",
                        "contents"
                ],
                "correct": 0,
                "explanation": "A block box normally begins on a new line and fills the available inline space."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "c3",
                "question": "Which combinator selects only the direct children of an element?",
                "options": [
                        ">",
                        " ",
                        "+",
                        "~"
                ],
                "correct": 0,
                "explanation": "The child combinator > selects direct children, not deeper descendants."
        },
        {
                "topicId": "c9",
                "question": "Which CSS property controls the vertical space between lines of text?",
                "options": [
                        "line-height",
                        "letter-spacing",
                        "font-style",
                        "text-align"
                ],
                "correct": 0,
                "explanation": "line-height controls the height of a line box and the vertical rhythm of text."
        },
        {
                "topicId": "c10",
                "question": "Which background-size value scales an image to cover the entire box?",
                "options": [
                        "cover",
                        "contain",
                        "repeat",
                        "auto-fit"
                ],
                "correct": 0,
                "explanation": "cover scales the background image until the box is fully covered, possibly cropping part of the image."
        },
        {
                "topicId": "c11",
                "question": "Which pseudo-class targets a control while it has keyboard focus?",
                "options": [
                        ":focus",
                        ":hover",
                        "::before",
                        ":visited"
                ],
                "correct": 0,
                "explanation": ":focus applies while the element has focus. ::before is a pseudo-element."
        },
        {
                "topicId": "c12",
                "question": "Which pseudo-element inserts generated content before an element's content?",
                "options": [
                        "::before",
                        ":hover",
                        "::first-child",
                        ":focus"
                ],
                "correct": 0,
                "explanation": "::before creates a generated box before the element's content."
        },
        {
                "topicId": "c19",
                "question": "Which display value creates a block formatting context that contains floats?",
                "options": [
                        "flow-root",
                        "inline",
                        "contents",
                        "table-row"
                ],
                "correct": 0,
                "explanation": "display: flow-root establishes a new block formatting context and contains floated descendants."
        },
        {
                "topicId": "c20",
                "question": "What happens when opacity: 0.5 is applied to a parent element?",
                "options": [
                        "The parent and its rendered children become translucent",
                        "Only the background color changes",
                        "The element doubles in size",
                        "The element leaves normal flow"
                ],
                "correct": 0,
                "explanation": "Opacity affects the rendered element as a whole, including its descendants."
        },
        {
                "topicId": "c21",
                "question": "Which property draws a focus indicator without changing the element's layout size?",
                "options": [
                        "outline",
                        "border-width",
                        "margin",
                        "box-sizing"
                ],
                "correct": 0,
                "explanation": "An outline is painted outside the border and does not participate in the element's layout size."
        }
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
      passingScore: 7,
      questions: [
        {
                "topicId": "h1",
                "question": "Which declaration tells the browser that this document uses HTML5?",
                "options": [
                        "<!DOCTYPE html>",
                        "<html5>",
                        "<doctype>",
                        "<head>"
                ],
                "correct": 0,
                "explanation": "The doctype declaration identifies an HTML document as using the modern HTML standard."
        },
        {
                "topicId": "h2",
                "question": "Which heading element represents the highest-level heading?",
                "options": [
                        "<h1>",
                        "<h6>",
                        "<head>",
                        "<heading>"
                ],
                "correct": 0,
                "explanation": "h1 is the highest-level heading element. h2 through h6 represent lower heading levels."
        },
        {
                "topicId": "h3",
                "question": "Which element marks a paragraph of text?",
                "options": [
                        "<p>",
                        "<text>",
                        "<para>",
                        "<body>"
                ],
                "correct": 0,
                "explanation": "The p element represents a paragraph. The body contains the document's visible page content."
        },
        {
                "topicId": "h10",
                "question": "Which semantic element identifies the primary content of a page?",
                "options": [
                        "<main>",
                        "<aside>",
                        "<footer>",
                        "<span>"
                ],
                "correct": 0,
                "explanation": "main identifies the page's primary content, while aside is complementary content and footer describes footer content."
        },
        {
                "topicId": "h9",
                "question": "Which element is an inline generic container?",
                "options": [
                        "<span>",
                        "<div>",
                        "<main>",
                        "<section>"
                ],
                "correct": 0,
                "explanation": "span is an inline generic container. div is a block container, and main and section have semantic meaning."
        },
        {
                "topicId": "h4",
                "question": "Which attribute provides the destination of a hyperlink?",
                "options": [
                        "href",
                        "src",
                        "alt",
                        "target"
                ],
                "correct": 0,
                "explanation": "href contains the destination address for an anchor link."
        },
        {
                "topicId": "h5",
                "question": "Which attribute provides alternative text for an informative image?",
                "options": [
                        "alt",
                        "href",
                        "title",
                        "name"
                ],
                "correct": 0,
                "explanation": "alt provides a text alternative that can communicate the image's purpose to people who cannot see it."
        },
        {
                "topicId": "h6",
                "question": "Which element creates an unordered list?",
                "options": [
                        "<ul>",
                        "<ol>",
                        "<li>",
                        "<dl>"
                ],
                "correct": 0,
                "explanation": "ul groups items when their order is not important. Each item belongs in an li element."
        },
        {
                "topicId": "h7",
                "question": "Which element marks a regular data cell in a table?",
                "options": [
                        "<td>",
                        "<th>",
                        "<tr>",
                        "<caption>"
                ],
                "correct": 0,
                "explanation": "td represents an ordinary data cell. th is a header cell and tr groups cells into a row."
        },
        {
                "topicId": "h8",
                "question": "Which attribute gives a form control its submitted field name?",
                "options": [
                        "name",
                        "placeholder",
                        "class",
                        "style"
                ],
                "correct": 0,
                "explanation": "The name attribute becomes the key for the control's value in submitted form data."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "h16",
                "question": "Which attribute makes a form control required before normal browser submission?",
                "options": [
                        "required",
                        "placeholder",
                        "autofocus",
                        "autocomplete"
                ],
                "correct": 0,
                "explanation": "required participates in browser constraint validation and prevents normal submission when the control has no value."
        },
        {
                "topicId": "h16",
                "question": "Which pair sets the inclusive numeric range for an input?",
                "options": [
                        "min and max",
                        "low and high",
                        "start and end",
                        "from and to"
                ],
                "correct": 0,
                "explanation": "The min and max attributes define the permitted lower and upper values for supported input types."
        },
        {
                "topicId": "h17",
                "question": "What does the sandbox attribute do on an iframe?",
                "options": [
                        "Restricts capabilities of embedded content",
                        "Makes the frame responsive",
                        "Compresses the embedded page",
                        "Names the embedded document"
                ],
                "correct": 0,
                "explanation": "sandbox applies restrictions to the embedded browsing context. Tokens selectively relax specific restrictions."
        },
        {
                "topicId": "h17",
                "question": "Why should allow-scripts and allow-same-origin be avoided together for untrusted same-origin iframe content?",
                "options": [
                        "The framed page may be able to escape the sandbox",
                        "The frame cannot display text",
                        "The browser disables all CSS",
                        "The iframe becomes a download"
                ],
                "correct": 0,
                "explanation": "For same-origin untrusted content, the combination can let the framed page remove its sandbox and operate with the embedding page's privileges."
        },
        {
                "topicId": "h18",
                "question": "Which element pair provides a native disclosure widget?",
                "options": [
                        "details and summary",
                        "dialog and canvas",
                        "nav and main",
                        "label and output"
                ],
                "correct": 0,
                "explanation": "details creates the disclosure widget and summary provides its visible heading or control."
        },
        {
                "topicId": "h18",
                "question": "Which method opens a dialog as a modal?",
                "options": [
                        "showModal()",
                        "show()",
                        "openModal()",
                        "displayModal()"
                ],
                "correct": 0,
                "explanation": "showModal() opens a dialog in the top layer and makes the rest of the document inert."
        },
        {
                "topicId": "h19",
                "question": "How is data-book-id exposed through an element's dataset property?",
                "options": [
                        "dataset.bookId",
                        "dataset.data-book-id",
                        "dataset.book_id",
                        "dataset[0]"
                ],
                "correct": 0,
                "explanation": "Hyphenated data attribute names become camelCase properties on dataset."
        },
        {
                "topicId": "h19",
                "question": "Which attribute should store a small custom value on an HTML element?",
                "options": [
                        "data-book-id",
                        "custom-book-id",
                        "value-id",
                        "meta-book"
                ],
                "correct": 0,
                "explanation": "Custom attributes use the data- prefix and can be read through the element's dataset property."
        }
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
      passingScore: 6,
      questions: [
        {
                "topicId": "j1",
                "question": "Which method is the entry point of a standard Java application?",
                "options": [
                        "public static void main(String[] args)",
                        "public void start()",
                        "static int main()",
                        "void run()"
                ],
                "correct": 0,
                "explanation": "The Java launcher starts a standard application by calling the public static main method with a String array."
        },
        {
                "topicId": "j2",
                "question": "Which Java type stores a whole number such as 25?",
                "options": [
                        "int",
                        "double",
                        "boolean",
                        "String"
                ],
                "correct": 0,
                "explanation": "int stores whole-number values. double stores floating-point values and boolean stores true or false."
        },
        {
                "topicId": "j17",
                "question": "What value does 17 % 5 produce in Java?",
                "options": [
                        "2",
                        "3",
                        "3.4",
                        "5"
                ],
                "correct": 0,
                "explanation": "The remainder is 2 because five fits into seventeen three times, leaving two."
        },
        {
                "topicId": "j16",
                "question": "Which flowchart symbol represents a yes-or-no decision?",
                "options": [
                        "Diamond",
                        "Rectangle",
                        "Parallelogram",
                        "Oval"
                ],
                "correct": 0,
                "explanation": "A diamond represents a decision and normally has outgoing branches for its possible results."
        },
        {
                "topicId": "j18",
                "question": "Which source is passed to Scanner to read keyboard input?",
                "options": [
                        "System.in",
                        "System.out",
                        "System.err",
                        "Scanner.out"
                ],
                "correct": 0,
                "explanation": "System.in is the standard input stream. Scanner can read typed values from it."
        },
        {
                "topicId": "j4",
                "question": "Which keyword begins a conditional branch in Java?",
                "options": [
                        "if",
                        "for",
                        "class",
                        "return"
                ],
                "correct": 0,
                "explanation": "if begins a conditional statement that runs its block when the Boolean condition is true."
        },
        {
                "topicId": "j5",
                "question": "Which loop is commonly used to repeat a block a known number of times?",
                "options": [
                        "for",
                        "switch",
                        "try",
                        "import"
                ],
                "correct": 0,
                "explanation": "A for loop is commonly used when the program knows the counting or repetition pattern."
        },
        {
                "topicId": "j3",
                "question": "Which return type declares that a Java method sends an integer result back to its caller?",
                "options": [
                        "int",
                        "void",
                        "class",
                        "new"
                ],
                "correct": 0,
                "explanation": "The return type appears before the method name. int means the method returns an integer."
        },
        {
                "topicId": "j10",
                "question": "What is the first valid index in a Java array?",
                "options": [
                        "0",
                        "1",
                        "-1",
                        "The array length"
                ],
                "correct": 0,
                "explanation": "Java array indexes begin at zero, so the first element is stored at index 0."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "j6",
                "question": "What is a constructor used for in a Java class?",
                "options": [
                        "Initialize a new object",
                        "Destroy an object manually",
                        "Import a package",
                        "Catch an exception"
                ],
                "correct": 0,
                "explanation": "A constructor runs when an object is created and initializes its starting state."
        },
        {
                "topicId": "j6",
                "question": "Which keyword creates an instance of a class?",
                "options": [
                        "new",
                        "this",
                        "extends",
                        "static"
                ],
                "correct": 0,
                "explanation": "new creates an object by invoking a constructor."
        },
        {
                "topicId": "j7",
                "question": "Which keyword declares that one Java class inherits from another class?",
                "options": [
                        "extends",
                        "implements",
                        "inherits",
                        "super"
                ],
                "correct": 0,
                "explanation": "extends declares class inheritance in Java."
        },
        {
                "topicId": "j7",
                "question": "What is polymorphism in object-oriented programming?",
                "options": [
                        "One interface or parent type can refer to different concrete behaviors",
                        "A class can contain only one method",
                        "Every object must have the same fields",
                        "A variable cannot change"
                ],
                "correct": 0,
                "explanation": "Polymorphism lets code use a shared type while different implementations provide their own behavior."
        },
        {
                "topicId": "j8",
                "question": "Which keyword connects a class to an interface it implements?",
                "options": [
                        "implements",
                        "extends",
                        "instanceof",
                        "package"
                ],
                "correct": 0,
                "explanation": "A class uses implements to promise that it provides the interface's required methods."
        },
        {
                "topicId": "j9",
                "question": "Which block handles an exception thrown from a try block?",
                "options": [
                        "catch",
                        "finally only",
                        "throws",
                        "import"
                ],
                "correct": 0,
                "explanation": "A matching catch block handles an exception that occurs in the associated try block."
        },
        {
                "topicId": "j9",
                "question": "Which keyword can explicitly throw an exception from a method?",
                "options": [
                        "throw",
                        "throws",
                        "catch",
                        "final"
                ],
                "correct": 0,
                "explanation": "throw raises an exception object. throws declares possible exceptions in a method signature."
        },
        {
                "topicId": "j19",
                "question": "What must be true before using binary search on a numeric array?",
                "options": [
                        "The array must be sorted",
                        "The array must be reversed",
                        "The array must have an even length",
                        "Every value must be unique"
                ],
                "correct": 0,
                "explanation": "Binary search relies on sorted order to decide which half of the array can be discarded."
        }
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
      passingScore: 6,
      questions: [
        {
                "topicId": "p1",
                "question": "Which function displays text in the Python console?",
                "options": [
                        "print()",
                        "input()",
                        "len()",
                        "type()"
                ],
                "correct": 0,
                "explanation": "print displays values to the standard output stream."
        },
        {
                "topicId": "p2",
                "question": "How do you assign the value 10 to a variable named score?",
                "options": [
                        "score = 10",
                        "int score = 10",
                        "score := 10",
                        "let score = 10"
                ],
                "correct": 0,
                "explanation": "Python assigns a value with the equals sign and does not require a type declaration for an ordinary variable."
        },
        {
                "topicId": "p16",
                "question": "Which operator raises a number to a power in Python?",
                "options": [
                        "**",
                        "^",
                        "//",
                        "%"
                ],
                "correct": 0,
                "explanation": "The double-asterisk operator performs exponentiation. The caret is a bitwise XOR operator."
        },
        {
                "topicId": "p17",
                "question": "What type of value does input() return?",
                "options": [
                        "str",
                        "int",
                        "bool",
                        "float"
                ],
                "correct": 0,
                "explanation": "input reads a line from the user and returns it as a string."
        },
        {
                "topicId": "p3",
                "question": "Which keyword begins a conditional statement in Python?",
                "options": [
                        "if",
                        "when",
                        "switch",
                        "case"
                ],
                "correct": 0,
                "explanation": "if begins a conditional statement and is followed by a Boolean expression and a colon."
        },
        {
                "topicId": "p4",
                "question": "Which keyword begins a loop that visits each item in a sequence?",
                "options": [
                        "for",
                        "repeat",
                        "foreach",
                        "loop"
                ],
                "correct": 0,
                "explanation": "for iterates over the items in an iterable such as a list or string."
        },
        {
                "topicId": "p5",
                "question": "Which keyword defines a function in Python?",
                "options": [
                        "def",
                        "function",
                        "method",
                        "lambda"
                ],
                "correct": 0,
                "explanation": "def introduces a named function definition."
        },
        {
                "topicId": "p6",
                "question": "Which method adds one item to the end of a Python list?",
                "options": [
                        "append()",
                        "push()",
                        "addEnd()",
                        "insertLast()"
                ],
                "correct": 0,
                "explanation": "append adds one item to the end of a list and changes the original list."
        },
        {
                "topicId": "p18",
                "question": "Which method removes whitespace from both ends of a Python string?",
                "options": [
                        "strip()",
                        "split()",
                        "join()",
                        "find()"
                ],
                "correct": 0,
                "explanation": "strip returns a new string without whitespace at the beginning or end."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "p7",
                "question": "Which Python structure stores values under named keys?",
                "options": [
                        "dictionary",
                        "tuple",
                        "string",
                        "range"
                ],
                "correct": 0,
                "explanation": "A dictionary maps keys to values, allowing a program to retrieve a value using its key."
        },
        {
                "topicId": "p7",
                "question": "How do you read the value stored under the key \"city\" in a dictionary named profile?",
                "options": [
                        "profile[\"city\"]",
                        "profile.city()",
                        "profile->city",
                        "profile( city )"
                ],
                "correct": 0,
                "explanation": "Square-bracket lookup retrieves the value associated with a dictionary key."
        },
        {
                "topicId": "p8",
                "question": "Which statement about a tuple is correct?",
                "options": [
                        "A tuple is immutable after creation",
                        "A tuple can only store numbers",
                        "A tuple must contain exactly two items",
                        "A tuple is always sorted"
                ],
                "correct": 0,
                "explanation": "A tuple is an ordered, immutable sequence. It can contain different types and any number of items."
        },
        {
                "topicId": "p9",
                "question": "Which pattern safely closes a file after its block finishes?",
                "options": [
                        "with open(\"notes.txt\") as file:",
                        "open.close(\"notes.txt\")",
                        "try file.close:",
                        "auto file = open"
                ],
                "correct": 0,
                "explanation": "The with statement uses a context manager to close the file when the block exits."
        },
        {
                "topicId": "p10",
                "question": "What does a list comprehension produce?",
                "options": [
                        "A new list built from an iterable",
                        "A new function",
                        "A dictionary key",
                        "A file handle"
                ],
                "correct": 0,
                "explanation": "A list comprehension builds a list by evaluating an expression for each item in an iterable."
        },
        {
                "topicId": "p19",
                "question": "What is the purpose of __init__ in a Python class?",
                "options": [
                        "Initialize a new instance",
                        "Delete an instance",
                        "Import a module",
                        "Start the Python interpreter"
                ],
                "correct": 0,
                "explanation": "__init__ initializes an instance after it has been created."
        },
        {
                "topicId": "p9",
                "question": "Which method reads the remaining contents of an open text file as one string?",
                "options": [
                        "read()",
                        "write()",
                        "close()",
                        "append()"
                ],
                "correct": 0,
                "explanation": "read returns the remaining file contents as text when the file is opened in text mode."
        },
        {
                "topicId": "p10",
                "question": "Which expression keeps only even numbers from values in a list comprehension?",
                "options": [
                        "[n for n in values if n % 2 == 0]",
                        "[n if n % 2 for values]",
                        "values[even]",
                        "(n for n in values)"
                ],
                "correct": 0,
                "explanation": "The if clause filters the iterable so only values whose remainder is zero are included."
        }
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
      passingScore: 6,
      questions: [
        {
                "topicId": "js1",
                "question": "Which function writes a message to the browser console?",
                "options": [
                        "console.log()",
                        "alert.log()",
                        "document.print()",
                        "window.write()"
                ],
                "correct": 0,
                "explanation": "console.log writes a value to the developer console."
        },
        {
                "topicId": "js2",
                "question": "Which keyword declares a variable that can be reassigned?",
                "options": [
                        "let",
                        "const",
                        "static",
                        "fixed"
                ],
                "correct": 0,
                "explanation": "let declares a block-scoped variable that can be reassigned. const cannot be reassigned."
        },
        {
                "topicId": "js3",
                "question": "What is the data type of the value \"Hello\"?",
                "options": [
                        "string",
                        "number",
                        "boolean",
                        "object"
                ],
                "correct": 0,
                "explanation": "Text enclosed in quotes is a string value."
        },
        {
                "topicId": "js17",
                "question": "Which operator compares both type and value without conversion?",
                "options": [
                        "===",
                        "==",
                        "=",
                        "!="
                ],
                "correct": 0,
                "explanation": "Strict equality === checks both type and value without converting operands."
        },
        {
                "topicId": "js4",
                "question": "Which keyword begins a conditional statement in JavaScript?",
                "options": [
                        "if",
                        "loop",
                        "case-only",
                        "when"
                ],
                "correct": 0,
                "explanation": "if begins a conditional branch that runs when its expression is truthy."
        },
        {
                "topicId": "js5",
                "question": "Which loop repeats while its condition remains true?",
                "options": [
                        "while",
                        "switch",
                        "try",
                        "import"
                ],
                "correct": 0,
                "explanation": "while checks its condition before each repetition and continues while it is true."
        },
        {
                "topicId": "js6",
                "question": "How do you call a function named greet that has no parameters?",
                "options": [
                        "greet()",
                        "call greet",
                        "function.greet",
                        "greet{}"
                ],
                "correct": 0,
                "explanation": "Writing the function name followed by parentheses calls the function."
        },
        {
                "topicId": "js8",
                "question": "Which index selects the first item in a JavaScript array?",
                "options": [
                        "0",
                        "1",
                        "-1",
                        "length"
                ],
                "correct": 0,
                "explanation": "JavaScript arrays use zero-based indexes, so the first item is at index 0."
        },
        {
                "topicId": "js9",
                "question": "Which expression reads the name property from an object named user?",
                "options": [
                        "user.name",
                        "user->name",
                        "user(name)",
                        "user::name"
                ],
                "correct": 0,
                "explanation": "Dot notation reads a property when its name is known in the source code."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "js7",
                "question": "Which is a valid arrow function that returns the sum of a and b?",
                "options": [
                        "(a, b) => a + b",
                        "function => a + b",
                        "(a, b) -> a + b",
                        "arrow(a, b) { a + b }"
                ],
                "correct": 0,
                "explanation": "An arrow function uses => between its parameter list and expression or function body."
        },
        {
                "topicId": "js10",
                "question": "What does Array.filter() return?",
                "options": [
                        "A new array containing items that pass the test",
                        "The first matching item only",
                        "The original array sorted",
                        "A number of matching items"
                ],
                "correct": 0,
                "explanation": "filter creates a new array containing each item for which the callback returns a truthy value."
        },
        {
                "topicId": "js10",
                "question": "Which array method creates a new array by transforming each item?",
                "options": [
                        "map()",
                        "pop()",
                        "push()",
                        "shift()"
                ],
                "correct": 0,
                "explanation": "map calls a callback for each item and returns a new array of the callback results."
        },
        {
                "topicId": "js18",
                "question": "Which syntax inserts an expression into a template literal?",
                "options": [
                        "${expression}",
                        "%expression%",
                        "{expression}",
                        "+{expression}"
                ],
                "correct": 0,
                "explanation": "Template literals use the dollar sign followed by braces to evaluate and insert an expression."
        },
        {
                "topicId": "js16",
                "question": "Which keyword creates an instance of a JavaScript class?",
                "options": [
                        "new",
                        "class",
                        "this",
                        "extends"
                ],
                "correct": 0,
                "explanation": "new constructs an instance by calling the class constructor."
        },
        {
                "topicId": "js19",
                "question": "Which property inserts plain text without parsing it as HTML?",
                "options": [
                        "textContent",
                        "innerHTML",
                        "outerHTML",
                        "document.write"
                ],
                "correct": 0,
                "explanation": "textContent treats the supplied value as text instead of parsing it as markup."
        },
        {
                "topicId": "js20",
                "question": "What is event delegation?",
                "options": [
                        "Handling descendant events from a shared ancestor",
                        "Creating a separate window for each event",
                        "Blocking event bubbling everywhere",
                        "Replacing event listeners with CSS"
                ],
                "correct": 0,
                "explanation": "Event delegation handles bubbling events at a shared ancestor instead of adding one listener to every child."
        },
        {
                "topicId": "js19",
                "question": "Which API can find the first element matching a CSS selector?",
                "options": [
                        "querySelector()",
                        "getAllStyles()",
                        "findElementByCSS()",
                        "selectFirstNode()"
                ],
                "correct": 0,
                "explanation": "querySelector returns the first descendant that matches the supplied CSS selector."
        }
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
  php: {
    L1: {
      passingScore: 6,
      questions: [
        {
                "topicId": "php1",
                "question": "Which opening tag begins a standard PHP block?",
                "options": [
                        "<?php",
                        "<php>",
                        "<?",
                        "<script php>"
                ],
                "correct": 0,
                "explanation": "The <?php opening tag starts a PHP code block in a standard PHP file."
        },
        {
                "topicId": "php2",
                "question": "Which character begins the name of a PHP variable?",
                "options": [
                        "$",
                        "#",
                        "@",
                        "%"
                ],
                "correct": 0,
                "explanation": "PHP variable names begin with a dollar sign."
        },
        {
                "topicId": "php16",
                "question": "Which operator calculates the remainder after division in PHP?",
                "options": [
                        "%",
                        "/",
                        "**",
                        "."
                ],
                "correct": 0,
                "explanation": "The percent operator returns the remainder after division."
        },
        {
                "topicId": "php3",
                "question": "Which keyword begins a conditional statement in PHP?",
                "options": [
                        "if",
                        "when",
                        "case-only",
                        "check"
                ],
                "correct": 0,
                "explanation": "if begins a conditional statement and is followed by a condition in parentheses."
        },
        {
                "topicId": "php4",
                "question": "Which loop repeats while a condition remains true?",
                "options": [
                        "while",
                        "switch",
                        "try",
                        "include"
                ],
                "correct": 0,
                "explanation": "while repeats its block as long as its condition evaluates to true."
        },
        {
                "topicId": "php5",
                "question": "Which keyword declares a named function in PHP?",
                "options": [
                        "function",
                        "def",
                        "method",
                        "lambda"
                ],
                "correct": 0,
                "explanation": "function introduces a named function declaration in PHP."
        },
        {
                "topicId": "php6",
                "question": "Which expression reads the first value from an indexed PHP array named colors?",
                "options": [
                        "$colors[0]",
                        "$colors[1]",
                        "$colors.first()",
                        "$colors->0"
                ],
                "correct": 0,
                "explanation": "Indexed PHP arrays commonly start at key 0, so $colors[0] reads the first item."
        },
        {
                "topicId": "php8",
                "question": "Which operator joins two strings in PHP?",
                "options": [
                        ".",
                        "+",
                        "&&",
                        "::"
                ],
                "correct": 0,
                "explanation": "PHP uses the dot operator for string concatenation."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "php7",
                "question": "How do you read the value stored under the key \"city\" in an associative array named profile?",
                "options": [
                        "$profile[\"city\"]",
                        "$profile.city()",
                        "$profile->city",
                        "$profile(\"city\")"
                ],
                "correct": 0,
                "explanation": "Square brackets with the key retrieve a value from an associative array."
        },
        {
                "topicId": "php9",
                "question": "Which superglobal normally contains values submitted by a form using method=\"post\"?",
                "options": [
                        "$_POST",
                        "$_GET",
                        "$_SERVER",
                        "$_FILES"
                ],
                "correct": 0,
                "explanation": "$_POST contains values submitted in the request body by a form using method POST."
        },
        {
                "topicId": "php9",
                "question": "Why should form input be validated on the server even when HTML has required and type attributes?",
                "options": [
                        "Clients can bypass browser checks",
                        "The browser encrypts every value",
                        "HTML attributes are stored in SQL",
                        "Server code cannot read input"
                ],
                "correct": 0,
                "explanation": "Browser validation improves feedback but can be bypassed, so the server must validate incoming data too."
        },
        {
                "topicId": "php10",
                "question": "Which statement includes a file and prevents it from being included again if it was already loaded?",
                "options": [
                        "require_once",
                        "include_again",
                        "import_once",
                        "load_once"
                ],
                "correct": 0,
                "explanation": "require_once includes the file and prevents the same file from being included again during the request."
        },
        {
                "topicId": "php17",
                "question": "Which keyword declares a constant inside a PHP class?",
                "options": [
                        "const",
                        "var",
                        "let",
                        "global"
                ],
                "correct": 0,
                "explanation": "Class constants are declared with const and accessed using the scope-resolution operator."
        },
        {
                "topicId": "php18",
                "question": "When should header() normally be called?",
                "options": [
                        "Before response output is sent",
                        "After the page's HTML is printed",
                        "Only inside a CSS file",
                        "After the browser closes"
                ],
                "correct": 0,
                "explanation": "HTTP headers must be sent before response body output is committed."
        },
        {
                "topicId": "php19",
                "question": "Which function parses JSON text into a PHP value?",
                "options": [
                        "json_decode()",
                        "json_encode()",
                        "json_read()",
                        "parse_json()"
                ],
                "correct": 0,
                "explanation": "json_decode parses JSON text into a PHP value such as an array or object."
        },
        {
                "topicId": "php7",
                "question": "Which function checks whether an array key exists even when its value is null?",
                "options": [
                        "array_key_exists()",
                        "count()",
                        "sort()",
                        "strlen()"
                ],
                "correct": 0,
                "explanation": "array_key_exists checks for the key itself, including when the stored value is null."
        }
],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What is a class in PHP?",
          ["A reusable template for objects", "A loop statement", "A SQL query", "A CSS rule"],
          0,
          "A class is a blueprint from which objects are created.",
        ),
        q(
          "Which keyword creates an instance of a class?",
          ["new", "instanceof", "extends", "include"],
          0,
          "The new keyword instantiates an object from a class.",
        ),
        q(
          "What does try/catch do?",
          ["Skips code execution", "Handles thrown exceptions", "Creates arrays", "Starts a loop"],
          1,
          "try/catch catches exceptions and interrupts normal error flow.",
        ),
        q(
          "Which statement is used to include a file only once?",
          ["include_once", "copy_once", "require_if", "load_once"],
          0,
          "include_once prevents the same file from being included multiple times.",
        ),
        q(
          "What is the purpose of a prepared statement in PDO?",
          ["To speed up HTML rendering", "To protect against SQL injection", "To draw a database diagram", "To rename variables"],
          1,
          "Prepared statements separate SQL code from user input, reducing injection risk.",
        ),
      ],
    },
  },
  sql: {
    L1: {
      passingScore: 4,
      questions: [
        {
                "topicId": "sql6",
                "question": "Which SQL statement creates a new table structure?",
                "options": [
                        "CREATE TABLE",
                        "SELECT TABLE",
                        "INSERT TABLE",
                        "MAKE TABLE"
                ],
                "correct": 0,
                "explanation": "CREATE TABLE defines a table's columns and constraints before rows are added."
        },
        {
                "topicId": "sql1",
                "question": "Which SQL keyword retrieves data from a table?",
                "options": [
                        "SELECT",
                        "GET",
                        "FETCH TABLE",
                        "OPEN"
                ],
                "correct": 0,
                "explanation": "SELECT retrieves rows and columns from one or more tables."
        },
        {
                "topicId": "sql2",
                "question": "What does the WHERE clause do?",
                "options": [
                        "Filters rows using a condition",
                        "Sorts all rows",
                        "Creates a new column",
                        "Deletes the table"
                ],
                "correct": 0,
                "explanation": "WHERE keeps only rows that satisfy the supplied condition."
        },
        {
                "topicId": "sql3",
                "question": "Which sort-direction keyword orders query results from highest to lowest?",
                "options": [
                        "DESC",
                        "ASC",
                        "ORDER",
                        "LIMIT"
                ],
                "correct": 0,
                "explanation": "DESC sorts in descending order. ASC sorts in ascending order."
        },
        {
                "topicId": "sql4",
                "question": "Which statement adds a new row to a table?",
                "options": [
                        "INSERT INTO",
                        "UPDATE",
                        "ALTER TABLE",
                        "DROP"
                ],
                "correct": 0,
                "explanation": "INSERT INTO adds a new record to a table."
        },
        {
                "topicId": "sql5",
                "question": "Which clause limits an UPDATE statement to rows that match a condition?",
                "options": [
                        "WHERE",
                        "ORDER BY",
                        "GROUP BY",
                        "HAVING"
                ],
                "correct": 0,
                "explanation": "WHERE selects the rows to change. Without it, an UPDATE can affect every row in the table."
        }
],
    },
    L2: {
      passingScore: 6,
      questions: [
        {
                "topicId": "sql16",
                "question": "What does an entity-relationship diagram show?",
                "options": [
                        "Entities and the relationships between them",
                        "Only the colors of a database interface",
                        "The order of SQL keywords",
                        "A list of stored procedures"
                ],
                "correct": 0,
                "explanation": "An ERD models entities, their attributes, and the relationships between them."
        },
        {
                "topicId": "sql7",
                "question": "What does BETWEEN normally check for a numeric range?",
                "options": [
                        "Values within an inclusive lower and upper bound",
                        "Only values greater than the upper bound",
                        "Text values that start with a prefix",
                        "Whether two columns are equal"
                ],
                "correct": 0,
                "explanation": "BETWEEN includes both endpoints of the range."
        },
        {
                "topicId": "sql8",
                "question": "What does COUNT(*) count?",
                "options": [
                        "Rows in the result set",
                        "Only non-null values in one named column",
                        "Distinct tables",
                        "The number of columns"
                ],
                "correct": 0,
                "explanation": "COUNT(*) counts rows, including rows where some individual column values are NULL."
        },
        {
                "topicId": "sql9",
                "question": "Which clause filters groups after GROUP BY has formed them?",
                "options": [
                        "HAVING",
                        "WHERE",
                        "ORDER BY",
                        "FROM"
                ],
                "correct": 0,
                "explanation": "HAVING filters grouped results, while WHERE filters rows before grouping."
        },
        {
                "topicId": "sql10",
                "question": "Which condition is commonly used to match related rows in an INNER JOIN?",
                "options": [
                        "A key from one table equals a related key in another",
                        "Both tables have the same number of rows",
                        "The two table names share a prefix",
                        "Every selected value is unique"
                ],
                "correct": 0,
                "explanation": "An INNER JOIN commonly matches a foreign-key value with the referenced primary-key value."
        },
        {
                "topicId": "sql17",
                "question": "What is the difference between UNION and UNION ALL?",
                "options": [
                        "UNION removes duplicate rows; UNION ALL keeps them",
                        "UNION updates rows; UNION ALL inserts rows",
                        "UNION sorts by date; UNION ALL sorts by name",
                        "They are identical"
                ],
                "correct": 0,
                "explanation": "UNION removes duplicate result rows. UNION ALL preserves duplicates."
        },
        {
                "topicId": "sql18",
                "question": "Which function rounds a number to a chosen number of decimal places?",
                "options": [
                        "ROUND()",
                        "COUNT()",
                        "UPPER()",
                        "CURRENT_DATE"
                ],
                "correct": 0,
                "explanation": "ROUND can return a numeric value rounded to the requested number of decimal places."
        },
        {
                "topicId": "sql19",
                "question": "What does a CASE expression return?",
                "options": [
                        "A value selected by its matching condition",
                        "A new database table",
                        "A stored procedure",
                        "A database connection"
                ],
                "correct": 0,
                "explanation": "CASE evaluates conditions and returns the result expression from the first matching branch."
        }
],
    },
    L3: {
      passingScore: 3,
      questions: [
        q(
          "What is a subquery?",
          ["A query inside another query", "A permanent table", "A text editor command", "A user table"],
          0,
          "Subqueries are nested queries used to compute or filter results inside a larger query.",
        ),
        q(
          "What is an index used for?",
          ["To store text files", "To speed up data lookup", "To rename columns", "To create tables"],
          1,
          "Indexes improve read performance for large tables by finding matching rows faster.",
        ),
        q(
          "What does a transaction guarantee?",
          ["All statements succeed or none do", "Only SELECT works", "The table is locked forever", "The data is deleted"],
          0,
          "Transactions group changes so they can be committed together or rolled back together.",
        ),
        q(
          "What is a view?",
          ["A saved query that acts like a virtual table", "A file extension", "A database server", "A primary key"],
          0,
          "A view stores a query definition and behaves like a table for reading purposes.",
        ),
        q(
          "Which function gives a row number across an ordered result set?",
          ["ROW_NUMBER()", "COUNT()", "CURRENT_DATE", "SUM()"],
          0,
          "ROW_NUMBER() assigns a unique number to each row in the window order.",
        ),
      ],
    },
  },
};

// Curriculum expansion: assess the newly added Intermediate and Advanced topics.


RAW["html"].L3.questions.push({"question":"Which classic-script attribute runs as soon as the downloaded file is ready?","options":["async","defer","type=module","nomodule"],"correct":0,"explanation":"async scripts execute as soon as downloading completes, so their order is not guaranteed."}, {"question":"What does cloneNode(true) request?","options":["A deep copy including descendants","A shallow copy only","Deletion of the original","Execution of scripts"],"correct":0,"explanation":"The true argument requests a deep clone containing descendant nodes."}, {"question":"What does a named slot do in a web component?","options":["Places supplied child content at a named location","Loads a module","Opens a new tab","Stores browser data"],"correct":0,"explanation":"A named slot receives a light-DOM child whose slot attribute matches the slot name."}, {"question":"What does rel=\"noopener\" prevent?","options":["The opened page controlling its opener","Images loading lazily","Forms accepting empty values","CSS declarations cascading"],"correct":0,"explanation":"noopener prevents the destination page from using window.opener to manipulate the original page."});
RAW["html"].L3.passingScore = Math.ceil(RAW["html"].L3.questions.length * 2 / 3);


RAW["css"].L3.questions.push({"question":"What is the argument order for clamp()?","options":["Minimum, preferred, maximum","Preferred, minimum, maximum","Maximum, preferred, minimum","Minimum, maximum, preferred"],"correct":0,"explanation":"clamp() takes the minimum, preferred value, and maximum in that order."}, {"question":"Do transforms normally change an element's original layout space?","options":["No, they change its visual rendering","Yes, they always increase width","Yes, they remove it from flow","Only rotate changes layout"],"correct":0,"explanation":"Transforms affect visual rendering without changing the element's normal-flow layout position."}, {"question":"Which property references a named @keyframes sequence?","options":["animation-name","transition-name","keyframe-id","motion-source"],"correct":0,"explanation":"animation-name tells the browser which keyframe sequence to apply."}, {"question":"What do cascade layers organize?","options":["Priority order of groups of CSS rules","HTML document structure","JavaScript imports","Image download order"],"correct":0,"explanation":"Cascade layers establish an explicit order for CSS rule groups."});
RAW["css"].L3.passingScore = Math.ceil(RAW["css"].L3.questions.length * 2 / 3);


RAW["java"].L3.questions.push({"question":"Which interface represents a collection of unique elements?","options":["Set","List","Map","Iterator"],"correct":0,"explanation":"Set represents elements without duplicates."}, {"question":"Why is try-with-resources useful for file operations?","options":["It closes resources automatically","It sorts file contents","It prevents all I/O errors","It changes files into folders"],"correct":0,"explanation":"Resources declared in try-with-resources are closed automatically when the block ends."}, {"question":"Which Swing method sizes a window to fit its preferred component sizes?","options":["pack()","bundle()","resizeAll()","layoutNow()"],"correct":0,"explanation":"pack() asks the layout manager and components for preferred sizes and sizes the window accordingly."}, {"question":"What does a sequence diagram emphasize?","options":["Messages exchanged between participants over time","The database's physical size","Only class inheritance","The interface color palette"],"correct":0,"explanation":"A sequence diagram models the order of interactions between participants in a scenario."}, {"question":"Why bind external values with PreparedStatement setters?","options":["To separate values from SQL structure","To run queries without a database","To grant database privileges","To convert SELECT into UPDATE"],"correct":0,"explanation":"Parameter binding separates data from SQL syntax and helps prevent SQL injection."}, {"question":"Which utility is designed as a reusable meeting point for a fixed group of threads?","options":["CyclicBarrier","CountDownLatch","HashMap","PreparedStatement"],"correct":0,"explanation":"CyclicBarrier coordinates a fixed number of threads at a common phase boundary and can be reused."});
RAW["java"].L3.passingScore = Math.ceil(RAW["java"].L3.questions.length * 2 / 3);


RAW["python"].L3.questions.push({"question":"What is a Python module?","options":["A Python file that can be imported","A virtual machine","A list of packages only","A database table"],"correct":0,"explanation":"A module is commonly a Python source file that defines reusable names."}, {"question":"Why use a virtual environment for a Python project?","options":["To isolate project dependencies","To compile Python into Java bytecode","To replace the operating system","To make all packages global"],"correct":0,"explanation":"An environment isolates installed packages so projects can use different dependency versions."}, {"question":"Do ordinary Python type hints automatically enforce types at runtime?","options":["No, they are mainly for tools and documentation","Yes, every assignment is checked","Only strings are checked","Only classes are checked"],"correct":0,"explanation":"Python does not automatically enforce ordinary type annotations during normal execution."}, {"question":"What is a unit test designed to check?","options":["A small unit of behavior in isolation","The entire operating system","Only interface colors","The internet connection"],"correct":0,"explanation":"A unit test checks a small function or component independently from unrelated parts."});
RAW["python"].L3.passingScore = Math.ceil(RAW["python"].L3.questions.length * 2 / 3);


RAW["javascript"].L3.questions.push({"question":"Which method converts valid JSON text into a JavaScript value?","options":["JSON.parse()","JSON.stringify()","JSON.encode()","JSON.read()"],"correct":0,"explanation":"JSON.parse() converts JSON text into JavaScript values."}, {"question":"Which statement about Web Storage values is correct?","options":["Values are stored as strings","Values are stored as JavaScript objects directly","Storage is shared by every website","Values expire after one second"],"correct":0,"explanation":"Web Storage stores string key-value pairs. Convert structured data to and from JSON."}, {"question":"Which callback is normally processed before a pending timer task?","options":["A resolved Promise then callback","A later setTimeout callback","A click next week","An unfinished network request"],"correct":0,"explanation":"Promise reaction callbacks are microtasks and are processed before the next task."}, {"question":"What is a typical purpose of WebSockets?","options":["Persistent two-way communication with a server","Styling a web page","Storing images in CSS","Replacing forms"],"correct":0,"explanation":"WebSockets provide a persistent full-duplex connection for real-time messages."});
RAW["javascript"].L3.passingScore = Math.ceil(RAW["javascript"].L3.questions.length * 2 / 3);


RAW["php"].L3.questions.push({"question":"Which value should be used to verify an uploaded file's actual content type?","options":["A server-side inspection of the temporary file","The browser-provided filename extension alone","The hidden form field","The original filename"],"correct":0,"explanation":"Inspect the temporary file on the server. Client-provided names and MIME types are not trustworthy."}, {"question":"What is Composer primarily used for in PHP projects?","options":["Managing dependencies and autoloading","Rendering CSS","Running SQL queries directly","Creating HTML forms"],"correct":0,"explanation":"Composer manages package dependencies and can generate autoload rules."}, {"question":"Which HTTP status code commonly indicates a resource was created?","options":["201","200","404","500"],"correct":0,"explanation":"201 Created indicates that the request successfully created a resource."}, {"question":"Which PHP function should create a password hash for storage?","options":["password_hash()","md5()","sha1()","base64_encode()"],"correct":0,"explanation":"password_hash() uses a password hashing algorithm designed for password storage."});
RAW["php"].L3.passingScore = Math.ceil(RAW["php"].L3.questions.length * 2 / 3);


RAW["sql"].L3.questions.push({"question":"Which constraint links a child table value to a key in another table?","options":["FOREIGN KEY","CHECK","DEFAULT","NOT NULL"],"correct":0,"explanation":"A foreign key enforces a relationship with a referenced key."}, {"question":"What is a database role?","options":["A named group of privileges","A table containing only passwords","A type of SQL join","A stored query result"],"correct":0,"explanation":"Roles group privileges so administrators can assign and manage permissions more easily."}, {"question":"Which keyword begins the executable section of a PL/SQL block?","options":["BEGIN","DECLARE","EXCEPTION","END"],"correct":0,"explanation":"BEGIN starts the executable statements; EXCEPTION is an optional error-handling section."}, {"question":"What causes a database trigger to run?","options":["A specified database event","A user opening a spreadsheet","A CSS animation","A Python import"],"correct":0,"explanation":"A trigger runs automatically when its declared event occurs, such as an insert or update."});
RAW["sql"].L3.passingScore = Math.ceil(RAW["sql"].L3.questions.length * 2 / 3);


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
