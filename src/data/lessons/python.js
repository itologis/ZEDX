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
      title: "break, continue, and loop else",
      body: [
        `[[break]] leaves the nearest loop; [[continue]] skips to the next iteration. [[break]] only exits one level, even inside nested loops.`,
        `A loop's [[else]] runs when the loop finishes without break — useful for search loops, easy to misread.`,
      ],
      example: {
        code: `for n in numbers:
    if n < 0:
        break
else:
    print("all positive")`,
        caption: `else runs only when no break happened.`,
      },
      wrong: {
        code: `for row in rows:
    for cell in row:
        if cell is None:
            break
    print("row done")`,
        why: `break stops the inner loop only; the outer loop continues and prints regardless. Use a flag or return from a function.`,
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
      title: "*args and **kwargs",
      body: [
        `[[*args]] collects extra positional arguments into a tuple. [[**kwargs]] collects extra keyword arguments into a dictionary.`,
        `At the call site the same stars unpack: [[f(*items)]] spreads a list, [[f(**config)]] spreads a dictionary.`,
      ],
      example: {
        code: `def total(*numbers):
    return sum(numbers)

print(total(1, 2, 3))
print(total(*[4, 5]))`,
        caption: `Pack in the definition, unpack at the call.`,
      },
      wrong: {
        code: `def total(*numbers):
    return sum(numbers)

values = [1, 2, 3]
print(total(values))`,
        why: `Without the star the whole list is one argument, so sum receives a list of one list and fails.`,
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
};
