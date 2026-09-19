export const QUIZZES = {
  // CSS Quizzes
  css: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheets", "Color Style Syntax"], correct: 0 },
        { question: "Which selector targets an element by its ID?", options: [".class", "#id", "*", "element"], correct: 1 },
        { question: "What property changes text color?", options: ["font-color", "text-color", "color", "background-color"], correct: 2 },
        { question: "Which unit is relative to the parent element's font size?", options: ["px", "em", "rem", "vw"], correct: 1 },
        { question: "What does 'cascading' mean in CSS?", options: ["Styles flow like water", "More specific rules override general ones", "CSS is only for waterfalls", "All styles are equal"], correct: 1 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "Which is NOT part of the Box Model?", options: ["Margin", "Padding", "Background", "Border"], correct: 2 },
        { question: "What does 'flex-direction: row' do?", options: ["Arranges items in a column", "Arranges items in a row", "Hides all items", "Makes items round"], correct: 1 },
        { question: "Which pseudo-class targets a hovered element?", options: ["a:visited", "a:active", "a:hover", "a:focus"], correct: 2 },
        { question: "What does 'box-sizing: border-box' do?", options: ["Includes padding and border in width/height", "Excludes padding from width/height", "Adds a shadow to the box", "Makes the box round"], correct: 0 },
        { question: "Which is NOT a valid CSS position value?", options: ["static", "relative", "absolute", "flexible"], correct: 3 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What does 'grid-template-columns: 1fr 1fr 1fr' do?", options: ["Creates 3 equal columns", "Creates 1 column with 3 rows", "Creates 3 unequal columns", "Creates a single column"], correct: 0 },
        { question: "Which media query targets phones?", options: ["@media (min-width: 1024px)", "@media (max-width: 600px)", "@media (orientation: landscape)", "@media (print)"], correct: 1 },
        { question: "How do you define a CSS variable?", options: ["$color: blue;", "--color: blue;", "@color: blue;", "var(color: blue);"], correct: 1 },
        { question: "What does 'transform: scale(1.1)' do?", options: ["Moves the element", "Rotates the element", "Makes the element 10% bigger", "Makes the element 10% smaller"], correct: 2 },
        { question: "What is the 'gap' property used for?", options: ["Adds space between flex/grid items", "Adds space inside an element", "Adds a border around items", "Creates a gap in text"], correct: 0 }
      ]
    }
  },
  
  // HTML Quizzes
  html: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
        { question: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
        { question: "What is the correct HTML tag for a paragraph?", options: ["<paragraph>", "<p>", "<text>", "<para>"], correct: 1 },
        { question: "Which tag is used for the largest heading?", options: ["<heading>", "<h1>", "<head>", "<h6>"], correct: 1 },
        { question: "What does the <br> tag do?", options: ["Creates bold text", "Creates a line break", "Creates a horizontal line", "Creates a paragraph"], correct: 1 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "Which tag is used for an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correct: 0 },
        { question: "What does the <img> tag use for the image source?", options: ["src", "href", "link", "source"], correct: 0 },
        { question: "Which tag is used for a table row?", options: ["<td>", "<tr>", "<th>", "<table>"], correct: 1 },
        { question: "What does HTML5 stand for?", options: ["HTML version 5", "Hyper Text Markup Language 5", "Both A and B", "None of the above"], correct: 2 },
        { question: "Which tag is used for a division/container?", options: ["<div>", "<span>", "<section>", "<article>"], correct: 0 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What is the purpose of the <canvas> tag?", options: ["Draw graphics", "Display images", "Play videos", "Create forms"], correct: 0 },
        { question: "Which attribute is used for inline CSS?", options: ["style", "class", "id", "css"], correct: 0 },
        { question: "What does the <meta> tag do?", options: ["Provides metadata", "Creates a link", "Adds an image", "Creates a table"], correct: 0 },
        { question: "Which tag is used for semantic meaning of a header?", options: ["<header>", "<head>", "<h1>", "<top>"], correct: 0 },
        { question: "What does the <nav> tag represent?", options: ["Navigation links", "Network settings", "New article", "Normal text"], correct: 0 }
      ]
    }
  },
  
  // Java Quizzes
  java: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "What is the entry point of a Java program?", options: ["public static void main(String[] args)", "public void main()", "static void main()", "void main()"], correct: 0 },
        { question: "Which keyword is used to create a class?", options: ["class", "interface", "struct", "object"], correct: 0 },
        { question: "What is the size of an int in Java?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], correct: 2 },
        { question: "Which keyword is used to inherit a class?", options: ["implements", "extends", "inherits", "super"], correct: 1 },
        { question: "What is a constructor in Java?", options: ["A method that returns a value", "A method that initializes an object", "A method that destroys an object", "A method that calculates values"], correct: 1 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "Which keyword is used to create a constant?", options: ["final", "static", "const", "constant"], correct: 0 },
        { question: "What is polymorphism in Java?", options: ["One interface, multiple implementations", "Multiple inheritance", "Data hiding", "Code reusability"], correct: 0 },
        { question: "Which keyword is used to catch exceptions?", options: ["try", "catch", "finally", "throw"], correct: 1 },
        { question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], correct: 1 },
        { question: "Which collection is used for key-value pairs?", options: ["ArrayList", "HashMap", "LinkedList", "HashSet"], correct: 1 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What is the purpose of the 'synchronized' keyword?", options: ["Thread safety", "Memory management", "Exception handling", "Performance optimization"], correct: 0 },
        { question: "Which design pattern is used for singleton?", options: ["Creational", "Structural", "Behavioral", "None"], correct: 0 },
        { question: "What is a lambda expression in Java?", options: ["An anonymous function", "A variable", "A class", "A method"], correct: 0 },
        { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Validation Module", "Java Version Manager"], correct: 0 },
        { question: "Which framework is used for dependency injection?", options: ["Spring", "Hibernate", "Struts", "JSF"], correct: 0 }
      ]
    }
  },
  
  // Python Quizzes
  python: {
    L1: {
      passingScore: 3,
      questions: [
        { question: "How do you print in Python?", options: ["console.log()", "print()", "System.out.println()", "echo()"], correct: 1 },
        { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "--"], correct: 1 },
        { question: "What is the correct way to create a list in Python?", options: ["list = []", "list = {}", "list = ()", "list = <>"], correct: 0 },
        { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "fun", "define"], correct: 1 },
        { question: "What does len() do in Python?", options: ["Gets the length of an object", "Gets the last element", "Gets the first element", "Gets the data type"], correct: 0 }
      ]
    },
    L2: {
      passingScore: 3,
      questions: [
        { question: "What is a dictionary in Python?", options: ["Key-value pairs", "An ordered list", "A set of unique values", "A tuple of values"], correct: 0 },
        { question: "Which keyword is used for a for loop?", options: ["for", "while", "loop", "iterate"], correct: 0 },
        { question: "What is the output of 3 ** 2 in Python?", options: ["6", "9", "1", "5"], correct: 1 },
        { question: "Which function is used to read user input?", options: ["input()", "scan()", "read()", "get()"], correct: 0 },
        { question: "What is a tuple in Python?", options: ["An immutable sequence", "A mutable list", "A dictionary", "A set"], correct: 0 }
      ]
    },
    L3: {
      passingScore: 3,
      questions: [
        { question: "What is a decorator in Python?", options: ["A function that modifies another function", "A design pattern", "A data type", "An error handler"], correct: 0 },
        { question: "What does 'pip' stand for?", options: ["Pip Installs Packages", "Python Install Program", "Package Installer for Python", "All of the above"], correct: 0 },
        { question: "Which statement is used for exception handling?", options: ["try-except", "try-catch", "catch-except", "try-finally"], correct: 0 },
        { question: "What is a generator in Python?", options: ["An iterator that yields values", "A list with lazy evaluation", "A function that returns a list", "A data structure"], correct: 0 },
        { question: "What is the GIL in Python?", options: ["Global Interpreter Lock", "General Input/Output", "Graphics Interface Library", "Global Iteration Loop"], correct: 0 }
      ]
    }
  }
};
