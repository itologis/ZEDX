// Lessons for the Python track. Same shape as the HTML and CSS tracks.

export default {
  p1: [
    {
      title: "print() and string literals",
      body: [
        `[[print()]] writes its arguments to standard output, separated by spaces and followed by a newline. Text goes in quotes; numbers do not need them.`,
        `A Python file runs from top to bottom. There is no boilerplate main function unless you write one.`,
      ],
      example: {
        code: `print("Hello, world")
print("ZEDX", 2)`,
        caption: `Two calls, two lines of output.`,
      },
      wrong: {
        code: `print "Hello, world"`,
        why: `Python 3 requires parentheses around the arguments; without them this is a syntax error, not output.`,
      },
    },
    {
      title: "Comments and blank lines",
      body: [
        `Comments start with [[#]] and run to the end of the line. Python has no block comment syntax; a triple-quoted string is a string, not a comment.`,
        `Blank lines are ignored by the interpreter and used to separate ideas. Indentation, on the other hand, is syntax.`,
      ],
      example: {
        code: `# Greeting for the console
print("Hello")

# A second idea, after a blank line
print("Again")`,
        caption: `# comments; blank lines group.`,
      },
      wrong: {
        code: `// Greeting
print("Hello")`,
        why: `[[//]] is floor division in Python, not a comment. The line is a syntax error.`,
      },
    },
    {
      title: "f-strings",
      body: [
        `An f-string starts with [[f]] and puts expressions inside braces: [[f"Total: {price * 2}"]]. The expression is evaluated before the text is built.`,
        `Format specifiers follow a colon: [[{value:.2f}]] for two decimals, [[{name:>10}]] for right alignment.`,
      ],
      example: {
        code: `name = "Ada"
price = 19.5
print(f"{name}: \${price:.2f}")`,
        caption: `Expressions and formatting inside one string.`,
      },
      wrong: {
        code: `price = 19.5
print("Total: " + price)`,
        why: `You cannot add a string and a float. Use an f-string or convert with [[str(price)]].`,
      },
    },
  ],

  p2: [
    {
      title: "Assignment and dynamic types",
      body: [
        `A variable is a name bound to an object. [[=]] assigns; the type belongs to the object, not the name, so the same name can hold different types over time.`,
        `Read a name before assigning it and Python raises [[NameError]]. There is no implicit zero or empty default.`,
      ],
      example: {
        code: `count = 3
count = "three"
print(count)`,
        caption: `The name is rebound; the old integer is gone.`,
      },
      wrong: {
        code: `print(total)
total = 0`,
        why: `[[total]] is used before it is assigned, which raises NameError even though the assignment appears below.`,
      },
    },
    {
      title: "Core types and conversion",
      body: [
        `The common built-ins are [[int]], [[float]], [[str]], [[bool]], [[list]], [[tuple]], [[dict]], and [[set]]. [[type()]] tells you what you have.`,
        `Convert explicitly with [[int("5")]], [[str(5)]], or [[float("1.5")]]. Values do not convert themselves.`,
      ],
      example: {
        code: `age = int("36")
label = "Age: " + str(age)
print(label)`,
        caption: `Text to number, number back to text.`,
      },
      wrong: {
        code: `print("Age: " + 36)`,
        why: `String concatenation with an integer raises TypeError; wrap the number in [[str()]] or use an f-string.`,
      },
    },
    {
      title: "Naming and multiple assignment",
      body: [
        `Names may contain letters, digits, and underscores, but cannot start with a digit. [[snake_case]] is the convention for variables and functions.`,
        `Multiple assignment unpacks a sequence: [[x, y = 1, 2]]. Swapping is [[x, y = y, x]].`,
      ],
      example: {
        code: `x, y = 1, 2
x, y = y, x
print(x, y)`,
        caption: `A tuple on the right, two names on the left.`,
      },
      wrong: {
        code: `1st_place = "Ada"`,
        why: `A name cannot begin with a digit, so this is a syntax error. Use [[first_place]].`,
      },
    },
  ],

  p3: [
    {
      title: "if, elif, else",
      body: [
        `An [[if]] runs its block when the condition is true. [[elif]] checks another condition only if the previous ones failed, and [[else]] is the fallback.`,
        `The colon and the indented block are part of the syntax. Four spaces is the convention.`,
      ],
      example: {
        code: `score = 72

if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")`,
        caption: `Exactly one branch runs.`,
      },
      wrong: {
        code: `if score = 72:
    print("pass")`,
        why: `[[=]] assigns; comparison is [[==]]. This line is a syntax error inside a condition.`,
      },
    },
    {
      title: "Comparisons and identity",
      body: [
        `[[==]] compares values, [[is]] compares identity. Use [[is None]] for None and [[==]] for numbers, strings, and containers.`,
        `Comparisons can chain: [[0 <= score <= 100]] means both checks at once.`,
      ],
      example: {
        code: `user = None

if user is None:
    print("no user")`,
        caption: `None is a singleton; identity is the right test.`,
      },
      wrong: {
        code: `name = input("Name: ")

if name is "admin":
    print("welcome")`,
        why: `[[is]] tests identity, not text. Two equal strings can be different objects; use [[== "admin"]].`,
      },
    },
    {
      title: "Combining conditions",
      body: [
        `[[and]] requires both sides, [[or]] requires either, and [[not]] negates. Parentheses make the grouping explicit.`,
        `Check the logic with a truth table before trusting it: a condition that is always true usually has an [[or]] where it needed an [[and]].`,
      ],
      example: {
        code: `age = 20
member = True

if age >= 18 and member:
    print("access granted")`,
        caption: `Both conditions must hold.`,
      },
      wrong: {
        code: `age = 20

if age < 12 or age > 0:
    print("child")`,
        why: `Every positive age is greater than zero, so this prints for adults too. The second condition should be [[age < 18]].`,
      },
    },
  ],

  p4: [
    {
      title: "for over a sequence",
      body: [
        `[[for]] takes each item from an iterable in turn. [[range(5)]] produces 0–4; a list, string, or file works the same way.`,
        `Do not change a list while looping over it. Build a new list, or loop over a copy with [[list(items)]].`,
      ],
      example: {
        code: `for name in ["Ada", "Grace", "Linus"]:
    print(name)`,
        caption: `One iteration per item, in order.`,
      },
      wrong: {
        code: `items = [1, 2, 3, 4]

for item in items:
    if item % 2 == 0:
        items.remove(item)`,
        why: `Removing items shifts the list under the loop and skips elements. Build a new list instead.`,
      },
    },
    {
      title: "while and the loop variable",
      body: [
        `[[while]] repeats as long as its condition stays true. Something inside the body has to change that condition.`,
        `A loop that never changes its condition runs forever. [[Ctrl+C]] stops it; the fix is a real exit path.`,
      ],
      example: {
        code: `count = 3

while count > 0:
    print(count)
    count -= 1`,
        caption: `count decreases every pass, so the loop ends.`,
      },
      wrong: {
        code: `count = 3

while count > 0:
    print(count)`,
        why: `count never changes, so the condition stays true and the process hangs.`,
      },
    },
    {
      title: "break and continue",
      body: [
        `[[break]] leaves the nearest loop immediately. [[continue]] skips the rest of the current pass and moves to the next item.`,
        `Use them when a loop needs a clear stopping point or should ignore certain values. Both affect only the nearest loop when loops are nested.`,
      ],
      example: {
        code: `for score in [82, -1, 95, 100, 68]:
    if score < 0:
        continue
    if score == 100:
        break
    print(score)`,
        caption: `The negative value is skipped, and the loop stops when it reaches 100.`,
      },
      wrong: {
        code: `for score in [82, -1, 95, 100, 68]:
    if score < 0:
        break
    print(score)`,
        why: `break ends the whole loop at the first negative value, so 95 and later scores are never checked. Use [[continue]] when you only want to skip one item.`,
      },
    },
  ],

  p5: [
    {
      title: "def and return",
      body: [
        `[[def]] names a function and lists its parameters. The body is indented. [[return]] sends a value back to the caller.`,
        `A function without return gives back [[None]]. Printing inside a function is not the same as returning a value.`,
      ],
      example: {
        code: `def double(n):
    return n * 2

result = double(21)`,
        caption: `The caller receives 42.`,
      },
      wrong: {
        code: `def double(n):
    print(n * 2)

result = double(21) + 1`,
        why: `The function prints but returns None, so adding 1 raises TypeError.`,
      },
    },
    {
      title: "Parameters and defaults",
      body: [
        `Positional arguments are matched by order; keyword arguments by name. Defaults make an argument optional.`,
        `Never use a mutable default such as [[[]]] or [[{}]]. The default is created once and shared across every call.`,
      ],
      example: {
        code: `def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`,
        caption: `None as the default, a fresh list per call.`,
      },
      wrong: {
        code: `def add_item(item, items=[]):
    items.append(item)
    return items`,
        why: `The same list is reused between calls, so items accumulate across unrelated calls.`,
      },
    },
    {
      title: "Local variables and reusable results",
      body: [
        `A variable created inside a function is local to that function. It helps the function do its work, but it is not available by that name after the function finishes.`,
        `Return the value the caller needs. Keep temporary calculations inside the function so the caller only has to understand the input and the result.`,
      ],
      example: {
        code: `def make_label(name):
    greeting = "Hello"
    return f"{greeting}, {name}!"

message = make_label("Mina")
print(message)`,
        caption: `greeting is local; the returned message is available outside.`,
      },
      wrong: {
        code: `def make_label(name):
    greeting = "Hello"
    return f"{greeting}, {name}!"

message = make_label("Mina")
print(greeting)`,
        why: `[[greeting]] is local to make_label, so code outside the function cannot read it. Use the returned [[message]] instead.`,
      },
    },
  ],

  p6: [
    {
      title: "Lists: order and mutation",
      body: [
        `A list holds an ordered sequence and can change. Index from 0, use negative indexes from the end, and [[append()]] to add.`,
        `[[len()]] gives the count. Asking for an index outside the list raises [[IndexError]].`,
      ],
      example: {
        code: `items = ["a", "b"]
items.append("c")
print(items[0], items[-1])`,
        caption: `First and last items without counting.`,
      },
      wrong: {
        code: `items = ["a", "b", "c"]
print(items[3])`,
        why: `The last valid index is 2. Index 3 raises IndexError; use [[items[-1]]] for the last item.`,
      },
    },
    {
      title: "Slicing",
      body: [
        `[[items[start:stop]]] copies from start up to but not including stop. Either side can be omitted.`,
        `A step is a third value: [[items[::2]]] takes every second item, [[items[::-1]]] reverses the list.`,
      ],
      example: {
        code: `letters = ["a", "b", "c", "d"]
print(letters[1:3])
print(letters[::-1])`,
        caption: `["b", "c"] and the reversed list.`,
      },
      wrong: {
        code: `letters = ["a", "b", "c", "d"]
print(letters[1:3])

# expecting ["b", "c", "d"]`,
        why: `The stop index is exclusive. To include index 3 the slice must be [[1:4]].`,
      },
    },
    {
      title: "Aliasing and copying",
      body: [
        `Assignment does not copy a list; it binds a second name to the same object. Changes through either name are visible through both.`,
        `[[copy()]] or a full slice makes a shallow copy. Nested lists still share their inner objects.`,
      ],
      example: {
        code: `a = [1, 2]
b = a.copy()
b.append(3)
print(a, b)`,
        caption: `copy() gives b its own list.`,
      },
      wrong: {
        code: `a = [1, 2]
b = a
b.append(3)
print(a)`,
        why: `a and b are the same list, so a gains the 3 as well.`,
      },
    },
  ],

  p7: [
    {
      title: "Keys and values",
      body: [
        `A dictionary maps keys to values: [[{"name": "Ada", "age": 36}]]. Keys must be hashable — strings, numbers, tuples.`,
        `Read with [[d["name"]]]. A missing key raises KeyError; [[d.get("name")]] returns None instead.`,
      ],
      example: {
        code: `user = {"name": "Ada", "age": 36}
print(user["name"])
print(user.get("email"))`,
        caption: `Direct access, then a safe lookup.`,
      },
      wrong: {
        code: `user = {"name": "Ada"}
print(user["email"])`,
        why: `The key does not exist, so this raises KeyError. Use [[get()]] when the key is optional.`,
      },
    },
    {
      title: "Iterating a dictionary",
      body: [
        `Looping over a dictionary gives its keys. Use [[.items()]] for key-value pairs, [[.keys()]] or [[.values()]] when you need one side.`,
        `The size cannot change during iteration. Collect the changes and apply them after the loop.`,
      ],
      example: {
        code: `for key, value in user.items():
    print(key, value)`,
        caption: `items() unpacks each pair.`,
      },
      wrong: {
        code: `for key in user:
    if key.startswith("old_"):
        del user[key]`,
        why: `Deleting during iteration raises RuntimeError: dictionary changed size during iteration.`,
      },
    },
    {
      title: "Nested dictionaries",
      body: [
        `A value can itself be a dictionary. Reach in one level at a time, and check each level exists.`,
        `[[data.get("user", {}).get("email")]] returns None instead of failing halfway; a default of [[{}]] keeps the chain alive.`,
      ],
      example: {
        code: `data = {"user": {"email": "a@example.com"}}
email = data.get("user", {}).get("email")`,
        caption: `Chained lookups with an empty dict as the guard.`,
      },
      wrong: {
        code: `data = {}
email = data["user"]["email"]`,
        why: `The first missing key raises KeyError before the second lookup is even attempted.`,
      },
    },
  ],

  p8: [
    {
      title: "Immutable sequences",
      body: [
        `A tuple is an ordered, immutable sequence written with commas: [[(1, 2, 3)]]. Parentheses are optional in most places.`,
        `Tuples can be dictionary keys and set members. Changing one requires building a new tuple.`,
      ],
      example: {
        code: `point = (3, 7)
x, y = point
print(x)`,
        caption: `Indexing and unpacking work like a list.`,
      },
      wrong: {
        code: `point = (3, 7)
point[0] = 4`,
        why: `Tuples do not support item assignment, so this raises TypeError. Create a new tuple instead.`,
      },
    },
    {
      title: "Unpacking",
      body: [
        `Unpacking matches names to positions: [[a, b = 1, 2]]. The number of names and values must match unless one name uses a star.`,
        `[[first, *rest = items]] collects the remainder into a list — handy for head-and-tail logic.`,
      ],
      example: {
        code: `first, *rest = [1, 2, 3, 4]
print(first, rest)`,
        caption: `1 and [2, 3, 4].`,
      },
      wrong: {
        code: `a, b = (1, 2, 3)`,
        why: `Three values into two names raises ValueError. Add a starred name or slice the tuple.`,
      },
    },
    {
      title: "Tuple or list?",
      body: [
        `Use a tuple for a fixed record of values that belong together: a coordinate, an RGB colour, a database row. Use a list for a collection that grows and shrinks.`,
        `Tuples are hashable when their contents are, so they work as dictionary keys. Lists never do.`,
      ],
      example: {
        code: `colors = {
    (255, 0, 0): "red",
    (0, 0, 255): "blue",
}`,
        caption: `A tuple key for an exact colour.`,
      },
      wrong: {
        code: `items = (1, 2)
items.append(3)`,
        why: `Tuples have no append — they are immutable. Use a list when the collection must grow.`,
      },
    },
  ],

  p9: [
    {
      title: "Opening and reading a file",
      body: [
        `[[open(path)]] returns a file object. Read the whole file with [[read()]], or iterate line by line.`,
        `Always close the file, or use a [[with]] block so Python closes it even when an exception interrupts the read.`,
      ],
      example: {
        code: `with open("notes.txt") as file:
    for line in file:
        print(line.rstrip())`,
        caption: `with closes the file when the block ends.`,
      },
      wrong: {
        code: `file = open("notes.txt")
text = file.read()
# no close`,
        why: `The file stays open until garbage collection, and a crash in between leaks the handle. Use with.`,
      },
    },
    {
      title: "Modes and encoding",
      body: [
        `[[r]] reads, [[w]] writes and truncates, [[a]] appends, and [[x]] fails if the file exists. Add [[b]] for binary data.`,
        `Text files should name their encoding: [[encoding="utf-8"]]. Without it Python uses the platform default, which differs between systems.`,
      ],
      example: {
        code: `with open("log.txt", "a", encoding="utf-8") as file:
    file.write("started\n")`,
        caption: `Append, explicit UTF-8, and a newline you wrote yourself.`,
      },
      wrong: {
        code: `with open("config.json", "w") as file:
    data = json.load(file)`,
        why: `"w" truncates the file before the read, so the config is empty and json.load fails.`,
      },
    },
    {
      title: "Paths and structured files",
      body: [
        `[[pathlib.Path]] joins paths without string concatenation and works across operating systems. [[Path("data") / "log.txt"]] builds the path.`,
        `For CSV and JSON, use the standard modules. Splitting on commas breaks the moment a field contains a comma or a quote.`,
      ],
      example: {
        code: `import csv
from pathlib import Path

with (Path("data") / "rows.csv").open(newline="") as file:
    for row in csv.reader(file):
        print(row)`,
        caption: `pathlib for the path, csv for the parsing.`,
      },
      wrong: {
        code: `with open("rows.csv") as file:
    for line in file:
        name, age = line.split(",")`,
        why: `A quoted CSV field such as "Ada, Jr." splits into three pieces and unpacking fails. Use the csv module.`,
      },
    },
  ],

  p10: [
    {
      title: "The comprehension shape",
      body: [
        `A list comprehension builds a list in one expression: [[[value for item in items]]]. Add a condition after the loop to filter.`,
        `The result is a new list. The source is not changed.`,
      ],
      example: {
        code: `numbers = [1, 2, 3, 4]
doubled = [n * 2 for n in numbers if n % 2 == 0]`,
        caption: `Filter evens, then double them.`,
      },
      wrong: {
        code: `doubled = [n * 2 for n in numbers if n % 2 == 0 else 0]`,
        why: `A filtering [[if]] cannot be followed by [[else]]; for a conditional value the whole expression becomes [[n * 2 if n % 2 == 0 else 0]].`,
      },
    },
    {
      title: "Nested loops and their order",
      body: [
        `The loops in a comprehension are written in the same order as nested [[for]] statements: leftmost is the outer loop.`,
        `Reading a nested comprehension aloud, from the first [[for]] to the last, usually reveals the mistake.`,
      ],
      example: {
        code: `matrix = [[1, 2], [3, 4]]
flat = [value for row in matrix for value in row]`,
        caption: `Outer loop first, inner loop second.`,
      },
      wrong: {
        code: `flat = [value for value in row for row in matrix]`,
        why: `The inner loop references [[row]] before it is defined, so this raises NameError.`,
      },
    },
    {
      title: "Sets, dicts, and readability",
      body: [
        `[[{x for x in items}]] builds a set; [[{k: v for k, v in pairs}]] builds a dictionary. Both drop duplicates where the container demands it.`,
        `Comprehensions are for producing values. If the loop exists for its side effects, write a normal loop.`,
      ],
      example: {
        code: `words = ["Hi", "there", "hi"]
lengths = {w.lower(): len(w) for w in words}`,
        caption: `A dictionary keyed by the normalised word.`,
      },
      wrong: {
        code: `[print(n) for n in range(3)]`,
        why: `This allocates a list of Nones purely to call print. A plain [[for]] loop is the correct tool.`,
      },
    },
  ],

  p11: [
    {
      title: "Functions that wrap functions",
      body: [
        `A decorator is a function that takes a function and returns a replacement. [[@decorator]] above a definition applies it immediately.`,
        `The wrapper must call the original and return its result; forgetting either breaks the decorated function.`,
      ],
      example: {
        code: `def logged(fn):
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper

@logged
def add(a, b):
    return a + b`,
        caption: `The wrapper runs before the original and passes the result back.`,
      },
      wrong: {
        code: `def logged(fn):
    def wrapper(*args, **kwargs):
        print("calling")
        return fn(*args, **kwargs)

@logged
def add(a, b):
    return a + b`,
        why: `The decorator forgets to return wrapper, so [[add]] becomes None and calling it raises TypeError.`,
      },
    },
    {
      title: "Decorators with arguments",
      body: [
        `[[@repeat(3)]] needs one more layer: a factory that receives the arguments and returns the actual decorator.`,
        `Three functions deep is normal — factory, decorator, wrapper. Missing a layer produces confusing TypeError messages.`,
      ],
      example: {
        code: `def repeat(times):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = fn(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def ping():
    print("ping")`,
        caption: `Factory → decorator → wrapper.`,
      },
      wrong: {
        code: `def repeat(times):
    def wrapper(fn):
        for _ in range(times):
            fn()
    return wrapper

@repeat(3)
def ping():
    print("ping")`,
        why: `This runs ping at decoration time and replaces it with None; the calls happen once, before the program starts.`,
      },
    },
    {
      title: "functools.wraps",
      body: [
        `A wrapper replaces the original function's name, docstring, and signature. [[functools.wraps]] copies that metadata onto the wrapper.`,
        `Without it, debugging, documentation tools, and frameworks that inspect signatures see [[wrapper]] instead of the real function.`,
      ],
      example: {
        code: `from functools import wraps

def logged(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
    return wrapper`,
        caption: `One line keeps the decorated function recognisable.`,
      },
      wrong: {
        code: `def logged(fn):
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
    return wrapper

@logged
def charge(amount):
    """Charge a card."""

print(charge.__name__)`,
        why: `This prints [[wrapper]], and the docstring is gone. Add [[@wraps(fn)]].`,
      },
    },
  ],

  p12: [
    {
      title: "yield and lazy values",
      body: [
        `A function containing [[yield]] returns a generator. Each [[next()]] runs to the next yield and pauses there.`,
        `The function's state is preserved between calls, so a generator can produce values it could not hold in memory at once.`,
      ],
      example: {
        code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

for value in countdown(3):
    print(value)`,
        caption: `3, 2, 1 — one value at a time.`,
      },
      wrong: {
        code: `def countdown(n):
    values = []
    while n > 0:
        values.append(n)
        n -= 1
    return values

print(next(countdown(3)))`,
        why: `The function returns a list, not a generator, so [[next()]] raises TypeError. Iterate the list or yield instead.`,
      },
    },
    {
      title: "Lazy means one pass",
      body: [
        `Generators produce values on demand and cannot rewind. Once consumed, they are empty.`,
        `[[list(generator)]] materialises everything, which defeats the memory saving and hangs forever on an infinite source.`,
      ],
      example: {
        code: `def naturals():
    n = 0
    while True:
        yield n
        n += 1

for value in naturals():
    if value > 3:
        break`,
        caption: `Infinite in theory, bounded by the consumer.`,
      },
      wrong: {
        code: `def naturals():
    n = 0
    while True:
        yield n
        n += 1

all_numbers = list(naturals())`,
        why: `Materialising an infinite generator never finishes and exhausts memory.`,
      },
    },
    {
      title: "Generator expressions",
      body: [
        `[[(x * 2 for x in items)]] is the generator version of a list comprehension: lazy, single-use, and memory-light.`,
        `Pass it straight into [[sum()]], [[any()]], or [[max()]] without building an intermediate list.`,
      ],
      example: {
        code: `total = sum(n * n for n in range(10))`,
        caption: `No list is ever built.`,
      },
      wrong: {
        code: `squares = (n * n for n in range(3))
print(list(squares))
print(list(squares))`,
        why: `The second list is empty — the generator was already consumed by the first.`,
      },
    },
  ],

  p13: [
    {
      title: "try and except",
      body: [
        `[[try]] wraps code that may fail. [[except]] names the error it can handle. Anything not caught propagates.`,
        `Catch the narrowest exception that makes sense. A bare [[except:]] also catches KeyboardInterrupt and hides programming errors.`,
      ],
      example: {
        code: `try:
    value = int(text)
except ValueError:
    value = 0`,
        caption: `Only a bad number is handled; everything else still fails loudly.`,
      },
      wrong: {
        code: `try:
    value = int(text)
except:
    pass`,
        why: `A bare except swallows every error, including typos and Ctrl+C, and the bug disappears from the logs.`,
      },
    },
    {
      title: "else and finally",
      body: [
        `[[else]] runs when the try block raised nothing. [[finally]] runs no matter what — success, handled failure, or a new exception.`,
        `Cleanup belongs in finally, or in a with block, not in the success path only.`,
      ],
      example: {
        code: `try:
    file = open(path)
except OSError:
    print("missing")
else:
    with file:
        print(file.read())`,
        caption: `else keeps the success path out of the try block.`,
      },
      wrong: {
        code: `try:
    file = open(path)
    data = file.read()
except OSError:
    file.close()`,
        why: `If the read succeeds, the file is never closed; if a different error occurs, it is not closed either. Use finally or with.`,
      },
    },
    {
      title: "Raising and chaining",
      body: [
        `[[raise ValueError("bad input")]] stops execution and sends the error upward. Raise built-in types when they describe the problem.`,
        `When you convert one error into another, use [[raise NewError(...) from error]] so the original cause stays in the traceback.`,
      ],
      example: {
        code: `try:
    config = load(path)
except OSError as error:
    raise RuntimeError("config unreadable") from error`,
        caption: `The new message keeps the original cause attached.`,
      },
      wrong: {
        code: `try:
    config = load(path)
except Exception:
    raise RuntimeError("config unreadable")`,
        why: `Without [[from]], the original traceback is replaced and the real cause is hidden.`,
      },
    },
  ],

  p14: [
    {
      title: "lambda syntax",
      body: [
        `A lambda is an anonymous function with one expression: [[lambda x: x + 1]]. The expression's value is the return value.`,
        `Lambdas are for short callbacks passed to another function. A named [[def]] is clearer for anything longer.`,
      ],
      example: {
        code: `double = lambda n: n * 2
print(double(4))`,
        caption: `A one-expression function bound to a name.`,
      },
      wrong: {
        code: `double = lambda n: return n * 2`,
        why: `A lambda body is an expression; [[return]] is a statement and is a syntax error there.`,
      },
    },
    {
      title: "key functions",
      body: [
        `[[sorted(items, key=...)]] expects a function, not a value. Pass [[len]] itself — not [[len()]] — and Python calls it once per item.`,
        `Use a lambda when the key is a property: [[key=lambda item: item["age"]]].`,
      ],
      example: {
        code: `words = ["bbb", "a", "cc"]
print(sorted(words, key=len))`,
        caption: `The function object is the key.`,
      },
      wrong: {
        code: `words = ["bbb", "a", "cc"]
print(sorted(words, key=len()))`,
        why: `[[len()]] is called immediately with no argument and raises TypeError. Pass [[len]] without parentheses.`,
      },
    },
    {
      title: "The late-binding trap",
      body: [
        `A lambda closes over names, not values. Lambdas created in a loop all read the final value of the loop variable.`,
        `Bind the current value with a default argument: [[lambda x, i=i: x + i]].`,
      ],
      example: {
        code: `adders = [lambda x, i=i: x + i for i in range(3)]
print([add(10) for add in adders])`,
        caption: `Each lambda captured its own i.`,
      },
      wrong: {
        code: `adders = [lambda x: x + i for i in range(3)]
print([add(10) for add in adders])`,
        why: `All three lambdas read the final i, so the result is three 12s instead of 10, 11, 12.`,
      },
    },
  ],

  p15: [
    {
      title: "with and automatic cleanup",
      body: [
        `A [[with]] block calls setup on entry and cleanup on exit, even when an exception interrupts the block.`,
        `Files, locks, database connections, and temporary directories all behave this way. It replaces try/finally boilerplate.`,
      ],
      example: {
        code: `with open("notes.txt", encoding="utf-8") as file:
    text = file.read()`,
        caption: `The file closes when the block ends.`,
      },
      wrong: {
        code: `file = open("notes.txt")
text = file.read()
raise RuntimeError("stop")`,
        why: `The exception skips any manual close written after the read, leaving the handle open. A with block would still close it.`,
      },
    },
    {
      title: "Writing a context manager",
      body: [
        `A class with [[__enter__]] and [[__exit__]] is a context manager. [[__exit__]] receives the exception type, value, and traceback.`,
        `Returning True from __exit__ suppresses the exception. Return None or False to let it propagate, which is almost always correct.`,
      ],
      example: {
        code: `class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, *exc):
        self.elapsed = time.perf_counter() - self.start`,
        caption: `Setup on enter, measurement on exit, exception untouched.`,
      },
      wrong: {
        code: `class Quiet:
    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return True`,
        why: `Returning True hides every exception raised inside the block, so real failures vanish silently.`,
      },
    },
    {
      title: "contextlib helpers",
      body: [
        `[[@contextmanager]] turns a generator into a context manager: everything before [[yield]] is setup, everything after is cleanup.`,
        `[[contextlib.suppress(FileNotFoundError)]] ignores one specific error. Use it narrowly, around one operation.`,
      ],
      example: {
        code: `from contextlib import contextmanager

@contextmanager
def opened(path):
    file = open(path)
    try:
        yield file
    finally:
        file.close()`,
        caption: `try/finally around the yield guarantees cleanup.`,
      },
      wrong: {
        code: `@contextmanager
def opened(path):
    file = open(path)
    yield file
    file.close()`,
        why: `If the block raises, the close line never runs and the file leaks. Wrap the yield in try/finally.`,
      },
    },
  ],

  "p16": [
  {
    "title": "Calculate with arithmetic operators",
    "body": [
      "Python supports +, -, *, /, //, %, and **. Division with / produces a float, while // performs floor division and % returns the remainder.",
      "Choose the operation that matches the problem. Floor division rounds down, which matters when values can be negative."
    ],
    "example": {
      "code": "price = 17\npeople = 5\nprint(price / people)\nprint(price // people)\nprint(price % people)",
      "caption": "The three operations produce different results."
    },
    "wrong": {
      "code": "price = 17\npeople = 5\nprint(price // people == 3.4)",
      "why": "Floor division returns a floor result, not the exact decimal quotient. Use / for ordinary division."
    }
  },
  {
    "title": "Compare and combine conditions",
    "body": [
      "Comparison operators return Boolean values. and requires both sides to be true, or accepts either side, and not reverses a truth value.",
      "Use parentheses when a condition combines several operators. Python also supports chained comparisons such as 0 <= score <= 100."
    ],
    "example": {
      "code": "if 18 <= age <= 60 and member:\n    print(\"Eligible\")",
      "caption": "The chained comparison checks both bounds."
    },
    "wrong": {
      "code": "if age = 18:\n    print(\"Eligible\")",
      "why": "A single equals sign assigns a value. Use == when comparing values."
    }
  },
  {
    "title": "Test membership and identity",
    "body": [
      "in checks whether a value belongs to a sequence or container. is checks whether two references point to the same object, and is commonly used for None.",
      "Do not use is to compare ordinary numbers or strings. Equal values can be stored in different objects, so use == for value equality."
    ],
    "example": {
      "code": "if \"py\" in \"python\":\n    print(\"Found\")\n\nif user is None:\n    print(\"No user\")",
      "caption": "Membership and identity answer different questions."
    },
    "wrong": {
      "code": "if name is \"Ada\":\n    print(\"Hello\")",
      "why": "is compares object identity, not text equality. Use == when comparing strings."
    }
  }
],
  "p17": [
  {
    "title": "Read input from the console",
    "body": [
      "input() displays an optional prompt and waits for a line of text. The returned value is always a string, so even digits arrive as text.",
      "Store the result in a clearly named variable. Do not assume the user entered a value that matches the type your calculation needs."
    ],
    "example": {
      "code": "name = input(\"Name: \")\nprint(\"Hello,\", name)",
      "caption": "The prompt guides the user before input is read."
    },
    "wrong": {
      "code": "age = input(\"Age: \")\nprint(age + 1)",
      "why": "age is text, so adding an integer raises TypeError. Convert it before arithmetic."
    }
  },
  {
    "title": "Convert and validate values",
    "body": [
      "Use int(), float(), and other conversion functions to turn text into the required type. A conversion can fail with ValueError when input does not match the expected format.",
      "Handle invalid input with a loop or exception handler. Give users a clear retry message instead of allowing an unexpected value to stop the program."
    ],
    "example": {
      "code": "try:\n    age = int(input(\"Age: \"))\nexcept ValueError:\n    print(\"Enter a whole number.\")",
      "caption": "The conversion is guarded against invalid text."
    },
    "wrong": {
      "code": "age = int(input(\"Age: \"))\nprint(age)",
      "why": "A non-numeric response raises ValueError. Validate or handle the conversion."
    }
  },
  {
    "title": "Format and display output",
    "body": [
      "print() can display several values, separate them with sep, and choose an ending with end. f-strings provide readable formatting for values inside text.",
      "For reports, use formatting specifiers to control decimal places or alignment. Keep raw values separate from their display representation when later calculations are needed."
    ],
    "example": {
      "code": "price = 19.5\nprint(f\"Total: ${price:.2f}\")",
      "caption": "The format specifier shows two decimal places."
    },
    "wrong": {
      "code": "price = 19.5\nprint(\"Total: $\" + price)",
      "why": "A string cannot be concatenated directly with a float. Use an f-string or convert the value."
    }
  }
],
  "p18": [
  {
    "title": "Normalize text",
    "body": [
      "Strings are immutable, so lower(), upper(), strip(), and title() return new strings rather than changing the original object.",
      "Normalize input when case or extra spaces should not affect matching. Keep the original value when exact capitalization or whitespace matters."
    ],
    "example": {
      "code": "raw = \"  ZEDX  \"\nclean = raw.strip().lower()\nprint(clean)",
      "caption": "strip removes outside spaces before lowercasing."
    },
    "wrong": {
      "code": "raw = \"  ZEDX  \"\nraw.strip()\nprint(raw)",
      "why": "strip() returns a new string. Assign the result if the cleaned value is needed."
    }
  },
  {
    "title": "Search and replace text",
    "body": [
      "find() returns the first position of a substring or -1 when it is absent. replace() creates a new string with matching text changed.",
      "Use in when you only need to check whether a substring exists. Use startswith() or endswith() for prefix and suffix checks."
    ],
    "example": {
      "code": "filename = \"report-final.txt\"\nif filename.endswith(\".txt\"):\n    print(filename.replace(\"final\", \"draft\"))",
      "caption": "The suffix is checked before replacing a word."
    },
    "wrong": {
      "code": "filename = \".txt-backup\"\nif filename.find(\".txt\"):\n    print(\"Text file\")",
      "why": "find() returns 0 when a match begins at the start, and zero is false. Use endswith() or compare find() with -1."
    }
  },
  {
    "title": "Split and join structured text",
    "body": [
      "split() breaks a string into a list using a separator. join() combines an iterable of strings with the chosen separator between each item.",
      "Use join() instead of repeatedly concatenating many strings in a loop. Convert values to strings before joining them."
    ],
    "example": {
      "code": "names = [\"Ada\", \"Grace\", \"Linus\"]\nline = \", \".join(names)\nprint(line)",
      "caption": "join inserts a comma and space between names."
    },
    "wrong": {
      "code": "names = [\"Ada\", \"Grace\"]\nline = names.join(\", \")",
      "why": "join is called on the separator string, with the iterable as its argument."
    }
  }
],
  "p19": [
  {
    "title": "Define a class and create an instance",
    "body": [
      "A class is a blueprint for objects. Define it with class, then create an instance by calling the class name as though it were a function.",
      "An instance can hold attributes and call methods defined by its class. Each instance has its own state unless an attribute is deliberately shared at class level."
    ],
    "example": {
      "code": "class Student:\n    pass\n\nfirst = Student()\nsecond = Student()",
      "caption": "Two independent instances are created."
    },
    "wrong": {
      "code": "class Student:\n    pass\n\nfirst = Student",
      "why": "This stores the class itself, not an instance. Call Student() to create an object."
    }
  },
  {
    "title": "Initialize instance state",
    "body": [
      "__init__() runs after a new instance is created and is commonly used to set its initial attributes. self refers to the current instance.",
      "Write self.attribute when the value belongs to each object. Validate constructor inputs when invalid state would make later methods unreliable."
    ],
    "example": {
      "code": "class Student:\n    def __init__(self, name):\n        self.name = name\n\nfirst = Student(\"Ada\")",
      "caption": "The constructor stores a name on the instance."
    },
    "wrong": {
      "code": "class Student:\n    def __init__(name):\n        self.name = name",
      "why": "Instance methods receive the instance as their first argument. Include self in the parameter list."
    }
  },
  {
    "title": "Add methods and understand class state",
    "body": [
      "Instance methods receive self and can read or change that object's attributes. Class attributes belong to the class and can be shared by instances.",
      "Avoid mutable class attributes for data that should be unique per object. Put per-instance lists and dictionaries inside __init__."
    ],
    "example": {
      "code": "class Counter:\n    def __init__(self):\n        self.value = 0\n\n    def increment(self):\n        self.value += 1",
      "caption": "Each Counter instance has its own value."
    },
    "wrong": {
      "code": "class Counter:\n    values = []\n    def add(self, item):\n        self.values.append(item)",
      "why": "The list is shared by every instance. Create self.values inside __init__ when each object needs its own list."
    }
  }
],
  "p20": [
  {
    "title": "Import a module",
    "body": [
      "A Python module is commonly a .py file. import makes its names available through the module namespace, while from ... import selects particular names.",
      "Prefer explicit imports that show where a function comes from. Avoid import * in application code because it obscures where names are defined."
    ],
    "example": {
      "code": "import math\nprint(math.sqrt(25))",
      "caption": "The function is accessed through the math namespace."
    },
    "wrong": {
      "code": "import math\nprint(sqrt(25))",
      "why": "Importing math does not place sqrt directly in the current namespace. Use math.sqrt() or import sqrt explicitly."
    }
  },
  {
    "title": "Organize a package",
    "body": [
      "A package groups related modules in a directory. An __init__.py file can mark a regular package and define its public interface.",
      "Use clear folder names and avoid circular imports, where two modules depend on each other during initialization."
    ],
    "example": {
      "code": "project/\n  app.py\n  tools/\n    __init__.py\n    formatters.py\n    validators.py",
      "caption": "The tools package groups related modules."
    },
    "wrong": {
      "code": "from tools import formatters\nfrom tools import app",
      "why": "Importing an application entry point back into utility modules can create circular dependencies. Keep dependencies flowing in a clear direction."
    }
  },
  {
    "title": "Choose readable imports",
    "body": [
      "Absolute imports start from the package root, while relative imports refer to nearby modules within a package. Both are useful when the package structure is clear.",
      "Run packages using their intended entry point so Python resolves names consistently. Avoid naming files after standard-library modules such as json.py or random.py."
    ],
    "example": {
      "code": "from tools.formatters import title_case\nfrom tools.validators import is_valid",
      "caption": "Explicit imports identify where functions belong."
    },
    "wrong": {
      "code": "import json\njson = \"not the module\"",
      "why": "Reassigning a name shadows the imported module. Use a distinct variable name for data."
    }
  }
],
  "p21": [
  {
    "title": "Create an isolated environment",
    "body": [
      "python -m venv creates an isolated environment with its own Python interpreter context and package installation area. This keeps one project's dependencies separate from another's.",
      "Create the environment in the project directory and exclude generated environment files from version control. Teammates can recreate it from dependency declarations."
    ],
    "example": {
      "code": "python -m venv .venv",
      "caption": "The .venv folder holds the environment."
    },
    "wrong": {
      "code": "python -m venv requirements.txt",
      "why": "The command creates an environment directory, not a requirements file. Use a folder name such as .venv."
    }
  },
  {
    "title": "Install and inspect packages",
    "body": [
      "pip installs packages into the active environment. Use python -m pip so the installer is associated with the Python interpreter you intend to use.",
      "Check that the correct environment is active before installation. Installing into the wrong interpreter is a common reason a package appears missing."
    ],
    "example": {
      "code": "python -m pip install requests\npython -m pip show requests",
      "caption": "The installer is tied to the chosen Python."
    },
    "wrong": {
      "code": "pip install requests\npython -m pip show requests",
      "why": "The two pip commands may refer to different Python installations. Prefer python -m pip consistently."
    }
  },
  {
    "title": "Record reproducible dependencies",
    "body": [
      "A requirements file lists packages needed by a project. pip freeze can record the installed environment, and pip install -r can install those requirements in a recreated environment.",
      "For larger applications, distinguish direct dependencies from transitive packages. Review versions before committing dependency files."
    ],
    "example": {
      "code": "python -m pip freeze > requirements.txt\npython -m pip install -r requirements.txt",
      "caption": "One command records packages and the other installs them."
    },
    "wrong": {
      "code": "python -m pip install requirements.txt",
      "why": "pip treats that as a package name. Use -r to install from a requirements file."
    }
  }
],
  "p22": [
  {
    "title": "Annotate variables and functions",
    "body": [
      "A variable annotation documents the expected type. A function parameter annotation describes what callers should provide, and a return annotation describes the expected result.",
      "Annotations help editors and static checkers detect mistakes. They do not replace runtime validation for user input, network data, or file contents."
    ],
    "example": {
      "code": "age: int = 19\n\ndef greet(name: str) -> str:\n    return \"Hello, \" + name",
      "caption": "The annotations document the function contract."
    },
    "wrong": {
      "code": "age: int = \"nineteen\"",
      "why": "A type hint does not stop a string from being assigned at runtime. A checker can report the mismatch."
    }
  },
  {
    "title": "Annotate collections and optional values",
    "body": [
      "Modern Python supports parameterized built-in collections such as list[str] and dict[str, int]. Union types can describe values that accept more than one type.",
      "Use None explicitly when a value may be absent. Handle the None case before using an attribute or method that exists only on the other type."
    ],
    "example": {
      "code": "def find_name(user_id: int) -> str | None:\n    if user_id == 1:\n        return \"Ada\"\n    return None",
      "caption": "The return type documents that a result may be absent."
    },
    "wrong": {
      "code": "def find_name(user_id: int) -> str:\n    return None",
      "why": "The function promises str but returns None. Annotate the optional result or return a valid string."
    }
  },
  {
    "title": "Use a static checker",
    "body": [
      "A type checker reads annotations and reports likely mismatches without running every code path. Tools such as mypy and Pyright can check a project in development.",
      "Treat checker output as feedback, not proof. Dynamic Python features and external data still require careful runtime handling."
    ],
    "example": {
      "code": "def double(value: int) -> int:\n    return value * 2\n\nresult: int = double(4)",
      "caption": "The parameter and result agree with the annotation."
    },
    "wrong": {
      "code": "result: int = double(\"4\")",
      "why": "The call passes a string where an integer is expected. A type checker can flag the mismatch."
    }
  }
],
  "p23": [
  {
    "title": "Write a simple assertion",
    "body": [
      "An assertion checks that a condition is true. It is useful for quick development checks and for expressing assumptions that should hold in a small example.",
      "Do not use assert for validating untrusted user input or enforcing application security, because Python can disable assertions when optimization is enabled."
    ],
    "example": {
      "code": "def add(a, b):\n    return a + b\n\nassert add(2, 3) == 5",
      "caption": "The assertion checks a known expected result."
    },
    "wrong": {
      "code": "assert input(\"Age: \") != \"\"",
      "why": "An assertion is not a user-input validation strategy. Handle empty or invalid input directly."
    }
  },
  {
    "title": "Organize repeatable tests",
    "body": [
      "A unit test checks one small behavior with known inputs and expected outputs. The unittest module provides test cases and assertions in the standard library.",
      "Keep tests independent and name them after the behavior they check. Include normal values, boundary values, and invalid inputs where relevant."
    ],
    "example": {
      "code": "import unittest\n\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)",
      "caption": "The test runner can discover the named test method."
    },
    "wrong": {
      "code": "class TestMath:\n    def add(self):\n        assert add(2, 3) == 5",
      "why": "This is a plain method, not a unittest test case. Inherit from unittest.TestCase and use a test_ method."
    }
  },
  {
    "title": "Debug one step at a time",
    "body": [
      "A debugger can pause execution at a breakpoint, inspect variables, and step through statements. This helps locate the first point where actual behavior differs from expected behavior.",
      "Reproduce the issue with the smallest useful input. Check assumptions at function boundaries and read tracebacks from the final exception back to the line that caused it."
    ],
    "example": {
      "code": "def average(values):\n    if not values:\n        raise ValueError(\"values cannot be empty\")\n    return sum(values) / len(values)",
      "caption": "The function checks the boundary case before division."
    },
    "wrong": {
      "code": "def average(values):\n    return sum(values) / len(values)",
      "why": "An empty list causes division by zero. Define and handle the empty-input behavior."
    }
  }
],
};
