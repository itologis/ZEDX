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
        {
            "id": "p16",
            "title": "Operators & Expressions",
            "syntax": "subtotal = 120\nquantity = 3\ntotal = subtotal * quantity\neligible = total >= 300 and quantity > 0",
            "description": "Python expressions combine values and operators to produce results. Arithmetic, comparison, logical, membership, identity, and assignment operators support calculations and decisions."
          },
        {
            "id": "p17",
            "title": "Input & Output",
            "syntax": "name = input(\"Name: \")\nage = int(input(\"Age: \"))\nprint(f\"{name} is {age}\")",
            "description": "Python's input() reads a line of text, while print() displays values. Converting input deliberately is important because input() always returns a string."
          },
        { id: "p3", title: "If Statements", syntax: 'if score >= 70:\n    print("Pass")\nelse:\n    print("Fail")', description: "Conditional statements use if, elif, and else." },
        { id: "p4", title: "Loops", syntax: 'for i in range(5):\n    print(i)\nwhile condition:\n    # code', description: "For loops iterate over sequences, while loops continue while a condition is true." },
        { id: "p5", title: "Functions", syntax: 'def add(a, b):\n    return a + b\nresult = add(5, 3)', description: "Functions are defined with def and return values with return." },
        { id: "p6", title: "Lists", syntax: 'fruits = ["apple", "banana", "orange"]\nfruits.append("grape")\nprint(fruits[0])', description: "Lists store ordered collections that can be modified." },
        {
            "id": "p18",
            "title": "String Methods & Text Processing",
            "syntax": "message = \"  Hello, Python!  \"\nclean = message.strip().lower()\nparts = clean.split(\",\")",
            "description": "Python strings provide methods for searching, replacing, splitting, joining, and changing text. These operations are useful for cleaning user input and preparing text for display or analysis."
          }
      ]
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "p7", title: "Dictionaries", syntax: 'person = {"name": "John", "age": 25}\nprint(person["name"])', description: "Dictionaries store key-value pairs." },
        { id: "p8", title: "Tuples", syntax: 'colors = ("red", "green", "blue")\nprint(colors[0])', description: "Tuples are immutable ordered collections." },
        {
            "id": "p19",
            "title": "Classes & Objects",
            "syntax": "class Student:\n    def __init__(self, name):\n        self.name = name\n\n    def introduce(self):\n        return f\"I am {self.name}\"",
            "description": "Classes define the data and behavior that objects share. An instance stores its own state, while methods describe operations that can work with that state."
          },
        { id: "p9", title: "File I/O", syntax: 'with open("file.txt", "r") as f:\n    content = f.read()', description: "Files can be opened, read, and written using the open() function." },
        { id: "p10", title: "List Comprehension", syntax: 'squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]', description: "List comprehensions provide a concise way to create lists." }
      ]
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


          {
            "id": "p20",
            "title": "Modules & Packages",
            "syntax": "import math\nprint(math.sqrt(25))\n\nfrom tools.formatters import title_case",
            "description": "Modules organize Python code into reusable files. Packages group related modules into a directory structure, making larger projects easier to navigate and maintain."
          },
          {
            "id": "p21",
            "title": "Virtual Environments & Package Management",
            "syntax": "python -m venv .venv\npython -m pip install requests\npython -m pip freeze > requirements.txt",
            "description": "Virtual environments isolate a project's installed packages from other Python projects. pip installs dependencies, while a requirements file records versions that can be recreated elsewhere."
          },
          {
            "id": "p22",
            "title": "Type Hints & Static Checking",
            "syntax": "def total(prices: list[float]) -> float:\n    return sum(prices)\n\nname: str = \"Ada\"",
            "description": "Type hints describe expected value types for readers, editors, and static analysis tools. Python does not enforce ordinary annotations at runtime, so validation may still be needed."
          },
          {
            "id": "p23",
            "title": "Testing & Debugging",
            "syntax": "def add(a, b):\n    return a + b\n\nassert add(2, 3) == 5",
            "description": "Testing checks whether code behaves as expected for selected inputs. Debugging uses observations, breakpoints, and smaller examples to locate the cause of incorrect behavior."
          }

]
    }
  ]
};
