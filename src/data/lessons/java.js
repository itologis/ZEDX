// Lessons for the Java track. Same shape as the HTML, CSS, and Python tracks.

export default {
  j1: [
    {
      title: "The main method",
      body: [
        `A Java program starts at [[public static void main(String[] args)]]. The JVM looks for that exact signature; a close miss is not called.`,
        `[[static]] means it belongs to the class, not an object. The JVM can run it before anything has been constructed.`,
      ],
      example: {
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world");
    }
}`,
        caption: `One public class, one entry point.`,
      },
      wrong: {
        code: `public class Main {
    public void main(String[] args) {
        System.out.println("Hello");
    }
}`,
        why: `Without [[static]] the method needs an object, and the JVM finds no entry point: it reports "main method not found".`,
      },
    },
    {
      title: "Files, classes, and compilation",
      body: [
        `[[javac Main.java]] compiles to [[Main.class]]; [[java Main]] runs it. A public class must live in a file with exactly the same name.`,
        `Java is compiled ahead of time. A syntax error stops compilation, so the class file never appears.`,
      ],
      example: {
        code: `// Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("compiled");
    }
}`,
        caption: `File name and public class name must match.`,
      },
      wrong: {
        code: `// main.java
public class App {
    public static void main(String[] args) { }
}`,
        why: `A public class must match its file name; [[App]] inside main.java fails to compile.`,
      },
    },
    {
      title: "Printing and concatenation",
      body: [
        `[[System.out.println]] adds a newline; [[print]] does not. A [[+]] with a string on either side joins text.`,
        `Evaluation is left to right. Put arithmetic in parentheses before the first string if you want the sum.`,
      ],
      example: {
        code: `int a = 5, b = 3;
System.out.println("Total: " + (a + b));`,
        caption: `Parentheses force the addition before concatenation.`,
      },
      wrong: {
        code: `int a = 5, b = 3;
System.out.println("Total: " + a + b);`,
        why: `Once the string is on the left, everything after it is concatenated, so this prints "Total: 53".`,
      },
    },
  ],

  j2: [
    {
      title: "Primitive types",
      body: [
        `Java has eight primitives. The common ones are [[int]], [[long]], [[double]], [[boolean]], and [[char]].`,
        `Every variable has a declared type and must be assigned before it is read. Local variables have no default value.`,
      ],
      example: {
        code: `int count = 3;
double price = 19.5;
boolean active = true;`,
        caption: `Explicit types, explicit values.`,
      },
      wrong: {
        code: `public static void main(String[] args) {
    int count;
    System.out.println(count);
}`,
        why: `A local variable is not initialised automatically; reading it is a compile-time error.`,
      },
    },
    {
      title: "Conversion and casting",
      body: [
        `A widening conversion is automatic: int to long to double. A narrowing conversion needs a cast and can lose information.`,
        `[[(int) 3.9]] truncates toward zero and gives 3, not 4. Use [[Math.round]] when you want the nearest whole number.`,
      ],
      example: {
        code: `double price = 19.99;
int dollars = (int) price;`,
        caption: `The decimal part is discarded.`,
      },
      wrong: {
        code: `int dollars = 19.99;`,
        why: `A double does not fit an int without a cast, so this is a compile-time error: possible lossy conversion.`,
      },
    },
    {
      title: "final and constants",
      body: [
        `[[final]] prevents reassignment. A final local must be assigned exactly once, either at declaration or in the constructor.`,
        `Constants use [[static final]] and SHOUTING_SNAKE_CASE. The convention marks values that are the same for every instance.`,
      ],
      example: {
        code: `static final int MAX_ITEMS = 100;`,
        caption: `One value, shared, never reassigned.`,
      },
      wrong: {
        code: `final int limit = 10;
limit = 20;`,
        why: `A final variable cannot be reassigned; the compiler rejects the second assignment.`,
      },
    },
  ],

  j3: [
    {
      title: "Declaring and calling",
      body: [
        `A method has a return type, a name, a parameter list, and a body. [[void]] means it returns nothing.`,
        `Every non-void path must return a value. The compiler checks all branches, including inside if statements.`,
      ],
      example: {
        code: `static int doubleIt(int value) {
    return value * 2;
}`,
        caption: `Input, output, one expression.`,
      },
      wrong: {
        code: `static int doubleIt(int value) {
    System.out.println(value * 2);
}`,
        why: `The method promises an int but never returns one, so it does not compile.`,
      },
    },
    {
      title: "Overloading",
      body: [
        `Two methods can share a name if their parameter lists differ. The compiler picks the most specific match at the call site.`,
        `Return type alone does not distinguish overloads. Changing only the return type is a duplicate-method error.`,
      ],
      example: {
        code: `static int area(int side) {
    return side * side;
}

static int area(int width, int height) {
    return width * height;
}`,
        caption: `Same name, different parameter lists.`,
      },
      wrong: {
        code: `static int value(int n) { return n; }
static double value(int n) { return n; }`,
        why: `The parameter lists are identical, so this is a duplicate method regardless of the different return types.`,
      },
    },
    {
      title: "Local variables inside a method",
      body: [
        `A variable declared inside a method is local to that method. It can help break a calculation into readable steps, but code outside the method cannot use that local name.`,
        `Return the result that the caller needs. The caller does not need to know every temporary variable used to calculate it.`,
      ],
      example: {
        code: `static int totalWithTax(int price) {
    int tax = price / 10;
    int total = price + tax;
    return total;
}

int bill = totalWithTax(100);
System.out.println(bill);`,
        caption: `tax and total are local. The caller receives the returned value 110.`,
      },
      wrong: {
        code: `static int totalWithTax(int price) {
    int tax = price / 10;
    return price + tax;
}

int bill = totalWithTax(100);
System.out.println(tax);`,
        why: `The local variable [[tax]] exists only inside the method. Return a value for the caller to use, or calculate it in the caller's scope.`,
      },
    },
  ],

  j4: [
    {
      title: "if and else",
      body: [
        `An [[if]] runs a block when its condition is true. [[else if]] adds more cases, and [[else]] catches everything left.`,
        `The condition must be a boolean. Java does not treat numbers or objects as truthy.`,
      ],
      example: {
        code: `int score = 72;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 70) {
    System.out.println("B");
} else {
    System.out.println("C");
}`,
        caption: `Exactly one branch runs.`,
      },
      wrong: {
        code: `int score = 72;
if (score = 72) {
    System.out.println("pass");
}`,
        why: `[[=]] assigns, and the result is an int, not a boolean. The compiler rejects this. Use [[==]].`,
      },
    },
    {
      title: "Comparing objects",
      body: [
        `[[==]] compares primitives by value and object references by identity. Two equal strings can still be different objects.`,
        `Use [[equals()]] for content. For null-safe comparison put the literal first: [["Ada".equals(name)]].`,
      ],
      example: {
        code: `String name = "Ada";

if ("Ada".equals(name)) {
    System.out.println("match");
}`,
        caption: `Content comparison, safe when name is null.`,
      },
      wrong: {
        code: `String name = new String("Ada");
if (name == "Ada") {
    System.out.println("match");
}`,
        why: `[[==]] compares references, and these are two different String objects, so the branch is skipped.`,
      },
    },
    {
      title: "Combining conditions",
      body: [
        `[[&&]] is short-circuit and, [[||]] short-circuit or, [[!]] negates. Short-circuiting means the second side may never run.`,
        `Use [[&&]] for guards: [[if (user != null && user.isActive())]] is safe because the second check only runs when the first passed.`,
      ],
      example: {
        code: `int age = 20;

if (age >= 18 && age < 65) {
    System.out.println("working age");
}`,
        caption: `Both bounds checked.`,
      },
      wrong: {
        code: `int age = 20;

if (age < 12 || age > 0) {
    System.out.println("child");
}`,
        why: `Every positive age is greater than zero, so the condition is true for adults too. Use [[age < 12]].`,
      },
    },
  ],

  j5: [
    {
      title: "for loops",
      body: [
        `A classic [[for]] has initialisation, condition, and update. The condition is checked before each pass.`,
        `Arrays are zero-indexed and [[length]] is the count, so the last valid index is [[length - 1]].`,
      ],
      example: {
        code: `for (int i = 0; i < items.length; i++) {
    System.out.println(items[i]);
}`,
        caption: `Start at 0, stop before length.`,
      },
      wrong: {
        code: `for (int i = 0; i <= items.length; i++) {
    System.out.println(items[i]);
}`,
        why: `At i == length the index is past the end, so the loop throws ArrayIndexOutOfBoundsException.`,
      },
    },
    {
      title: "while and do-while",
      body: [
        `[[while]] checks before each pass. [[do-while]] runs the body once, then checks, which suits input that must be read at least once.`,
        `Every while loop needs something inside that can make its condition false.`,
      ],
      example: {
        code: `int count = 3;

while (count > 0) {
    System.out.println(count);
    count--;
}`,
        caption: `The update is part of the loop body.`,
      },
      wrong: {
        code: `int count = 3;

while (count > 0) {
    System.out.println(count);
}`,
        why: `count never changes, so the condition stays true and the program never terminates.`,
      },
    },
    {
      title: "Enhanced for and loop control",
      body: [
        `[[for (Type item : collection)]] visits each element without an index. It is the default choice when you do not need the position.`,
        `Do not add or remove elements of a collection while an enhanced for is iterating it — use an [[Iterator]] or collect the changes.`,
      ],
      example: {
        code: `for (String name : names) {
    if (name.isBlank()) continue;
    System.out.println(name);
}`,
        caption: `continue skips one item; break would stop the loop.`,
      },
      wrong: {
        code: `for (String name : names) {
    if (name.isBlank()) {
        names.remove(name);
    }
}`,
        why: `Changing the list during iteration throws ConcurrentModificationException. Use an Iterator with remove().`,
      },
    },
  ],

  j6: [
    {
      title: "Classes and objects",
      body: [
        `A class is a blueprint: fields hold state, methods define behaviour. An object is created with [[new]].`,
        `Instance members belong to an object; static members belong to the class. A static method cannot read an instance field directly.`,
      ],
      example: {
        code: `class User {
    String name;
}

User user = new User();
user.name = "Ada";`,
        caption: `Create the object, then set its field.`,
      },
      wrong: {
        code: `class User {
    String name;
}

public static void main(String[] args) {
    name = "Ada";
}`,
        why: `name is an instance field, so it needs an object. In a static method the compiler cannot resolve it.`,
      },
    },
    {
      title: "Constructors and this",
      body: [
        `A constructor has the class name and no return type. It runs when [[new]] creates the object.`,
        `[[this]] refers to the current object. [[this(...)]] calls another constructor in the same class and must be the first statement.`,
      ],
      example: {
        code: `class User {
    private final String name;

    User(String name) {
        this.name = name;
    }
}`,
        caption: `this.name is the field; name is the parameter.`,
      },
      wrong: {
        code: `class User {
    User(String name) {
        return;
    }
}`,
        why: `A constructor cannot declare a return type — [[return;]] with a type turns it into a method and leaves the class without a constructor.`,
      },
    },
    {
      title: "Encapsulation",
      body: [
        `Private fields plus public methods keep invariants in one place. A setter can validate before it assigns.`,
        `Expose behaviour, not raw state: [[account.deposit(50)]] can refuse a negative amount; [[account.balance = -50]] cannot.`,
      ],
      example: {
        code: `class Account {
    private int balance;

    void deposit(int amount) {
        if (amount <= 0) throw new IllegalArgumentException();
        balance += amount;
    }
}`,
        caption: `The field is private; the method enforces the rule.`,
      },
      wrong: {
        code: `class Account {
    private int balance;
}

Account account = new Account();
account.balance = -50;`,
        why: `balance is private, so the assignment does not compile — which is the point. Add a deposit method.`,
      },
    },
  ],

  j7: [
    {
      title: "extends and super",
      body: [
        `[[extends]] inherits fields and methods. The child constructor must call a parent constructor, explicitly with [[super(...)]] or implicitly with no arguments.`,
        `If the parent has no no-argument constructor, the child must call one explicitly or it will not compile.`,
      ],
      example: {
        code: `class Animal {
    Animal(String name) { }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
}`,
        caption: `The child passes the name up.`,
      },
      wrong: {
        code: `class Animal {
    Animal(String name) { }
}

class Dog extends Animal {
    Dog(String name) { }
}`,
        why: `The implicit [[super()]] has no matching constructor, so Dog does not compile.`,
      },
    },
    {
      title: "Overriding",
      body: [
        `A subclass method with the same signature replaces the parent's. [[@Override]] makes the compiler verify that it really overrides something.`,
        `Different parameter types are an overload, not an override. Without @Override the mistake is silent.`,
      ],
      example: {
        code: `class Shape {
    double area() { return 0; }
}

class Square extends Shape {
    @Override
    double area() { return 4 * 4; }
}`,
        caption: `Same signature, verified by the compiler.`,
      },
      wrong: {
        code: `class Square extends Shape {
    @Override
    double area(int side) { return side * side; }
}`,
        why: `The parameter list differs, so this is an overload. @Override catches it: the method overrides nothing.`,
      },
    },
    {
      title: "Polymorphism",
      body: [
        `A parent reference can hold a child object. Calling an overridden method runs the child's version at runtime.`,
        `The reference type limits what you can call: only members declared on the parent are visible without a cast.`,
      ],
      example: {
        code: `Animal animal = new Dog("Rex");
animal.speak();`,
        caption: `The runtime type decides which speak() runs.`,
      },
      wrong: {
        code: `Animal animal = new Dog("Rex");
animal.fetch();`,
        why: `fetch() exists only on Dog. The compiler checks the reference type, so this does not compile without a cast.`,
      },
    },
  ],

  j8: [
    {
      title: "Interfaces and implements",
      body: [
        `An interface declares method signatures without bodies. A class that [[implements]] it must provide every method, or be declared abstract.`,
        `A class can implement several interfaces. That is how Java gets multiple inheritance of type.`,
      ],
      example: {
        code: `interface Shape {
    double area();
}

class Circle implements Shape {
    public double area() { return 3.14 * 2 * 2; }
}`,
        caption: `The interface promises; the class delivers.`,
      },
      wrong: {
        code: `interface Shape {
    double area();
}

class Circle implements Shape {
}`,
        why: `Circle does not implement area(), so the compiler rejects it as an abstract method in a non-abstract class.`,
      },
    },
    {
      title: "Default methods",
      body: [
        `A [[default]] method in an interface provides a body. Implementing classes inherit it unless they override it.`,
        `If two interfaces provide the same default method, the class must override it and say which one wins with [[Interface.super.method()]].`,
      ],
      example: {
        code: `interface Named {
    String name();

    default String greeting() {
        return "Hi, " + name();
    }
}`,
        caption: `One default, built on the abstract method.`,
      },
      wrong: {
        code: `interface A { default String label() { return "A"; } }
interface B { default String label() { return "B"; } }

class C implements A, B { }`,
        why: `The two defaults conflict, so C does not compile until it overrides label().`,
      },
    },
    {
      title: "Interface or abstract class",
      body: [
        `An interface describes what a type can do and supports multiple implementation. An abstract class can hold state and constructors but only one parent.`,
        `Neither can be instantiated. [[new Shape()]] is invalid for both.`,
      ],
      example: {
        code: `abstract class Base {
    abstract void run();
}

class Job extends Base {
    void run() { }
}`,
        caption: `Abstract class with one abstract method.`,
      },
      wrong: {
        code: `interface Shape { double area(); }
Shape shape = new Shape();`,
        why: `An interface has no constructor and no implementation; it cannot be instantiated. Create a implementing class.`,
      },
    },
  ],

  j9: [
    {
      title: "try and catch",
      body: [
        `[[try]] wraps code that can throw. [[catch]] handles a specific exception type; the first matching catch wins.`,
        `Order catches from specific to general. A broad catch above a narrow one makes the narrow block unreachable.`,
      ],
      example: {
        code: `try {
    int value = Integer.parseInt(text);
} catch (NumberFormatException e) {
    value = 0;
}`,
        caption: `Only a bad number is handled.`,
      },
      wrong: {
        code: `try {
    parse(text);
} catch (Exception e) {
    log(e);
} catch (NumberFormatException e) {
    value = 0;
}`,
        why: `Exception already catches everything, so the second block is unreachable and the code does not compile.`,
      },
    },
    {
      title: "finally and try-with-resources",
      body: [
        `[[finally]] runs whether the try succeeded, failed, or returned. It is for cleanup, not for business logic.`,
        `For anything [[AutoCloseable]], try-with-resources closes it automatically and keeps the original exception if close also fails.`,
      ],
      example: {
        code: `try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}`,
        caption: `The reader closes before the method returns.`,
      },
      wrong: {
        code: `BufferedReader reader = Files.newBufferedReader(path);
String line = reader.readLine();
return line;`,
        why: `The reader is never closed, so the file descriptor leaks until the process exits.`,
      },
    },
    {
      title: "Checked exceptions",
      body: [
        `A checked exception must be caught or declared with [[throws]]. Unchecked exceptions — RuntimeException and its children — need neither.`,
        `Declare the narrowest checked exception you can; callers should not have to catch Exception to use your method.`,
      ],
      example: {
        code: `static String read(Path path) throws IOException {
    return Files.readString(path);
}`,
        caption: `The signature tells the caller what can go wrong.`,
      },
      wrong: {
        code: `static String read(Path path) {
    return Files.readString(path);
}`,
        why: `IOException is checked and is neither caught nor declared, so this does not compile.`,
      },
    },
  ],

  j10: [
    {
      title: "Arrays: fixed length",
      body: [
        `An array holds a fixed number of values of one type. Create it with [[new int[5]]] or a literal [[{1, 2, 3}]].`,
        `Valid indexes run from 0 to [[length - 1]]. Reading past the end throws ArrayIndexOutOfBoundsException.`,
      ],
      example: {
        code: `int[] scores = {90, 72, 85};
System.out.println(scores[scores.length - 1]);`,
        caption: `The last element is length minus one.`,
      },
      wrong: {
        code: `int[] scores = {90, 72, 85};
System.out.println(scores[3]);`,
        why: `Index 3 is one past the end of a three-element array, so it throws at runtime.`,
      },
    },
    {
      title: "Defaults and null elements",
      body: [
        `A new array is filled with defaults: 0 for numbers, false for booleans, null for objects.`,
        `A null element is not an empty value. Calling a method on it throws NullPointerException.`,
      ],
      example: {
        code: `String[] names = new String[3];
if (names[0] != null) {
    System.out.println(names[0].length());
}`,
        caption: `Check before calling a method on an element.`,
      },
      wrong: {
        code: `String[] names = new String[3];
System.out.println(names[0].length());`,
        why: `names[0] is null, so calling length() throws NullPointerException.`,
      },
    },
    {
      title: "Arrays utility class",
      body: [
        `[[Arrays.toString]] prints the contents; printing the array directly prints its identity hash.`,
        `[[Arrays.sort]] sorts in place, [[Arrays.copyOf]] returns a new array, and [[Arrays.equals]] compares contents.`,
      ],
      example: {
        code: `int[] values = {3, 1, 2};
Arrays.sort(values);
System.out.println(Arrays.toString(values));`,
        caption: `Sorted, then printed as a readable list.`,
      },
      wrong: {
        code: `int[] values = {3, 1, 2};
System.out.println(values);`,
        why: `This prints something like [[[I@1b6d3586]], the array's reference, not its contents.`,
      },
    },
  ],

  j11: [
    {
      title: "Functional interfaces",
      body: [
        `A lambda implements a functional interface — an interface with one abstract method. [[() -> 42]] supplies the body.`,
        `The target type comes from the context: a variable, a parameter, or a return type. A lambda alone has no type.`,
      ],
      example: {
        code: `interface Greeting {
    String greet(String name);
}

Greeting hello = name -> "Hi, " + name;`,
        caption: `One abstract method, one lambda.`,
      },
      wrong: {
        code: `interface Greeting {
    String greet(String name);
    String farewell(String name);
}`,
        why: `Two abstract methods make this not a functional interface, so the lambda has no valid target type.`,
      },
    },
    {
      title: "Method references",
      body: [
        `[[Class::method]] is shorthand for a lambda that forwards its arguments. [[String::toUpperCase]] means [[s -> s.toUpperCase()]].`,
        `A reference to an instance method on a particular object uses [[object::method]] — the object is fixed, the argument is supplied by the context.`,
      ],
      example: {
        code: `names.forEach(System.out::println);`,
        caption: `Each name goes to println.`,
      },
      wrong: {
        code: `names.forEach(System.out.println);`,
        why: `That is a method call, not a reference, and it runs immediately. Use [[System.out::println]].`,
      },
    },
    {
      title: "Capturing variables",
      body: [
        `A lambda can read a local variable from the enclosing method only if it is final or effectively final.`,
        `The restriction exists because the lambda may run later, after the method has returned.`,
      ],
      example: {
        code: `String prefix = "Hi, ";
Greeting greet = name -> prefix + name;`,
        caption: `prefix is never reassigned, so it can be captured.`,
      },
      wrong: {
        code: `String prefix = "Hi, ";
Greeting greet = name -> prefix + name;
prefix = "Hello, ";`,
        why: `The captured variable is reassigned, so the lambda no longer compiles. Use a final copy inside the lambda.`,
      },
    },
  ],

  j12: [
    {
      title: "Building a stream pipeline",
      body: [
        `A stream starts from a collection or other source, passes through zero or more intermediate operations, and ends with one terminal operation.`,
        `Nothing runs until the terminal operation. A pipeline without one is a description, not work.`,
      ],
      example: {
        code: `long count = names.stream()
    .filter(name -> name.length() > 3)
    .count();`,
        caption: `filter is intermediate; count is terminal.`,
      },
      wrong: {
        code: `names.stream()
    .filter(name -> name.length() > 3);`,
        why: `No terminal operation, so nothing is evaluated and the filter has no effect.`,
      },
    },
    {
      title: "map, filter, collect",
      body: [
        `[[map]] transforms one value into another. [[filter]] keeps values that pass a predicate. [[collect]] gathers the result.`,
        `[[Collectors.toList()]] is the common ending. Streams are lazy, so work is interleaved per element rather than pass by pass.`,
      ],
      example: {
        code: `List<String> shortNames = names.stream()
    .filter(name -> name.length() <= 3)
    .map(String::toUpperCase)
    .collect(Collectors.toList());`,
        caption: `Filter, transform, collect.`,
      },
      wrong: {
        code: `names.stream().map(name -> {
    System.out.println(name);
    return name;
});`,
        why: `map is for transformation. Without a terminal operation nothing prints — and side effects inside map are discouraged anyway.`,
      },
    },
    {
      title: "Streams are single-use",
      body: [
        `A stream is consumed by its terminal operation. Reusing the same stream throws IllegalStateException.`,
        `If you need two results, build the stream twice or collect it into a reusable collection first.`,
      ],
      example: {
        code: `List<String> list = names.stream()
    .filter(n -> !n.isBlank())
    .collect(Collectors.toList());

long total = list.stream().count();`,
        caption: `Collect once, then start a fresh stream.`,
      },
      wrong: {
        code: `Stream<String> stream = names.stream();
long a = stream.count();
long b = stream.count();`,
        why: `The first count consumes the stream; the second throws IllegalStateException because the stream is already operated on.`,
      },
    },
  ],

  j13: [
    {
      title: "Runnable and Thread",
      body: [
        `A [[Thread]] runs a [[Runnable]]. [[start()]] creates the new thread of execution; the JVM calls [[run()]] there.`,
        `Calling [[run()]] directly is just a method call on the current thread — the work happens synchronously.`,
      ],
      example: {
        code: `Thread worker = new Thread(() ->
    System.out.println("background"));
worker.start();`,
        caption: `start() schedules the runnable on a new thread.`,
      },
      wrong: {
        code: `Thread worker = new Thread(() ->
    System.out.println("background"));
worker.run();`,
        why: `run() executes on the calling thread, so the "background" work blocks the caller. Use start().`,
      },
    },
    {
      title: "Shared state and races",
      body: [
        `Threads share memory. [[count++]] is read, add, write: two threads can interleave those steps and lose an update.`,
        `Guard shared mutable state with [[synchronized]], or use an atomic type. Atomicity and visibility are separate problems.`,
      ],
      example: {
        code: `private final AtomicInteger count =
    new AtomicInteger();

void increment() {
    count.incrementAndGet();
}`,
        caption: `One atomic operation instead of three.`,
      },
      wrong: {
        code: `private int count;

void increment() {
    count = count + 1;
}`,
        why: `Two threads can read the same old value and both write the same result, so increments are lost.`,
      },
    },
    {
      title: "Executors",
      body: [
        `[[Executors.newFixedThreadPool(n)]] manages worker threads. [[submit]] returns a [[Future]] for the result.`,
        `An executor must be shut down. A non-daemon pool keeps the JVM alive after main returns.`,
      ],
      example: {
        code: `ExecutorService pool = Executors.newFixedThreadPool(4);
Future<Integer> result = pool.submit(() -> 42);
try {
    return result.get();
} finally {
    pool.shutdown();
}`,
        caption: `Submit, read the future, shut the pool down.`,
      },
      wrong: {
        code: `ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> 42);
return 42;`,
        why: `The pool is never shut down, so its non-daemon threads keep the program running after main finishes.`,
      },
    },
  ],

  j14: [
    {
      title: "Generic classes and methods",
      body: [
        `[[Box<T>]] declares a type parameter. [[Box<String>]] fills it in, and the compiler enforces that only strings go in and out.`,
        `Generics exist for compile-time safety. The type information is largely erased at runtime.`,
      ],
      example: {
        code: `class Box<T> {
    private T value;

    void set(T value) { this.value = value; }
    T get() { return value; }
}`,
        caption: `One class, any type, checked by the compiler.`,
      },
      wrong: {
        code: `Box box = new Box();
box.set("text");
int number = (int) box.get();`,
        why: `A raw Box gives no type checking; the cast fails at runtime with ClassCastException.`,
      },
    },
    {
      title: "Bounded types",
      body: [
        `[[<T extends Number>]] restricts T to Number and its subclasses, so methods such as [[doubleValue()]] become callable.`,
        `Generics are invariant: [[List<Integer>]] is not a [[List<Number>]], even though Integer is a Number.`,
      ],
      example: {
        code: `static double sum(List<? extends Number> values) {
    double total = 0;
    for (Number n : values) total += n.doubleValue();
    return total;
}`,
        caption: `Accepts any list of numbers without copying.`,
      },
      wrong: {
        code: `static double sum(List<Number> values) { ... }

List<Integer> ints = List.of(1, 2);
sum(ints);`,
        why: `List<Integer> is not a List<Number>; use a wildcard [[? extends Number]].`,
      },
    },
    {
      title: "Wildcards",
      body: [
        `[[? extends T]] reads values out; [[? super T]] writes values in. If you need both, use an exact type parameter.`,
        `A wildcard list cannot be added to when the lower bound is unknown: [[List<? extends Number>]] may be a list of Integer or Double.`,
      ],
      example: {
        code: `static void addAll(List<? super Integer> target) {
    target.add(1);
    target.add(2);
}`,
        caption: `A super wildcard accepts writes.`,
      },
      wrong: {
        code: `static void add(List<? extends Number> values) {
    values.add(1);
}`,
        why: `The compiler cannot prove 1 is valid for every possible subtype, so the add does not compile.`,
      },
    },
  ],

  j15: [
    {
      title: "Built-in annotations",
      body: [
        `[[@Override]] asks the compiler to verify an override. [[@Deprecated]] marks an API as discouraged, and [[@SuppressWarnings]] silences one warning.`,
        `Annotations do not change behaviour by themselves. Tools and the compiler read them.`,
      ],
      example: {
        code: `class Dog extends Animal {
    @Override
    void speak() { System.out.println("woof"); }
}`,
        caption: `A typo in the signature becomes a compile error.`,
      },
      wrong: {
        code: `class Dog extends Animal {
    @Override
    void speak(String tone) { }
}`,
        why: `The parameter list does not match any parent method, so @Override reports that it overrides nothing.`,
      },
    },
    {
      title: "Defining an annotation",
      body: [
        `[[@interface]] declares an annotation type. Elements are declared like methods, with defaults where needed.`,
        `[[@Retention(RetentionPolicy.RUNTIME)]] keeps the annotation available to reflection; the default CLASS retention is not.`,
      ],
      example: {
        code: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Timed {
    String label() default "";
}`,
        caption: `Readable at runtime, allowed on methods.`,
      },
      wrong: {
        code: `public @interface Timed { }

@Timed
void work() { }

Timed t = work.class.getAnnotation(Timed.class);`,
        why: `Without RUNTIME retention the annotation is discarded after compilation, so reflection returns null.`,
      },
    },
    {
      title: "Using annotations with reflection",
      body: [
        `Reflection reads annotations at runtime: get the class or member, then ask for the annotation type.`,
        `The target matters. An annotation on a field is not visible on the class, and a method lookup returns null for a missing annotation.`,
      ],
      example: {
        code: `Method method = Service.class.getMethod("run");
Timed timed = method.getAnnotation(Timed.class);`,
        caption: `Ask the same member the annotation was placed on.`,
      },
      wrong: {
        code: `Method method = Service.class.getMethod("work");
Timed timed = Service.class.getAnnotation(Timed.class);`,
        why: `Timed is declared on the method, not the class, so the lookup returns null. Ask [[method.getAnnotation(Timed.class)]].`,
      },
    },
  ],

  "j16": [
  {
    "title": "Describe a solution as an algorithm",
    "body": [
      "Start by identifying the inputs, the processing steps, and the expected output. An algorithm should be precise enough that another person can follow it without guessing.",
      "A useful algorithm also handles important cases, such as empty input or a value outside the expected range. Test the steps with a small example before coding."
    ],
    "example": {
      "code": "1. Read the item price.\n2. Read the quantity.\n3. Multiply price by quantity.\n4. Display the total.",
      "caption": "The steps describe a complete small calculation."
    },
    "wrong": {
      "code": "1. Read the price.\n2. Calculate something.\n3. Show the answer.",
      "why": "The processing step is vague. An algorithm needs a precise operation, such as multiplying price by quantity."
    }
  },
  {
    "title": "Read a flowchart",
    "body": [
      "A flowchart uses standard symbols: an oval for start or end, a parallelogram for input or output, a rectangle for a process, and a diamond for a decision.",
      "Arrows show the direction of the process. Label decision branches clearly, and make sure loops have a path that eventually reaches an exit condition."
    ],
    "example": {
      "code": "Start\n  |\nInput score\n  |\nscore >= 75?\n  | Yes       | No\nOutput Pass   Output Retry\n  |           |\n  +----- End -+",
      "caption": "The decision branches to two outcomes."
    },
    "wrong": {
      "code": "Start -> Input score -> Output Pass -> End",
      "why": "The flow always prints Pass and omits the decision. A flowchart must show both possible outcomes."
    }
  },
  {
    "title": "Write pseudocode before Java",
    "body": [
      "Pseudocode uses readable words such as INPUT, IF, ELSE, REPEAT, and OUTPUT. It describes control flow without requiring Java punctuation or data types.",
      "Keep it close enough to the final solution that it can be translated into code. Do not mix Java braces and pseudocode keywords in the same statement."
    ],
    "example": {
      "code": "INPUT score\nIF score >= 75 THEN\n    OUTPUT \"Passed\"\nELSE\n    OUTPUT \"Needs improvement\"\nEND IF",
      "caption": "Both paths are written before implementation."
    },
    "wrong": {
      "code": "if (score >= 75) {\n    OUTPUT \"Passed\"\n}",
      "why": "This mixes Java braces with a pseudocode keyword and omits the alternative path."
    }
  }
],
  "j17": [
  {
    "title": "Calculate with arithmetic operators",
    "body": [
      "Arithmetic operators include +, -, *, /, and %. Integer division discards the fractional part, while the remainder operator returns what remains after division.",
      "Choose numeric types carefully. If both operands are integers, division uses integer arithmetic; using a floating-point operand produces a floating-point result."
    ],
    "example": {
      "code": "int total = 17;\nint people = 5;\nint each = total / people;\nint remainder = total % people;",
      "caption": "Integer division and remainder answer different questions."
    },
    "wrong": {
      "code": "int each = 17 / 5.0;",
      "why": "17 / 5.0 produces a double, which cannot be assigned to int without an explicit conversion."
    }
  },
  {
    "title": "Compare values and combine conditions",
    "body": [
      "Relational operators such as <, <=, >, and >= compare values. Equality uses == for primitive values, while &&, ||, and ! combine or reverse Boolean results.",
      "Use parentheses when a condition mixes operators. Short-circuit && and || stop evaluating when the result is already known."
    ],
    "example": {
      "code": "if (age >= 18 && hasId) {\n    System.out.println(\"Continue\");\n}",
      "caption": "Both conditions must be true."
    },
    "wrong": {
      "code": "if (age = 18 && hasId) {\n    System.out.println(\"Continue\");\n}",
      "why": "A single equals sign assigns. Use == when comparing primitive values."
    }
  },
  {
    "title": "Understand assignment and precedence",
    "body": [
      "Assignment operators store values, and compound forms such as += update an existing variable. Increment and decrement operators change a numeric variable by one.",
      "Operator precedence determines how an expression is grouped. Use parentheses when the intended order should be obvious to another reader."
    ],
    "example": {
      "code": "int score = 10;\nscore += 5;\nint finalScore = (score + 3) * 2;",
      "caption": "Parentheses make the intended calculation explicit."
    },
    "wrong": {
      "code": "int finalScore = score + 3 * 2;",
      "why": "Multiplication happens before addition, so this does not match (score + 3) * 2."
    }
  }
],
  "j18": [
  {
    "title": "Create a Scanner",
    "body": [
      "Import java.util.Scanner and construct it with System.in to read keyboard input. Scanner provides methods such as next(), nextLine(), nextInt(), and nextDouble().",
      "Store input in a variable with a compatible type. Text belongs in String, while numeric values can use integer or floating-point types."
    ],
    "example": {
      "code": "Scanner input = new Scanner(System.in);\nSystem.out.print(\"Age: \");\nint age = input.nextInt();",
      "caption": "nextInt reads an integer token."
    },
    "wrong": {
      "code": "Scanner input = new Scanner();\nint age = input.nextInt();",
      "why": "The Scanner constructor needs an input source. Pass System.in to read from the console."
    }
  },
  {
    "title": "Read text and numbers",
    "body": [
      "next() reads one token and stops at whitespace; nextLine() reads the remainder of a line. Numeric methods parse tokens and can throw InputMismatchException when the input does not match.",
      "After a numeric read, a line break may remain in the input buffer. Consume it deliberately before reading a full line as the next response."
    ],
    "example": {
      "code": "int age = input.nextInt();\ninput.nextLine(); // consume the line break\nString name = input.nextLine();",
      "caption": "Consume the leftover newline before reading the name."
    },
    "wrong": {
      "code": "int age = input.nextInt();\nString name = input.nextLine();",
      "why": "nextLine may return the empty remainder after nextInt. Consume the newline first."
    }
  },
  {
    "title": "Format and print results",
    "body": [
      "System.out.print writes without a trailing newline, while println writes and then moves to the next line. printf supports formatted output such as fixed decimal places.",
      "Close a Scanner when its input source is a resource you own. Closing a Scanner over System.in also closes System.in, so avoid doing so while another part of the program still needs console input."
    ],
    "example": {
      "code": "double price = 19.5;\nSystem.out.printf(\"Total: %.2f%n\", price);",
      "caption": "%.2f prints two digits after the decimal point."
    },
    "wrong": {
      "code": "System.out.printf(\"Total: %d%n\", 19.5);",
      "why": "%d expects an integer conversion. Use %.2f for a decimal value."
    }
  }
],
  "j19": [
  {
    "title": "Sort values",
    "body": [
      "A sorting algorithm rearranges values according to a comparison rule. Bubble sort, selection sort, insertion sort, and merge sort are common examples with different trade-offs.",
      "For ordinary Java arrays, Arrays.sort() is usually the right tool. Learning algorithms manually explains how comparisons and swaps produce an ordered result."
    ],
    "example": {
      "code": "int[] scores = {72, 91, 65};\nArrays.sort(scores);\n// [65, 72, 91]",
      "caption": "The library sort is suited to common use."
    },
    "wrong": {
      "code": "Arrays.sort(scores, 0, scores.length + 1);",
      "why": "The range endpoint is outside the array's valid range. Use the full-array overload or a valid range."
    }
  },
  {
    "title": "Compare simple sorting strategies",
    "body": [
      "Bubble sort compares neighboring values and swaps them when they are out of order. Selection sort repeatedly chooses the smallest remaining value, while insertion sort inserts each value into a sorted prefix.",
      "These methods are useful for learning but can take quadratic time on large inputs. Their operation counts grow quickly as the number of values increases."
    ],
    "example": {
      "code": "for (int i = 0; i < values.length - 1; i++) {\n    for (int j = 0; j < values.length - 1 - i; j++) {\n        if (values[j] > values[j + 1]) {\n            int temp = values[j];\n            values[j] = values[j + 1];\n            values[j + 1] = temp;\n        }\n    }\n}",
      "caption": "The adjacent values are swapped using a temporary variable."
    },
    "wrong": {
      "code": "if (values[j] > values[j + 1]) {\n    values[j] = values[j + 1];\n    values[j + 1] = values[j];\n}",
      "why": "The first assignment overwrites the original value. Save it before swapping."
    }
  },
  {
    "title": "Search for a value",
    "body": [
      "Linear search checks values one by one and works on unsorted data. Binary search compares with the middle value and discards half the range, but requires sorted input.",
      "Arrays.binarySearch() returns a negative value when it cannot find a target. Check the result before using it as an array index."
    ],
    "example": {
      "code": "Arrays.sort(values);\nint index = Arrays.binarySearch(values, 5);\nif (index >= 0) {\n    System.out.println(\"Found at \" + index);\n}",
      "caption": "Check the result before indexing."
    },
    "wrong": {
      "code": "int index = Arrays.binarySearch(values, 5);\nSystem.out.println(values[index]);",
      "why": "The result may be negative when the value is missing. Check whether it is at least zero."
    }
  }
],
  "j20": [
  {
    "title": "Choose a collection interface",
    "body": [
      "List represents an ordered sequence that can contain duplicates. Set represents unique elements, and Map stores key-value associations rather than single values.",
      "Declare variables using the interface when possible. That lets an implementation change without changing every method that uses the collection."
    ],
    "example": {
      "code": "List<String> names = new ArrayList<>();\nSet<String> tags = new HashSet<>();\nMap<String, Integer> scores = new HashMap<>();",
      "caption": "Each interface represents a different data relationship."
    },
    "wrong": {
      "code": "List<String> scores = new HashMap<>();",
      "why": "HashMap implements Map, not List. Declare the variable with the matching interface."
    }
  },
  {
    "title": "Add and retrieve values",
    "body": [
      "List commonly uses add() and get(index), Set uses add() while ignoring duplicates, and Map uses put(key,value) and get(key). Each collection exposes operations suited to its structure.",
      "A Map can return null when a key is absent. Use containsKey() when the difference between a missing key and a key mapped to null matters."
    ],
    "example": {
      "code": "Map<String, Integer> points = new HashMap<>();\npoints.put(\"red\", 10);\nint redPoints = points.get(\"red\");",
      "caption": "The key retrieves its associated value."
    },
    "wrong": {
      "code": "points.add(\"green\", 20);",
      "why": "Map has no add(key,value) method. Use put() to associate a key with a value."
    }
  },
  {
    "title": "Iterate through collections",
    "body": [
      "Enhanced for loops work with Iterable collections such as List and Set. A Map exposes entrySet(), keySet(), and values() for different ways to traverse its contents.",
      "Avoid structurally modifying a collection during an enhanced for loop unless the API explicitly supports it. Use an iterator or collect changes for later."
    ],
    "example": {
      "code": "for (Map.Entry<String, Integer> entry : points.entrySet()) {\n    System.out.println(entry.getKey() + \": \" + entry.getValue());\n}",
      "caption": "Each entry exposes both a key and its value."
    },
    "wrong": {
      "code": "for (String key : points) {\n    System.out.println(key);\n}",
      "why": "Map is not directly iterable. Iterate over keySet(), values(), or entrySet()."
    }
  }
],
  "j21": [
  {
    "title": "Represent a path",
    "body": [
      "Path describes a file-system location without itself reading or writing the file. Path.of() creates a path from text, and resolve() builds a child path from a directory.",
      "A relative path is interpreted from the program's working directory. Do not assume it is the same folder as the source file."
    ],
    "example": {
      "code": "Path dataDir = Path.of(\"data\");\nPath report = dataDir.resolve(\"report.txt\");",
      "caption": "resolve builds a child path."
    },
    "wrong": {
      "code": "Path report = Path.of(\"data\").resolve(\"report.txt\", \"backup.txt\");",
      "why": "The resolve() method accepts one child path at a time; it does not have an overload for two strings.",
    }
  },
  {
    "title": "Read and write text",
    "body": [
      "Files.readString() reads file contents into a String, while Files.writeString() writes text. These methods suit small text files.",
      "File operations can throw IOException. A file may be missing or permissions may be denied, so handle expected failures instead of assuming success."
    ],
    "example": {
      "code": "try {\n    Files.writeString(path, \"Saved\");\n    String content = Files.readString(path);\n} catch (IOException error) {\n    System.out.println(\"Could not access file\");\n}",
      "caption": "Handle I/O failures around the operation."
    },
    "wrong": {
      "code": "String content = Files.readString(path);",
      "why": "readString can throw IOException. Handle or declare that exception."
    }
  },
  {
    "title": "Stream larger files",
    "body": [
      "For a large file, streams can process data incrementally instead of loading everything into memory. BufferedReader and BufferedWriter are common character-stream tools.",
      "Use try-with-resources so file streams close even if an exception occurs. Choose an explicit character encoding when the data format requires it."
    ],
    "example": {
      "code": "try (BufferedReader reader = Files.newBufferedReader(path)) {\n    String line;\n    while ((line = reader.readLine()) != null) {\n        System.out.println(line);\n    }\n}",
      "caption": "The reader closes automatically."
    },
    "wrong": {
      "code": "BufferedReader reader = Files.newBufferedReader(path);\nString line = reader.readLine();",
      "why": "The reader is left open. Use try-with-resources for reliable cleanup."
    }
  }
],
  "j22": [
  {
    "title": "Create a Swing window",
    "body": [
      "JFrame is a top-level window. It can contain panels and other controls, and pack() sizes the window according to the preferred sizes of those components.",
      "Build and update Swing interfaces on the Event Dispatch Thread. Use SwingUtilities.invokeLater() to schedule initial setup."
    ],
    "example": {
      "code": "SwingUtilities.invokeLater(() -> {\n    JFrame frame = new JFrame(\"Student Records\");\n    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);\n    frame.add(new JLabel(\"Welcome\"));\n    frame.pack();\n    frame.setVisible(true);\n});",
      "caption": "The GUI is created on Swing's event thread."
    },
    "wrong": {
      "code": "JFrame frame = new JFrame(\"Student Records\");\nframe.setVisible(true);",
      "why": "This omits close behavior and may be constructed outside the Event Dispatch Thread."
    }
  },
  {
    "title": "Respond to user actions",
    "body": [
      "JButton triggers an action event when activated. Add an ActionListener to connect the user's click or keyboard activation to a task.",
      "Keep listener code short. Long-running work should not block the Event Dispatch Thread, because that prevents the interface from repainting and responding."
    ],
    "example": {
      "code": "JButton save = new JButton(\"Save\");\nJLabel status = new JLabel(\"Not saved\");\nsave.addActionListener(event -> status.setText(\"Saved\"));",
      "caption": "The listener updates the status when the button is activated."
    },
    "wrong": {
      "code": "save.addActionListener(status.setText(\"Saved\"));",
      "why": "This calls setText immediately and passes its result instead of providing a listener."
    }
  },
  {
    "title": "Arrange components with layout managers",
    "body": [
      "Layout managers position components as a window changes size. FlowLayout places controls in a flow, BorderLayout uses regions, and GridLayout creates equal-sized cells.",
      "Avoid setting fixed coordinates for every component. Layout managers adapt better to different window sizes, fonts, and platform rendering."
    ],
    "example": {
      "code": "JPanel panel = new JPanel(new BorderLayout());\npanel.add(new JLabel(\"Name\"), BorderLayout.WEST);\npanel.add(new JTextField(18), BorderLayout.CENTER);\nframe.add(panel);",
      "caption": "BorderLayout places the label and field in separate regions."
    },
    "wrong": {
      "code": "panel.add(new JLabel(\"Name\"), BorderLayout.MIDDLE);",
      "why": "BorderLayout has no MIDDLE constant. Use one of its defined regions, such as NORTH or CENTER."
    }
  }
],
  "j23": [
  {
    "title": "Model requirements with use cases",
    "body": [
      "A use case describes a goal an actor achieves by interacting with a system. Actors represent roles outside the system boundary, not necessarily individual people.",
      "Write a short scenario for each important use case, including the normal flow and alternative outcomes. This makes vague requirements more testable."
    ],
    "example": {
      "code": "Actor: Student\nUse case: Register for a class\n1. Select a class.\n2. System checks available seats.\n3. System confirms registration.",
      "caption": "The scenario states a goal and system response."
    },
    "wrong": {
      "code": "Actor: Database\nUse case: Click Button",
      "why": "A database is usually an internal component, not an external actor. Describe a meaningful goal from a user role's perspective."
    }
  },
  {
    "title": "Describe classes and relationships",
    "body": [
      "A UML class diagram shows classes, attributes, operations, and relationships. Associations describe links between classes, while inheritance shows a specialized type derived from a general type.",
      "Multiplicity labels such as 1 and 0..* communicate how many related objects can participate in a relationship."
    ],
    "example": {
      "code": "Student\n----------------\n- studentId: int\n- name: String\n----------------\n+ enroll(course: Course)\n\nCourse\n----------------\n- code: String\n- title: String",
      "caption": "The operation refers to another domain class."
    },
    "wrong": {
      "code": "Student\n- course: String\nCourse\n- student: int",
      "why": "The sketch does not show a clear relationship or multiplicity. Use domain types and describe the association."
    }
  },
  {
    "title": "Trace behavior with sequence diagrams",
    "body": [
      "A sequence diagram shows participants and the messages exchanged over time. Read it from top to bottom to understand the order of calls in a scenario.",
      "Use sequence diagrams to reveal missing responsibilities, repeated requests, and places where an error response needs to be handled."
    ],
    "example": {
      "code": "Student -> Portal: submit()\nPortal -> Validator: check(file)\nValidator --> Portal: valid\nPortal -> Storage: save(file)\nStorage --> Portal: saved",
      "caption": "The diagram traces the submission scenario."
    },
    "wrong": {
      "code": "Student -> Storage: submit()\nStorage -> Student: saved",
      "why": "This skips the portal and validation responsibilities described in the design. Show the participants that actually take part."
    }
  }
],
  "j24": [
  {
    "title": "Open a database connection",
    "body": [
      "JDBC connects Java code to a database through a driver. DriverManager can create a Connection using a JDBC URL and credentials.",
      "Keep credentials out of source code and protect the configuration that supplies them. Larger applications often use a connection pool."
    ],
    "example": {
      "code": "try (Connection connection =\n     DriverManager.getConnection(url, user, password)) {\n    System.out.println(\"Connected\");\n}",
      "caption": "The connection closes when the block ends."
    },
    "wrong": {
      "code": "Connection connection =\n    DriverManager.getConnection(url, user, password);\n// connection is never closed",
      "why": "The connection can remain open. Use try-with-resources or a managed pool."
    }
  },
  {
    "title": "Use prepared statements",
    "body": [
      "PreparedStatement separates SQL structure from supplied values. Bind values with setters such as setInt() and setString() instead of concatenating input into the SQL text.",
      "Prepared statements help protect value parameters. They do not replace authorization checks, and identifiers such as table names generally cannot be bound as ordinary values."
    ],
    "example": {
      "code": "String sql = \"SELECT name FROM students WHERE id = ?\";\ntry (PreparedStatement statement = connection.prepareStatement(sql)) {\n    statement.setInt(1, studentId);\n}",
      "caption": "The question mark is bound to a value."
    },
    "wrong": {
      "code": "String sql = \"SELECT name FROM students WHERE id = \" + userInput;",
      "why": "Concatenating external input can alter query structure. Use a parameterized statement."
    }
  },
  {
    "title": "Read a ResultSet",
    "body": [
      "executeQuery() returns a ResultSet for a SELECT statement. Call next() to move through rows, then retrieve columns by label or index with an appropriate getter.",
      "A ResultSet is tied to its statement and connection. Close all JDBC resources with try-with-resources, using nested resources where needed."
    ],
    "example": {
      "code": "try (PreparedStatement statement = connection.prepareStatement(sql);\n     ResultSet rows = statement.executeQuery()) {\n    while (rows.next()) {\n        System.out.println(rows.getString(\"name\"));\n    }\n}",
      "caption": "next() advances one row at a time."
    },
    "wrong": {
      "code": "ResultSet rows = statement.executeQuery();\nString name = rows.getString(\"name\");",
      "why": "The cursor begins before the first row. Call next() and check the result first."
    }
  }
],
  "j25": [
  {
    "title": "Coordinate completion with a latch",
    "body": [
      "CountDownLatch lets threads wait until a fixed number of events have occurred. Each completed task calls countDown(), and another thread can wait with await().",
      "A CountDownLatch cannot be reset after it reaches zero. Create a new latch for a new coordination cycle."
    ],
    "example": {
      "code": "CountDownLatch ready = new CountDownLatch(2);\n// Each worker calls ready.countDown()\nready.await();",
      "caption": "The main thread waits for both workers."
    },
    "wrong": {
      "code": "CountDownLatch ready = new CountDownLatch(2);\nready.await();\nready.countDown();",
      "why": "The thread waits before decrementing the count, so the latch never reaches zero. Worker tasks should signal completion."
    }
  },
  {
    "title": "Use a barrier for shared phases",
    "body": [
      "CyclicBarrier lets a fixed group of threads wait at a common point. When the required number arrives, all are released and the barrier can be reused.",
      "A barrier suits work performed in repeated phases. It differs from a latch, which is a one-way signal that cannot be reset."
    ],
    "example": {
      "code": "CyclicBarrier barrier = new CyclicBarrier(3);\nRunnable phase = () -> {\n    prepare();\n    barrier.await();\n    calculate();\n};",
      "caption": "Each worker waits for the other two."
    },
    "wrong": {
      "code": "CyclicBarrier barrier = new CyclicBarrier(3);\nbarrier.await();",
      "why": "One thread cannot satisfy a three-party barrier. All participating threads must arrive."
    }
  },
  {
    "title": "Limit access with a semaphore",
    "body": [
      "Semaphore maintains a number of permits. A thread acquires a permit before using a limited resource and releases it when finished.",
      "Always release a permit in a finally block. If a task fails before release, available permits can shrink and other tasks may wait indefinitely."
    ],
    "example": {
      "code": "Semaphore permits = new Semaphore(2);\npermits.acquire();\ntry {\n    useSharedResource();\n} finally {\n    permits.release();\n}",
      "caption": "finally releases the permit after success or failure."
    },
    "wrong": {
      "code": "permits.acquire();\nuseSharedResource();\npermits.release();",
      "why": "If the operation throws, release is skipped. Put release in finally."
    }
  }
],
};
