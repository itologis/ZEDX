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
            "id": "js17",
            "title": "Operators & Expressions",
            "syntax": "const total = price * quantity;\nconst canSubmit = total > 0 && accepted;\nconst label = score >= 75 ? \"Pass\" : \"Retry\";",
            "description": "JavaScript expressions combine values and operators. Arithmetic, comparison, logical, assignment, equality, and conditional operators support calculations and application behavior."
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
        {
            id: "js6",
            title: "Functions",
            syntax:
              "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(3, 5));",
            description:
              "Functions group reusable code. Parameters receive input, and return sends a result back to the caller.",
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
          }
      ],
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        {
            id: "js7",
            title: "Arrow Functions",
            syntax:
              "const multiply = (a, b) => a * b;\n\nconsole.log(multiply(4, 3));",
            description:
              "Arrow functions provide a shorter syntax for writing functions and have different this-binding behavior from regular functions.",
          },
        {
            id: "js10",
            title: "Array Methods",
            syntax:
              "const numbers = [1, 2, 3, 4];\n\nconst doubled = numbers.map(n => n * 2);\nconst even = numbers.filter(n => n % 2 === 0);\n\nconsole.log(doubled);\nconsole.log(even);",
            description:
              "Methods such as map() and filter() help transform arrays and select elements without manually writing a loop.",
          },
        {
            "id": "js18",
            "title": "String Methods & Template Literals",
            "syntax": "const name = \"  Ada Lovelace  \".trim();\nconst label = `Hello, ${name}!`;\nconst parts = label.split(\" \");",
            "description": "JavaScript strings provide methods for searching, extracting, changing case, and splitting text. Template literals combine text and expressions in a readable way."
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
            "id": "js19",
            "title": "DOM Manipulation",
            "syntax": "const heading = document.querySelector(\"h1\");\nheading.textContent = \"Welcome\";\nconst item = document.createElement(\"li\");\nitem.textContent = \"New item\";\ndocument.querySelector(\"ul\").append(item);",
            "description": "The Document Object Model represents a web page as a tree of nodes. JavaScript can find elements, change their content and attributes, and create or remove nodes."
          },
        {
            "id": "js20",
            "title": "Events & Event Delegation",
            "syntax": "document.querySelector(\"ul\").addEventListener(\"click\", event => {\n  const item = event.target.closest(\"li\");\n  if (item) item.classList.toggle(\"selected\");\n});",
            "description": "Events report user and browser activity such as clicks, keyboard input, form submission, and loading. Event delegation handles events from many child elements through a shared ancestor."
          }
      ],
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


          {
            "id": "js21",
            "title": "JSON Serialization",
            "syntax": "const data = { name: \"Ada\", active: true };\nconst text = JSON.stringify(data);\nconst copy = JSON.parse(text);",
            "description": "JSON is a text format for structured data. JSON.stringify() serializes JavaScript values into text, and JSON.parse() converts valid JSON text back into JavaScript values."
          },
          {
            "id": "js22",
            "title": "Browser Storage APIs",
            "syntax": "localStorage.setItem(\"theme\", \"dark\");\nconst theme = localStorage.getItem(\"theme\");\nsessionStorage.setItem(\"draft\", \"Unsaved text\");",
            "description": "Web Storage provides simple key-value storage in a browser. localStorage persists across browser sessions, while sessionStorage is scoped to a tab's page session."
          },
          {
            "id": "js23",
            "title": "Event Loop & Microtasks",
            "syntax": "console.log(\"A\");\nsetTimeout(() => console.log(\"timer\"), 0);\nPromise.resolve().then(() => console.log(\"microtask\"));\nconsole.log(\"B\");",
            "description": "The JavaScript event loop coordinates synchronous code, queued tasks, and microtasks. Understanding execution order helps explain promises, timers, rendering, and asynchronous callbacks."
          },
          {
            "id": "js24",
            "title": "Web Workers & WebSockets",
            "syntax": "const worker = new Worker(\"worker.js\");\nworker.postMessage({ count: 1000 });\nworker.onmessage = event => console.log(event.data);\nconst socket = new WebSocket(\"wss://example.com/live\");",
            "description": "Web Workers run scripts away from the main UI thread, while WebSockets provide a persistent two-way connection between a browser and a server. They solve different communication needs."
          }

],
    },
  ],
};
