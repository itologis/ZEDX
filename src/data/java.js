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
        {
            "id": "j17",
            "title": "Operators & Expressions",
            "syntax": "int subtotal = 120;\nint quantity = 3;\nint total = subtotal * quantity;\nboolean eligible = total >= 300 && quantity > 0;",
            "description": "Java operators perform arithmetic, comparison, logical, assignment, and increment operations. An expression combines values and operators to produce a result with a specific type."
          },
        {
            "id": "j16",
            "title": "Algorithms, Flowcharts & Pseudocode",
            "syntax": "START\n  INPUT price, quantity\n  total = price * quantity\n  OUTPUT total\nEND",
            "description": "An algorithm is a finite sequence of precise steps for solving a problem. Flowcharts visualize those steps, while pseudocode describes the logic in readable, language-neutral form."
          },
        {
            "id": "j18",
            "title": "Console Input & Output",
            "syntax": "import java.util.Scanner;\nScanner input = new Scanner(System.in);\nSystem.out.print(\"Name: \");\nString name = input.nextLine();\nSystem.out.println(\"Hello, \" + name);",
            "description": "Console input lets a program receive data while it runs. Scanner reads typed values from System.in, while System.out provides print, println, and formatted output."
          },
        { id: "j4", title: "If Statements", syntax: "if (score >= 70) {\n  System.out.println(\"Pass\");\n} else {\n  System.out.println(\"Fail\");\n}", description: "Conditional statements control program flow based on boolean conditions." },
        { id: "j5", title: "Loops", syntax: "for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}\nwhile (condition) {\n  // code\n}", description: "Loops repeat code. For loops are for counting, while loops for conditions." },
        { id: "j3", title: "Methods", syntax: "public int add(int a, int b) {\n  return a + b;\n}", description: "Methods contain reusable code. They can take parameters and return values." },
        { id: "j10", title: "Arrays", syntax: "int[] numbers = new int[5];\nnumbers[0] = 10;\nString[] names = {\"Alice\", \"Bob\"};", description: "Arrays store multiple values of the same type." }
      ]
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "j6", title: "Classes & Objects", syntax: "class Person {\n  String name;\n  int age;\n  Person(String name, int age) {\n    this.name = name;\n    this.age = age;\n  }\n}", description: "Classes are blueprints. Objects are instances of classes." },
        { id: "j7", title: "Inheritance", syntax: "class Child extends Parent {\n  void childMethod() {\n    System.out.println(\"Child method\");\n  }\n}", description: "Inheritance allows a class to inherit properties from a parent class." },
        { id: "j8", title: "Interfaces", syntax: "interface Animal {\n  void speak();\n}\nclass Dog implements Animal {\n  public void speak() {\n    System.out.println(\"Woof\");\n  }\n}", description: "Interfaces define method signatures. Classes implement them." },
        { id: "j9", title: "Exceptions", syntax: "try {\n  int result = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println(\"Cannot divide by zero\");\n}", description: "Exceptions handle runtime errors gracefully." },
        {
            "id": "j19",
            "title": "Sorting & Searching Algorithms",
            "syntax": "int[] values = {7, 2, 5, 1};\nArrays.sort(values);\nint index = Arrays.binarySearch(values, 5);",
            "description": "Sorting arranges values in an order, while searching locates a target. Studying simple algorithms helps learners reason about correctness, data size, and the cost of repeated operations."
          }
      ]
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


          {
            "id": "j20",
            "title": "Java Collections Framework",
            "syntax": "List<String> names = new ArrayList<>();\nSet<String> unique = new HashSet<>();\nMap<String, Integer> scores = new HashMap<>();",
            "description": "The Java Collections Framework provides interfaces and classes for groups of objects. Lists preserve order, sets reject duplicates, and maps associate keys with values."
          },
          {
            "id": "j21",
            "title": "File I/O",
            "syntax": "Path path = Path.of(\"notes.txt\");\nFiles.writeString(path, \"Hello ZEDX\");\nString text = Files.readString(path);",
            "description": "File I/O reads and writes data stored outside a running program. Modern Java uses Path to represent file locations and the Files utility class for common operations."
          },
          {
            "id": "j22",
            "title": "Swing GUI Development & Event Handling",
            "syntax": "JFrame frame = new JFrame(\"ZEDX\");\nJButton button = new JButton(\"Save\");\nbutton.addActionListener(event -> status.setText(\"Saved\"));\nframe.add(button);\nframe.pack();\nframe.setVisible(true);",
            "description": "Swing provides desktop GUI components such as JFrame, JPanel, JLabel, JButton, and JTextField. Event listeners connect user actions to application behavior."
          },
          {
            "id": "j23",
            "title": "OO Analysis & UML Modeling",
            "syntax": "Actor: Student\nUse case: Submit Assignment\nStudent --> (Submit Assignment)\n\nStudent -> Portal: submit(file)\nPortal -> Storage: save(file)",
            "description": "Object-oriented analysis identifies problem-domain actors, requirements, and responsibilities before code is written. UML diagrams communicate the requirements and design from different viewpoints."
          },
          {
            "id": "j24",
            "title": "JDBC Database Connectivity",
            "syntax": "String sql = \"SELECT name FROM students WHERE id = ?\";\ntry (Connection connection = DriverManager.getConnection(url, user, password);\n     PreparedStatement statement = connection.prepareStatement(sql)) {\n    statement.setInt(1, studentId);\n    ResultSet rows = statement.executeQuery();\n}",
            "description": "JDBC is Java's standard API for communicating with relational databases. A Connection represents a database session, a PreparedStatement holds SQL, and a ResultSet provides returned rows."
          },
          {
            "id": "j25",
            "title": "Advanced Concurrency Utilities",
            "syntax": "ExecutorService pool = Executors.newFixedThreadPool(3);\nCountDownLatch done = new CountDownLatch(2);\npool.submit(() -> done.countDown());\npool.submit(() -> done.countDown());\ndone.await();\npool.shutdown();",
            "description": "java.util.concurrent provides synchronization and coordination tools for tasks running across threads. Latches, barriers, semaphores, and executors solve different coordination problems."
          }

]
    }
  ]
};
