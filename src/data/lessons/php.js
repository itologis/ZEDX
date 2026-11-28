// Lessons for the PHP track. Same shape as the other language tracks.

export default {
  php1: [
    {
      title: "PHP tags and echo",
      body: [
        `PHP runs on the server between [[<?php]] and [[?>]]. Everything outside those tags is sent to the browser as plain text.`,
        `[[echo]] writes to the response. Every statement ends with a semicolon.`,
      ],
      example: {
        code: `<?php
echo "Hello, world";
?>`,
        caption: `Open the tag, echo, close.`,
      },
      wrong: {
        code: `<?php
echo "Hello, world"
?>`,
        why: `The missing semicolon is a parse error; PHP stops before sending anything.`,
      },
    },
    {
      title: "Variables inside strings",
      body: [
        `Double-quoted strings interpolate variables: [["Hi, $name"]]. Single-quoted strings do not.`,
        `Use curly braces when the name is ambiguous: [["Hi, {$user["name"]}"]].`,
      ],
      example: {
        code: `<?php
$name = "Ada";
echo "Hi, $name";
echo 'Hi, $name';`,
        caption: `The second line prints the dollar sign literally.`,
      },
      wrong: {
        code: `<?php
$name = "Ada";
echo 'Hi, $name';`,
        why: `Single quotes treat the text literally, so the output is "Hi, $name" instead of the value.`,
      },
    },
    {
      title: "Comments",
      body: [
        `[[//]] and [[#]] comment to the end of the line. [[/* ... */]] comments a block.`,
        `Comments are stripped before execution. They are for the next reader, not for hiding broken code.`,
      ],
      example: {
        code: `<?php
// Temporary: prices arrive in cents
$price = $cents / 100;`,
        caption: `One line explaining the unit.`,
      },
      wrong: {
        code: `<?php
<!-- a note -->
echo "hi";`,
        why: `HTML comments are not PHP comments. The line is parsed as PHP and causes a syntax error.`,
      },
    },
  ],

  php2: [
    {
      title: "Variables and case sensitivity",
      body: [
        `A variable starts with [[$]] and needs no declaration. [[$name]] and [[$Name]] are different variables.`,
        `Assign a value before reading it; an undefined variable is a warning and evaluates to null.`,
      ],
      example: {
        code: `<?php
$name = "Ada";
$Name = "Grace";
echo $name;`,
        caption: `Two names, two variables.`,
      },
      wrong: {
        code: `<?php
$username = "Ada";
echo $userName;`,
        why: `Variable names are case-sensitive, so [[$userName]] is undefined and prints a warning.`,
      },
    },
    {
      title: "Dynamic types",
      body: [
        `PHP decides a variable's type from its value. The same variable can hold a string and later an integer.`,
        `Arithmetic converts numeric strings. A non-numeric string in PHP 8 throws TypeError instead of silently becoming 0.`,
      ],
      example: {
        code: `<?php
$count = "5";
$total = $count + 1;`,
        caption: `A numeric string participates in arithmetic.`,
      },
      wrong: {
        code: `<?php
$count = "five";
$total = $count + 1;`,
        why: `"five" is not numeric, so PHP 8 throws TypeError. Validate or cast explicitly.`,
      },
    },
    {
      title: "Declaring types",
      body: [
        `Types are optional, but declarations make intent explicit: [[function add(int $a, int $b): int]].`,
        `By default PHP coerces compatible values. [[declare(strict_types=1)]] makes mismatches throw, which catches bugs earlier.`,
      ],
      example: {
        code: `<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}`,
        caption: `Strict types, explicit signature.`,
      },
      wrong: {
        code: `<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return "result";
}`,
        why: `Strict mode rejects the string return value: the declared return type does not match.`,
      },
    },
  ],

  php3: [
    {
      title: "if, elseif, else",
      body: [
        `[[if]] runs a block when its condition is true. [[elseif]] adds branches and [[else]] is the fallback.`,
        `Conditions need no parentheses in PHP, but they are conventional and make grouping obvious.`,
      ],
      example: {
        code: `<?php
$score = 72;

if ($score >= 90) {
    echo "A";
} elseif ($score >= 70) {
    echo "B";
} else {
    echo "C";
}`,
        caption: `Exactly one branch runs.`,
      },
      wrong: {
        code: `<?php
$score = 72;
if ($score = 90) {
    echo "A";
}`,
        why: `A single [[=]] assigns 90 and returns a truthy value, so the branch always runs. Use [[==]] or [[===]].`,
      },
    },
    {
      title: "Loose and strict comparison",
      body: [
        `[[==]] compares after type juggling. [[===]] compares value and type. PHP 8 tightened some loose comparisons but not all of them.`,
        `Use [[===]] unless you deliberately want coercion. It removes a whole class of surprises.`,
      ],
      example: {
        code: `<?php
if ($role === "admin") {
    echo "welcome";
}`,
        caption: `Same value, same type.`,
      },
      wrong: {
        code: `<?php
if ("1" == "01") {
    echo "equal";
}`,
        why: `Loose comparison treats both as numbers, so this prints "equal". Strict comparison would not.`,
      },
    },
    {
      title: "Combining conditions",
      body: [
        `[[&&]] requires both conditions to be true. [[||]] allows either condition to be true, and [[!]] reverses a boolean value.`,
        `Use parentheses when a condition mixes [[&&]] and [[||]]. They make the intended groups easier to read and help prevent logic mistakes.`,
      ],
      example: {
        code: `<?php
$age = 20;
$hasTicket = true;

if ($age >= 18 && $hasTicket) {
    echo "Entry allowed";
} else {
    echo "Entry denied";
}`,
        caption: `The visitor must be old enough and have a ticket.`,
      },
      wrong: {
        code: `<?php
$age = 16;
$hasPermission = true;

if ($age >= 18 || $hasPermission) {
    echo "Entry allowed";
}`,
        why: `The [[||]] operator needs only one side to be true, so permission alone allows entry. Use [[&&]] when both requirements must be met.`,
      },
    },
  ],

  php4: [
    {
      title: "for loops",
      body: [
        `A [[for]] loop has initialisation, condition, and update. The condition runs before each pass.`,
        `Arrays are zero-indexed; the last valid index is [[count($items) - 1]].`,
      ],
      example: {
        code: `<?php
for ($i = 0; $i < count($items); $i++) {
    echo $items[$i];
}`,
        caption: `Start at 0, stop before the count.`,
      },
      wrong: {
        code: `<?php
for ($i = 0; $i <= count($items); $i++) {
    echo $items[$i];
}`,
        why: `The last pass reads one index past the end, which is an undefined key warning. Use [[<]].`,
      },
    },
    {
      title: "while and do-while",
      body: [
        `[[while]] checks first. [[do-while]] runs the body once, then checks.`,
        `Something in the body must change the condition, or the loop never ends.`,
      ],
      example: {
        code: `<?php
$count = 3;

while ($count > 0) {
    echo $count;
    $count--;
}`,
        caption: `The decrement ends the loop.`,
      },
      wrong: {
        code: `<?php
$count = 3;

while ($count > 0) {
    echo $count;
}`,
        why: `count never changes, so the loop runs until the request times out.`,
      },
    },
    {
      title: "foreach loops",
      body: [
        `[[foreach]] visits each item in an array without needing a counter. PHP assigns the current item to the variable after [[as]] on each pass.`,
        `Use it when you want to process every item in a collection. If you need the position as well, use a counted [[for]] loop or learn key/value iteration with associative arrays.`,
      ],
      example: {
        code: `<?php
$colors = ["red", "blue", "green"];

foreach ($colors as $color) {
    echo $color . "\\n";
}`,
        caption: `Each color is handled once, in its original order.`,
      },
      wrong: {
        code: `<?php
$colors = ["red", "blue", "green"];

foreach ($colors as $color) {
    echo $colour . "\\n";
}`,
        why: `The loop assigns each item to [[$color]], but the body tries to read [[$colour]]. Those are different variable names, so PHP cannot find the value being printed. Use the same spelling in both places.`,
      },
    },
  ],

  php5: [
    {
      title: "Defining and returning",
      body: [
        `[[function name($param) { ... }]] declares a function. [[return]] sends a value back and ends the function.`,
        `A function without return gives null. Echoing inside is not the same as returning a value.`,
      ],
      example: {
        code: `<?php
function double(int $n): int {
    return $n * 2;
}`,
        caption: `Input, output, one expression.`,
      },
      wrong: {
        code: `<?php
function double(int $n): int {
    echo $n * 2;
}`,
        why: `The declared return type is int but nothing is returned, so PHP throws TypeError.`,
      },
    },
    {
      title: "Defaults and type declarations",
      body: [
        `A default value makes a parameter optional: [[function greet($name = "friend")]].`,
        `Type declarations document the contract. With strict types they also enforce it at the boundary.`,
      ],
      example: {
        code: `<?php
function greet(string $name = "friend"): string {
    return "Hi, $name";
}`,
        caption: `Optional name, guaranteed string result.`,
      },
      wrong: {
        code: `<?php
function greet(string $name = "friend") { }

greet(null);`,
        why: `null is not a string and there is no nullable type, so the call fails in strict mode. Declare [[?string]] if null is valid.`,
      },
    },
    {
      title: "Using a returned value",
      body: [
        `Calling a function runs its body and gives you the value sent back by [[return]]. You can store that result in a variable, display it, or use it in another calculation.`,
        `The parameters inside the function are local names. Each call can pass different arguments, while the function keeps the calculation in one reusable place.`,
      ],
      example: {
        code: `<?php
function lineTotal(int $price, int $quantity): int {
    return $price * $quantity;
}

$cartTotal = lineTotal(25, 3);
echo "Total: " . $cartTotal;`,
        caption: `The same function can calculate the total for any price and quantity.`,
      },
      wrong: {
        code: `<?php
function lineTotal(int $price, int $quantity): int {
    echo $price * $quantity;
}

$cartTotal = lineTotal(25, 3);
echo $cartTotal;`,
        why: `echo displays the result but does not send it back. The function returns null, so [[$cartTotal]] does not contain the calculated total. Use [[return]].`,
      },
    },
  ],

  php6: [
    {
      title: "Indexed arrays",
      body: [
        `An array holds ordered values: [[["a", "b", "c"]]]. Index from 0.`,
        `Read a key that does not exist and PHP emits a warning and returns null. Check with [[isset()]] or [[array_key_exists()]].`,
      ],
      example: {
        code: `<?php
$names = ["Ada", "Grace"];
echo $names[0];`,
        caption: `First item at index 0.`,
      },
      wrong: {
        code: `<?php
$names = ["Ada", "Grace"];
echo $names[2];`,
        why: `Index 2 does not exist, so this is an undefined array key warning and the output is empty.`,
      },
    },
    {
      title: "Adding, removing, counting",
      body: [
        `[[$items[] = $value]] appends. [[count()]] returns the number of elements.`,
        `[[unset($items[1])]] removes a key but does not renumber the rest, so a for loop over count() can skip values.`,
      ],
      example: {
        code: `<?php
$items = ["a", "b", "c"];
unset($items[1]);

foreach ($items as $item) {
    echo $item;
}`,
        caption: `foreach walks the remaining keys.`,
      },
      wrong: {
        code: `<?php
$items = ["a", "b", "c"];
unset($items[1]);

for ($i = 0; $i < count($items); $i++) {
    echo $items[$i];
}`,
        why: `After unset the keys are 0 and 2, but count is 2, so the loop stops before reaching index 2 and prints only "a".`,
      },
    },
    {
      title: "Sorting",
      body: [
        `[[sort()]] sorts values and renumbers keys. [[asort()]] keeps keys. [[ksort()]] sorts by key.`,
        `Choose by what the keys mean. Sorting an associative array with sort() throws the keys away.`,
      ],
      example: {
        code: `<?php
$scores = ["ada" => 90, "grace" => 95];
asort($scores);`,
        caption: `Values sorted, names preserved.`,
      },
      wrong: {
        code: `<?php
$scores = ["ada" => 90, "grace" => 95];
sort($scores);`,
        why: `sort renumbers the keys to 0 and 1, so the names are lost. Use asort.`,
      },
    },
  ],

  php7: [
    {
      title: "Keys and values",
      body: [
        `An associative array maps keys to values: [["name" => "Ada", "age" => 36]]. The [[=>]] links a key to its value.`,
        `Keys are strings or integers. Unquoted keys are treated as constants and may be an error.`,
      ],
      example: {
        code: `<?php
$user = ["name" => "Ada", "age" => 36];
echo $user["name"];`,
        caption: `Quote the key.`,
      },
      wrong: {
        code: `<?php
$user = ["name" => "Ada"];
echo $user[name];`,
        why: `Unquoted [[name]] is treated as a constant, which is undefined in PHP 8 and throws an error.`,
      },
    },
    {
      title: "Looping with keys",
      body: [
        `[[foreach ($user as $key => $value)]] gives both sides. Nested arrays print as "Array" if echoed directly.`,
        `Use the key when the order or the label matters, and the value when it does not.`,
      ],
      example: {
        code: `<?php
foreach ($user as $key => $value) {
    echo "$key: $value\n";
}`,
        caption: `Both sides of the pair.`,
      },
      wrong: {
        code: `<?php
$user = ["name" => "Ada", "roles" => ["admin"]];

foreach ($user as $key => $value) {
    echo "$key: $value\n";
}`,
        why: `The nested array is converted to the string "Array", with a warning. Print it with implode or json_encode instead.`,
      },
    },
    {
      title: "Checking keys",
      body: [
        `[[isset($user["email"])]] is false when the key is missing or the value is null. [[array_key_exists()]] only checks presence.`,
        `Pick by intent: does the key exist, or does it hold a usable value?`,
      ],
      example: {
        code: `<?php
if (array_key_exists("email", $user)) {
    echo $user["email"] ?? "none";
}`,
        caption: `Presence first, null-safe read second.`,
      },
      wrong: {
        code: `<?php
$user = ["email" => null];

if (isset($user["email"])) {
    echo "has email";
}`,
        why: `The key exists, but isset returns false for a null value, so the branch is skipped.`,
      },
    },
  ],

  php8: [
  {
    "title": "Join strings and measure their length",
    "body": "PHP uses the dot operator to join strings. strlen returns the number of bytes in a string, which matches the number of characters for simple ASCII text. UTF-8 characters outside ASCII can use more than one byte, so byte length and visible character count are not always the same.",
    "example": {
      "code": "$name = \"Mina\";\n$message = \"Hello, \" . $name;\necho $message;\necho strlen($name);"
    },
    "wrong": {
      "code": "$message = \"Hello, \" + $name;",
      "why": "PHP uses the dot operator for string concatenation. The plus operator is used for arithmetic, not for joining text."
    }
  },
  {
    "title": "Trim and change text case",
    "body": "trim removes whitespace from the beginning and end of a string. strtolower converts letters to lowercase, while strtoupper converts them to uppercase. These functions return a string, so assign the result when the cleaned value should be used later.",
    "example": {
      "code": "$raw = \"  ZEDX  \";\n$clean = trim($raw);\n$normalized = strtolower($clean);\necho $normalized;"
    },
    "wrong": {
      "code": "$raw = \"  ZEDX  \";\n$raw.trim();\necho $raw;",
      "why": "PHP string functions are called as functions, not as JavaScript-style methods. Use trim($raw) and store the returned string."
    }
  },
  {
    "title": "Search and replace text",
    "body": "str_replace returns a string with matching text replaced. In PHP 8 and later, str_contains checks whether a string contains another string and returns true or false. These functions use literal text rather than regular-expression patterns. For pattern matching, PHP provides separate preg_* functions.",
    "example": {
      "code": "$message = \"Welcome, reader!\";\nif (str_contains($message, \"reader\")) {\n    $message = str_replace(\"reader\", \"Mina\", $message);\n}\necho $message;"
    },
    "wrong": {
      "code": "$message = \"Welcome, reader!\";\nstr_replace(\"reader\", \"Mina\", $message);\necho $message;",
      "why": "str_replace returns an updated string but does not change the original variable automatically. Assign its return value when you want to keep the replacement."
    }
  }
],

  php9: [
    {
      title: "Reading form data",
      body: [
        `[[$_GET]] holds query-string values; [[$_POST]] holds the request body from a form with method="post".`,
        `Both are superglobals — available in every scope without passing them around.`,
      ],
      example: {
        code: `<?php
$email = $_POST["email"] ?? "";`,
        caption: `Read one field with a default.`,
      },
      wrong: {
        code: `<?php
// login form uses method="get"
$password = $_GET["password"];`,
        why: `GET puts the password in the URL, browser history, and server logs. Credentials belong in a POST body.`,
      },
    },
    {
      title: "Defaults and validation",
      body: [
        `[[??]] supplies a default for a missing key. [[filter_input()]] validates the value against a filter.`,
        `Never trust the shape of incoming data: a field may be missing, empty, an array, or a string.`,
      ],
      example: {
        code: `<?php
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);

if ($email === false) {
    echo "invalid email";
}`,
        caption: `Validate at the boundary.`,
      },
      wrong: {
        code: `<?php
$email = $_POST["email"];
echo "Thanks, $email";`,
        why: `The key may be missing (warning) and the value is unescaped, so this is both fragile and an XSS hole.`,
      },
    },
    {
      title: "Escaping output",
      body: [
        `[[htmlspecialchars()]] turns angle brackets and quotes into entities so user text cannot become markup.`,
        `Escape at the point of output, not on the way in. The same value may be safe in HTML and unsafe in an attribute or a URL.`,
      ],
      example: {
        code: `<?php
$name = $_POST["name"] ?? "";
echo htmlspecialchars($name, ENT_QUOTES, "UTF-8");`,
        caption: `Text goes out as text.`,
      },
      wrong: {
        code: `<?php
echo "<p>" . $_POST["comment"] . "</p>";`,
        why: `A comment containing a script tag runs in the visitor's browser: stored XSS. Escape it with htmlspecialchars.`,
      },
    },
  ],

  php10: [
    {
      title: "include and require",
      body: [
        `[[include]] inserts another file and warns if it is missing. [[require]] stops the script with a fatal error.`,
        `Use require for anything the page cannot work without: configuration, a database connection, a class.`,
      ],
      example: {
        code: `<?php
require __DIR__ . "/config.php";`,
        caption: `Missing config stops the request immediately.`,
      },
      wrong: {
        code: `<?php
include __DIR__ . "/config.php";
$db->query("SELECT 1");`,
        why: `If config is missing, include only warns, the connection never exists, and the next line fatals on a null value.`,
      },
    },
    {
      title: "The _once variants",
      body: [
        `[[include_once]] and [[require_once]] skip a file that has already been loaded.`,
        `Without _once, loading a file with a function or class declaration twice is a fatal redeclaration error.`,
      ],
      example: {
        code: `<?php
require_once __DIR__ . "/helpers.php";`,
        caption: `Safe to call from several files.`,
      },
      wrong: {
        code: `<?php
require __DIR__ . "/helpers.php";
require __DIR__ . "/helpers.php";`,
        why: `The second load redeclares every function, which is a fatal error. Use require_once.`,
      },
    },
    {
      title: "Paths that do not depend on the cwd",
      body: [
        `A relative include resolves against the working directory, which can change between web server and CLI.`,
        `[[__DIR__]] is the directory of the current file. Build absolute paths from it.`,
      ],
      example: {
        code: `<?php
require __DIR__ . "/../vendor/autoload.php";`,
        caption: `An absolute path anchored at the file.`,
      },
      wrong: {
        code: `<?php
require "vendor/autoload.php";`,
        why: `Running from another directory makes this path wrong. Anchor it with [[__DIR__]].`,
      },
    },
  ],

  php11: [
    {
      title: "Classes and objects",
      body: [
        `A [[class]] groups properties and methods. [[new]] creates an object.`,
        `Inside a method, [[$this]] refers to the current object. Properties are reached with [[$this->name]].`,
      ],
      example: {
        code: `<?php
class User {
    public string $name;

    public function greet(): string {
        return "Hi, " . $this->name;
    }
}`,
        caption: `Property plus method.`,
      },
      wrong: {
        code: `<?php
class User {
    public string $name = "Ada";

    public function greet(): string {
        return "Hi, " . $name;
    }
}`,
        why: `[[$name]] is a local variable, not the property. Use [[$this->name]].`,
      },
    },
    {
      title: "Constructors and visibility",
      body: [
        `[[__construct()]] runs when an object is created. [[private]] hides a member from outside the class; [[protected]] also hides it from subclasses.`,
        `Accessing a private property from outside is a fatal error, which is the protection working.`,
      ],
      example: {
        code: `<?php
class Account {
    public function __construct(
        private int $balance,
    ) {}
}`,
        caption: `Constructor promotion declares and assigns in one place.`,
      },
      wrong: {
        code: `<?php
class Account {
    private int $balance = 0;
}

$account = new Account();
$account->balance = 50;`,
        why: `balance is private, so the assignment is a fatal error. Add a method that enforces the rules.`,
      },
    },
    {
      title: "Static members",
      body: [
        `[[static]] members belong to the class, not an object. Call them with [[ClassName::method()]].`,
        `A static method has no [[$this]]. It cannot read instance properties.`,
      ],
      example: {
        code: `<?php
class Counter {
    public static int $count = 0;
}`,
        caption: `One counter for the class.`,
      },
      wrong: {
        code: `<?php
class Counter {
    public static function reset(): void {
        $this->count = 0;
    }
}`,
        why: `There is no object in a static method, so [[$this]] is a fatal error. Use [[self::$count]].`,
      },
    },
  ],

  php12: [
    {
      title: "extends and overrides",
      body: [
        `[[extends]] inherits properties and methods. A child can override a method with the same signature.`,
        `Private members stay private to the parent. Use protected when the child needs access.`,
      ],
      example: {
        code: `<?php
class Animal {
    protected string $name;
}

class Dog extends Animal {
    public function speak(): string {
        return $this->name . " says woof";
    }
}`,
        caption: `protected lets the child read the name.`,
      },
      wrong: {
        code: `<?php
class Animal {
    private string $name;
}

class Dog extends Animal {
    public function speak(): string {
        return $this->name;
    }
}`,
        why: `The child cannot see a private parent property, so this is an undefined property error.`,
      },
    },
    {
      title: "Interfaces",
      body: [
        `An [[interface]] declares methods without bodies. A class that [[implements]] it must define every one.`,
        `A class can implement several interfaces, which is how PHP expresses capability without a shared parent.`,
      ],
      example: {
        code: `<?php
interface Shape {
    public function area(): float;
}

class Circle implements Shape {
    public function area(): float {
        return 3.14 * 2 * 2;
    }
}`,
        caption: `The contract is checked at load time.`,
      },
      wrong: {
        code: `<?php
interface Shape {
    public function area(): float;
}

class Circle implements Shape { }`,
        why: `Circle does not define area(), so PHP throws a fatal error when the class is loaded.`,
      },
    },
    {
      title: "Polymorphism",
      body: [
        `A parameter typed as a parent class or interface accepts any implementation. The actual object decides which method runs.`,
        `The type limits what you can call: only methods on the declared type are visible.`,
      ],
      example: {
        code: `<?php
function total(Shape $shape): float {
    return $shape->area();
}`,
        caption: `Any shape works.`,
      },
      wrong: {
        code: `<?php
function total(Shape $shape): float {
    return $shape->radius() * 2;
}`,
        why: `radius() is declared on Circle, not Shape, so the call is not guaranteed for every implementation.`,
      },
    },
  ],

  php13: [
    {
      title: "throw and catch",
      body: [
        `[[throw new Exception("message")]] raises an error that travels up until a catch handles it.`,
        `[[try]] wraps risky code and [[catch (Exception $e)]] handles it. The catch type must match the thrown class or its parent.`,
      ],
      example: {
        code: `<?php
try {
    $value = (int) $input;
} catch (Throwable $e) {
    $value = 0;
}`,
        caption: `Catch what can actually be thrown.`,
      },
      wrong: {
        code: `<?php
try {
    risky();
} catch (Exception $e) {
    log_error($e);
} catch (RuntimeException $e) {
    retry();
}`,
        why: `Exception already catches RuntimeException, so the second block is unreachable. Order specific before general.`,
      },
    },
    {
      title: "finally",
      body: [
        `[[finally]] runs whether the try succeeded, failed, or returned. It is for cleanup.`,
        `A return inside finally overrides the try's return or even a pending exception, which is almost never intended.`,
      ],
      example: {
        code: `<?php
try {
    $file = fopen($path, "r");
} finally {
    if (isset($file)) fclose($file);
}`,
        caption: `Cleanup runs on every path.`,
      },
      wrong: {
        code: `<?php
try {
    return load();
} finally {
    return null;
}`,
        why: `The finally return discards the real result. Cleanup should close resources, not return values.`,
      },
    },
    {
      title: "Custom exceptions",
      body: [
        `Extend [[Exception]] or [[RuntimeException]] to name a failure your code can catch specifically.`,
        `[[getMessage()]] returns the text. Pass the previous exception as the third constructor argument to keep the cause.`,
      ],
      example: {
        code: `<?php
class PaymentFailed extends RuntimeException { }

throw new PaymentFailed("card declined");`,
        caption: `A type that can be caught by name.`,
      },
      wrong: {
        code: `<?php
try {
    charge();
} catch (RuntimeException $e) {
    throw new RuntimeException("payment failed");
}`,
        why: `The original exception is dropped, so the real cause is missing from the log. Pass it as [[previous]].`,
      },
    },
  ],

  php14: [
    {
      title: "Connecting with PDO",
      body: [
        `[[new PDO($dsn, $user, $pass)]] opens a database connection. The DSN names the driver, host, database, and charset.`,
        `Set [[ERRMODE_EXCEPTION]] so failures throw instead of returning false silently.`,
      ],
      example: {
        code: `<?php
$pdo = new PDO(
    "mysql:host=localhost;dbname=app;charset=utf8mb4",
    $user,
    $pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION],
);`,
        caption: `Errors become exceptions from the start.`,
      },
      wrong: {
        code: `<?php
$pdo = new PDO("mysql:host=localhost;dbname=app", $user, $pass);
$result = $pdo->query("SELECT * FROM missing_table");`,
        why: `The default error mode is silent, so the query returns false and the failure is never reported.`,
      },
    },
    {
      title: "Prepared statements",
      body: [
        `Prepare the SQL with placeholders, then bind or pass the values. The database keeps code and data separate.`,
        `Never concatenate user input into SQL, even with quotes and escaping. Placeholders are the reliable protection.`,
      ],
      example: {
        code: `<?php
$stmt = $pdo->prepare(
    "SELECT * FROM users WHERE email = ?"
);
$stmt->execute([$email]);`,
        caption: `The email is data, never SQL.`,
      },
      wrong: {
        code: `<?php
$sql = "SELECT * FROM users WHERE email = '$email'";
$pdo->query($sql);`,
        why: `An email of "' OR 1=1 --" turns the query into a full-table read: SQL injection. Use prepared statements.`,
      },
    },
    {
      title: "Fetching and transactions",
      body: [
        `[[fetch()]] returns one row, [[fetchAll()]] returns all of them. For large results, iterate fetch instead of holding everything in memory.`,
        `Wrap related writes in [[beginTransaction()]] and [[commit()]], with [[rollBack()]] on failure.`,
      ],
      example: {
        code: `<?php
$pdo->beginTransaction();
try {
    $pdo->exec($debit);
    $pdo->exec($credit);
    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    throw $e;
}`,
        caption: `Both writes or neither.`,
      },
      wrong: {
        code: `<?php
$balance = $pdo->query("SELECT balance FROM accounts")->fetchAll();`,
        why: `fetchAll loads every row into memory. On a large table this exhausts memory; use a prepared query and fetch in a loop.`,
      },
    },
  ],

  php15: [
    {
      title: "Starting a session",
      body: [
        `[[session_start()]] creates or resumes a session and gives the visitor a cookie. Session data lives in [[$_SESSION]].`,
        `It must run before any output, because it sends a response header.`,
      ],
      example: {
        code: `<?php
session_start();
$_SESSION["user_id"] = 42;`,
        caption: `Start first, then read and write.`,
      },
      wrong: {
        code: `<?php
echo "<h1>Welcome</h1>";
session_start();`,
        why: `Headers are already sent, so session_start fails with "headers already sent". Move it to the top of the script.`,
      },
    },
    {
      title: "Login and logout",
      body: [
        `On login, store the user id and call [[session_regenerate_id(true)]] to replace the session id.`,
        `On logout, clear [[$_SESSION]], delete the session cookie, and call [[session_destroy()]].`,
      ],
      example: {
        code: `<?php
session_start();
session_regenerate_id(true);
$_SESSION["user_id"] = $id;`,
        caption: `A new id after authentication.`,
      },
      wrong: {
        code: `<?php
session_start();
$_SESSION["user_id"] = $id;`,
        why: `Keeping the pre-login session id allows session fixation: an attacker who set the id earlier now shares the logged-in session.`,
      },
    },
    {
      title: "Flash messages and CSRF",
      body: [
        `A flash message is stored in the session, read once, then removed. That survives a redirect without polluting the URL.`,
        `Any state-changing form needs a CSRF token: generate one per session, put it in the form, and compare it on submit.`,
      ],
      example: {
        code: `<?php
// in the form
echo '<input type="hidden" name="token" value="' .
    htmlspecialchars($_SESSION["csrf"]) . '">';

// on submit
if (!hash_equals($_SESSION["csrf"], $_POST["token"])) {
    throw new RuntimeException("bad token");
}`,
        caption: `One token per session, compared in constant time.`,
      },
      wrong: {
        code: `<?php
if ($_POST["confirm"] === "yes") {
    delete_account($user);
}`,
        why: `Another site can submit this form with the visitor's cookies, so the check proves nothing. Require a CSRF token.`,
      },
    },
  ],

  "php16": [
  {
    "title": "Calculate and assign values",
    "body": [
      "Arithmetic operators include +, -, *, /, %, and **. Assignment operators store or update values, including shorthand forms such as += and *=.",
      "Use a numeric type that fits the values being calculated. Do not assume every value received from a form is already numeric; validate and convert it deliberately."
    ],
    "example": {
      "code": "$price = 19.50;\n$quantity = 3;\n$total = $price * $quantity;",
      "caption": "The multiplication calculates a total."
    },
    "wrong": {
      "code": "$price = \"19.50\";\n$total = $price + \"three\";",
      "why": "The value is not a valid numeric amount. Validate and convert external input before arithmetic."
    }
  },
  {
    "title": "Compare and combine conditions",
    "body": [
      "Comparison operators include ==, ===, !=, !==, <, and >=. Logical operators &&, ||, and ! combine Boolean conditions.",
      "Prefer strict comparison when both type and value should match. Loose comparison can convert values and produce surprising results with mixed types."
    ],
    "example": {
      "code": "if ($age >= 18 && $hasId === true) {\n    echo \"Continue\";\n}",
      "caption": "Both requirements must be satisfied."
    },
    "wrong": {
      "code": "if ($age = 18) {\n    echo \"Continue\";\n}",
      "why": "A single equals sign assigns a value. Use == or === for comparison."
    }
  },
  {
    "title": "Join strings and supply fallbacks",
    "body": [
      "The dot operator concatenates strings. The null coalescing operator ?? supplies a fallback when a value is absent or null.",
      "Do not confuse concatenation with arithmetic addition. Keep user input escaped for its output context, and do not treat a fallback operator as input validation."
    ],
    "example": {
      "code": "$name = $_POST[\"name\"] ?? \"Guest\";\n$message = \"Hello, \" . $name;\necho htmlspecialchars($message);",
      "caption": "A missing value gets a fallback and the output is escaped."
    },
    "wrong": {
      "code": "$message = \"Total: \" + $total;",
      "why": "PHP uses the dot operator for string concatenation. Plus is arithmetic addition."
    }
  }
],
  "php17": [
  {
    "title": "Declare constants",
    "body": [
      "define() declares a named constant at runtime, while const declares a compile-time constant in supported declaration contexts. Constants do not use the dollar sign when referenced.",
      "Use descriptive uppercase names by convention. A constant should represent a value that is not expected to change while the application runs."
    ],
    "example": {
      "code": "define(\"APP_NAME\", \"ZEDX\");\nconst MAX_ATTEMPTS = 3;\necho APP_NAME;",
      "caption": "Constants are referenced without a dollar sign."
    },
    "wrong": {
      "code": "$APP_NAME = \"ZEDX\";\necho $APP_NAME;",
      "why": "This creates a normal variable, not a constant. Use define() or const for a constant."
    }
  },
  {
    "title": "Understand variable scope",
    "body": [
      "A variable declared inside a function is local to that function. The global keyword can import a global variable into a function, while superglobals are available across scopes.",
      "Prefer passing values as parameters and returning results instead of relying on global state. Explicit dependencies make functions easier to test and reuse."
    ],
    "example": {
      "code": "$taxRate = 0.12;\nfunction total($amount) {\n    global $taxRate;\n    return $amount * (1 + $taxRate);\n}",
      "caption": "The global keyword makes the outer variable available."
    },
    "wrong": {
      "code": "$taxRate = 0.12;\nfunction total($amount) {\n    return $amount * (1 + $taxRate);\n}",
      "why": "A local function cannot automatically read an ordinary global variable. Pass it as a parameter or import it deliberately."
    }
  },
  {
    "title": "Use static local and class state deliberately",
    "body": [
      "A static local variable retains its value between calls to the function. A static class property belongs to the class rather than one particular object.",
      "Use static state only when shared lifetime is intentional. Hidden mutable state can make behavior harder to predict across tests or requests."
    ],
    "example": {
      "code": "function nextId(): int {\n    static $id = 0;\n    return ++$id;\n}",
      "caption": "The local counter persists between calls."
    },
    "wrong": {
      "code": "function nextId(): int {\n    $id = 0;\n    return ++$id;\n}",
      "why": "The variable resets to zero every call. Use static when the function must retain its local value."
    }
  }
],
  "php18": [
  {
    "title": "Send response headers",
    "body": [
      "HTTP headers describe the response, such as its content type, cache policy, or redirect destination. PHP's header() function sends a response header before output begins.",
      "Headers must be sent before body content. Avoid accidental whitespace or debug output before a header call."
    ],
    "example": {
      "code": "header(\"Content-Type: application/json\");\necho json_encode([\"ok\" => true]);",
      "caption": "The content type matches the JSON response."
    },
    "wrong": {
      "code": "echo \"Starting response\";\nheader(\"Content-Type: application/json\");",
      "why": "Output has already started, so PHP may no longer be able to change the headers."
    }
  },
  {
    "title": "Set a cookie",
    "body": [
      "setcookie() asks the browser to store a small value and send it with later matching requests. Options can set an expiry, path, domain, secure flag, HttpOnly flag, and SameSite policy.",
      "Use Secure on HTTPS sites, HttpOnly when client-side scripts do not need to read the cookie, and an appropriate SameSite value. Cookies are not a safe place for arbitrary secrets."
    ],
    "example": {
      "code": "setcookie(\"theme\", \"dark\", [\n    \"expires\" => time() + 3600,\n    \"secure\" => true,\n    \"httponly\" => true,\n    \"samesite\" => \"Lax\"\n]);",
      "caption": "The options describe how the browser should handle the cookie."
    },
    "wrong": {
      "code": "setcookie(\"theme\", \"dark\");\necho $_COOKIE[\"theme\"];",
      "why": "The browser sends a newly set cookie on a later matching request, not necessarily in the current request."
    }
  },
  {
    "title": "Read and expire cookies",
    "body": [
      "Incoming cookies are available through $_COOKIE. A cookie can be expired by sending the same name with an expiry time in the past.",
      "Treat cookie values as untrusted input. Validate them before use, and do not assume that a cookie proves that a user is authenticated."
    ],
    "example": {
      "code": "if (isset($_COOKIE[\"theme\"])) {\n    $theme = $_COOKIE[\"theme\"];\n}\nsetcookie(\"theme\", \"\", time() - 3600, \"/\");",
      "caption": "The cookie is read from the request and expired in the response."
    },
    "wrong": {
      "code": "if ($_COOKIE[\"is_admin\"] === \"1\") {\n    showAdminPanel();\n}",
      "why": "A visitor can modify cookies. Check authorization using trusted server-side session or account data."
    }
  }
],
  "php19": [
  {
    "title": "Encode PHP values",
    "body": [
      "json_encode() serializes supported PHP values such as arrays and objects into a JSON string. This is useful for API responses and data interchange.",
      "Check the return value and handle encoding errors. Invalid text encoding or unsupported values can prevent successful serialization."
    ],
    "example": {
      "code": "$payload = [\"name\" => \"Ada\", \"active\" => true];\nheader(\"Content-Type: application/json\");\necho json_encode($payload);",
      "caption": "The response body contains JSON text."
    },
    "wrong": {
      "code": "$payload = [\"name\" => \"Ada\"];\necho $payload;",
      "why": "echo does not convert an array into JSON. Use json_encode() to create the text representation."
    }
  },
  {
    "title": "Decode JSON text",
    "body": [
      "json_decode() parses a JSON string. Its second argument controls whether JSON objects become PHP associative arrays or objects.",
      "Validate decoded data before using it. Malformed input can return null or raise a JSON error, so check the decoder's error state or use JSON_THROW_ON_ERROR."
    ],
    "example": {
      "code": "$data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);\n$name = $data[\"name\"] ?? \"Guest\";",
      "caption": "The true argument requests associative arrays."
    },
    "wrong": {
      "code": "$data = json_decode($json, true);\necho $data->name;",
      "why": "The true argument returns an associative array, so read the value with array syntax."
    }
  },
  {
    "title": "Handle errors and validate fields",
    "body": [
      "JSON parsing proves that a string follows JSON syntax, not that it contains the fields your application expects. Check required keys and value types before using them.",
      "Catch JsonException when using JSON_THROW_ON_ERROR. Treat request data as untrusted and validate it according to the operation being performed."
    ],
    "example": {
      "code": "try {\n    $data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);\n} catch (JsonException $error) {\n    http_response_code(400);\n    exit;\n}",
      "caption": "Malformed JSON is handled as a bad request."
    },
    "wrong": {
      "code": "$data = json_decode($json, true);\nsaveUser($data[\"user_id\"]);",
      "why": "A parsed document may omit user_id or provide an invalid value. Validate the structure and authorization before saving."
    }
  }
],
  "php20": [
  {
    "title": "Read and write server files",
    "body": [
      "file_get_contents() reads file contents into a string. file_put_contents() writes data and can overwrite a file unless an append option is supplied.",
      "Use paths that your application controls. Check failures and permissions, and avoid allowing user input to choose arbitrary server paths."
    ],
    "example": {
      "code": "$path = __DIR__ . \"/data/report.txt\";\nfile_put_contents($path, \"Saved\");\n$text = file_get_contents($path);",
      "caption": "The file is written and then read."
    },
    "wrong": {
      "code": "$path = $_GET[\"path\"];\necho file_get_contents($path);",
      "why": "Allowing request data to select a path can expose files outside the intended folder. Use a controlled location."
    }
  },
  {
    "title": "Validate uploaded files",
    "body": [
      "A file input sends uploaded data to a temporary server location. PHP exposes upload details through $_FILES, including a temporary path, upload error code, and client filename.",
      "Check the upload error, size, and actual file content type on the server. Do not trust the original filename or the MIME type supplied by the browser."
    ],
    "example": {
      "code": "if ($_FILES[\"photo\"][\"error\"] === UPLOAD_ERR_OK) {\n    $tmp = $_FILES[\"photo\"][\"tmp_name\"];\n    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($tmp);\n}",
      "caption": "The content type is inspected from the temporary file."
    },
    "wrong": {
      "code": "$mime = $_FILES[\"photo\"][\"type\"];",
      "why": "The browser supplies that MIME value and can lie. Inspect the temporary file with a server-side tool."
    }
  },
  {
    "title": "Store uploads safely",
    "body": [
      "move_uploaded_file() moves a valid uploaded file from its temporary location. Generate a server-side filename and store files in a controlled directory.",
      "Restrict accepted formats and sizes. Do not let uploaded files execute as server code, and prevent path traversal by never using an unchecked client filename as a path."
    ],
    "example": {
      "code": "$name = bin2hex(random_bytes(16)) . \".jpg\";\n$destination = __DIR__ . \"/uploads/\" . $name;\nmove_uploaded_file($_FILES[\"photo\"][\"tmp_name\"], $destination);",
      "caption": "The stored name is generated by the server."
    },
    "wrong": {
      "code": "$destination = __DIR__ . \"/uploads/\" . $_FILES[\"photo\"][\"name\"];",
      "why": "The client filename may contain unsafe characters or path segments. Generate a safe server-side name."
    }
  }
],
  "php21": [
  {
    "title": "Declare and use namespaces",
    "body": [
      "A namespace groups related PHP code under a named path. It helps prevent collisions between classes that share a short name.",
      "Declare the namespace near the start of the PHP file, after the opening tag and any declare statement. Use a consistent namespace structure across the project."
    ],
    "example": {
      "code": "<?php\nnamespace App\\Services;\nclass StudentService {}",
      "caption": "The class belongs to App\\Services."
    },
    "wrong": {
      "code": "<?php\nclass App\\Services\\StudentService {}",
      "why": "A namespace is declared with the namespace keyword, not embedded in the class declaration."
    }
  },
  {
    "title": "Import names with use",
    "body": [
      "The use statement imports a fully qualified class, function, or constant name into the current namespace. An alias can make a long name easier to reference.",
      "Remember that importing a class does not instantiate it. Create an object separately with new when an instance is needed."
    ],
    "example": {
      "code": "use App\\Models\\Student;\n$student = new Student();",
      "caption": "The imported short name refers to the fully qualified class."
    },
    "wrong": {
      "code": "use App\\Models\\Student;\n$student = Student;",
      "why": "The class name is not an object instance. Use new Student() to construct one."
    }
  },
  {
    "title": "Manage packages with Composer",
    "body": [
      "Composer reads composer.json to resolve project dependencies and can create an autoloader for namespaced classes. The vendor directory contains installed packages.",
      "Commit the dependency manifest and lock file for an application. Do not commit generated vendor files unless the deployment process specifically requires them."
    ],
    "example": {
      "code": "composer require vendor/package\ncomposer install",
      "caption": "The first command adds a dependency and the second installs declared dependencies."
    },
    "wrong": {
      "code": "require \"vendor/package\";",
      "why": "A package name is not normally a PHP file path. Use Composer to install the package and load its generated autoloader."
    }
  }
],
  "php22": [
  {
    "title": "Match HTTP methods to resource actions",
    "body": [
      "GET retrieves a representation, POST usually submits data for processing or creation, PUT replaces a resource, PATCH partially updates it, and DELETE removes it.",
      "Design endpoints around resources and predictable actions. Do not use GET for operations that change important server state."
    ],
    "example": {
      "code": "GET /api/students\nPOST /api/students\nPATCH /api/students/42\nDELETE /api/students/42",
      "caption": "The method and path communicate the operation."
    },
    "wrong": {
      "code": "GET /api/students/42/delete",
      "why": "A state-changing action should not be hidden behind GET. Use a method such as DELETE with authorization."
    }
  },
  {
    "title": "Read input and return JSON",
    "body": [
      "PHP can read a JSON request body from php://input and decode it. Set an appropriate response content type and status code before writing the response body.",
      "Validate the decoded structure and report useful client errors. Keep internal exception details out of public API responses."
    ],
    "example": {
      "code": "$input = file_get_contents(\"php://input\");\n$data = json_decode($input, true);\nheader(\"Content-Type: application/json\");\necho json_encode([\"received\" => true]);",
      "caption": "The body is read and a JSON response is returned."
    },
    "wrong": {
      "code": "echo \"<h1>Saved</h1>\";",
      "why": "An API endpoint should return the documented data format, such as JSON, rather than an unrelated HTML fragment."
    }
  },
  {
    "title": "Return meaningful status codes",
    "body": [
      "Use status codes that match the outcome: 200 for a successful response, 201 for creation, 400 for invalid input, 401 for missing authentication, 403 for forbidden access, and 404 for a missing resource.",
      "An API must also check authorization and validate data on the server. A correct status code does not make an unsafe operation secure."
    ],
    "example": {
      "code": "http_response_code(201);\nheader(\"Content-Type: application/json\");\necho json_encode([\"id\" => 42]);",
      "caption": "The response indicates that a resource was created."
    },
    "wrong": {
      "code": "http_response_code(200);\necho json_encode([\"error\" => \"Not found\"]);",
      "why": "A missing resource should normally use 404, not 200. The status code is part of the API contract."
    }
  }
],
  "php23": [
  {
    "title": "Hash passwords for storage",
    "body": [
      "password_hash() creates a salted password hash using a password hashing algorithm. Store the resulting hash, not the original password.",
      "Use PASSWORD_DEFAULT unless the application has a specific, well-reviewed reason to choose another supported algorithm. Hashing is one-way, so the original password is not recovered from the hash."
    ],
    "example": {
      "code": "$hash = password_hash($password, PASSWORD_DEFAULT);\nsaveUserPasswordHash($userId, $hash);",
      "caption": "Only the password hash is stored."
    },
    "wrong": {
      "code": "$stored = $password;\nsaveUserPassword($userId, $stored);",
      "why": "This stores the original password. Store the output of password_hash() instead."
    }
  },
  {
    "title": "Verify a submitted password",
    "body": [
      "password_verify() checks a submitted password against a stored hash. It handles the salt and algorithm information embedded in the hash.",
      "Use a generic login failure message so the response does not reveal whether an account exists. Rate-limit attempts and use secure transport for login forms."
    ],
    "example": {
      "code": "if (password_verify($input, $storedHash)) {\n    startUserSession($userId);\n}",
      "caption": "A matching password allows the login flow to continue."
    },
    "wrong": {
      "code": "if ($input === $storedHash) {\n    startUserSession($userId);\n}",
      "why": "The stored value is a hash, not the original password. Use password_verify()."
    }
  },
  {
    "title": "Separate authentication from authorization",
    "body": [
      "Authentication determines whether credentials identify a user. Authorization checks whether that user is allowed to view or change a particular resource.",
      "Check permissions on every protected server action. A hidden button or client-side role flag is not a security control."
    ],
    "example": {
      "code": "if (!$user->can(\"edit\", $record)) {\n    http_response_code(403);\n    exit;\n}",
      "caption": "The permission check happens on the server."
    },
    "wrong": {
      "code": "if ($_POST[\"is_admin\"] === \"1\") {\n    deleteRecord($id);\n}",
      "why": "Request data can be changed by a visitor. Determine roles and permissions from trusted server-side data."
    }
  }
],
};
