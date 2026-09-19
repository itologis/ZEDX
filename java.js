export default {
  intro: {
    title: "Java",
    tagline: "Write once, run anywhere.",
    description: "Java is a high-level, object-oriented programming language designed to have as few implementation dependencies as possible.",
    useCases: [
      "Enterprise applications",
      "Android app development",
      "Backend services",
      "Big data technologies",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        { id: "j1", title: "Hello World", syntax: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}', description: "The main method is the entry point of a Java program." },
        { id: "j2", title: "Variables", syntax: "int age = 25;\ndouble price = 19.99;\nboolean isActive = true;\nString name = \"John\";", description: "Variables store data. Common types: int, double, boolean, String." },
        { id: "j3", title: "Methods", syntax: "public int add(int a, int b) {\n  return a + b;\n}", description: "Methods contain reusable code. They can take parameters and return values." },
        { id: "j4", title: "If Statements", syntax: "if (score >= 70) {\n  System.out.println(\"Pass\");\n} else {\n  System.out.println(\"Fail\");\n}", description: "Conditional statements control program flow based on boolean conditions." },
        { id: "j5", title: "Loops", syntax: "for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}\nwhile (condition) {\n  // code\n}", description: "Loops repeat code. For loops are for counting, while loops for conditions." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What is the entry point of a Java program?", options: ["public static void main(String[] args)", "public void main()", "static void main()", "void main()"], correct: 0 },
          { question: "Which keyword is used to create a class?", options: ["class", "interface", "struct", "object"], correct: 0 },
          { question: "What is the size of an int in Java?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], correct: 2 },
          { question: "Which keyword is used to inherit a class?", options: ["implements", "extends", "inherits", "super"], correct: 1 },
          { question: "What is a constructor in Java?", options: ["A method that returns a value", "A method that initializes an object", "A method that destroys an object", "A method that calculates values"], correct: 1 }
        ]
      }
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "j6", title: "Classes & Objects", syntax: "class Person {\n  String name;\n  int age;\n  Person(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n}", description: "Classes are blueprints. Objects are instances of classes." },
        { id: "j7", title: "Inheritance", syntax: "class Child extends Parent {\n  void childMethod() {\n    System.out.println(\"Child method\");\n  }\n}", description: "Inheritance allows a class to inherit properties from a parent class." },
        { id: "j8", title: "Interfaces", syntax: "interface Animal {\n  void speak();\n}\nclass Dog implements Animal {\n  public void speak() {\n    System.out.println(\"Woof\");\n  }\n}", description: "Interfaces define method signatures. Classes implement them." },
        { id: "j9", title: "Exceptions", syntax: "try {\n  int result = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println(\"Cannot divide by zero\");\n}", description: "Exceptions handle runtime errors gracefully." },
        { id: "j10", title: "Arrays", syntax: "int[] numbers = new int[5];\nnumbers[0] = 10;\nString[] names = {\"Alice\", \"Bob\"};", description: "Arrays store multiple values of the same type." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "Which keyword is used to create a constant?", options: ["final", "static", "const", "constant"], correct: 0 },
          { question: "What is polymorphism in Java?", options: ["One interface, multiple implementations", "Multiple inheritance", "Data hiding", "Code reusability"], correct: 0 },
          { question: "Which keyword is used to catch exceptions?", options: ["try", "catch", "finally", "throw"], correct: 1 },
          { question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], correct: 1 },
          { question: "Which collection is used for key-value pairs?", options: ["ArrayList", "HashMap", "LinkedList", "HashSet"], correct: 1 }
        ]
      }
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        { id: "j11", title: "Lambda Expressions", syntax: "List<String> names = Arrays.asList(\"John\", \"Jane\");\nnames.forEach(name -> System.out.println(name));", description: "Lambdas are anonymous functions that can be used as parameters." },
        { id: "j12", title: "Streams API", syntax: "List<Integer> numbers = Arrays.asList(1, 2, 3, 4);\nnumbers.stream()\n  .filter(n -> n % 2 == 0)\n  .forEach(System.out::println);", description: "Streams enable functional-style operations on collections." },
        { id: "j13", title: "Multithreading", syntax: "Thread thread = new Thread(() -> {\n  System.out.println(\"Running in a thread\");\n});\nthread.start();", description: "Multithreading allows concurrent execution of code." },
        { id: "j14", title: "Generics", syntax: "class Box<T> {\n  T content;\n  void setContent(T content) {\n    this.content = content;\n  }\n}", description: "Generics enable type-safe programming with parameterized types." },
        { id: "j15", title: "Annotations", syntax: "@Override\npublic String toString() {\n  return \"My object\";\n}\n@Deprecated\npublic void oldMethod() {}", description: "Annotations provide metadata about code." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What is the purpose of the 'synchronized' keyword?", options: ["Thread safety", "Memory management", "Exception handling", "Performance optimization"], correct: 0 },
          { question: "Which design pattern is used for singleton?", options: ["Creational", "Structural", "Behavioral", "None"], correct: 0 },
          { question: "What is a lambda expression in Java?", options: ["An anonymous function", "A variable", "A class", "A method"], correct: 0 },
          { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Validation Module", "Java Version Manager"], correct: 0 },
          { question: "Which framework is used for dependency injection?", options: ["Spring", "Hibernate", "Struts", "JSF"], correct: 0 }
        ]
      }
    }
  ]
};
