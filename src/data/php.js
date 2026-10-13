// PHP reference content for ZEDX.
//
// Same shape as every other language module (see javascript.js):
//   intro  -> shown on the Intro screen
//   levels -> L1 / L2 / L3, each with a list of topics
//
// Topic ids are prefixed with "php" (php1, php2, ...). They must be unique
// across ALL languages because practice.js and bookmarks look topics up by id.
//
// The snippets below are plain text shown inside the app. They are never run.
// Backtick strings are used so PHP's quotes do not need escaping.
export default {
  intro: {
    title: "PHP",
    tagline: "Build dynamic websites on the server.",
    description:
      "PHP is a popular open-source scripting language that runs on the server. It is used to build dynamic web pages, web APIs, and database-driven applications.",
    useCases: [
      "Server-side web development",
      "Content management systems like WordPress",
      "Web APIs and backend services",
      "Form handling and database-driven sites",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        {
          id: "php1",
          title: "Hello World",
          syntax: `<?php\n  echo "Hello, World!";\n?>`,
          description:
            "PHP code runs on the server between <?php and ?> tags. The echo statement sends text to the browser, and every statement ends with a semicolon.",
        },
        {
          id: "php2",
          title: "Variables",
          syntax: `$name = "John";\n$age = 25;\n$price = 19.99;\n$isActive = true;\n\necho "Hello, $name";`,
          description:
            "Variables start with a dollar sign ($) and need no type declaration. Names are case-sensitive, and double-quoted strings can include variables directly.",
        },
        {
          id: "php3",
          title: "If Statements",
          syntax: `$score = 85;\n\nif ($score >= 90) {\n  echo "Excellent";\n} elseif ($score >= 70) {\n  echo "Pass";\n} else {\n  echo "Fail";\n}`,
          description:
            "If statements run code only when a condition is true. Use elseif for extra conditions and else as the fallback. Use === to compare both value and type.",
        },
        {
          id: "php4",
          title: "Loops",
          syntax: `for ($i = 0; $i < 5; $i++) {\n  echo $i;\n}\n\n$count = 0;\nwhile ($count < 3) {\n  echo $count;\n  $count++;\n}`,
          description:
            "Loops repeat code. A for loop is useful for counting, while a while loop continues as long as its condition is true.",
        },
        {
          id: "php5",
          title: "Functions",
          syntax: `function add(int $a, int $b): int {\n  return $a + $b;\n}\n\nfunction greet(string $name = "friend"): string {\n  return "Hello, $name!";\n}\n\necho add(5, 3);\necho greet();`,
          description:
            "Functions group reusable code. Type declarations and default values are optional, and return sends a result back to the caller.",
        },
      ],
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        {
          id: "php6",
          title: "Arrays",
          syntax: `$fruits = ["apple", "banana", "orange"];\n\n$fruits[] = "grape";\necho $fruits[0];\necho count($fruits);\n\nforeach ($fruits as $fruit) {\n  echo $fruit;\n}`,
          description:
            "Arrays store ordered lists of values. Indexes start at 0, [] adds an item to the end, count() returns the length, and foreach loops through every item.",
        },
        {
          id: "php7",
          title: "Associative Arrays",
          syntax: `$person = [\n  "name" => "John",\n  "age" => 25,\n];\n\necho $person["name"];\n$person["city"] = "London";\n\nforeach ($person as $key => $value) {\n  echo "$key: $value<br>";\n}`,
          description:
            "Associative arrays use named keys instead of numbers. The => operator links a key to its value, and foreach can read both the key and the value.",
        },
        {
          id: "php8",
          title: "String Functions",
          syntax: `$text = "Hello, World!";\n\necho strlen($text);                       // 13\necho strtoupper($text);                   // HELLO, WORLD!\necho str_replace("World", "PHP", $text);  // Hello, PHP!\necho substr($text, 0, 5);                 // Hello\necho "Hello, " . "John";                  // Hello, John`,
          description:
            "PHP has many built-in string functions. The dot (.) operator joins strings, and double-quoted strings read variables inside them while single-quoted strings do not.",
        },
        {
          id: "php9",
          title: "Forms ($_GET & $_POST)",
          syntax: `<form method="post" action="">\n  <input type="text" name="username">\n  <button type="submit">Send</button>\n</form>\n\n<?php\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n  $username = htmlspecialchars($_POST["username"] ?? "");\n  echo "Hello, $username!";\n}\n?>`,
          description:
            "$_GET and $_POST are superglobal arrays that hold data sent from the browser. The ?? operator supplies a default for missing values, and htmlspecialchars() escapes output to prevent XSS.",
        },
        {
          id: "php10",
          title: "Include & Require",
          syntax: `include "header.php";\nrequire "config.php";\n\ninclude_once "helpers.php";\nrequire_once "database.php";`,
          description:
            "include and require insert another PHP file into the current one. A missing file only causes a warning with include but stops the script with require. The _once versions never load the same file twice.",
        },
      ],
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        {
          id: "php11",
          title: "Classes & Objects",
          syntax: `class Person {\n  public string $name;\n  public int $age;\n\n  public function __construct(string $name, int $age) {\n    $this->name = $name;\n    $this->age = $age;\n  }\n\n  public function greet(): string {\n    return "Hi, I'm " . $this->name;\n  }\n}\n\n$person = new Person("Alice", 20);\necho $person->greet();`,
          description:
            "Classes are blueprints and objects are instances created with new. $this refers to the current object, -> reaches its properties and methods, and __construct runs when an object is created.",
        },
        {
          id: "php12",
          title: "Inheritance & Interfaces",
          syntax: `interface Speaks {\n  public function speak(): string;\n}\n\nclass Animal {\n  public function __construct(protected string $name) {}\n}\n\nclass Dog extends Animal implements Speaks {\n  public function speak(): string {\n    return $this->name . " says Woof";\n  }\n}\n\necho (new Dog("Rex"))->speak();`,
          description:
            "extends inherits from a parent class and implements promises to provide an interface's methods. protected members are visible to child classes, and PHP 8 constructor promotion declares a property in the constructor itself.",
        },
        {
          id: "php13",
          title: "Exceptions",
          syntax: `function divide(int $a, int $b): float {\n  if ($b === 0) {\n    throw new InvalidArgumentException("Cannot divide by zero");\n  }\n  return $a / $b;\n}\n\ntry {\n  echo divide(10, 0);\n} catch (InvalidArgumentException $e) {\n  echo "Error: " . $e->getMessage();\n} finally {\n  echo " Done";\n}`,
          description:
            "throw raises an exception, try wraps risky code, catch handles a specific type of exception, and finally always runs. getMessage() returns the error text.",
        },
        {
          id: "php14",
          title: "PDO & Prepared Statements",
          syntax: `$pdo = new PDO(\n  "mysql:host=localhost;dbname=shop;charset=utf8mb4",\n  "db_user",\n  "db_password",\n  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]\n);\n\n$email = "alice@example.com";\n$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");\n$stmt->execute(["email" => $email]);\n$user = $stmt->fetch(PDO::FETCH_ASSOC);`,
          description:
            "PDO connects PHP to a database. Prepared statements keep user input separate from the SQL text, which protects against SQL injection. It needs the PDO extension and a running database server.",
        },
        {
          id: "php15",
          title: "Sessions",
          syntax: `session_start();\n\n$_SESSION["user"] = "Alice";\necho $_SESSION["user"];\n\n// Log the user out\nsession_unset();\nsession_destroy();`,
          description:
            "Sessions remember data about a visitor across page requests. Call session_start() before sending any output, then read and write the $_SESSION array.",
        },
      ],
    },
  ],
};
