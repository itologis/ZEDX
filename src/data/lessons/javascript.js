// Lessons for the JavaScript track. Same shape as the other language tracks.

export default {
  js1: [
    {
      title: "console.log",
      body: [
        `[[console.log()]] prints its arguments to the console. Pass several values separated by commas and they appear on one line.`,
        `It is a debugging tool, not a way to show content on a page. Users never see the console unless they open developer tools.`,
      ],
      example: {
        code: `console.log("Hello, world");
console.log("score:", 42);`,
        caption: `Text and a labelled value.`,
      },
      wrong: {
        code: `Console.log("Hello, world");`,
        why: `JavaScript is case-sensitive; [[Console]] is not defined, so this throws ReferenceError.`,
      },
    },
    {
      title: "Statements and automatic semicolons",
      body: [
        `Statements end with a semicolon, though JavaScript inserts them at line breaks in many cases. The rules are not the same as "every newline ends a statement".`,
        `A line starting with [[(]] or with a square bracket, or a template literal, can continue the previous expression. Keep semicolons to avoid the ambiguity.`,
      ],
      example: {
        code: `const total = 3;
console.log(total);`,
        caption: `Explicit semicolons, no surprises.`,
      },
      wrong: {
        code: `const label = "items"
[1, 2, 3].forEach(n => console.log(n))`,
        why: `The bracket continues the previous line, so JavaScript tries to index the string and throws. The missing semicolon is the cause.`,
      },
    },
    {
      title: "Comments",
      body: [
        `[[//]] comments out the rest of a line. [[/* ... */]] comments a block, and [[/** ... */]] is the JSDoc form tools read.`,
        `Comments explain why, not what. The code already says what it does.`,
      ],
      example: {
        code: `// Temporary: the API returns cents
const price = cents / 100;`,
        caption: `The comment records a decision.`,
      },
      wrong: {
        code: `<!-- a note -->
console.log("hi");`,
        why: `HTML comment syntax is not valid JavaScript; the line is a syntax error.`,
      },
    },
  ],

  js2: [
    {
      title: "let, const, and var",
      body: [
        `[[const]] binds a name once; [[let]] allows reassignment. Both are block-scoped. [[var]] is function-scoped and kept for old code.`,
        `[[const]] prevents rebinding, not mutation. A const object can still have its properties changed.`,
      ],
      example: {
        code: `const max = 10;
let count = 0;
count = count + 1;`,
        caption: `const for a fixed binding, let for a changing one.`,
      },
      wrong: {
        code: `const count = 0;
count = 1;`,
        why: `Assigning to a const binding throws TypeError. Use [[let]] if the value must change.`,
      },
    },
    {
      title: "Scope and the temporal dead zone",
      body: [
        `A let or const declaration is hoisted but not initialised. Reading it before the declaration throws ReferenceError.`,
        `The region between the start of the block and the declaration is the temporal dead zone. [[var]] does not have one; it starts as undefined.`,
      ],
      example: {
        code: `function run() {
    const value = 1;
    console.log(value);
}`,
        caption: `Declare before use, inside the block that needs it.`,
      },
      wrong: {
        code: `console.log(value);
let value = 1;`,
        why: `value is in the temporal dead zone until its declaration, so the read throws ReferenceError.`,
      },
    },
    {
      title: "Shadowing",
      body: [
        `An inner block can declare a name that already exists outside. The inner name hides the outer one for the length of the block.`,
        `Shadowing is legal but easy to misread. If two names mean different things, give them different names.`,
      ],
      example: {
        code: `let total = 10;
{
    const total = 99;
    console.log(total);
}
console.log(total);`,
        caption: `99 inside the block, 10 outside.`,
      },
      wrong: {
        code: `let total = 10;
if (true) {
    let total = 20;
}
console.log(total);`,
        why: `The block-scoped total disappears with the block, so the last line still prints 10.`,
      },
    },
  ],

  js3: [
    {
      title: "Strings, numbers, and booleans",
      body: [
        `A [[string]] stores text, a [[number]] stores numeric values, and a [[boolean]] stores either [[true]] or [[false]]. JavaScript uses one number type for whole and decimal values.`,
        `Use [[typeof]] to inspect a value while learning or debugging. The result is a string such as "string", "number", or "boolean".`,
      ],
      example: {
        code: `const name = "Ada";
const score = 42;
const isReady = true;

console.log(typeof name);
console.log(typeof score);
console.log(typeof isReady);`,
        caption: `The console reports string, number, and boolean.`,
      },
      wrong: {
        code: `const score = "42";
console.log(score + 1);`,
        why: `The quotes make 42 text, not a number, so + joins the values and produces "421". Remove the quotes or convert the input with [[Number()]].`,
      },
    },
    {
      title: "null and undefined",
      body: [
        `[[undefined]] often means a value has not been assigned. [[null]] is a value you can set deliberately to represent "nothing here yet". They both describe an absent value, but they are not the same.`,
        `One historical JavaScript quirk is that [[typeof null]] returns "object". To test for null, compare the value directly with [[=== null]].`,
      ],
      example: {
        code: `let searchResult;
const selectedUser = null;

console.log(searchResult);
console.log(selectedUser);
console.log(selectedUser === null);`,
        caption: `The first value is undefined; the second is explicitly null.`,
      },
      wrong: {
        code: `const selectedUser = null;

if (typeof selectedUser === "null") {
    console.log("No user selected");
}`,
        why: `typeof null returns "object", not "null", so this condition never passes. Compare directly with [[selectedUser === null]].`,
      },
    },
    {
      title: "Converting values and checking NaN",
      body: [
        `Input often arrives as text. [[Number()]] can convert numeric text before a calculation, while [[String()]] converts a value into text for display.`,
        `A failed numeric conversion can produce [[NaN]], which is still a number value but does not represent a usable numeric result. Check it with [[Number.isNaN()]], not [[=== NaN]].`,
      ],
      example: {
        code: `const rawQuantity = "3";
const quantity = Number(rawQuantity);
const total = quantity * 4;

console.log(total);
console.log(Number.isNaN(quantity));`,
        caption: `The text "3" becomes the number 3, so the total is 12.`,
      },
      wrong: {
        code: `const quantity = Number("three");

if (quantity === NaN) {
    console.log("Enter a number");
}`,
        why: `NaN is not equal to itself, so [[quantity === NaN]] is always false. Use [[Number.isNaN(quantity)]].`,
      },
    },
  ],

  js4: [
    {
      title: "if, else if, else",
      body: [
        `An [[if]] runs a block when its condition is truthy. [[else if]] adds branches, and [[else]] is the fallback.`,
        `Braces are optional for one statement; keep them anyway, because adding a second line later silently changes the meaning without them.`,
      ],
      example: {
        code: `const score = 72;
let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 70) {
    grade = "B";
} else {
    grade = "C";
}

console.log(grade);`,
        caption: `grade is declared before the branches. With a score of 72, the program prints B.`,
      },
      wrong: {
        code: `let score = 72;
let grade;

if (score = 90) {
    grade = "A";
}`,
        why: `The assignment changes score to 90 and the expression evaluates to 90, which is truthy. The branch runs even though the original score was 72. Use [[===]] when comparing values.`,
      },
    },
    {
      title: "Truthiness",
      body: [
        `Falsy values are [[false]], [[0]], [[-0]], [[0n]], [[""]], [[null]], [[undefined]], and [[NaN]]. Everything else is truthy — including empty arrays and objects.`,
        `Check for the value you actually mean. [[if (items)]] is true for an empty array.`,
      ],
      example: {
        code: `if (items.length > 0) {
    render(items);
}`,
        caption: `Test length, not the array object.`,
      },
      wrong: {
        code: `if (count) {
    show(count);
}`,
        why: `A valid count of 0 is falsy, so the block is skipped exactly when the count matters. Use [[count !== undefined]].`,
      },
    },
    {
      title: "Ternary and nullish values",
      body: [
        `[[condition ? a : b]] chooses a value. [[??]] falls back only for null and undefined, while [[||]] falls back for every falsy value.`,
        `For numbers and booleans that can legitimately be 0 or false, [[??]] is the correct default operator.`,
      ],
      example: {
        code: `const label = count ?? 0;`,
        caption: `0 is kept; only null and undefined trigger the fallback.`,
      },
      wrong: {
        code: `const label = count || 10;`,
        why: `A count of 0 is falsy, so label becomes 10 and the real count is lost. Use [[??]].`,
      },
    },
  ],

  js5: [
    {
      title: "for loops",
      body: [
        `The classic [[for]] has initialisation, condition, and update. The condition is checked before each pass.`,
        `Arrays are zero-indexed; the last valid index is [[length - 1]].`,
      ],
      example: {
        code: `for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}`,
        caption: `Start at 0, stop before length.`,
      },
      wrong: {
        code: `for (let i = 0; i <= items.length; i++) {
    console.log(items[i]);
}`,
        why: `At i === length the value is undefined, and any method call on it throws. Use [[<]].`,
      },
    },
    {
      title: "while and do-while",
      body: [
        `[[while]] checks first; [[do-while]] runs once, then checks. Both need something that can end the loop.`,
        `An accidental infinite loop freezes the page. Keep a clear exit path and update the condition inside the body.`,
      ],
      example: {
        code: `let count = 3;

while (count > 0) {
    count--;
}`,
        caption: `The update moves the loop toward its end.`,
      },
      wrong: {
        code: `let count = 3;

while (count > 0) {
    console.log(count);
}`,
        why: `count never changes, so the condition never becomes false and the loop runs forever.`,
      },
    },
    {
      title: "for...of and for...in",
      body: [
        `[[for...of]] iterates values of an iterable: arrays, strings, maps, sets. [[for...in]] iterates the keys of an object.`,
        `On an array, for...in gives indexes as strings and also walks inherited properties. Use for...of for arrays.`,
      ],
      example: {
        code: `for (const name of names) {
    console.log(name);
}`,
        caption: `Values, not indexes.`,
      },
      wrong: {
        code: `for (const i in names) {
    console.log(i + 1);
}`,
        why: `i is the string "0", "1", … so this concatenates instead of adding, and it includes inherited keys. Use for...of.`,
      },
    },
  ],

  js6: [
  {
    "title": "Function declarations",
    "body": "A function declaration gives a reusable block of instructions a name. It can accept parameters and return a value. Declaring a function does not execute it. Call the function by writing its name followed by parentheses.",
    "example": {
      "code": "function greet() {\n  console.log(\"Hello!\");\n}\n\ngreet();"
    },
    "wrong": {
      "code": "function greet {\n  console.log(\"Hello!\");\n}",
      "why": "A function declaration needs parentheses after its name, even when it has no parameters. Without them, JavaScript cannot parse the declaration."
    }
  },
  {
    "title": "Parameters, arguments, and return values",
    "body": "Parameters are named inputs in the function definition. Arguments are the values supplied when the function is called. Use return when the caller needs the result for another calculation or decision. Logging a value only displays it.",
    "example": {
      "code": "function add(first, second) {\n  return first + second;\n}\n\nconst total = add(4, 6);\nconsole.log(total);"
    },
    "wrong": {
      "code": "function add(first, second) {\n  console.log(first + second);\n}\n\nconst total = add(4, 6) + 1;",
      "why": "The function prints the sum but returns undefined. The caller cannot add one to the printed value. Return the result when other code needs to use it."
    }
  },
  {
    "title": "Local variables and function scope",
    "body": "A variable declared inside a function belongs to that function's local scope. Code outside the function cannot read that local name directly. Return a value when the surrounding code needs the result, and use parameters to provide the function with its inputs.",
    "example": {
      "code": "function calculateTotal(price, quantity) {\n  const total = price * quantity;\n  return total;\n}\n\nconst result = calculateTotal(12, 3);\nconsole.log(result);"
    },
    "wrong": {
      "code": "function calculateTotal(price, quantity) {\n  const total = price * quantity;\n}\n\nconsole.log(total);",
      "why": "total exists only inside calculateTotal, so reading it outside the function causes a ReferenceError. Return the value and store the returned result."
    }
  }
],

  js7: [
    {
      title: "Arrow syntax",
      body: [
        `An arrow function is an expression: [[(args) => expression]]. One parameter does not need parentheses; one expression does not need braces.`,
        `Braces turn the body into a block, and a block needs an explicit return.`,
      ],
      example: {
        code: `const double = (n) => n * 2;
const triple = (n) => {
    return n * 3;
};`,
        caption: `Expression body and block body.`,
      },
      wrong: {
        code: `const double = (n) => {
    n * 2;
};`,
        why: `The braces make a block with no return, so double(5) is undefined. Remove the braces or add return.`,
      },
    },
    {
      title: "this in arrows",
      body: [
        `Arrow functions do not have their own [[this]]. They use the this of the enclosing scope.`,
        `That makes them good for callbacks and bad for object methods that need the object.`,
      ],
      example: {
        code: `const counter = {
    count: 0,
    increment() {
        this.count += 1;
    },
};`,
        caption: `A shorthand method gets the object as this.`,
      },
      wrong: {
        code: `const counter = {
    count: 0,
    increment: () => {
        this.count += 1;
    },
};`,
        why: `The arrow captures the outer this, which is not the counter object, so increment does nothing useful.`,
      },
    },
    {
      title: "When an arrow is the wrong tool",
      body: [
        `Arrows cannot be constructors, have no [[arguments]] object, and cannot be generators. They are not a general replacement for functions.`,
        `Use a normal function or method for anything that needs its own this, arguments, or prototype.`,
      ],
      example: {
        code: `function User(name) {
    this.name = name;
}

const user = new User("Ada");`,
        caption: `Constructors need a normal function.`,
      },
      wrong: {
        code: `const User = (name) => {
    this.name = name;
};

const user = new User("Ada");`,
        why: `Arrow functions are not constructors; [[new]] throws TypeError. Use a function or a class.`,
      },
    },
  ],

  js8: [
    {
      title: "Creating and indexing arrays",
      body: [
        `An array is an ordered list. Create it with a literal [[[1, 2, 3]]] and read items by index from 0. [[length]] is the count.`,
        `Arrays can hold any mix of values, but a consistent element type keeps the code predictable.`,
      ],
      example: {
        code: `const names = ["Ada", "Grace"];
console.log(names[0]);
console.log(names[names.length - 1]);`,
        caption: `First and last without guessing.`,
      },
      wrong: {
        code: `const names = ["Ada", "Grace"];
console.log(names[names.length]);`,
        why: `length is one past the last index, so this reads undefined. Use [[length - 1]].`,
      },
    },
    {
      title: "Growing and shrinking",
      body: [
        `[[push]] adds to the end, [[pop]] removes from the end, [[shift]] and [[unshift]] work at the start. All of them mutate the array.`,
        `[[splice]] removes or inserts in the middle. [[delete]] leaves a hole and is not the same as removing an element.`,
      ],
      example: {
        code: `const queue = ["a", "b"];
queue.push("c");
queue.splice(1, 1);`,
        caption: `Add at the end, remove one item at index 1.`,
      },
      wrong: {
        code: `const items = ["a", "b", "c"];
delete items[1];
console.log(items.length);`,
        why: `delete leaves an empty slot, so the length is still 3 and the array contains a hole. Use splice(1, 1).`,
      },
    },
    {
      title: "Copying and slicing",
      body: [
        `Assignment copies the reference. [[slice()]] returns a shallow copy, and spread [[[...items]]] does the same more readably.`,
        `A shallow copy still shares nested objects. Changing a nested object shows up in both arrays.`,
      ],
      example: {
        code: `const original = [1, 2, 3];
const copy = [...original];
copy.push(4);`,
        caption: `The copy grows; the original does not.`,
      },
      wrong: {
        code: `const original = [1, 2, 3];
const copy = original;
copy.push(4);`,
        why: `copy is another name for the same array, so the original now has four items too.`,
      },
    },
  ],

  js9: [
  {
    "title": "Object literals and properties",
    "body": "An object groups related information as key-value pairs. Each property has a name and a value. Use dot notation when the property name is known, or bracket notation when the key is stored in a variable.",
    "example": {
      "code": "const user = {\n  name: \"Mina\",\n  level: 3,\n};\n\nconsole.log(user.name);\nconst field = \"level\";\nconsole.log(user[field]);"
    },
    "wrong": {
      "code": "const user = {\n  first-name: \"Mina\",\n};",
      "why": "An unquoted hyphen is read as a subtraction operator, not as part of a property name. Use a valid identifier such as firstName or quote the key and access it with brackets."
    }
  },
  {
    "title": "Add, update, and remove properties",
    "body": "Create properties with an object literal, then update them by assigning a new value. You can add a property by assigning to a new key. The delete operator removes a property, but use it only when the property should no longer exist.",
    "example": {
      "code": "const book = { title: \"The Glass Library\" };\nbook.pages = 320;\nbook.read = true;\ndelete book.read;\nconsole.log(book.pages);"
    },
    "wrong": {
      "code": "book.pages == 320;",
      "why": "Double equals compares values and does not update the property. Use a single equals sign to assign a new value."
    }
  },
  {
    "title": "Methods and the this keyword",
    "body": "A method is a function stored as an object property. When it is called through the object, this refers to the object before the dot. This lets a method use the other properties that belong to the same object.",
    "example": {
      "code": "const reader = {\n  name: \"Mina\",\n  greet() {\n    return \"Hello, \" + this.name;\n  },\n};\n\nconsole.log(reader.greet());",
    },
    "wrong": {
      "code": "const reader = {\n  name: \"Mina\",\n  greet() { return this.name; },\n};\n\nconst greet = reader.greet;\nconsole.log(greet());",
      "why": "The method is called without reader as its object receiver. In module code, this is undefined inside the unbound call, so reading this.name fails. Call reader.greet() instead."
    }
  }
],

  js16: [
    {
      title: "Classes and instances",
      body: [
        `A [[class]] is a blueprint. [[new]] creates an instance, and the [[constructor]] runs at that moment.`,
        `Methods live on the prototype, so every instance shares them instead of copying them.`,
      ],
      example: {
        code: `class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return "Hi, " + this.name;
    }
}`,
        caption: `One constructor, one shared method.`,
      },
      wrong: {
        code: `class User {
    constructor(name) { this.name = name; }
}

const user = User("Ada");`,
        why: `Calling a class without [[new]] throws TypeError. Use [[new User("Ada")]].`,
      },
    },
    {
      title: "Static members",
      body: [
        `[[static]] methods belong to the class, not to instances. They are called as [[User.create()]] and have no this instance.`,
        `Use static for factories and helpers that do not need an object.`,
      ],
      example: {
        code: `class User {
    static create(name) {
        return new User(name);
    }
}`,
        caption: `A factory that returns an instance.`,
      },
      wrong: {
        code: `class User {
    static create(name) { return name; }
}

const user = new User("Ada");
user.create("Grace");`,
        why: `create is static, so instances do not have it; the call throws TypeError. Call [[User.create(...)]].`,
      },
    },
    {
      title: "extends and super",
      body: [
        `[[extends]] inherits. In a derived constructor, [[super()]] must run before [[this]] is touched.`,
        `A child method can call the parent's version with [[super.method()]].`,
      ],
      example: {
        code: `class Admin extends User {
    constructor(name) {
        super(name);
        this.role = "admin";
    }
}`,
        caption: `super first, then own fields.`,
      },
      wrong: {
        code: `class Admin extends User {
    constructor(name) {
        this.role = "admin";
        super(name);
    }
}`,
        why: `Reading or writing this before super() throws ReferenceError in a derived class.`,
      },
    },
  ],

  js10: [
    {
      title: "map and filter",
      body: [
        `[[map]] returns a new array with one transformed value per element. [[filter]] returns a new array with the elements that pass a test.`,
        `Neither changes the original array. The callback's return value matters in both.`,
      ],
      example: {
        code: `const doubled = numbers.map((n) => n * 2);
const even = numbers.filter((n) => n % 2 === 0);`,
        caption: `Transform, then select.`,
      },
      wrong: {
        code: `numbers.map((n) => {
    n * 2;
});`,
        why: `The callback returns undefined, so the result is an array of undefined values. Add return or use an expression body.`,
      },
    },
    {
      title: "find, some, every, reduce",
      body: [
        `[[find]] returns the first match or undefined. [[some]] and [[every]] return booleans. [[reduce]] folds the array into one value.`,
        `Give reduce an initial value. Without one, an empty array throws instead of returning a neutral result.`,
      ],
      example: {
        code: `const total = numbers.reduce((sum, n) => sum + n, 0);`,
        caption: `0 is the starting value, so an empty array returns 0.`,
      },
      wrong: {
        code: `const total = [].reduce((sum, n) => sum + n);`,
        why: `With no initial value and no elements, reduce throws TypeError. Pass 0 as the second argument.`,
      },
    },
    {
      title: "Chaining and mutation traps",
      body: [
        `map, filter, and slice return new arrays, so they chain cleanly. [[sort]], [[reverse]], [[push]], and [[splice]] mutate.`,
        `Copy before sorting if the original order matters: [[[...items].sort()]].`,
      ],
      example: {
        code: `const sorted = [...items].sort((a, b) => a - b);`,
        caption: `A sorted copy, original untouched.`,
      },
      wrong: {
        code: `const sorted = items.sort((a, b) => a - b);
console.log(items);`,
        why: `sort mutates the original array, so items is now sorted too even though it was meant to stay as it was.`,
      },
    },
  ],

  js11: [
    {
      title: "Object destructuring",
      body: [
        `[[const { name, age } = user]] pulls properties into variables. Missing properties become undefined.`,
        `Rename with a colon, default with [[=]]: [[const { name: userName = "anon" } = user]].`,
      ],
      example: {
        code: `const { name, age = 0 } = user;`,
        caption: `Two properties, one default.`,
      },
      wrong: {
        code: `const { user.name } = user;`,
        why: `That is not valid destructuring syntax. Use [[const { name } = user]] or rename with [[name: userName]].`,
      },
    },
    {
      title: "Array destructuring",
      body: [
        `[[const [first, second] = items]] binds by position. Skip a position with an extra comma.`,
        `A rest element collects the remainder: [[const [head, ...tail] = items]].`,
      ],
      example: {
        code: `const [first, , third] = items;`,
        caption: `The empty slot skips the second item.`,
      },
      wrong: {
        code: `const [a, b] = { first: 1, second: 2 };`,
        why: `The right side is not iterable, so this throws TypeError. Use object destructuring for objects.`,
      },
    },
    {
      title: "Nested patterns and defaults",
      body: [
        `Patterns nest: [[const { user: { name } } = data]]. A default on the outer property protects the inner read.`,
        `Defaults apply only when the value is undefined. null passes through.`,
      ],
      example: {
        code: `const { user: { name } = {} } = data;`,
        caption: `An empty object default keeps the nested read safe.`,
      },
      wrong: {
        code: `const { name = "anon" } = { name: null };
console.log(name);`,
        why: `The default does not apply to null, so name is null. Use [[?? "anon"]] after the destructuring if null is possible.`,
      },
    },
  ],

  js12: [
    {
      title: "Array spread",
      body: [
        `[[...items]] expands an iterable into individual values. Use it to copy, concatenate, or pass a list as arguments.`,
        `Spread creates a new array. Nested objects are still shared.`,
      ],
      example: {
        code: `const all = [...first, ...second];
const max = Math.max(...numbers);`,
        caption: `Join arrays and spread into a call.`,
      },
      wrong: {
        code: `const copy = [...user];`,
        why: `A plain object is not iterable, so spreading it into an array throws. Use [[{ ...user }]] for objects.`,
      },
    },
    {
      title: "Object spread",
      body: [
        `[[{ ...user, name: "Ada" }]] copies properties, with later keys overriding earlier ones.`,
        `The copy is shallow: nested objects are shared with the original.`,
      ],
      example: {
        code: `const updated = { ...user, active: true };`,
        caption: `A new object, with one property changed.`,
      },
      wrong: {
        code: `const updated = { ...user };
updated.address.city = "Oslo";
console.log(user.address.city);`,
        why: `address is shared by both objects, so the original changes too. Copy the nested object as well if it must be independent.`,
      },
    },
    {
      title: "Rest parameters",
      body: [
        `[[function sum(...numbers)]] collects any number of arguments into a real array. Unlike arguments, rest is an actual array.`,
        `A rest parameter must come last; anything after it is a syntax error.`,
      ],
      example: {
        code: `function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}`,
        caption: `Call it with any number of values.`,
      },
      wrong: {
        code: `function sum(...numbers, extra) { }`,
        why: `The rest parameter must be last, so this is a syntax error.`,
      },
    },
  ],

  js13: [
    {
      title: "Creating a promise",
      body: [
        `[[new Promise((resolve, reject) => { ... })]] wraps an asynchronous operation. Call resolve with the result or reject with an error.`,
        `Only the first call counts. A promise is settled once and never changes state again.`,
      ],
      example: {
        code: `const wait = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));`,
        caption: `Resolve after the timer fires.`,
      },
      wrong: {
        code: `new Promise((resolve, reject) => {
    setTimeout(() => {
        throw new Error("failed");
    }, 100);
});`,
        why: `The throw happens outside the executor and does not reject the promise; the rejection is never seen. Call reject(error) instead.`,
      },
    },
    {
      title: "then, catch, finally",
      body: [
        `[[then]] receives the resolved value and returns a new promise. [[catch]] handles a rejection anywhere earlier in the chain.`,
        `Return a value from then to pass it on. Without return, the next step receives undefined.`,
      ],
      example: {
        code: `fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => showError(error));`,
        caption: `One flow down the chain, one catch at the end.`,
      },
      wrong: {
        code: `fetch(url)
    .then((response) => {
        response.json();
    })
    .then((data) => render(data));`,
        why: `The first then returns nothing, so data is undefined and the render never receives the parsed body.`,
      },
    },
    {
      title: "Promise.all and allSettled",
      body: [
        `[[Promise.all]] waits for every promise and rejects as soon as one fails. [[Promise.allSettled]] waits for all and reports each outcome.`,
        `Choose by what a partial failure means: abort everything, or keep the successes and report the rest.`,
      ],
      example: {
        code: `const results = await Promise.allSettled(tasks);

const failed = results.filter((r) => r.status === "rejected");`,
        caption: `Every task finishes; failures are reported, not thrown.`,
      },
      wrong: {
        code: `const results = await Promise.all(tasks);`,
        why: `One rejected task rejects the whole call, so the successful results are lost. Use allSettled when partial success matters.`,
      },
    },
  ],

  js14: [
    {
      title: "async functions return promises",
      body: [
        `An [[async]] function always returns a promise. A returned value is wrapped; a thrown error becomes a rejection.`,
        `[[await]] pauses inside the async function until the promise settles. It does not block the whole program.`,
      ],
      example: {
        code: `async function load() {
    return 42;
}

load().then((value) => console.log(value));`,
        caption: `The return value arrives as a promise.`,
      },
      wrong: {
        code: `async function load() {
    return fetch(url);
}

const data = load();
console.log(data.items);`,
        why: `load() returns a promise, so data is not the response and data.items is undefined. Await it or use then.`,
      },
    },
    {
      title: "try and catch around await",
      body: [
        `A rejected promise becomes a thrown error at the await. Wrap the await in try/catch to handle it.`,
        `An async function with no catch leaves the rejection unhandled, which surfaces as an unhandled rejection warning.`,
      ],
      example: {
        code: `async function load() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }
}`,
        caption: `One catch covers both the request and the parse.`,
      },
      wrong: {
        code: `async function load() {
    const response = await fetch(url);
    return response.json();
}`,
        why: `A network failure rejects with nothing to catch it, and the caller only sees a failed promise. Add try/catch.`,
      },
    },
    {
      title: "Sequential versus parallel",
      body: [
        `Awaiting inside a loop runs one request at a time. It is correct when each step depends on the previous one, and slow when they do not.`,
        `For independent work, start the promises first and await them together with Promise.all.`,
      ],
      example: {
        code: `const pages = await Promise.all(
    urls.map((url) => fetch(url))
);`,
        caption: `All requests start before any is awaited.`,
      },
      wrong: {
        code: `const pages = [];
for (const url of urls) {
    pages.push(await fetch(url));
}`,
        why: `Each await waits for the previous request, so the total time is the sum of every round trip.`,
      },
    },
  ],

  js15: [
    {
      title: "Named exports",
      body: [
        `[[export const name = "Ada"]] makes a binding available to other modules. Import it by name in braces: [[import { name } from "./user.js"]].`,
        `The path needs its extension in browsers and many runtimes. Named imports must match the exported name exactly.`,
      ],
      example: {
        code: `// user.js
export const name = "Ada";

// app.js
import { name } from "./user.js";`,
        caption: `Export a name, import the same name.`,
      },
      wrong: {
        code: `// user.js
export const name = "Ada";

// app.js
import name from "./user.js";`,
        why: `A default import does not match a named export; the value is undefined. Use [[import { name }]].`,
      },
    },
    {
      title: "Default exports",
      body: [
        `[[export default value]] gives a module one unnamed export. Import it with any local name: [[import User from "./user.js"]].`,
        `A module can have one default plus any number of named exports. Mixing them up is a common source of undefined imports.`,
      ],
      example: {
        code: `// user.js
export default class User { }

// app.js
import User from "./user.js";`,
        caption: `The default import chooses its own local name.`,
      },
      wrong: {
        code: `import { default } from "./user.js";`,
        why: `[[default]] is not a named export and cannot be imported in braces like that. Import it without braces.`,
      },
    },
    {
      title: "Module scope",
      body: [
        `Each module has its own top-level scope. A variable declared there is not global unless it is assigned to window or globalThis.`,
        `Imports are live bindings: the importer sees later changes to the exported value. Do not use CommonJS require in an ES module.`,
      ],
      example: {
        code: `// counter.js
export let count = 0;
export function increment() { count += 1; }`,
        caption: `Importers see the updated count.`,
      },
      wrong: {
        code: `// app.js (an ES module)
const fs = require("fs");`,
        why: `require does not exist in an ES module. Use [[import fs from "node:fs"]].`,
      },
    },
  ],

  "js17": [
  {
    "title": "Calculate and assign values",
    "body": [
      "Arithmetic operators include +, -, *, /, %, and **. Assignment operators store or update a variable, including compound forms such as += and *=.",
      "The plus operator can add numbers or concatenate strings. Convert values deliberately when text comes from an input field."
    ],
    "example": {
      "code": "let total = 10;\ntotal += 5;\nconst doubled = total * 2;",
      "caption": "Compound assignment updates the existing value."
    },
    "wrong": {
      "code": "const total = 10;\ntotal += 5;",
      "why": "A const binding cannot be reassigned. Use let when the variable itself must change."
    }
  },
  {
    "title": "Compare values safely",
    "body": [
      "Strict equality === compares type and value, while loose equality == may convert operands before comparison. Relational operators compare values such as numbers or strings.",
      "Prefer strict equality for predictable checks. Remember that NaN is not equal to itself; Number.isNaN() tests for that special numeric value."
    ],
    "example": {
      "code": "if (inputValue === 10) {\n  console.log(\"Exact numeric match\");\n}",
      "caption": "The comparison requires both value and type to match."
    },
    "wrong": {
      "code": "if (inputValue == 10) {\n  console.log(\"Matched\");\n}",
      "why": "Loose equality can convert a string such as \"10\" into a number. Use === when types should match."
    }
  },
  {
    "title": "Combine conditions and choose results",
    "body": [
      "&& and || combine Boolean decisions, while ! reverses a truth value. The conditional operator selects one of two expressions based on a condition.",
      "Nullish coalescing ?? supplies a fallback only for null or undefined, unlike ||, which also replaces other falsy values such as zero and an empty string."
    ],
    "example": {
      "code": "const displayName = user.name ?? \"Guest\";\nconst label = score >= 75 ? \"Pass\" : \"Retry\";",
      "caption": "The fallback preserves a deliberately empty value."
    },
    "wrong": {
      "code": "const pageSize = userSetting || 10;",
      "why": "If a valid setting is zero, || replaces it. Use ?? when only null or undefined should trigger the fallback."
    }
  }
],
  "js18": [
  {
    "title": "Normalize a string",
    "body": [
      "trim(), toLowerCase(), and toUpperCase() return new strings with whitespace or letter case adjusted. Strings are immutable, so the original value is not changed.",
      "Normalize input for matching when capitalization and outside spaces should not matter. Preserve the original value if its exact form is meaningful."
    ],
    "example": {
      "code": "const raw = \"  ZEDX  \";\nconst clean = raw.trim().toLowerCase();",
      "caption": "The cleaned value is a new string."
    },
    "wrong": {
      "code": "const raw = \"  ZEDX  \";\nraw.trim();\nconsole.log(raw);",
      "why": "trim() returns a new string. Assign the returned value if you need to keep it."
    }
  },
  {
    "title": "Find and extract text",
    "body": [
      "includes() checks for a substring, startsWith() and endsWith() check boundaries, and slice() extracts a portion of a string.",
      "Use methods that express the intent. Avoid relying on an index without checking whether the search actually found a match."
    ],
    "example": {
      "code": "const filename = \"report-final.txt\";\nif (filename.endsWith(\".txt\")) {\n  console.log(filename.slice(0, -4));\n}",
      "caption": "The suffix is checked before removing it."
    },
    "wrong": {
      "code": "const position = filename.indexOf(\".pdf\");\nconsole.log(filename.slice(0, position));",
      "why": "When the substring is missing, indexOf returns -1. Check the result before slicing."
    }
  },
  {
    "title": "Format with template literals",
    "body": [
      "Template literals use backticks and ${...} placeholders to insert expressions. They can also span multiple lines without explicit newline escapes.",
      "Template literals improve readability, but inserting untrusted text into HTML is still unsafe if the result is later parsed as markup. Use textContent for plain text."
    ],
    "example": {
      "code": "const user = \"Ada\";\nconst message = `Welcome, ${user}!`;",
      "caption": "The expression is evaluated inside the text."
    },
    "wrong": {
      "code": "const message = \"Welcome, ${user}!\";",
      "why": "Ordinary quoted strings do not interpolate ${...}. Use a template literal with backticks."
    }
  }
],
  "js19": [
  {
    "title": "Select elements",
    "body": [
      "querySelector() returns the first element matching a CSS selector, while querySelectorAll() returns a static NodeList of all matches.",
      "Check whether a selector found an element before changing it. A missing element produces null, and accessing a property on null causes an error."
    ],
    "example": {
      "code": "const title = document.querySelector(\"#page-title\");\nif (title) {\n  title.textContent = \"Overview\";\n}",
      "caption": "The code checks that the element exists."
    },
    "wrong": {
      "code": "document.querySelector(\"#missing\").textContent = \"Hello\";",
      "why": "The selector returns null when there is no match. Check the result before accessing it."
    }
  },
  {
    "title": "Create, update, and remove nodes",
    "body": [
      "createElement() builds a new element, while append() and prepend() insert nodes into an existing parent. remove() detaches an element from the document.",
      "Use textContent when setting plain text. Use classList to add, remove, or toggle CSS classes without replacing the element's full class attribute."
    ],
    "example": {
      "code": "const item = document.createElement(\"li\");\nitem.textContent = \"New task\";\ndocument.querySelector(\"ul\").append(item);",
      "caption": "The new list item is inserted as a node."
    },
    "wrong": {
      "code": "list.innerHTML += userInput;",
      "why": "This parses input as HTML and may create cross-site scripting risk. Use textContent for user-provided text."
    }
  },
  {
    "title": "Update attributes and classes",
    "body": [
      "setAttribute() and getAttribute() work with HTML attributes. classList offers add(), remove(), contains(), and toggle() for managing CSS classes.",
      "Keep content, behavior, and presentation distinct. Change a class to represent a UI state, then let CSS define how it looks."
    ],
    "example": {
      "code": "const card = document.querySelector(\".card\");\ncard.classList.add(\"is-active\");\ncard.setAttribute(\"aria-expanded\", \"true\");",
      "caption": "The class and state attribute are updated."
    },
    "wrong": {
      "code": "card.className = \"is-active\";",
      "why": "Replacing className can remove unrelated classes. Use classList.add() when adding one class."
    }
  }
],
  "js20": [
  {
    "title": "Listen for an event",
    "body": [
      "addEventListener() connects a handler function to an event type such as click, input, change, or submit. The handler receives an Event object with information about what happened.",
      "Use the event type that matches the interaction. A form should commonly handle submit, while a live text field may use input."
    ],
    "example": {
      "code": "const button = document.querySelector(\"button\");\nbutton.addEventListener(\"click\", event => {\n  console.log(\"Button activated\");\n});",
      "caption": "The callback runs when the button is activated."
    },
    "wrong": {
      "code": "button.addEventListener(\"onclick\", handler);",
      "why": "The event type is click, not onclick. The on prefix appears in HTML attributes and older property names."
    }
  },
  {
    "title": "Understand bubbling and delegation",
    "body": [
      "Many DOM events bubble from the event target toward ancestor elements. A parent can listen once and inspect event.target to respond to matching descendants.",
      "Delegation works well for lists whose items are added later. Use closest() to find the intended child and contains() to confirm it belongs to the delegated container."
    ],
    "example": {
      "code": "list.addEventListener(\"click\", event => {\n  const item = event.target.closest(\"li\");\n  if (item && list.contains(item)) selectItem(item);\n});",
      "caption": "One parent handles current and future list items."
    },
    "wrong": {
      "code": "list.addEventListener(\"click\", event => {\n  selectItem(event.currentTarget);\n});",
      "why": "currentTarget is the parent listener, not the child clicked. Inspect target or use closest()."
    }
  },
  {
    "title": "Prevent defaults and manage propagation",
    "body": [
      "preventDefault() cancels a browser action such as a form's normal navigation. stopPropagation() stops an event from continuing through the propagation path.",
      "Use these methods only when the intended interaction requires them. Stopping propagation indiscriminately can break other components that rely on the same event."
    ],
    "example": {
      "code": "form.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  saveForm();\n});",
      "caption": "The form is handled without a full page navigation."
    },
    "wrong": {
      "code": "form.addEventListener(\"submit\", () => {\n  event.preventDefault();\n});",
      "why": "event is not defined in this callback. Accept the Event parameter."
    }
  }
],
  "js21": [
  {
    "title": "Serialize values to JSON",
    "body": [
      "JSON.stringify() converts supported JavaScript values into JSON text. This is useful when sending data to an API or storing structured values as text.",
      "JSON supports objects, arrays, strings, numbers, booleans, and null. Functions and undefined object properties are not represented as ordinary JSON values."
    ],
    "example": {
      "code": "const student = { name: \"Ada\", score: 95 };\nconst text = JSON.stringify(student);",
      "caption": "The object becomes a JSON string."
    },
    "wrong": {
      "code": "const text = student;",
      "why": "This keeps the original object reference. Use JSON.stringify() when a text representation is needed."
    }
  },
  {
    "title": "Parse JSON text",
    "body": [
      "JSON.parse() reads a JSON string and returns its corresponding JavaScript value. The text must follow JSON syntax, including double-quoted property names and string values.",
      "Parsing can throw SyntaxError when text is malformed. Handle that possibility when content comes from storage, a file, or an external service."
    ],
    "example": {
      "code": "try {\n  const data = JSON.parse(responseText);\n  console.log(data.name);\n} catch (error) {\n  console.error(\"Invalid JSON\");\n}",
      "caption": "Invalid text is handled without crashing the flow."
    },
    "wrong": {
      "code": "const data = JSON.parse(\"{name: 'Ada'}\");",
      "why": "JSON requires double-quoted property names and string values. This is not valid JSON."
    }
  },
  {
    "title": "Validate data after parsing",
    "body": [
      "A successful parse only proves that the text is valid JSON. It does not prove that the result has the fields or types your application expects.",
      "Check required properties and validate values before using them. Treat external data as untrusted, even when it is encoded as JSON."
    ],
    "example": {
      "code": "const data = JSON.parse(text);\nif (typeof data.name === \"string\") {\n  showName(data.name);\n}",
      "caption": "The property is checked before use."
    },
    "wrong": {
      "code": "const data = JSON.parse(text);\ndeleteAccount(data.userId);",
      "why": "Parsing does not validate authorization or the identifier. Check permissions before a sensitive action."
    }
  }
],
  "js22": [
  {
    "title": "Store and retrieve simple values",
    "body": [
      "localStorage and sessionStorage expose setItem(), getItem(), removeItem(), and clear(). Each uses string keys and string values.",
      "Use storage for small preferences and temporary state, not large databases or sensitive secrets. Storage access can fail in restricted browser contexts."
    ],
    "example": {
      "code": "localStorage.setItem(\"theme\", \"dark\");\nconst theme = localStorage.getItem(\"theme\");",
      "caption": "The value can be retrieved later for the same origin."
    },
    "wrong": {
      "code": "localStorage.setItem(\"theme\", { mode: \"dark\" });",
      "why": "Storage values are strings. Convert an object with JSON.stringify() before saving."
    }
  },
  {
    "title": "Understand local and session scope",
    "body": [
      "localStorage persists across browser restarts for the same origin. sessionStorage is associated with a page session and is normally cleared when that tab's session ends.",
      "Storage is scoped by origin, and sessionStorage has a separate page-session scope. Do not assume different sites or tabs share the same values."
    ],
    "example": {
      "code": "sessionStorage.setItem(\"draft\", \"Unsaved text\");\nconst draft = sessionStorage.getItem(\"draft\");",
      "caption": "The draft belongs to this page session."
    },
    "wrong": {
      "code": "localStorage.getItem(\"draft\");",
      "why": "This reads from a different storage area. Use sessionStorage if data should be limited to the page session."
    }
  },
  {
    "title": "Serialize data and handle privacy",
    "body": [
      "Use JSON.stringify() before saving an object and JSON.parse() after reading it. A stored value may be absent or malformed, so handle both cases.",
      "Never store passwords or session tokens in Web Storage. Page scripts can read it, so an XSS vulnerability may expose stored values."
    ],
    "example": {
      "code": "const settings = { compact: true };\nlocalStorage.setItem(\"settings\", JSON.stringify(settings));",
      "caption": "Structured settings are encoded as JSON text."
    },
    "wrong": {
      "code": "localStorage.setItem(\"password\", userPassword);",
      "why": "Web Storage is accessible to scripts running on the page. Do not store passwords or secrets."
    }
  }
],
  "js23": [
  {
    "title": "Run synchronous code first",
    "body": [
      "JavaScript executes the current call stack to completion before processing queued asynchronous callbacks. A function call runs synchronously unless it schedules work for later.",
      "A timer with a zero delay is not an instruction to run immediately. It schedules a task that can run after the current stack and other queued work."
    ],
    "example": {
      "code": "console.log(\"first\");\nsetTimeout(() => console.log(\"later\"), 0);\nconsole.log(\"second\");",
      "caption": "The output is first, second, later."
    },
    "wrong": {
      "code": "setTimeout(() => console.log(\"later\"), 0);\nconsole.log(\"first\");",
      "why": "The timer callback is still scheduled for later. Current synchronous code runs first."
    }
  },
  {
    "title": "Understand the microtask queue",
    "body": [
      "Promise then, catch, and finally callbacks run as microtasks. After the current synchronous stack finishes, the browser processes pending microtasks before moving to the next task.",
      "A microtask can schedule another microtask. A long chain can delay rendering and other tasks, so keep callback work small."
    ],
    "example": {
      "code": "console.log(\"A\");\nPromise.resolve().then(() => console.log(\"microtask\"));\nconsole.log(\"B\");",
      "caption": "The order is A, B, microtask."
    },
    "wrong": {
      "code": "Promise.resolve().then(() => console.log(\"microtask\"));\nconsole.log(\"A\");",
      "why": "The callback does not interrupt the current stack. A is logged before the microtask."
    }
  },
  {
    "title": "Predict task and microtask order",
    "body": [
      "A simplified browser model runs a task, drains the microtask queue, may update rendering, and then selects another task. This helps explain why promise callbacks can run before timers.",
      "Do not use timing guesses as synchronization. Use promises, events, or explicit state to know when asynchronous work is complete."
    ],
    "example": {
      "code": "setTimeout(() => console.log(\"timer\"), 0);\nPromise.resolve().then(() => console.log(\"promise\"));\nconsole.log(\"sync\");",
      "caption": "The order is sync, promise, timer."
    },
    "wrong": {
      "code": "setTimeout(() => console.log(\"timer\"), 0);\nconsole.log(\"timer finished\");",
      "why": "Scheduling a timer does not mean its callback has run. It executes in a later task."
    }
  }
],
  "js24": [
  {
    "title": "Move CPU work to a worker",
    "body": [
      "A Web Worker runs JavaScript on a separate thread from the page's main thread. It can perform computation without directly manipulating the document UI.",
      "Communicate with a worker using postMessage() and message events. Data is passed through structured cloning or transferable objects."
    ],
    "example": {
      "code": "const worker = new Worker(\"worker.js\");\nworker.postMessage({ count: 1000 });\nworker.onmessage = event => console.log(event.data);",
      "caption": "The page sends data and receives a result."
    },
    "wrong": {
      "code": "const worker = new Worker(\"worker.js\");\nworker.document.querySelector(\"h1\");",
      "why": "A worker does not have access to the page DOM. Send messages to request UI updates on the main thread."
    }
  },
  {
    "title": "Handle worker messages and lifecycle",
    "body": [
      "A worker can listen for message events and send results back with postMessage(). The page can terminate a worker when its task is no longer needed.",
      "Workers suit CPU-heavy tasks, not every small asynchronous operation. Creating too many workers adds memory and scheduling overhead."
    ],
    "example": {
      "code": "// worker.js\nself.onmessage = event => {\n  const result = event.data.count * 2;\n  self.postMessage(result);\n};",
      "caption": "The worker receives a message and replies."
    },
    "wrong": {
      "code": "// worker.js\ndocument.body.textContent = \"Done\";",
      "why": "Workers do not have document access. Send the result to the page and update the DOM there."
    }
  },
  {
    "title": "Exchange messages with WebSockets",
    "body": [
      "WebSocket provides a persistent full-duplex connection. The browser and server can both send messages after the connection is established.",
      "Handle open, message, error, and close events. Validate message contents and authenticate users on the server; an open connection does not grant permission."
    ],
    "example": {
      "code": "const socket = new WebSocket(\"wss://example.com/live\");\nsocket.addEventListener(\"message\", event => {\n  console.log(event.data);\n});",
      "caption": "The page listens for incoming messages."
    },
    "wrong": {
      "code": "const socket = new WebSocket(\"https://example.com/live\");",
      "why": "WebSocket URLs use ws or wss schemes, not ordinary http or https."
    }
  }
],
};
