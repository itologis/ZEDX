export default {
  intro: {
    title: "Python",
    tagline: "Readability counts.",
    description: "Python is a high-level, interpreted programming language with dynamic semantics and elegant syntax.",
    useCases: [
      "Web development",
      "Data science & AI",
      "Automation scripts",
      "Desktop applications",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        { id: "p1", title: "Hello World", syntax: 'print("Hello, World!")', description: "The print() function outputs text to the console." },
        { id: "p2", title: "Variables", syntax: 'name = "John"\nage = 25\nis_active = True\nprice = 19.99', description: "Variables store values. Python is dynamically typed." },
        { id: "p3", title: "If Statements", syntax: 'if score >= 70:\n    print("Pass")\nelse:\n    print("Fail")', description: "Conditional statements use if, elif, and else." },
        { id: "p4", title: "Loops", syntax: 'for i in range(5):\n    print(i)\nwhile condition:\n    # code', description: "For loops iterate over sequences, while loops continue while a condition is true." },
        { id: "p5", title: "Functions", syntax: 'def add(a, b):\n    return a + b\nresult = add(5, 3)', description: "Functions are defined with def and return values with return." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "How do you print in Python?", options: ["console.log()", "print()", "System.out.println()", "echo()"], correct: 1 },
          { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "--"], correct: 1 },
          { question: "What is the correct way to create a list in Python?", options: ["list = []", "list = {}", "list = ()", "list = <>"], correct: 0 },
          { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "fun", "define"], correct: 1 },
          { question: "What does len() do in Python?", options: ["Gets the length of an object", "Gets the last element", "Gets the first element", "Gets the data type"], correct: 0 }
        ]
      }
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "p6", title: "Lists", syntax: 'fruits = ["apple", "banana", "orange"]\nfruits.append("grape")\nprint(fruits[0])', description: "Lists store ordered collections that can be modified." },
        { id: "p7", title: "Dictionaries", syntax: 'person = {"name": "John", "age": 25}\nprint(person["name"])', description: "Dictionaries store key-value pairs." },
        { id: "p8", title: "Tuples", syntax: 'colors = ("red", "green", "blue")\nprint(colors[0])', description: "Tuples are immutable ordered collections." },
        { id: "p9", title: "File I/O", syntax: 'with open("file.txt", "r") as f:\n    content = f.read()', description: "Files can be opened, read, and written using the open() function." },
        { id: "p10", title: "List Comprehension", syntax: 'squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]', description: "List comprehensions provide a concise way to create lists." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What is a dictionary in Python?", options: ["Key-value pairs", "An ordered list", "A set of unique values", "A tuple of values"], correct: 0 },
          { question: "Which keyword is used for a for loop?", options: ["for", "while", "loop", "iterate"], correct: 0 },
          { question: "What is the output of 3 ** 2 in Python?", options: ["6", "9", "1", "5"], correct: 1 },
          { question: "Which function is used to read user input?", options: ["input()", "scan()", "read()", "get()"], correct: 0 },
          { question: "What is a tuple in Python?", options: ["An immutable sequence", "A mutable list", "A dictionary", "A set"], correct: 0 }
        ]
      }
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        { id: "p11", title: "Decorators", syntax: '@timer\ndef slow_function():\n    time.sleep(1)', description: "Decorators modify the behavior of functions." },
        { id: "p12", title: "Generators", syntax: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b', description: "Generators produce values lazily using yield." },
        { id: "p13", title: "Exception Handling", syntax: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")', description: "Exceptions handle errors gracefully." },
        { id: "p14", title: "Lambda Functions", syntax: 'add = lambda x, y: x + y\nresult = add(5, 3)', description: "Lambda functions are anonymous single-expression functions." },
        { id: "p15", title: "Context Managers", syntax: 'with open("file.txt", "w") as f:\n    f.write("Hello")', description: "Context managers handle resource cleanup automatically." },
      ],
      quiz: {
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
  ]
};
