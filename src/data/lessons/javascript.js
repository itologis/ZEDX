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
      title: "Function declarations",
      body: [
        `A function declaration has a name, parameters, and a body. [[return]] sends a value back.`,
        `Without return, a function gives back undefined. Printing inside is not the same as returning.`,
      ],
      example: {
        code: `function double(n) {
    return n * 2;
}

const result = double(21);`,
        caption: `The caller receives 42.`,
      },
      wrong: {
        code: `function double(n) {
    console.log(n * 2);
}

const result = double(21) + 1;`,
        why: `The function returns undefined, so adding 1 gives NaN.`,
      },
    },
    {
      title: "Parameters and defaults",
      body: [
        `Missing arguments arrive as undefined. A default parameter fills in when the argument is undefined, not when it is null.`,
        `Extra arguments are ignored unless you collect them with rest syntax.`,
      ],
      example: {
        code: `function greet(name = "friend") {
    return "Hi, " + name;
}`,
        caption: `The default only covers undefined.`,
      },
      wrong: {
        code: `function greet(name = "friend") {
    return "Hi, " + name;
}

console.log(greet(null));`,
        why: `null is a value, so the default is not used and the result is "Hi, null". Handle null explicitly.`,
      },
    },
    {
      title: "Closures",
      body: [
        `A function keeps a reference to the scope where it was created. That is a closure, and it is how counters and callbacks keep private state.`,
        `A closure captures the variable, not the value at creation time.`,
      ],
      example: {
        code: `function counter() {
    let count = 0;
    return () => ++count;
}

const next = counter();`,
        caption: `Each counter call gets its own count.`,
      },
      wrong: {
        code: `for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}`,
        why: `var has function scope, so every callback sees the final i and prints 3 three times. Use let.`,
      },
    },
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
      title: "Object literals",
      body: [
        `An object groups key-value pairs: [[{ name: "Ada", age: 36 }]]. Keys are strings or symbols.`,
        `Read with dot notation for known keys and brackets for dynamic ones: [[user[fieldName]]].`,
      ],
      example: {
        code: `const user = { name: "Ada", age: 36 };
console.log(user.name);`,
        caption: `Dot notation for a fixed key.`,
      },
      wrong: {
        code: `const user = { first-name: "Ada" };`,
        why: `An unquoted hyphen is read as subtraction. Quote the key: [["first-name": "Ada"]].`,
      },
    },
    {
      title: "Methods and this",
      body: [
        `A property whose value is a function is a method. Inside it, [[this]] refers to the object it was called on.`,
        `Extracting the method into a variable loses that connection; [[this]] becomes undefined in strict mode.`,
      ],
      example: {
        code: `const user = {
    name: "Ada",
    greet() {
        return "Hi, " + this.name;
    },
};

user.greet();`,
        caption: `Called as a method, this is the user.`,
      },
      wrong: {
        code: `const greet = user.greet;
greet();`,
        why: `The function is called with no receiver, so this is undefined and reading this.name throws.`,
      },
    },
    {
      title: "Optional chaining",
      body: [
        `[[user?.address?.street]] stops and returns undefined when a link is missing. Without it, reading a property of undefined throws.`,
        `Use [[??]] together with optional chaining for a fallback. Do not use optional chaining to hide data that should always exist.`,
      ],
      example: {
        code: `const street = user?.address?.street ?? "unknown";`,
        caption: `Reach through safely, then default.`,
      },
      wrong: {
        code: `const street = user.address.street;`,
        why: `If address is undefined this throws TypeError before any fallback can run. Add [[?.]].`,
      },
    },
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
};
