export default {
  intro: {
    title: "JavaScript",
    tagline: "Make the web interactive.",
    description:
      "JavaScript is a programming language used to create interactive websites and applications. It supports dynamic programming, functions, objects, and asynchronous operations.",
    useCases: [
      "Interactive websites",
      "Frontend web development",
      "Backend development with Node.js",
      "Mobile and desktop applications",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        {
          id: "js1",
          title: "Hello World",
          syntax: 'console.log("Hello, World!");',
          description:
            "The console.log() function displays messages and values in the console.",
        },
        {
          id: "js2",
          title: "Variables",
          syntax: 'let age = 18;\nconst name = "Alex";\nvar score = 100;',
          description:
            "Variables store values. Use let for reassignable variables and const when the variable should not be reassigned. var is an older declaration style.",
        },
        {
          id: "js3",
          title: "Data Types",
          syntax:
            'let name = "Alex";\nlet age = 18;\nlet price = 19.99;\nlet isActive = true;\nlet result = null;',
          description:
            "JavaScript supports strings, numbers, booleans, undefined, null, objects, and other value types.",
        },
        {
          id: "js4",
          title: "If Statements",
          syntax:
            'let score = 85;\n\nif (score >= 75) {\n  console.log("Passed");\n} else {\n  console.log("Failed");\n}',
          description:
            "If statements run different blocks of code depending on whether a condition is true or false.",
        },
        {
          id: "js5",
          title: "Loops",
          syntax:
            "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n\nlet count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}",
          description:
            "Loops repeat code. A for loop is useful for counting, while a while loop continues as long as its condition is true.",
        },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            question: "Which function displays a message in the console?",
            options: ["print()", "console.log()", "display()", "show()"],
            correct: 1,
          },
          {
            question:
              "Which keyword declares a variable that can be reassigned?",
            options: ["const", "fixed", "let", "static"],
            correct: 2,
          },
          {
            question: 'What is the data type of "Hello"?',
            options: ["Number", "Boolean", "String", "Object"],
            correct: 2,
          },
          {
            question: "Which operator checks equality without type conversion?",
            options: ["=", "==", "===", "!="],
            correct: 2,
          },
          {
            question: "Which statement repeats code while a condition is true?",
            options: ["if", "while", "switch", "return"],
            correct: 1,
          },
        ],
      },
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        {
          id: "js6",
          title: "Functions",
          syntax:
            "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(3, 5));",
          description:
            "Functions group reusable code. Parameters receive input, and return sends a result back to the caller.",
        },
        {
          id: "js7",
          title: "Arrow Functions",
          syntax:
            "const multiply = (a, b) => a * b;\n\nconsole.log(multiply(4, 3));",
          description:
            "Arrow functions provide a shorter syntax for writing functions and have different this-binding behavior from regular functions.",
        },
        {
          id: "js8",
          title: "Arrays",
          syntax:
            'const fruits = ["Apple", "Banana", "Mango"];\n\nfruits.push("Orange");\nconsole.log(fruits[0]);\nconsole.log(fruits.length);',
          description:
            "Arrays store ordered collections of values. Indexes start at zero, and length gives the number of elements.",
        },
        {
          id: "js9",
          title: "Objects",
          syntax:
            'const person = {\n  name: "Alex",\n  age: 18,\n};\n\nconsole.log(person.name);',
          description:
            "Objects group related information using properties and values. Properties can be accessed with dot notation or bracket notation.",
        },
        {
          id: "js16",
          title: "Classes",
          syntax:
            'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n\n  greet() {\n    return "Hi, I am " + this.name;\n  }\n}\n\nconst person = new Person("Alex");\nconsole.log(person.greet());',
          description:
            "Classes are blueprints for creating objects. The constructor runs when you create an instance with new, and methods are shared by every instance. Use extends and super to build a class on top of another one.",
        },
        {
          id: "js10",
          title: "Array Methods",
          syntax:
            "const numbers = [1, 2, 3, 4];\n\nconst doubled = numbers.map(n => n * 2);\nconst even = numbers.filter(n => n % 2 === 0);\n\nconsole.log(doubled);\nconsole.log(even);",
          description:
            "Methods such as map() and filter() help transform arrays and select elements without manually writing a loop.",
        },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            question: "Which keyword defines a function?",
            options: ["func", "function", "method", "define"],
            correct: 1,
          },
          {
            question: "Which is a valid arrow function?",
            options: [
              "function => (a) { return a; }",
              "const double = (n) => n * 2;",
              "arrow(n) => n",
              "const double = > n * 2",
            ],
            correct: 1,
          },
          {
            question: "What is the index of the first array element?",
            options: ["0", "1", "-1", "It has no index"],
            correct: 0,
          },
          {
            question: "How do you access the name property of person?",
            options: [
              "person->name",
              "person(name)",
              "person.name",
              "person::name",
            ],
            correct: 2,
          },
          {
            question: "What does Array.filter() return?",
            options: [
              "A new array containing matching elements",
              "Always a number",
              "The original array with every item changed",
              "A single string",
            ],
            correct: 0,
          },
        ],
      },
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        {
          id: "js11",
          title: "Destructuring",
          syntax:
            'const person = { name: "Alex", age: 18 };\nconst { name, age } = person;\n\nconst colors = ["Red", "Blue"];\nconst [first, second] = colors;',
          description:
            "Destructuring extracts values from arrays or properties from objects into separate variables.",
        },
        {
          id: "js12",
          title: "Spread and Rest",
          syntax:
            "const first = [1, 2];\nconst combined = [...first, 3, 4];\n\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}",
          description:
            "The spread syntax expands iterable values or object properties. Rest syntax collects multiple values into an array or remaining properties into an object.",
        },
        {
          id: "js13",
          title: "Promises",
          syntax:
            'const task = new Promise((resolve, reject) => {\n  resolve("Task completed");\n});\n\ntask.then(result => {\n  console.log(result);\n}).catch(error => {\n  console.error(error);\n});',
          description:
            "Promises represent the eventual success or failure of an asynchronous operation. Use then() to handle fulfillment and catch() to handle rejection.",
        },
        {
          id: "js14",
          title: "Async and Await",
          syntax:
            'async function getData() {\n  const response = await fetch(\n    "https://example.com/data"\n  );\n  const data = await response.json();\n  return data;\n}',
          description:
            "Async functions return promises. The await keyword pauses execution within an async function until a promise settles. Network requests can also fail and should be handled appropriately.",
        },
        {
          id: "js15",
          title: "Modules",
          syntax:
            '// math.js\nexport const add = (a, b) => a + b;\n\n// main.js\nimport { add } from "./math.js";\nconsole.log(add(2, 3));',
          description:
            "JavaScript modules let you organize code into separate files. Export makes values available to other modules, and import brings them into a file.",
        },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            question: "What does object destructuring allow you to do?",
            options: [
              "Delete every property",
              "Extract properties into variables",
              "Convert an object into a string automatically",
              "Prevent all property changes",
            ],
            correct: 1,
          },
          {
            question: "What does the spread syntax use?",
            options: ["...", "::", "**", "=>"],
            correct: 0,
          },
          {
            question: "What does a Promise represent?",
            options: [
              "A guaranteed successful result",
              "An eventual result of an asynchronous operation",
              "A loop",
              "A class constructor only",
            ],
            correct: 1,
          },
          {
            question:
              "Which keyword is used to wait for a promise inside an async function?",
            options: ["wait", "yield", "await", "pause"],
            correct: 2,
          },
          {
            question: "Which statement imports a named export?",
            options: [
              'include add from "./math.js";',
              'import { add } from "./math.js";',
              'require add "./math.js";',
              'using add from "./math.js";',
            ],
            correct: 1,
          },
        ],
      },
    },
  ],
};
