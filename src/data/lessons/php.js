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
      title: "Concatenation and length",
      body: [
        `The dot operator joins strings: [["Hi, " . $name]]. [[strlen()]] counts bytes, not characters.`,
        `For UTF-8 text use [[mb_strlen()]] and the other mb_* functions, or accented characters count as two or more.`,
      ],
      example: {
        code: `<?php
$name = "José";
echo mb_strlen($name);`,
        caption: `Four characters, counted correctly.`,
      },
      wrong: {
        code: `<?php
$name = "José";
echo strlen($name);`,
        why: `strlen counts bytes; the accented é takes two in UTF-8, so this reports 5.`,
      },
    },
    {
      title: "Search and replace",
      body: [
        `[[str_replace()]] replaces every exact match. [[str_ireplace()]] ignores case. [[str_contains()]] answers a yes/no question.`,
        `The search functions are literal, not patterns. Regular expressions need preg_* functions.`,
      ],
      example: {
        code: `<?php
$clean = str_ireplace("ERROR", "warning", $line);`,
        caption: `Case-insensitive replacement.`,
      },
      wrong: {
        code: `<?php
$clean = str_replace("error", "warning", "ERROR: disk full");`,
        why: `str_replace is case-sensitive, so the uppercase text is untouched. Use str_ireplace.`,
      },
    },
    {
      title: "Substrings and multibyte text",
      body: [
        `[[substr()]] returns part of a string by byte offset. On UTF-8 text, cut with [[mb_substr()]] instead.`,
        `A cut in the middle of a multibyte character produces broken output.`,
      ],
      example: {
        code: `<?php
$excerpt = mb_substr($title, 0, 40, "UTF-8");`,
        caption: `Forty characters, not forty bytes.`,
      },
      wrong: {
        code: `<?php
$excerpt = substr("ZÉDX guide", 0, 2);`,
        why: `The É is two bytes, so the cut lands inside the character and produces an invalid string.`,
      },
    },
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
};
