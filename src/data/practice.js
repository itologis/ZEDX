const p = (q, code, a, w, why) => ({ q, code, a, w, why });

export const PRACTICE = {
  // ---------------- HTML ----------------
  h1: p(
    `Which value declares an HTML5 page?`,
    `<!DOCTYPE ____>\n<html>\n</html>`,
    `html`,
    [`xml`, `body`],
    `<!DOCTYPE html> tells the browser to use modern HTML5 rules.`,
  ),
  h2: p(
    `Which tag makes the most important heading?`,
    `<____>Main Title</____>`,
    `h1`,
    [`h6`, `head`],
    `h1 is the top-level heading and h6 is the smallest. head holds page metadata, not visible text.`,
  ),
  h3: p(
    `Which tag wraps a paragraph?`,
    `<____>This is a paragraph.</____>`,
    `p`,
    [`para`, `text`],
    `The paragraph tag is simply p.`,
  ),
  h4: p(
    `Which attribute holds the link destination?`,
    `<a ____="https://example.com">Click me</a>`,
    `href`,
    [`src`, `link`],
    `href is where a link points. src is used by images and scripts.`,
  ),
  h5: p(
    `Which attribute holds the image file?`,
    `<img ____="image.jpg" alt="Description">`,
    `src`,
    [`href`, `link`],
    `src is the image source. href is for links.`,
  ),
  h6: p(
    `Make a bulleted list.`,
    `<____>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</____>`,
    `ul`,
    [`ol`, `list`],
    `ul is an unordered (bulleted) list. ol would be numbered.`,
  ),
  h7: p(
    `Which tag is a table row?`,
    `<table>\n  <____>\n    <td>John</td>\n  </____>\n</table>`,
    `tr`,
    [`td`, `th`],
    `tr is a row. td is a data cell inside a row, and th is a header cell.`,
  ),
  h8: p(
    `Which tag creates a typing field in a form?`,
    `<form>\n  <____ type="text">\n</form>`,
    `input`,
    [`label`, `text`],
    `input creates the field. label only captions it.`,
  ),
  h9: p(
    `Which tag is an inline container?`,
    `<div>\n  <____>inline text</____>\n</div>`,
    `span`,
    [`section`, `p`],
    `span is inline. div, section and p are block-level.`,
  ),
  h10: p(
    `Which tag holds the main navigation links?`,
    `<header>\n  <____>\n    <a href="#">Home</a>\n  </____>\n</header>`,
    `nav`,
    [`menu`, `links`],
    `nav is the semantic tag for navigation links.`,
  ),
  h11: p(
    `Which method draws a filled rectangle?`,
    `ctx.fillStyle = "red";\nctx.____(0, 0, 150, 75);`,
    `fillRect`,
    [`drawRect`, `makeRect`],
    `fillRect(x, y, width, height) draws a filled rectangle on the canvas.`,
  ),
  h12: p(
    `Which attribute shows play and pause buttons?`,
    `<video ____>\n  <source src="video.mp4" type="video/mp4">\n</video>`,
    `controls`,
    [`buttons`, `play`],
    `The controls attribute adds the browser's playback controls.`,
  ),
  h13: p(
    `Which attribute sets the character encoding?`,
    `<meta ____="UTF-8">`,
    `charset`,
    [`encoding`, `type`],
    `charset="UTF-8" tells the browser which character set to use.`,
  ),
  h14: p(
    `Which tag draws a circle?`,
    `<svg width="100" height="100">\n  <____ cx="50" cy="50" r="40" />\n</svg>`,
    `circle`,
    [`round`, `oval`],
    `circle is drawn from a center point (cx, cy) and a radius r.`,
  ),
  h15: p(
    `Which tag wraps the main page content?`,
    `<header>...</header>\n<____>\n  <article>Content</article>\n</____>\n<footer>...</footer>`,
    `main`,
    [`body`, `center`],
    `main wraps the central content of the page, and there should be only one per page.`,
  ),

  // ---------------- CSS ----------------
  c1: p(
    `What ends every declaration?`,
    `p {\n  color: red____\n}`,
    `;`,
    [`:`, `,`],
    `Each property: value pair ends with a semicolon.`,
  ),
  c2: p(
    `Which selector targets the class "box"?`,
    `____ { color: blue; }`,
    `.box`,
    [`#box`, `box.`],
    `A dot selects a class and a hash (#) selects an id.`,
  ),
  c4: p(
    `Which is a valid hex color?`,
    `color: ____;`,
    `#ff0000`,
    [`ff0000`, `#gg0000`],
    `Hex colors start with # followed by six hex digits (0-9, a-f).`,
  ),
  c14: p(
    `Make the box half as wide as its parent.`,
    `.box {\n  width: ____;\n}`,
    `50%`,
    [`50px`, `50vh`],
    `% is relative to the parent's width. px is fixed and vh is relative to the screen height.`,
  ),
  c17: p(
    `How does a CSS comment start?`,
    `____ This is a comment */`,
    `/*`,
    [`//`, `#`],
    `CSS comments are written between /* and */.`,
  ),
  c5: p(
    `Which property adds space inside the border?`,
    `div {\n  ____: 10px;\n}`,
    `padding`,
    [`margin`, `gap`],
    `padding is inside the border. margin is outside it.`,
  ),
  c9: p(
    `Which property sets the space between lines of text?`,
    `p {\n  ____: 1.5;\n}`,
    `line-height`,
    [`font-size`, `letter-spacing`],
    `line-height controls vertical spacing between lines. letter-spacing is between characters.`,
  ),
  c10: p(
    `Make the image scale to fill the box.`,
    `background-size: ____;`,
    `cover`,
    [`repeat`, `center`],
    `cover scales the image until it fills the whole box.`,
  ),
  c3: p(
    `Select only direct children.`,
    `div ____ p { }`,
    `>`,
    [`+`, `~`],
    `> selects direct children. + is the adjacent sibling and ~ is any later sibling.`,
  ),
  c11: p(
    `Style a link while the mouse is over it.`,
    `a:____ { color: red; }`,
    `hover`,
    [`over`, `mouse`],
    `:hover is the pseudo-class for a hovered element.`,
  ),
  c12: p(
    `Insert content before an element's content.`,
    `p::____ { content: "→ "; }`,
    `before`,
    [`first`, `insert`],
    `::before inserts generated content before the element's content.`,
  ),
  c6: p(
    `Center the items along the main axis.`,
    `.container {\n  display: flex;\n  ____: center;\n}`,
    `justify-content`,
    [`align-items`, `flex-direction`],
    `justify-content aligns along the main axis. align-items works on the cross axis.`,
  ),
  c7: p(
    `Create three equal columns.`,
    `.container {\n  display: grid;\n  grid-template-columns: ____;\n}`,
    `1fr 1fr 1fr`,
    [`3fr`, `1px 1px 1px`],
    `Each 1fr is an equal share of the free space, so three make three equal columns.`,
  ),
  c8: p(
    `Position relative to the nearest positioned ancestor.`,
    `.box {\n  position: ____;\n  top: 0;\n  left: 0;\n}`,
    `absolute`,
    [`static`, `relative`],
    `absolute positions against the nearest positioned ancestor. relative offsets from the element's own spot.`,
  ),
  c13: p(
    `Apply styles only on screens up to 600px wide.`,
    `@media (____: 600px) {\n  .box { display: none; }\n}`,
    `max-width`,
    [`min-width`, `width-max`],
    `max-width applies up to that width. min-width applies from that width upward.`,
  ),
  c15: p(
    `Use a custom property.`,
    `:root { --main-color: blue; }\n.box {\n  color: ____(--main-color);\n}`,
    `var`,
    [`use`, `get`],
    `var() reads the value of a custom property.`,
  ),
  c16: p(
    `Animate the change smoothly over 0.3s.`,
    `.box {\n  ____: all 0.3s ease;\n}`,
    `transition`,
    [`transform`, `animate`],
    `transition smooths property changes. transform changes the shape or position instantly.`,
  ),

  // ---------------- Java ----------------
  j1: p(
    `Which method prints text and a new line?`,
    `System.out.____("Hello, World!");`,
    `println`,
    [`log`, `echo`],
    `println prints text followed by a newline. log is JavaScript and echo is PHP.`,
  ),
  j2: p(
    `Which type holds true or false?`,
    `____ isActive = true;`,
    `boolean`,
    [`bool`, `int`],
    `Java's primitive is boolean, not bool.`,
  ),
  j3: p(
    `Which keyword sends a value back from a method?`,
    `public int add(int a, int b) {\n  ____ a + b;\n}`,
    `return`,
    [`send`, `output`],
    `return ends the method and gives back a value.`,
  ),
  j4: p(
    `Check if score is at least 70.`,
    `if (score ____ 70) {\n  System.out.println("Pass");\n}`,
    `>=`,
    [`=>`, `===`],
    `>= means greater than or equal. => and === are not Java operators.`,
  ),
  j5: p(
    `Complete a loop that counts 0 to 4.`,
    `for (int i = 0; i < 5; ____) {\n  System.out.println(i);\n}`,
    `i++`,
    [`i--`, `i**`],
    `i++ adds 1 each loop. i-- would count down and never reach 5.`,
  ),
  j6: p(
    `Which keyword creates an object?`,
    `Person p = ____ Person("Ann", 20);`,
    `new`,
    [`create`, `make`],
    `new calls the constructor and builds the object.`,
  ),
  j7: p(
    `Which keyword inherits from a class?`,
    `class Child ____ Parent {\n}`,
    `extends`,
    [`implements`, `inherits`],
    `extends is for class inheritance. implements is for interfaces.`,
  ),
  j8: p(
    `Which keyword uses an interface?`,
    `class Dog ____ Animal {\n  public void speak() { }\n}`,
    `implements`,
    [`extends`, `interface`],
    `A class implements an interface. extends is for parent classes.`,
  ),
  j9: p(
    `Which keyword handles the exception?`,
    `try {\n  int r = 10 / 0;\n} ____ (ArithmeticException e) {\n}`,
    `catch`,
    [`except`, `handle`],
    `Java uses catch. except is Python.`,
  ),
  j10: p(
    `Declare an array of 5 ints.`,
    `int[] numbers = new int____;`,
    `[5]`,
    [`(5)`, `{5}`],
    `Square brackets set the array length.`,
  ),
  j11: p(
    `Which symbol makes a lambda?`,
    `names.forEach(name ____ System.out.println(name));`,
    `->`,
    [`=>`, `::`],
    `Java lambdas use ->. => is JavaScript and :: is a method reference.`,
  ),
  j12: p(
    `Keep only the even numbers.`,
    `numbers.stream()\n  .____(n -> n % 2 == 0)\n  .forEach(System.out::println);`,
    `filter`,
    [`map`, `collect`],
    `filter keeps matching elements. map transforms each element.`,
  ),
  j13: p(
    `Start the thread.`,
    `Thread thread = new Thread(() -> { });\nthread.____();`,
    `start`,
    [`run`, `begin`],
    `start() launches a new thread. run() would execute on the current thread.`,
  ),
  j14: p(
    `Make Box work with any type.`,
    `class Box____ {\n  T content;\n}`,
    `<T>`,
    [`(T)`, `[T]`],
    `Angle brackets declare a generic type parameter.`,
  ),
  j15: p(
    `Mark a method as overriding its parent.`,
    `____\npublic String toString() {\n  return "My object";\n}`,
    `@Override`,
    [`@Overwrite`, `Override()`],
    `@Override lets the compiler check that you really are replacing a parent method.`,
  ),

  // ---------------- Python ----------------
  p1: p(
    `Which function outputs text?`,
    `____("Hello, World!")`,
    `print`,
    [`echo`, `console.log`],
    `Python outputs text with print().`,
  ),
  p2: p(
    `Which is the correct boolean?`,
    `is_active = ____`,
    `True`,
    [`true`, `TRUE`],
    `Python's booleans are capitalized: True and False.`,
  ),
  p3: p(
    `What ends the if line?`,
    `if score >= 70____\n    print("Pass")`,
    `:`,
    [`;`, `{`],
    `An if line ends with a colon, and the block below it is indented.`,
  ),
  p4: p(
    `Which function makes a sequence of numbers?`,
    `for i in ____(5):\n    print(i)`,
    `range`,
    [`list`, `loop`],
    `range(5) gives 0, 1, 2, 3, 4.`,
  ),
  p5: p(
    `Which keyword defines a function?`,
    `____ add(a, b):\n    return a + b`,
    `def`,
    [`function`, `func`],
    `def defines a function in Python.`,
  ),
  p6: p(
    `Add an item to the end of the list.`,
    `fruits = ["apple", "banana"]\nfruits.____("grape")`,
    `append`,
    [`add`, `push`],
    `append adds to the end. add is for sets and push is JavaScript.`,
  ),
  p7: p(
    `Read the value for the key "name".`,
    `person = {"name": "John"}\nprint(person____)`,
    `["name"]`,
    [`.name`, `(name)`],
    `Dictionaries use square brackets with the key.`,
  ),
  p8: p(
    `Which bracket starts a tuple?`,
    `colors = ____"red", "green", "blue")`,
    `(`,
    [`[`, `{`],
    `Tuples use parentheses. Square brackets make a list.`,
  ),
  p9: p(
    `Which keyword closes the file automatically?`,
    `____ open("file.txt", "r") as f:\n    content = f.read()`,
    `with`,
    [`using`, `try`],
    `with closes the file for you when the block ends.`,
  ),
  p10: p(
    `Complete the comprehension.`,
    `squares = [x**2 ____ x in range(10)]`,
    `for`,
    [`in`, `each`],
    `A list comprehension has the form [expression for item in sequence].`,
  ),
  p11: p(
    `Which symbol applies a decorator?`,
    `____timer\ndef slow_function():\n    pass`,
    `@`,
    [`#`, `&`],
    `@ above a function applies the decorator.`,
  ),
  p12: p(
    `Which keyword produces a value lazily?`,
    `def count():\n    ____ 1`,
    `yield`,
    [`return`, `give`],
    `yield pauses the function and hands back a value. return ends it.`,
  ),
  p13: p(
    `Which keyword handles the error?`,
    `try:\n    result = 10 / 0\n____ ZeroDivisionError:\n    print("Cannot divide by zero")`,
    `except`,
    [`catch`, `handle`],
    `Python uses except. catch is Java.`,
  ),
  p14: p(
    `Which keyword makes an anonymous function?`,
    `add = ____ x, y: x + y`,
    `lambda`,
    [`def`, `fn`],
    `lambda creates a small unnamed function in one line.`,
  ),
  p15: p(
    `Which method writes text to the file?`,
    `with open("file.txt", "w") as f:\n    f.____("Hello")`,
    `write`,
    [`print`, `add`],
    `write puts text into the open file.`,
  ),

  // ---------------- JavaScript ----------------
  js1: p(
    `Which method prints to the console?`,
    `console.____("Hello, World!");`,
    `log`,
    [`print`, `write`],
    `console.log() prints to the console. print is Python.`,
  ),
  js2: p(
    `Which keyword declares a variable you can reassign?`,
    `____ age = 18;\nage = 19;`,
    `let`,
    [`const`, `final`],
    `let allows reassignment. const cannot be reassigned, and final is Java.`,
  ),
  js3: p(
    `Which value means "no value, on purpose"?`,
    `let result = ____;`,
    `null`,
    [`nil`, `none`],
    `JavaScript uses null. nil is Ruby and None is Python.`,
  ),
  js4: p(
    `Which keyword runs when the condition is false?`,
    `if (score >= 75) {\n  console.log("Passed");\n} ____ {\n  console.log("Failed");\n}`,
    `else`,
    [`otherwise`, `elif`],
    `JavaScript uses else. elif is Python.`,
  ),
  js5: p(
    `Complete a loop that counts 0 to 4.`,
    `for (let i = 0; i < 5; ____) {\n  console.log(i);\n}`,
    `i++`,
    [`i--`, `i**`],
    `i++ adds 1 each loop. i-- would count down and never reach 5.`,
  ),
  js6: p(
    `Which keyword sends a value back from a function?`,
    `function add(a, b) {\n  ____ a + b;\n}`,
    `return`,
    [`send`, `yield`],
    `return ends the function and gives back a value.`,
  ),
  js7: p(
    `Which symbol makes an arrow function?`,
    `const multiply = (a, b) ____ a * b;`,
    `=>`,
    [`->`, `::`],
    `JavaScript arrow functions use =>. -> is used by Java lambdas.`,
  ),
  js8: p(
    `Which method adds an item to the end of an array?`,
    `fruits.____("Orange");`,
    `push`,
    [`append`, `add`],
    `push adds to the end of an array. append is Python.`,
  ),
  js9: p(
    `How do you read the name property?`,
    `console.log(person____);`,
    `.name`,
    [`->name`, `(name)`],
    `Dot notation reads a property: person.name.`,
  ),
  js10: p(
    `Which method keeps only the matching items?`,
    `const even = numbers.____(n => n % 2 === 0);`,
    `filter`,
    [`map`, `find`],
    `filter keeps every match. map transforms each item and find returns only the first match.`,
  ),
  js11: p(
    `Pull name out of the object.`,
    `const { ____ } = person;`,
    `name`,
    [`person`, `"name"`],
    `Destructuring puts the property name between the braces.`,
  ),
  js12: p(
    `Which syntax spreads an array into another one?`,
    `const combined = [____first, 3, 4];`,
    `...`,
    [`..`, `**`],
    `Spread is three dots.`,
  ),
  js13: p(
    `Which method handles a rejected promise?`,
    `task.then(r => console.log(r)).____(e => console.error(e));`,
    `catch`,
    [`except`, `error`],
    `.catch() handles rejections. except is Python.`,
  ),
  js14: p(
    `Which keyword waits for a promise?`,
    `const data = ____ response.json();`,
    `await`,
    [`wait`, `pause`],
    `await pauses an async function until the promise settles.`,
  ),
  js15: p(
    `Which keyword brings a value in from another file?`,
    `____ { add } from "./math.js";`,
    `import`,
    [`include`, `using`],
    `import pulls in a named export from another module.`,
  ),
  js16: p(
    `Which keyword defines a blueprint for creating objects?`,
    `____ Person {\n  constructor(name) {\n    this.name = name;\n  }\n}`,
    `class`,
    [`object`, `def`],
    `class defines the blueprint, and new Person(...) creates instances from it. def is Python.`,
  ),
  // ---------------- PHP ----------------
  php1: p(
    `Which tag opens a block of PHP code?`,
    `____\n  echo "Hello, World!";\n?>`,
    `<?php`,
    [`<php>`, `<%php`],
    `PHP code starts with <?php and ends with ?>.`,
  ),
  php2: p(
    `Which symbol starts every PHP variable?`,
    `____name = "John";\necho "Hello, $name";`,
    `$`,
    [`@`, `#`],
    `Every PHP variable name begins with a dollar sign.`,
  ),
  php3: p(
    `Which keyword adds a second condition after if?`,
    `if ($score >= 90) {\n  echo "Excellent";\n} ____ ($score >= 70) {\n  echo "Pass";\n}`,
    `elseif`,
    [`elif`, `otherwise`],
    `PHP uses elseif (or else if). elif is Python.`,
  ),
  php4: p(
    `Complete a loop that counts 0 to 4.`,
    `for ($i = 0; $i < 5; ____) {\n  echo $i;\n}`,
    `$i++`,
    [`i++`, `$i--`],
    `$i++ adds 1 each loop. Variables always need the $ sign, and $i-- would count down and never reach 5.`,
  ),
  php5: p(
    `Which keyword sends a value back from a function?`,
    `function add($a, $b) {\n  ____ $a + $b;\n}`,
    `return`,
    [`echo`, `give`],
    `return ends the function and sends a value back to the caller. echo only prints a value, and give is not a PHP keyword.`,
  ),
  php6: p(
    `How do you add an item to the end of an array?`,
    `$fruits = ["apple", "banana"];\n$fruits____ = "grape";`,
    `[]`,
    [`()`, `{}`],
    `Empty square brackets add a new item to the end of an array.`,
  ),
  php7: p(
    `Which operator links a key to its value?`,
    `$person = ["name" ____ "John"];`,
    `=>`,
    [`->`, `::`],
    `=> links a key to its value in an array. -> reaches object members and :: reaches static members.`,
  ),
  php8: p(
    `Which operator joins two strings?`,
    `echo "Hello, " ____ "John";`,
    `.`,
    [`+`, `&`],
    `The dot joins strings in PHP. The + operator is only for numbers.`,
  ),
  php9: p(
    `Which superglobal holds data from a POST form?`,
    `$username = ____["username"];`,
    `$_POST`,
    [`$_GET`, `$_FORM`],
    `$_POST holds data sent with method="post". $_GET holds URL parameters, and $_FORM does not exist.`,
  ),
  php10: p(
    `Which keyword stops the script if the file is missing?`,
    `____ "config.php";`,
    `require`,
    [`include`, `import`],
    `require stops the script with a fatal error if the file is missing. include only gives a warning, and import is not a PHP keyword.`,
  ),
  php11: p(
    `How do you refer to the current object inside a method?`,
    `class Person {\n  public $name = "Alice";\n\n  public function greet() {\n    return "Hi, " . ____->name;\n  }\n}`,
    `$this`,
    [`this`, `self`],
    `$this refers to the current object. Without the $ sign it is not valid, and self is used for static members.`,
  ),
  php12: p(
    `Which keyword inherits from a parent class?`,
    `class Dog ____ Animal {\n}`,
    `extends`,
    [`implements`, `inherits`],
    `extends inherits from a parent class. implements is for interfaces, and inherits is not a PHP keyword.`,
  ),
  php13: p(
    `Which block handles the exception?`,
    `try {\n  echo divide(10, 0);\n} ____ (Exception $e) {\n  echo $e->getMessage();\n}`,
    `catch`,
    [`except`, `handle`],
    `PHP handles exceptions with catch. except is Python.`,
  ),
  php14: p(
    `Which method creates a prepared statement?`,
    `$stmt = $pdo->____("SELECT * FROM users WHERE id = ?");\n$stmt->execute([$id]);`,
    `prepare`,
    [`query`, `exec`],
    `prepare() creates a prepared statement that you run with execute(). query() and exec() run SQL immediately, so they cannot take bound values safely.`,
  ),
  php15: p(
    `Which function starts a session?`,
    `____();\n$_SESSION["user"] = "Alice";`,
    `session_start`,
    [`session_open`, `start_session`],
    `session_start() creates or resumes a session and must be called before any output is sent.`,
  ),

  // ---------------- SQL ----------------
  sql1: p(
    `Which keyword retrieves data from a table?`,
    `____ name, age\nFROM users;`,
    `SELECT`,
    [`GET`, `READ`],
    `SELECT chooses which columns to read from a table.`,
  ),
  sql2: p(
    `Which clause filters rows?`,
    `SELECT * FROM users\n____ age >= 18;`,
    `WHERE`,
    [`FILTER`, `IF`],
    `WHERE keeps only the rows that match a condition. HAVING is for filtering groups after GROUP BY.`,
  ),
  sql3: p(
    `Sort the results from highest to lowest.`,
    `SELECT name, age FROM users\nORDER BY age ____;`,
    `DESC`,
    [`ASC`, `DOWN`],
    `DESC sorts from highest to lowest. ASC, the default, sorts from lowest to highest.`,
  ),
  sql4: p(
    `Which keyword supplies the values for the new row?`,
    `INSERT INTO users (name, age)\n____ ('Alice', 22);`,
    `VALUES`,
    [`ADD`, `DATA`],
    `VALUES lists the data for the new row in the same order as the columns.`,
  ),
  sql5: p(
    `Which keyword changes existing rows?`,
    `____ users\nSET age = 23\nWHERE name = 'Alice';`,
    `UPDATE`,
    [`CHANGE`, `MODIFY`],
    `UPDATE changes existing rows. Always add a WHERE clause, or every row will be updated.`,
  ),
  sql6: p(
    `Which constraint makes a column required?`,
    `CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) ____\n);`,
    `NOT NULL`,
    [`REQUIRED`, `NONEMPTY`],
    `NOT NULL means the column must always have a value. UNIQUE, DEFAULT and CHECK are other common constraints.`,
  ),
  sql7: p(
    `Which operator matches a text pattern?`,
    `SELECT * FROM users\nWHERE name ____ 'A%';`,
    `LIKE`,
    [`MATCHES`, `HAS`],
    `LIKE compares text to a pattern, where % stands for any number of characters.`,
  ),
  sql8: p(
    `Which function counts rows?`,
    `SELECT ____(*) AS total\nFROM users;`,
    `COUNT`,
    [`SUM`, `NUMBER`],
    `COUNT(*) returns how many rows there are. SUM adds up the values in a column.`,
  ),
  sql9: p(
    `Which clause filters groups after GROUP BY?`,
    `SELECT city, COUNT(*)\nFROM users\nGROUP BY city\n____ COUNT(*) > 5;`,
    `HAVING`,
    [`WHERE`, `FILTER`],
    `HAVING filters groups after they are formed. WHERE filters individual rows before grouping.`,
  ),
  sql10: p(
    `Which join keeps every row from the left table?`,
    `SELECT users.name, orders.total\nFROM users\n____ JOIN orders ON orders.user_id = users.id;`,
    `LEFT`,
    [`INNER`, `CROSS`],
    `LEFT JOIN keeps all rows from the left table and fills in NULL where there is no match. INNER JOIN keeps only matching rows.`,
  ),
  sql11: p(
    `Finish the subquery that finds users older than average.`,
    `SELECT name FROM users\nWHERE age > (SELECT ____(age) FROM users);`,
    `AVG`,
    [`SUM`, `COUNT`],
    `AVG returns the average age. The outer query compares each user's age with that single value.`,
  ),
  sql12: p(
    `Which statement builds an index?`,
    `____ idx_users_city\nON users (city);`,
    `CREATE INDEX`,
    [`ADD INDEX`, `MAKE INDEX`],
    `CREATE INDEX builds an index so lookups on that column are faster, at the cost of slightly slower writes.`,
  ),
  sql13: p(
    `Which statement saves a query as a virtual table?`,
    `____ adult_users AS\nSELECT id, name FROM users\nWHERE age >= 18;`,
    `CREATE VIEW`,
    [`CREATE TABLE`, `MAKE VIEW`],
    `CREATE VIEW saves a query that always shows current data. CREATE TABLE ... AS would copy the data instead.`,
  ),
  sql14: p(
    `Which command makes the transaction's changes permanent?`,
    `START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n____;`,
    `COMMIT`,
    [`ROLLBACK`, `SAVE`],
    `COMMIT saves every change in the transaction. ROLLBACK would undo them all instead.`,
  ),
  sql15: p(
    `Which keyword defines the window for a window function?`,
    `SELECT name, age,\n  ROW_NUMBER() ____ (ORDER BY age DESC) AS row_num\nFROM users;`,
    `OVER`,
    [`WITHIN`, `ACROSS`],
    `OVER defines the rows a window function looks at, without collapsing them the way GROUP BY does.`,
  ),

  "h16": {
  "q": "Which attribute makes a field mandatory?",
  "code": "<input type=\"email\" ____>",
  "a": "required",
  "w": [
    "optional",
    "validate"
  ],
  "why": "required prevents the form from passing built-in validation while the field is empty."
},
  "h17": {
  "q": "Which attribute names an iframe for assistive technology?",
  "code": "<iframe src=\"map.html\" ____=\"Campus map\"></iframe>",
  "a": "title",
  "w": [
    "alt",
    "label"
  ],
  "why": "The title describes the embedded browsing context."
},
  "h18": {
  "q": "Which element labels the disclosure control inside details?",
  "code": "<details><____>More information</____></details>",
  "a": "summary",
  "w": [
    "caption",
    "legend"
  ],
  "why": "summary is the visible toggle label for the details disclosure."
},
  "h19": {
  "q": "How does JavaScript read data-book-id through dataset?",
  "code": "element.dataset.____",
  "a": "bookId",
  "w": [
    "data-book-id",
    "book-id"
  ],
  "why": "dataset converts hyphenated data attribute names to camelCase properties."
},
  "h20": {
  "q": "Which attribute defers a classic script until HTML parsing finishes while preserving order?",
  "code": "<script ____ src=\"app.js\"></script>",
  "a": "defer",
  "w": [
    "async",
    "blocking"
  ],
  "why": "Deferred classic scripts run after parsing and preserve their order."
},
  "h21": {
  "q": "Which property contains a template's inert document fragment?",
  "code": "template.____",
  "a": "content",
  "w": [
    "children",
    "innerTemplate"
  ],
  "why": "HTMLTemplateElement.content stores the template's DocumentFragment."
},
  "h22": {
  "q": "Which method registers a custom element name?",
  "code": "customElements.____(\"user-badge\", UserBadge);",
  "a": "define",
  "w": [
    "register",
    "create"
  ],
  "why": "customElements.define() registers a custom element name and class."
},
  "h23": {
  "q": "Which rel value prevents a new page from controlling its opener?",
  "code": "<a target=\"_blank\" rel=\"____\" href=\"...\">Open</a>",
  "a": "noopener",
  "w": [
    "stylesheet",
    "author"
  ],
  "why": "noopener severs the window.opener relationship."
},
  "c18": {
  "q": "Which display value removes an element from layout?",
  "code": " .notice { display: ____; }",
  "a": "none",
  "w": [
    "hidden",
    "transparent"
  ],
  "why": "display:none removes the element from layout; visibility:hidden keeps its layout space."
},
  "c19": {
  "q": "Which property moves an element below earlier left floats?",
  "code": "footer { ____: left; }",
  "a": "clear",
  "w": [
    "float",
    "display"
  ],
  "why": "clear: left prevents the element from sitting beside left-floating boxes."
},
  "c20": {
  "q": "Which function creates a straight-line color transition?",
  "code": "background: ____ (red, blue);",
  "a": "linear-gradient",
  "w": [
    "radial-gradient-only",
    "color-line"
  ],
  "why": "linear-gradient() generates a gradient along a straight line."
},
  "c21": {
  "q": "Which property draws a focus ring without changing layout size?",
  "code": "button:focus-visible { ____: 2px solid blue; }",
  "a": "outline",
  "w": [
    "border",
    "padding"
  ],
  "why": "outline is drawn outside the border and does not take up layout space."
},
  "c22": {
  "q": "Which function keeps a value between a minimum and maximum?",
  "code": "font-size: ____ (1rem, 2vw, 2rem);",
  "a": "clamp",
  "w": [
    "calc",
    "minmax"
  ],
  "why": "clamp(minimum, preferred, maximum) bounds the preferred value."
},
  "c23": {
  "q": "Which property sets the anchor point for rotation and scaling?",
  "code": " .tile { ____: top left; }",
  "a": "transform-origin",
  "w": [
    "transform-point",
    "origin"
  ],
  "why": "transform-origin chooses the anchor used by transform functions."
},
  "c24": {
  "q": "Which at-rule defines the stages of a named animation?",
  "code": "____ pulse { from { opacity: 0; } to { opacity: 1; } }",
  "a": "@keyframes",
  "w": [
    "@frames",
    "@animate"
  ],
  "why": "@keyframes declares the sequence referenced by animation-name."
},
  "c25": {
  "q": "Which at-rule checks whether a CSS declaration is supported?",
  "code": "____ (display: grid) { .layout { display: grid; } }",
  "a": "@supports",
  "w": [
    "@media",
    "@layer"
  ],
  "why": "@supports tests browser support for a CSS property-value declaration."
},
  "j16": {
  "q": "Which flowchart shape commonly represents a decision?",
  "code": "A ____ shape represents a yes/no branch.",
  "a": "diamond",
  "w": [
    "rectangle",
    "oval"
  ],
  "why": "A diamond represents a decision and branches into outcomes such as yes and no."
},
  "j17": {
  "q": "Which operator compares primitive values for equality?",
  "code": "if (score ____ 100) { ... }",
  "a": "==",
  "w": [
    "=",
    "!="
  ],
  "why": "== checks equality, = assigns a value, and != checks inequality."
},
  "j18": {
  "q": "Which Scanner method reads a full line of text?",
  "code": "String name = input.____();",
  "a": "nextLine",
  "w": [
    "nextInt",
    "readLine"
  ],
  "why": "nextLine() reads the remainder of the current line and returns it as a String."
},
  "j19": {
  "q": "What condition must be true before binary search works correctly?",
  "code": "The input must already be ____.",
  "a": "sorted",
  "w": [
    "reversed",
    "randomized"
  ],
  "why": "Binary search discards half of the remaining range based on order, so the input must be sorted."
},
  "j20": {
  "q": "Which collection type stores key-value pairs?",
  "code": "Map<String, Integer> scores = new ____<>();",
  "a": "HashMap",
  "w": [
    "ArrayList",
    "HashSet"
  ],
  "why": "HashMap implements Map and stores values associated with unique keys."
},
  "j21": {
  "q": "Which class provides readString() and writeString() utility methods?",
  "code": "____.writeString(path, \"Hello\");",
  "a": "Files",
  "w": [
    "printFile",
    "saveText"
  ],
  "why": "Files.writeString() writes text to the file represented by a Path."
},
  "j22": {
  "q": "Which listener commonly handles a JButton action?",
  "code": "button.add____(event -> save());",
  "a": "ActionListener",
  "w": [
    "MouseTimer",
    "ClickHandler"
  ],
  "why": "ActionListener receives action events generated by controls such as JButton."
},
  "j23": {
  "q": "Which UML diagram shows actors and the goals they achieve with a system?",
  "code": "A ____ diagram shows actors and use cases.",
  "a": "use-case",
  "w": [
    "class",
    "deployment"
  ],
  "why": "A use-case diagram shows actors and their goals within a system boundary."
},
  "j24": {
  "q": "Which JDBC object represents rows returned by a SELECT query?",
  "code": "ResultSet rows = statement.execute____();",
  "a": "Query",
  "w": [
    "Update",
    "Insert"
  ],
  "why": "executeQuery() runs a SELECT statement and returns a ResultSet."
},
  "j25": {
  "q": "How many workers should this latch wait for when each worker calls countDown() once?",
  "code": "CountDownLatch latch = new CountDownLatch(____);",
  "a": "2",
  "w": [
    "-1",
    "0.5"
  ],
  "why": "CountDownLatch starts with a non-negative count and releases waiting threads when countDown reduces it to zero."
},
  "p16": {
  "q": "Which operator checks whether a value is present in a sequence?",
  "code": "if \"a\" ____ \"cat\":",
  "a": "in",
  "w": [
    "is",
    "has"
  ],
  "why": "in tests membership in sequences and other containers."
},
  "p17": {
  "q": "What type does input() return?",
  "code": "answer = input(\"Enter a value: \")\nprint(type(answer) is ____)",
  "a": "str",
  "w": [
    "int",
    "bool"
  ],
  "why": "input() returns a string, even when the user types digits."
},
  "p18": {
  "q": "Which method removes whitespace from both ends of a string?",
  "code": "clean = text.____()",
  "a": "strip",
  "w": [
    "split",
    "replace"
  ],
  "why": "strip() removes leading and trailing whitespace by default."
},
  "p19": {
  "q": "Which method initializes a new Python instance?",
  "code": "class Student:\n    def ____(self, name):\n        self.name = name",
  "a": "__init__",
  "w": [
    "new",
    "create"
  ],
  "why": "__init__() initializes an instance after it is created."
},
  "p20": {
  "q": "Which keyword imports a module in Python?",
  "code": "____ math",
  "a": "import",
  "w": [
    "include",
    "require"
  ],
  "why": "import loads a module or selected names into the current namespace."
},
  "p21": {
  "q": "Which command creates a virtual environment named .venv?",
  "code": "python -m ____ .venv",
  "a": "venv",
  "w": [
    "pip",
    "install"
  ],
  "why": "python -m venv creates a virtual environment at the supplied path."
},
  "p22": {
  "q": "Which symbol introduces a function return type annotation?",
  "code": "def total(values: list[int]) ____ int:",
  "a": "->",
  "w": [
    "=>",
    ":"
  ],
  "why": "The arrow token -> introduces a function's return annotation."
},
  "p23": {
  "q": "Which statement checks an expected condition during development?",
  "code": "____ add(2, 3) == 5",
  "a": "assert",
  "w": [
    "verify",
    "expect"
  ],
  "why": "assert raises AssertionError when its condition is false."
},
  "js17": {
  "q": "Which operator checks strict equality without type conversion?",
  "code": "if (value ____ 10) { ... }",
  "a": "===",
  "w": [
    "=",
    "=="
  ],
  "why": "=== compares both type and value without coercion."
},
  "js18": {
  "q": "Which method removes whitespace from both ends of a string?",
  "code": "const name = text.____();",
  "a": "trim",
  "w": [
    "slice",
    "split"
  ],
  "why": "trim() returns a new string without whitespace at the beginning or end."
},
  "js19": {
  "q": "Which method selects the first element matching a CSS selector?",
  "code": "document.____(\".card\")",
  "a": "querySelector",
  "w": [
    "getFirst",
    "selectOne"
  ],
  "why": "querySelector() returns the first element matching the supplied CSS selector."
},
  "js20": {
  "q": "Which method registers an event listener on an element?",
  "code": "button.____(\"click\", handler);",
  "a": "addEventListener",
  "w": [
    "attachEvent",
    "onEvent"
  ],
  "why": "addEventListener() registers a function to respond to an event."
},
  "js21": {
  "q": "Which method converts a JavaScript value into JSON text?",
  "code": "const text = JSON.____(data);",
  "a": "stringify",
  "w": [
    "parse",
    "encode"
  ],
  "why": "JSON.stringify() serializes a JavaScript value into a JSON string."
},
  "js22": {
  "q": "Which storage API normally persists after a browser is closed and reopened?",
  "code": "____Storage",
  "a": "local",
  "w": [
    "session",
    "memory"
  ],
  "why": "localStorage persists for the origin until its values are removed."
},
  "js23": {
  "q": "Which queue is processed after the current call stack and before the next task?",
  "code": "Promise callbacks are queued as ____.",
  "a": "microtasks",
  "w": [
    "timers",
    "render tasks"
  ],
  "why": "Promise reaction callbacks are microtasks, processed after the current stack and before the next task."
},
  "js24": {
  "q": "Which browser API creates a dedicated worker?",
  "code": "const worker = new ____(\"worker.js\");",
  "a": "Worker",
  "w": [
    "Thread",
    "BackgroundTask"
  ],
  "why": "The Worker constructor creates a dedicated worker from a script URL."
},
  "php16": {
  "q": "Which operator joins two PHP strings?",
  "code": "$name = \"Ada\" ____ \" Lovelace\";",
  "a": ".",
  "w": [
    "+",
    "&"
  ],
  "why": "The dot operator concatenates strings in PHP."
},
  "php17": {
  "q": "Which keyword declares a class constant in PHP?",
  "code": "class Config { public ____ VERSION = \"1.0\"; }",
  "a": "const",
  "w": [
    "let",
    "static"
  ],
  "why": "const declares a class constant that is accessed with the scope resolution operator."
},
  "php18": {
  "q": "Which PHP function sends an HTTP response header?",
  "code": "____(\"Content-Type: application/json\");",
  "a": "header",
  "w": [
    "cookie",
    "response"
  ],
  "why": "header() sends a response header when called before output is sent."
},
  "php19": {
  "q": "Which function converts a PHP value into JSON text?",
  "code": "$json = ____( $data );",
  "a": "json_encode",
  "w": [
    "json_parse",
    "json_string"
  ],
  "why": "json_encode() serializes PHP values as a JSON string."
},
  "php20": {
  "q": "Which function reads an entire file into a string?",
  "code": "$text = ____(\"notes.txt\");",
  "a": "file_get_contents",
  "w": [
    "file_read",
    "read_file"
  ],
  "why": "file_get_contents() reads a file and returns its contents as a string."
},
  "php21": {
  "q": "Which keyword declares a PHP namespace?",
  "code": "____ App\\Services;",
  "a": "namespace",
  "w": [
    "package",
    "module"
  ],
  "why": "namespace declares the namespace for code in a PHP file."
},
  "php22": {
  "q": "Which HTTP method is commonly used to retrieve a resource?",
  "code": "GET is used to ____.",
  "a": "read",
  "w": [
    "delete",
    "create"
  ],
  "why": "GET retrieves a representation of a resource and should not change server state."
},
  "php23": {
  "q": "Which function verifies a password against a stored hash?",
  "code": "if (____($input, $hash)) { ... }",
  "a": "password_verify",
  "w": [
    "password_check",
    "hash_compare"
  ],
  "why": "password_verify() checks a password against a hash created by a compatible password hashing function."
},
  "sql16": {
  "q": "Which key uniquely identifies a row in a table?",
  "code": "A ____ KEY identifies each row.",
  "a": "PRIMARY",
  "w": [
    "FOREIGN",
    "SECONDARY"
  ],
  "why": "A primary key uniquely identifies each row in its table."
},
  "sql17": {
  "q": "Which operator combines result sets and removes duplicates?",
  "code": "SELECT city FROM A ____ SELECT city FROM B;",
  "a": "UNION",
  "w": [
    "JOIN",
    "UPDATE"
  ],
  "why": "UNION combines compatible result sets and removes duplicate rows."
},
  "sql18": {
  "q": "Which function converts text to uppercase in Oracle SQL?",
  "code": "SELECT ____(name) FROM students;",
  "a": "UPPER",
  "w": [
    "COUNT",
    "GROUP"
  ],
  "why": "UPPER() converts alphabetic characters to uppercase."
},
  "sql19": {
  "q": "Which keyword closes a CASE expression?",
  "code": "CASE WHEN score >= 75 THEN 'Pass' ____ AS result",
  "a": "END",
  "w": [
    "ELSE",
    "STOP"
  ],
  "why": "END closes the CASE expression."
},
  "sql20": {
  "q": "Which constraint prevents duplicate values in a column or column group?",
  "code": "ADD CONSTRAINT uq_email ____ (email);",
  "a": "UNIQUE",
  "w": [
    "CHECK",
    "DEFAULT"
  ],
  "why": "UNIQUE prevents duplicate non-null key values according to the database's rules."
},
  "sql21": {
  "q": "Which command removes a previously granted privilege?",
  "code": "____ SELECT ON students FROM analyst;",
  "a": "REVOKE",
  "w": [
    "REMOVE",
    "DELETE"
  ],
  "why": "REVOKE withdraws a previously granted privilege."
},
  "sql22": {
  "q": "Which section begins the executable statements of a PL/SQL block?",
  "code": "DECLARE\n  v_count NUMBER;\n____\n  v_count := 1;\nEND;",
  "a": "BEGIN",
  "w": [
    "START",
    "RUN"
  ],
  "why": "BEGIN marks the start of the executable section."
},
  "sql23": {
  "q": "Which PL/SQL program unit must return a value?",
  "code": "A stored ____ returns a value to its caller.",
  "a": "function",
  "w": [
    "trigger",
    "cursor"
  ],
  "why": "A function returns a value through its RETURN type and RETURN statement."
},
};
