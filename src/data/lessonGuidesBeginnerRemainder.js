// Guided teaching notes for the remaining Beginner topics.
// Each lesson follows: learning goal -> explanation -> worked steps -> retrieval check.

const makeGuide = (goal, body, walkthrough, check) => ({
  goal,
  body,
  walkthrough,
  check,
});

export const BEGINNER_REMAINDER_GUIDES = {
  html: {
    h3: [
      makeGuide(
        "Use paragraph elements to group sentences that belong to one idea and keep the document easy to read.",
        [
          "The [[<p>]] element represents a paragraph of text. Put one related thought inside it, then start another paragraph when the topic or point changes. Browsers add default spacing around paragraphs, but that visual spacing is not what makes the element meaningful.",
          "A paragraph can contain inline elements such as [[<strong>]], [[<em>]], [[<a>]], and [[<code>]]. It should not contain another paragraph, a heading, or a large block such as a [[<div>]]. Choose elements by the role the content plays, not by the default spacing they happen to show.",
        ],
        [
          { label: "Group one idea", code: "<p>HTML describes the structure of a page.</p>", detail: "The sentence is one complete thought, so the paragraph element gives it a clear content boundary." },
          { label: "Start a separate thought", code: "<p>CSS controls how that page looks.</p>", detail: "This is a second idea, so it belongs in its own paragraph instead of being separated with repeated spaces." },
        ],
        {
          question: "Which element is intended to group a block of related sentences?",
          options: ["<p>", "<br>", "<strong>"],
          correct: 0,
          explanation: "The paragraph element groups prose into a meaningful block. br creates a line break, while strong marks important inline text.",
        },
      ),
      makeGuide(
        "Place inline emphasis inside a paragraph without breaking the paragraph's sentence structure.",
        [
          "Inline elements change the meaning or role of a small part of a sentence. [[<strong>]] marks text with strong importance, while [[<em>]] marks stress or emphasis. They do not create a new paragraph, so the sentence can continue before and after them.",
          "Use the element that describes the meaning you intend. Do not choose strong just because you want bold text or em only because you want italics. CSS can change appearance later, while the HTML element communicates the role of the words to browsers and assistive technology.",
        ],
        [
          { label: "Mark an important word", code: "<p><strong>Save</strong> your work before closing the editor.</p>", detail: "The word Save is important to the instruction, so strong marks it without splitting the sentence into separate blocks." },
          { label: "Emphasise a spoken phrase", code: "<p>I said <em>today</em>, not tomorrow.</p>", detail: "The emphasis changes how the word should be stressed when read, while the surrounding sentence remains one paragraph." },
        ],
        {
          question: "Which element marks text that is important to the meaning of the sentence?",
          options: ["<strong>", "<br>", "<div>"],
          correct: 0,
          explanation: "strong communicates importance. br only inserts a line break, and div is a generic container rather than an emphasis element.",
        },
      ),
      makeGuide(
        "Choose between paragraphs and line breaks so spacing reflects the content rather than a visual trick.",
        [
          "Use a new [[<p>]] when the text begins a different paragraph or thought. Use [[<br>]] only when a line break belongs inside the same piece of text, such as the separate lines of a postal address or a poem. A line break does not create a new paragraph.",
          "Do not create empty paragraphs just to push content down the page. That produces empty content for assistive technology and becomes difficult to maintain. When the goal is visual spacing, keep the HTML meaningful and use CSS margins or padding instead.",
        ],
        [
          { label: "Keep an address together", code: "<p>12 Sampaguita Street<br>Dasmariñas, Cavite</p>", detail: "The address is one content unit, but its two lines should remain visually separate, so br is appropriate inside the paragraph." },
          { label: "Separate different thoughts", code: "<p>Our shop opens at nine.</p>\n<p>The last order is accepted at five.</p>", detail: "These are separate pieces of information, so two paragraph elements communicate that structure more clearly than repeated br elements." },
        ],
        {
          question: "You are writing two separate paragraphs about different topics. What should separate them?",
          options: ["Two <p> elements", "Several <br> elements", "An empty <strong> element"],
          correct: 0,
          explanation: "Each paragraph should have its own p element. br is for a meaningful line break inside one block of text, not a replacement for paragraph structure.",
        },
      ),
    ],
    h4: [
      makeGuide(
        "Create a working hyperlink by pairing an anchor element with a destination in its href attribute.",
        [
          "The [[<a>]] element creates a hyperlink when it has an [[href]] attribute. The href tells the browser where the link should go, and the content between the opening and closing tags gives the reader something to activate. A link without href is not a normal navigational link.",
          "Write link text that describes the destination or action. A label such as 'Read the HTML guide' is clearer when heard out of context than 'Click here'. The destination may be another website, a page in your own project, an email address, or a location on the current page.",
        ],
        [
          { label: "Set a destination", code: "<a href=\"https://developer.mozilla.org\">MDN Web Docs</a>", detail: "The href contains the destination URL, while MDN Web Docs is the readable text that the visitor activates." },
          { label: "Link to another page in the project", code: "<a href=\"contact.html\">Contact the team</a>", detail: "A relative URL points to a file in the current site, so the browser navigates to contact.html when the link is selected." },
        ],
        {
          question: "Which attribute tells an anchor where to navigate?",
          options: ["href", "src", "alt"],
          correct: 0,
          explanation: "href stores a hyperlink destination. src is commonly used for embedded resources such as images, and alt provides alternative text.",
        },
      ),
      makeGuide(
        "Use absolute, relative, and fragment links to navigate to the correct resource or section.",
        [
          "An absolute URL includes its scheme and host, such as [[https://example.com/about]]. A relative URL is resolved from the current page or site root, such as [[guide.html]] or [[/help]]. Which form you choose depends on where the destination lives in the project.",
          "A fragment link starts with [[#]] and points to an element whose [[id]] matches the fragment. For example, [[href=\"#faq\"]] looks for an element with [[id=\"faq\"]]. The spelling must match, or the link will not find the intended section.",
        ],
        [
          { label: "Link to a section on this page", code: "<a href=\"#faq\">Frequently asked questions</a>\n\n<h2 id=\"faq\">Frequently asked questions</h2>", detail: "The fragment after the hash matches the id on the heading, so the browser can jump to that section." },
          { label: "Link to a sibling page", code: "<a href=\"lessons/links.html\">Read the links lesson</a>", detail: "The relative path points into a lessons folder beside the current page, so the destination stays within the same site." },
        ],
        {
          question: "What must exist for href=\"#details\" to reach a section?",
          options: ["An element with id=\"details\"", "An image with src=\"details\"", "A paragraph named details"],
          correct: 0,
          explanation: "A fragment link looks for an element whose id matches the fragment text. The id must match exactly for the browser to find the section.",
        },
      ),
      makeGuide(
        "Use links for navigation and buttons for actions so the page behaves predictably for every visitor.",
        [
          "A link takes the visitor to a destination, such as another page, a file, or a section. A [[<button>]] performs an action on the current page, such as submitting a form, opening a menu, or changing a setting. The browser and assistive technology expose these controls differently because their jobs differ.",
          "Do not use an anchor with a fake destination just to make something look clickable. Do not use a button when the user is actually navigating to a resource. Pick the semantic element first, then style it to match the design.",
        ],
        [
          { label: "Navigate to a report", code: "<a href=\"reports/annual.html\">Read the annual report</a>", detail: "The control changes the visitor's location, so an anchor with a real destination is the right element." },
          { label: "Perform an action", code: "<button type=\"button\">Open filters</button>", detail: "This control opens an interface element on the current page rather than navigating, so button communicates its purpose." },
        ],
        {
          question: "A control opens a filter panel without changing the page address. Which element fits?",
          options: ["<button>", "<a href=\"#\">", "<img>"],
          correct: 0,
          explanation: "Opening a panel is an action on the current page, so button is the semantic choice. An anchor is for navigation to a destination.",
        },
      ),
    ],
    h5: [
      makeGuide(
        "Embed an image with a source and provide alternative text that communicates its purpose.",
        [
          "The [[<img>]] element embeds an image file. Its [[src]] attribute points to the image, and [[alt]] provides a text alternative for people who cannot see it or when the image cannot load. The img element is a void element, so it does not need a closing tag.",
          "Describe the information the image adds to the page. For a meaningful photo, explain the relevant subject or action. For an image that is purely decorative and adds no information, use an empty alt value ([[alt=\"\"]]) so a screen reader can skip it instead of reading a file name.",
        ],
        [
          { label: "Embed an informative image", code: "<img src=\"keyboard.jpg\" alt=\"A compact keyboard beside a laptop\">", detail: "src identifies the image file, and alt explains what the image shows in the context of the page." },
          { label: "Mark a decorative image", code: "<img src=\"corner-pattern.svg\" alt=\"\">", detail: "The empty alt tells assistive technology that this decoration adds no information and can be ignored." },
        ],
        {
          question: "Which attribute provides a text alternative for an image?",
          options: ["alt", "href", "width"],
          correct: 0,
          explanation: "alt supplies the image's text alternative. href is used for link destinations, while width controls the rendered width.",
        },
      ),
      makeGuide(
        "Set image dimensions so the browser can reserve space and avoid unexpected layout movement.",
        [
          "The [[width]] and [[height]] attributes tell the browser the image's intended dimensions. When the browser knows the proportions before the file loads, it can reserve the right amount of space and reduce layout shifts. The values should match the image's actual proportions.",
          "The [[loading=\"lazy\"]] attribute can delay loading an image that is far below the visible part of the page. It is useful for long pages with many images, but the main image near the top should usually load normally so it appears promptly.",
        ],
        [
          { label: "Reserve the image's space", code: "<img src=\"chart.png\" alt=\"Monthly sales chart\" width=\"600\" height=\"400\">", detail: "The dimensions describe a 3-to-2 ratio, allowing the browser to reserve an appropriately shaped area before the file arrives." },
          { label: "Defer an off-screen image", code: "<img src=\"gallery-04.jpg\" alt=\"A ceramic bowl\" width=\"480\" height=\"320\" loading=\"lazy\">", detail: "This image is part of a lower gallery, so lazy loading can avoid fetching it before the visitor approaches that section." },
        ],
        {
          question: "Why should you provide width and height for an image?",
          options: ["So the browser can reserve its space before it loads", "So the image becomes a hyperlink", "So the alt text is optional"],
          correct: 0,
          explanation: "Known dimensions let the browser calculate the image's space early. This helps keep nearby content from jumping when the image finishes loading.",
        },
      ),
      makeGuide(
        "Combine images with captions when the image and its explanation belong together as one item.",
        [
          "Use [[<figure>]] when an image, diagram, or other self-contained media item is referenced as a unit by the surrounding content. A [[<figcaption>]] can provide a visible caption that explains the image, credits its source, or gives useful context.",
          "Alternative text and a caption have different jobs. Alt text gives a concise text alternative for the image itself; the caption is visible to everyone and can add context. Avoid repeating the same sentence in both places unless the image genuinely needs that exact description.",
        ],
        [
          { label: "Group an image and its caption", code: "<figure>\n  <img src=\"team.jpg\" alt=\"Five people standing at the project table\">\n  <figcaption>The design team reviews the first prototype.</figcaption>\n</figure>", detail: "figure groups the media and its caption as one meaningful item, while figcaption describes the context for readers." },
          { label: "Keep alternative text focused", code: "<img src=\"map.png\" alt=\"Map showing the three library branches\">", detail: "The alt text communicates the useful information in the map. A nearby caption can then explain why those branches matter." },
        ],
        {
          question: "Which element provides a caption for media inside a figure?",
          options: ["<figcaption>", "<title>", "<label>"],
          correct: 0,
          explanation: "figcaption is the caption element for its parent figure. title and label have different roles and do not replace a figure caption.",
        },
      ),
    ],
  },
  css: {
    c4: [
      makeGuide(
        "Set readable foreground and background colours by choosing valid CSS colour values.",
        [
          "The [[color]] property changes text colour, while [[background-color]] changes the colour behind an element. CSS accepts named colours and hexadecimal values. A six-digit hex value is written with a hash followed by red, green, and blue pairs, such as [[#336699]].",
          "The order of the digits matters because each pair controls one colour channel. Short three-digit values are also allowed when each channel repeats the same digit, so [[#369]] expands to [[#336699]]. A missing digit or invalid character can make the browser discard the declaration.",
        ],
        [
          { label: "Choose a text colour", code: ".notice {\n  color: #244b3c;\n}", detail: "The colour property changes the text inside elements that match the notice class." },
          { label: "Give the text a background", code: ".notice {\n  color: #244b3c;\n  background-color: #e7f0e9;\n}", detail: "The light background makes a separate surface behind the text, while the dark foreground keeps the two colours distinct." },
        ],
        {
          question: "Which property changes the colour behind an element?",
          options: ["background-color", "font-family", "border-width"],
          correct: 0,
          explanation: "background-color paints the element's background. font-family changes the typeface, and border-width changes the thickness of its border.",
        },
      ),
      makeGuide(
        "Recognise RGB and HSL colour functions and use alpha when a colour needs transparency.",
        [
          "RGB describes a colour through red, green, and blue channels. HSL describes hue, saturation, and lightness, which can make it easier to create a lighter or darker version of a colour while keeping its general hue. Both are valid ways to express CSS colours.",
          "An alpha value controls transparency. In modern CSS colour syntax, a slash can separate the alpha value from the colour components, as in [[rgb(30 80 60 / 50%)]]. A transparent colour lets some of the surface behind it show through; it does not make the content itself disappear.",
        ],
        [
          { label: "Set a colour with RGB", code: ".swatch {\n  background-color: rgb(30 80 60);\n}", detail: "The three channel values describe the red, green, and blue amounts used to create the colour." },
          { label: "Make the same colour translucent", code: ".swatch-soft {\n  background-color: hsl(150 45% 35% / 20%);\n}", detail: "The final alpha value makes the background partly transparent, allowing the surface behind the swatch to remain visible." },
        ],
        {
          question: "What does the alpha part of a CSS colour control?",
          options: ["Transparency", "Font size", "Border radius"],
          correct: 0,
          explanation: "Alpha controls how opaque or transparent the colour appears. It does not change the font size or the shape of an element.",
        },
      ),
      makeGuide(
        "Check the contrast between text and its background instead of choosing colours by hue alone.",
        [
          "A colour pair can look attractive as separate swatches but still be difficult to read when one is used for text on the other. Contrast describes how distinct the foreground is from the background. Small body text needs especially clear contrast because it carries most of the page's information.",
          "Do not communicate important states using colour alone. A warning should also have a label or icon, and a link should still look interactive in a way that does not depend only on hue. Test the actual foreground and background pair together, including muted text and hover or disabled states.",
        ],
        [
          { label: "Use a clear text pair", code: ".card {\n  color: #24352d;\n  background-color: #f2f6f1;\n}", detail: "The dark text is clearly separated from the pale surface, making the card's information easier to read." },
          { label: "Add a non-colour cue", code: "<p class=\"warning\"><strong>Warning:</strong> Save before leaving.</p>", detail: "The visible word Warning communicates the message even for someone who cannot distinguish the warning colour from nearby colours." },
        ],
        {
          question: "Why should an important message not rely on colour alone?",
          options: ["Some people may not distinguish the colours", "CSS cannot display colours", "Text cannot appear beside a coloured background"],
          correct: 0,
          explanation: "Colour perception varies, so a label or other cue helps ensure the meaning remains available to everyone.",
        },
      ),
    ],
    c14: [
      makeGuide(
        "Choose between pixels, percentages, em, and rem based on what should control an element's size.",
        [
          "A [[px]] value is a fixed CSS length commonly used for small details such as borders. A percentage usually depends on the containing block, so [[width: 50%]] makes an element half as wide as its parent. These units answer different questions, so do not swap them without considering the layout.",
          "[[em]] is based on the font size of the element, while [[rem]] is based on the root element's font size. rem is often useful for type and spacing that should scale consistently across the page. Use percentages when a dimension should adapt to its available container.",
        ],
        [
          { label: "Set spacing relative to the root", code: ".card {\n  padding: 1rem;\n}", detail: "The padding uses the root font size as its reference, helping the spacing scale consistently with the page's type settings." },
          { label: "Make a box half its parent's width", code: ".card-half {\n  width: 50%;\n}", detail: "The percentage is calculated against the containing block, so the card grows or shrinks with the space its parent provides." },
        ],
        {
          question: "Which unit is based on the root element's font size?",
          options: ["rem", "em", "%"],
          correct: 0,
          explanation: "rem is relative to the root font size. em depends on the relevant element's font size, and percent depends on the property and its containing context.",
        },
      ),
      makeGuide(
        "Use viewport units when an element should respond to the size of the browser window.",
        [
          "The [[vw]] unit represents one percent of the viewport width, and [[vh]] represents one percent of the viewport height. For example, [[width: 80vw]] makes an element eighty percent of the viewport's width. These units are useful when a layout should respond to the visible browser area.",
          "Viewport units are not always the best choice for every dimension. A heading sized only with vw can become too small on a narrow screen or too large on a wide one. Use them for broad layout relationships, and combine them with sensible minimums or maximums when a design needs limits.",
        ],
        [
          { label: "Make a section fill the screen height", code: ".hero {\n  min-height: 100vh;\n}", detail: "The section is at least as tall as the viewport, giving the opening area room to fill the browser window." },
          { label: "Set a responsive width", code: ".reading-panel {\n  width: 80vw;\n  max-width: 48rem;\n}", detail: "The panel follows the viewport on smaller screens but stops growing after it reaches the chosen maximum width." },
        ],
        {
          question: "What does 100vw represent?",
          options: ["The full viewport width", "The root font size", "One hundred pixels"],
          correct: 0,
          explanation: "vw is based on the viewport width, so 100vw represents the full width of the browser viewport.",
        },
      ),
      makeGuide(
        "Combine relative and fixed units to build a layout that remains readable across different screens.",
        [
          "Choose a unit according to the thing that should control it. Text and general spacing often work well with rem, borders commonly use px, and a fluid container can use a percentage or a maximum width. A unitless [[line-height]] scales with the text size and helps paragraphs remain readable.",
          "A responsive design does not mean every value must be fluid. Some details should stay consistent while the main content adapts to the available space. Test the result at a narrow and a wide viewport, then adjust the units that cause awkward wrapping or excessive width.",
        ],
        [
          { label: "Build a flexible reading area", code: ".article {\n  width: 90%;\n  max-width: 44rem;\n  margin: 0 auto;\n}", detail: "The article uses most of a narrow screen but stops expanding when it reaches a comfortable reading width." },
          { label: "Keep text spacing proportional", code: ".article p {\n  font-size: 1rem;\n  line-height: 1.5;\n  margin-bottom: 1rem;\n}", detail: "The line height is proportional to the text size, and the bottom margin uses rem so the paragraph spacing stays in scale." },
        ],
        {
          question: "Which line-height value scales with the element's font size?",
          options: ["1.5", "24px", "100vw"],
          correct: 0,
          explanation: "A unitless line-height is a multiplier of the element's font size. Fixed pixels and viewport width do not scale the same way with text size.",
        },
      ),
    ],
    c17: [
      makeGuide(
        "Write a CSS comment with the correct opening and closing markers so it does not affect the stylesheet.",
        [
          "A CSS comment starts with [[/*]] and ends with [[*/]]. The browser ignores the text between those markers when applying styles. Comments are useful for short notes about a section or for explaining why a rule exists.",
          "CSS does not use JavaScript's [[//]] syntax for comments. A line that begins with two slashes is not safely ignored; it can become part of a selector or declaration and prevent a rule from working as expected.",
        ],
        [
          { label: "Add a short section note", code: "/* Primary navigation */\n.nav {\n  display: flex;\n}", detail: "The comment labels the section for the next person reading the stylesheet, and the rule below it remains active." },
          { label: "Comment out a temporary rule", code: "/*\n.legacy-banner {\n  display: none;\n}\n*/", detail: "The complete rule is inside the comment markers, so the browser ignores it until the closing marker is removed." },
        ],
        {
          question: "Which pair starts and ends a CSS comment?",
          options: ["/* and */", "// and newline", "<!-- and -->"],
          correct: 0,
          explanation: "CSS comments begin with slash-star and end with star-slash. The other pairs belong to other languages or markup contexts.",
        },
      ),
      makeGuide(
        "Use comments to explain design decisions instead of repeating what the CSS already says.",
        [
          "A useful comment explains why a value exists, records a browser workaround, or labels a larger section of the stylesheet. This kind of note helps another developer understand the intention behind the rule when the file changes later.",
          "A comment that says 'make the text red' above [[color: red]] does not add much information. Keep comments short and close to the code they explain. Remove old notes when the workaround or design decision no longer applies.",
        ],
        [
          { label: "Explain the reason for a value", code: "/* Keep the sticky header above the menu */\n.header {\n  z-index: 20;\n}", detail: "The comment records why the z-index is needed, which is more useful than simply saying that the header has a z-index." },
          { label: "Avoid narrating the property", code: "/* Set the text to green */\n.title {\n  color: green;\n}", detail: "This comment repeats the declaration. A better note would explain why this title uses that colour or remove the comment entirely." },
        ],
        {
          question: "Which comment is more useful to someone maintaining the stylesheet?",
          options: ["Explaining why a workaround is needed", "Repeating the exact property value", "Describing every closing brace"],
          correct: 0,
          explanation: "A reason or important context helps future changes. Repeating the code in words adds little information and becomes outdated easily.",
        },
      ),
      makeGuide(
        "Close every CSS comment so later rules remain active and easy to debug.",
        [
          "A CSS comment can continue across several lines, but the browser ignores everything from [[/*]] until the next [[*/]]. If that closing marker is missing, the browser may treat all following rules as part of the comment and stop applying them.",
          "When a style unexpectedly disappears, inspect the lines before it for an unfinished comment. A small punctuation mistake can affect many declarations below it, even when those declarations are written correctly.",
        ],
        [
          { label: "Close the comment before the next rule", code: "/* Header note */\n.header {\n  padding: 1rem;\n}\n\n.footer {\n  padding: 2rem;\n}", detail: "The comment ends before the header rule, so both the header and footer declarations are parsed normally." },
          { label: "Spot an unfinished comment", code: "/* Old header rule\n.header {\n  display: none;\n}\n\n.footer {\n  display: block;\n}", detail: "Without a closing marker, the footer rule remains inside the comment and never becomes an active CSS rule." },
        ],
        {
          question: "What happens when a CSS comment is never closed?",
          options: ["The following stylesheet text is treated as part of the comment", "The browser closes it at every line break", "All colours become transparent"],
          correct: 0,
          explanation: "A CSS comment continues until the closing star-slash marker. If it is missing, the browser ignores the following text as part of the comment.",
        },
      ),
    ],
  },
  java: {
    j3: [
      makeGuide(
        "Read a Java method declaration by identifying its return type, name, parameters, and body.",
        [
          "A method groups instructions under a name so the program can call that work when it is needed. A declaration includes a return type, a method name, parameters inside parentheses, and a body inside braces. The return type describes the value the method sends back.",
          "A parameter is a named input listed in the declaration. An argument is the actual value supplied when the method is called. The types and number of arguments must fit the method's parameter list, or the compiler reports a problem.",
        ],
        [
          { label: "Declare a method with two inputs", code: "static int add(int first, int second) {\n    return first + second;\n}", detail: "static int describes the method's return type and modifier, add is its name, and the two int parameters are the inputs it expects." },
          { label: "Call the method", code: "int total = add(4, 6);\nSystem.out.println(total);", detail: "The values 4 and 6 are arguments. The method returns 10, which is stored in total and then printed." },
        ],
        {
          question: "In static int add(int first, int second), what does the int before add describe?",
          options: ["The method's return type", "The number of arguments", "The name of the method"],
          correct: 0,
          explanation: "The return type appears before the method name. It tells Java what kind of value the method is expected to return.",
        },
      ),
      makeGuide(
        "Pass information into a method through parameters and use arguments when calling it.",
        [
          "Parameters are variables declared in a method's parentheses. They give the method names for the information it receives. A call supplies arguments in the matching order, unless the language or API provides another way to specify them.",
          "Each call gets its own parameter values. If a method expects an int and a String, the call must provide compatible values in that order. Use meaningful parameter names so someone reading the method can understand what each input represents.",
        ],
        [
          { label: "Give the method two parameters", code: "static void greet(String name, int visits) {\n    System.out.println(\"Welcome, \" + name);\n    System.out.println(\"Visit number \" + visits);\n}", detail: "The method expects a name first and a visit count second. Those parameter names describe the information the body uses." },
          { label: "Supply matching arguments", code: "greet(\"Mina\", 3);", detail: "The string is passed to name and the integer is passed to visits. Reversing the argument order would not match the declared parameter types." },
        ],
        {
          question: "For greet(String name, int visits), which call supplies arguments in the correct order?",
          options: ["greet(\"Mina\", 3)", "greet(3, \"Mina\")", "greet(\"Mina\")"],
          correct: 0,
          explanation: "The first argument must match the String parameter and the second must match the int parameter. The other calls use the wrong order or leave out an argument.",
        },
      ),
      makeGuide(
        "Distinguish a method that returns a value from one that performs an action and returns nothing.",
        [
          "A method with a value return type uses [[return]] to send a result to its caller. The caller can store that value, print it, or use it in another expression. A method declared [[void]] does not provide a result for the caller to use.",
          "Printing a value and returning a value are different actions. [[System.out.println()]] displays text in the console, while [[return]] transfers a result back to the place that called the method. Choose based on what the rest of the program needs.",
        ],
        [
          { label: "Return a calculation", code: "static int doubleIt(int value) {\n    return value * 2;\n}", detail: "The method sends the doubled integer back, so another part of the program can decide what to do with the result." },
          { label: "Use the returned result", code: "int answer = doubleIt(6);\nSystem.out.println(answer);", detail: "The call produces 12, stores it in answer, and then prints it. The method itself does not need to print anything." },
        ],
        {
          question: "Which keyword sends a value back from a non-void Java method?",
          options: ["return", "echo", "print"],
          correct: 0,
          explanation: "return ends the method and sends a value to its caller. Java uses System.out.println to display text, and echo is not a Java keyword.",
        },
      ),
    ],
    j4: [
      makeGuide(
        "Use if and else to choose between two paths based on a boolean condition.",
        [
          "An [[if]] statement runs its block only when its condition evaluates to [[true]]. An [[else]] block provides the alternative path when that condition is false. Java conditions must be boolean expressions, so a number cannot be used as a shortcut for true or false.",
          "The braces mark the instructions that belong to each path. Keep them even for a one-line block, because adding another instruction later is less likely to change which statements depend on the condition.",
        ],
        [
          { label: "Check a score", code: "int score = 72;\n\nif (score >= 70) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Try again\");\n}", detail: "The comparison produces true because 72 is at least 70, so Java runs the first block and skips the else block." },
          { label: "Use the other path", code: "int score = 55;\n\nif (score >= 70) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Try again\");\n}", detail: "The condition is false for 55, so the else block runs. Exactly one of these two paths is chosen." },
        ],
        {
          question: "What type of expression must appear inside a Java if condition?",
          options: ["A boolean expression", "Any text value", "A variable name with no value"],
          correct: 0,
          explanation: "Java requires the condition to evaluate to true or false. Unlike some languages, it does not treat numbers or strings as truthy values.",
        },
      ),
      makeGuide(
        "Order else-if branches from the most specific or highest threshold to the fallback.",
        [
          "Use [[else if]] when a decision has more than two possible paths. Java checks the conditions from top to bottom and runs the first block whose condition is true. Once a branch runs, the remaining branches in that chain are skipped.",
          "Put more demanding conditions before broader ones. For example, test for 90 or higher before testing for 70 or higher. If the broader condition comes first, a score of 95 would match it and never reach the higher-grade branch.",
        ],
        [
          { label: "Check the higher threshold first", code: "if (score >= 90) {\n    grade = \"A\";\n} else if (score >= 70) {\n    grade = \"B\";\n} else {\n    grade = \"C\";\n}", detail: "The 90-point check gets the first chance. Scores from 70 through 89 reach the second branch, and lower scores use else." },
          { label: "Follow the matching branch", code: "int score = 95;\n// The first condition is true, so grade becomes A.", detail: "Because the first condition matches, Java skips the B and C branches. A higher score is not accidentally caught by the lower threshold." },
        ],
        {
          question: "Why should score >= 90 come before score >= 70 in a grade chain?",
          options: ["So higher scores reach the A branch first", "Because Java requires numbers in descending order", "So every branch runs"],
          correct: 0,
          explanation: "Java stops at the first true branch. If the 70 check appears first, a score of 95 would match it and never reach the 90 check.",
        },
      ),
      makeGuide(
        "Combine boolean conditions with &&, ||, and ! to express a decision with more than one requirement.",
        [
          "[[&&]] means both conditions must be true. [[||]] means at least one condition must be true, and [[!]] reverses a boolean value. These operators let an if statement express a rule that depends on several pieces of information.",
          "Use parentheses when a condition becomes hard to read. For example, a person might need to be at least 18 and either have a pass or be accompanied by a guardian. Clear grouping makes it easier to check that the code matches the actual rule.",
        ],
        [
          { label: "Require two conditions", code: "int age = 20;\nboolean hasTicket = true;\n\nif (age >= 18 && hasTicket) {\n    System.out.println(\"Entry allowed\");\n}", detail: "Both age and ticket checks must be true. If either check fails, the body is skipped." },
          { label: "Allow either of two paths", code: "boolean isMember = false;\nboolean hasGuestPass = true;\n\nif (isMember || hasGuestPass) {\n    System.out.println(\"Welcome\");\n}", detail: "Only one of the two conditions needs to be true, so the guest pass is enough to enter this branch." },
        ],
        {
          question: "Which operator requires both connected conditions to be true?",
          options: ["&&", "||", "!"],
          correct: 0,
          explanation: "&& is logical AND and requires both sides to be true. || accepts either side, while ! reverses a boolean value.",
        },
      ),
    ],
    j5: [
      makeGuide(
        "Use a for loop when you know the starting value, stopping condition, and update for a repeated task.",
        [
          "A classic [[for]] loop has three parts in its parentheses: an initial value, a condition, and an update. Java checks the condition before each pass. When the condition becomes false, the loop ends and execution continues after its closing brace.",
          "Counting loops often start at zero and use [[i < limit]] when the intended values should stop before the limit. This pattern is useful when working with positions in arrays, because the first array index is zero and the final valid index is one less than the length.",
        ],
        [
          { label: "Set up the counter", code: "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}", detail: "The loop starts at zero, checks whether i is below five, prints it, and then increases i by one." },
          { label: "Read the output", code: "0\n1\n2\n3\n4", detail: "The loop prints five values. When i becomes five, the condition i < 5 is false and another pass does not begin." },
        ],
        {
          question: "How many times does for (int i = 0; i < 4; i++) run?",
          options: ["Four times", "Five times", "It never runs"],
          correct: 0,
          explanation: "The counter values are 0, 1, 2, and 3. When it becomes 4, the condition is false, so the body has run four times.",
        },
      ),
      makeGuide(
        "Use a while loop when repetition should continue until a condition changes.",
        [
          "A [[while]] loop checks its condition before each pass. If the condition is true, the body runs; if it is false at the start, the body is skipped. This makes while useful when the number of repetitions depends on something that changes during the program.",
          "The body should update the value that controls the condition or provide another clear way to stop. If nothing changes, the condition can remain true forever and the program will not reach the code after the loop.",
        ],
        [
          { label: "Count down toward the exit condition", code: "int count = 3;\n\nwhile (count > 0) {\n    System.out.println(count);\n    count--;\n}", detail: "The variable decreases after each print. When it reaches zero, count > 0 is false and the loop stops." },
          { label: "Check before running", code: "int count = 0;\nwhile (count > 0) {\n    System.out.println(count);\n}", detail: "The condition is false immediately, so the body runs zero times. A while loop does not guarantee even one pass." },
        ],
        {
          question: "What must happen for a counting while loop to finish?",
          options: ["Its condition must eventually become false", "Its variable must never change", "It must always contain a print statement"],
          correct: 0,
          explanation: "The loop stops when the condition evaluates to false. Updating the value used by the condition is a common way to make that happen.",
        },
      ),
      makeGuide(
        "Use an enhanced for loop to visit every item in an array when you do not need its index.",
        [
          "Java's enhanced [[for]] loop reads each item from an array or collection in order. It creates a loop variable that holds the current item on each pass, so you do not need to manage a numeric index yourself.",
          "Use the classic for loop when the position matters or when you need to change the index deliberately. Use enhanced for when the task is simply to process each value. Avoid adding or removing items from a collection while iterating over it with this loop.",
        ],
        [
          { label: "Visit each name", code: "String[] names = {\"Ada\", \"Grace\", \"Linus\"};\n\nfor (String name : names) {\n    System.out.println(name);\n}", detail: "The loop assigns each array value to name in order, so the body runs once for Ada, once for Grace, and once for Linus." },
          { label: "Use a classic loop when the index matters", code: "for (int i = 0; i < names.length; i++) {\n    System.out.println((i + 1) + \". \" + names[i]);\n}", detail: "This version exposes the position i, so it can add numbering to each item. It is a better fit when the index is part of the task." },
        ],
        {
          question: "Which loop is simplest when you only need to print every value in an array?",
          options: ["Enhanced for loop", "A while loop with no update", "An if statement"],
          correct: 0,
          explanation: "The enhanced for loop visits every array value without requiring a separate index. Choose a classic loop only when you need the position or more control over counting.",
        },
      ),
    ],
  },
  python: {
    p3: [
      makeGuide(
        "Use if, elif, and else to select one path based on the value of a condition.",
        [
          "Python uses [[if]] to test the first condition, [[elif]] to test another condition when earlier ones were false, and [[else]] as the fallback. A colon ends each condition line, and the indented lines beneath it form that branch's block.",
          "Indentation is part of Python's syntax, not merely a formatting preference. Keep the statements in each branch aligned, and use the same indentation width throughout the block. Four spaces is the common convention.",
        ],
        [
          { label: "Create a decision chain", code: "score = 72\n\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")", detail: "Python checks the A threshold first, then the B threshold, and uses C only when neither earlier condition is true." },
          { label: "Read the branch result", code: "score = 72\n# The program prints B", detail: "The first condition is false and the second is true, so the program runs the B branch and skips the fallback." },
        ],
        {
          question: "Which keyword checks another condition after an earlier if condition was false?",
          options: ["elif", "elseif", "otherwise"],
          correct: 0,
          explanation: "Python uses elif for an additional condition in the same decision chain. elseif belongs to other languages, and otherwise is not a Python keyword.",
        },
      ),
      makeGuide(
        "Compare values with == and use is when you need to check object identity, such as None.",
        [
          "The [[==]] operator asks whether two values are equal. The [[is]] operator asks whether two names refer to the very same object. For strings, numbers, and most ordinary comparisons, use == because the value is what matters.",
          "Python has one special value named [[None]] to represent the absence of a value. The conventional test is [[value is None]]. This is a clear identity check for that singleton value and avoids confusing object identity with ordinary text equality.",
        ],
        [
          { label: "Compare ordinary values", code: "role = \"admin\"\n\nif role == \"admin\":\n    print(\"Welcome\")", detail: "The program compares the contents of role with the text admin, which is what this decision needs." },
          { label: "Check for no value", code: "user = None\n\nif user is None:\n    print(\"No user selected\")", detail: "None is a singleton in Python, so is None is the standard, readable way to test whether the value is absent." },
        ],
        {
          question: "Which condition is the conventional way to check whether user has no value?",
          options: ["user is None", "user == \"None\"", "user = None"],
          correct: 0,
          explanation: "Use is None to test the special None value. The string \"None\" is ordinary text, and a single equals sign is assignment rather than comparison.",
        },
      ),
      makeGuide(
        "Combine conditions with and, or, and not to describe a rule that depends on several values.",
        [
          "[[and]] requires both sides to be true, [[or]] requires at least one side to be true, and [[not]] reverses a truth value. These operators let a single if condition express a practical rule such as being old enough and having permission.",
          "Read a combined condition in small parts. When a decision has several parts, use parentheses to make the intended groups obvious. This makes the rule easier to review and reduces the chance that an or accidentally allows a case that should have been blocked.",
        ],
        [
          { label: "Require both checks", code: "age = 20\nhas_ticket = True\n\nif age >= 18 and has_ticket:\n    print(\"Entry allowed\")", detail: "The person must meet the age check and have a ticket. If either condition is false, the message is not printed." },
          { label: "Allow either of two options", code: "is_member = False\nhas_guest_pass = True\n\nif is_member or has_guest_pass:\n    print(\"Welcome\")", detail: "Only one condition needs to be true, so a guest pass is enough to enter this branch." },
        ],
        {
          question: "Which operator requires both connected conditions to be true?",
          options: ["and", "or", "not"],
          correct: 0,
          explanation: "and requires both conditions to be true. or accepts either one, while not reverses the truth value of the expression that follows it.",
        },
      ),
    ],
    p4: [
      makeGuide(
        "Use for with range when you need to repeat an action for a sequence of counting values.",
        [
          "A Python [[for]] loop takes each item from an iterable and assigns it to the loop variable. [[range(5)]] produces the counting values 0 through 4. The ending number is not included, which makes range useful for repeating an action a known number of times.",
          "The variable after for is created for the loop's current item. The indented body runs once for each value. Choose a meaningful variable name so it is easy to tell what one pass through the loop is processing.",
        ],
        [
          { label: "Repeat five times", code: "for number in range(5):\n    print(number)", detail: "range(5) supplies 0, 1, 2, 3, and 4. The print statement runs once for each number." },
          { label: "Choose a different starting point", code: "for number in range(1, 4):\n    print(number)", detail: "With a start and stop value, range begins at 1 and stops before 4, so it prints 1, 2, and 3." },
        ],
        {
          question: "What values does range(3) produce?",
          options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3"],
          correct: 0,
          explanation: "range starts at zero by default and stops before its argument, so range(3) supplies 0, 1, and 2.",
        },
      ),
      makeGuide(
        "Loop through a list to process each item without manually looking up its position.",
        [
          "A list is iterable, so a [[for]] loop can take its values one at a time. The loop variable receives the current item, and the indented body processes it before the next item is assigned.",
          "Do not remove items from the same list while looping over it. Removing an item changes the positions of the remaining values and can cause the loop to skip an item. When filtering, build a new list instead of changing the sequence under the loop.",
        ],
        [
          { label: "Process each item", code: "names = [\"Ada\", \"Grace\", \"Linus\"]\n\nfor name in names:\n    print(\"Hello, \" + name)", detail: "The loop reads each name in the list and uses it to build one greeting. No index variable is needed." },
          { label: "Build a filtered list", code: "scores = [82, 55, 91, 68]\npassed = []\n\nfor score in scores:\n    if score >= 70:\n        passed.append(score)", detail: "The loop checks each score and appends passing values to a new list, leaving the original scores list unchanged." },
        ],
        {
          question: "What is a safer approach when you want to keep only some values from a list?",
          options: ["Build a new filtered list", "Remove items from the list during the same loop", "Skip the loop variable"],
          correct: 0,
          explanation: "Building a new list avoids shifting the original items while the loop is visiting them. Removing values during iteration can make the loop skip elements.",
        },
      ),
      makeGuide(
        "Use while when a loop should continue until a changing condition becomes false.",
        [
          "A [[while]] loop repeats as long as its condition is true. Unlike a for loop over a known sequence, it does not automatically move to the next item. The body must update the value that controls the condition or have another way to stop.",
          "A common mistake is to forget the update. If a counter starts at three and the body never decreases it, the condition remains true forever. Before running a while loop, identify what will eventually make its condition false.",
        ],
        [
          { label: "Update the counter", code: "count = 3\n\nwhile count > 0:\n    print(count)\n    count -= 1", detail: "The counter decreases after every pass. Once it reaches zero, the condition is false and the loop ends." },
          { label: "Recognise a missing update", code: "count = 3\n\nwhile count > 0:\n    print(count)", detail: "Nothing changes count, so count > 0 remains true and the same value is printed repeatedly. Add an update or a clear exit condition." },
        ],
        {
          question: "What is missing from a counting while loop that never stops?",
          options: ["An update that can make the condition false", "A second print statement", "A different variable name"],
          correct: 0,
          explanation: "The condition needs a way to become false. Updating the counter or using another valid exit condition prevents an endless loop.",
        },
      ),
    ],
    p5: [
      makeGuide(
        "Define a Python function with def and return a value that the caller can use.",
        [
          "The [[def]] keyword creates a function and gives it a name. The function body is indented beneath the definition. A function can accept inputs through parameters and send a result back to the caller with [[return]].",
          "Printing and returning are different. [[print()]] displays something, while [[return]] gives a value back to the code that called the function. A function that reaches its end without returning a value gives back [[None]].",
        ],
        [
          { label: "Define a reusable calculation", code: "def double(number):\n    return number * 2", detail: "The function receives one argument through number, multiplies it by two, and returns the result without printing it." },
          { label: "Store the returned result", code: "answer = double(6)\nprint(answer)", detail: "Calling double with 6 returns 12. The caller stores that value in answer and decides when to display it." },
        ],
        {
          question: "Which keyword sends a value back from a Python function?",
          options: ["return", "print", "def"],
          correct: 0,
          explanation: "return sends the result to the caller. print displays text, and def begins a function definition.",
        },
      ),
      makeGuide(
        "Pass arguments into parameters and use default values when an input should be optional.",
        [
          "A parameter is the name written in a function definition; an argument is the value supplied when the function is called. Positional arguments match parameters by order, while keyword arguments match them by name. Clear names make calls easier to understand.",
          "A default value is used when the caller leaves that argument out. This is useful for a greeting with a standard name or a setting with a normal value. Keep required parameters before parameters that have defaults so calls remain clear.",
        ],
        [
          { label: "Give a parameter a default", code: "def greet(name=\"friend\"):\n    return \"Hello, \" + name", detail: "When no name is supplied, Python uses friend. The caller can still pass a different name when needed." },
          { label: "Call with and without an argument", code: "print(greet())\nprint(greet(\"Mina\"))", detail: "The first call uses the default value. The second supplies Mina, so the greeting uses that name instead." },
        ],
        {
          question: "What happens when greet(name=\"friend\") is called with no argument?",
          options: ["name receives \"friend\"", "The function cannot run", "name becomes an empty list"],
          correct: 0,
          explanation: "The default value is used when the caller omits that argument. Passing a name replaces the default for that call.",
        },
      ),
      makeGuide(
        "Keep temporary variables inside a function and return the result that code outside the function needs.",
        [
          "A variable created inside a function is local to that function. It can hold a temporary value used while the function works, but code outside the function cannot normally access that local name directly after the call finishes.",
          "Return the finished result rather than relying on a caller to reach into the function's internal steps. This keeps the function's interface simple: the caller supplies inputs and receives an output, while the calculation details remain inside.",
        ],
        [
          { label: "Use a local helper value", code: "def make_label(name):\n    greeting = \"Hello\"\n    return greeting + \", \" + name + \"!\"", detail: "greeting is a temporary local variable. The function combines it with the supplied name and returns the completed message." },
          { label: "Use the result outside", code: "message = make_label(\"Mina\")\nprint(message)", detail: "The caller receives the returned message. It does not need to know or access the local greeting variable used inside the function." },
        ],
        {
          question: "How should code outside a function receive a calculated result?",
          options: ["Use the value returned by the function", "Read every local variable inside it", "Use the function's indentation"],
          correct: 0,
          explanation: "The function should return the result that its caller needs. Variables that are local to the function are not directly available outside its scope.",
        },
      ),
    ],
  },
  javascript: {
    js3: [
      makeGuide(
        "Recognise strings, numbers, and booleans so values are used with the right kind of operation.",
        [
          "A [[string]] stores text, a [[number]] stores numeric values, and a [[boolean]] stores either [[true]] or [[false]]. JavaScript uses the number type for both whole numbers and decimal numbers, so you do not need a separate integer type for ordinary values.",
          "The [[typeof]] operator helps inspect a value while learning or debugging. It returns a string such as \"string\", \"number\", or \"boolean\". Quotation marks matter: [[\"42\"]] is text, while [[42]] is a number that can take part in arithmetic.",
        ],
        [
          { label: "Create values of different types", code: "const name = \"Ada\";\nconst score = 42;\nconst isReady = true;", detail: "The first value is text, the second is numeric, and the third records a true-or-false state." },
          { label: "Inspect each type", code: "console.log(typeof name);\nconsole.log(typeof score);\nconsole.log(typeof isReady);", detail: "The console reports string, number, and boolean. This helps reveal whether a value is stored in the form the next operation expects." },
        ],
        {
          question: "What is the type of the value 42 when it is written without quotation marks?",
          options: ["number", "string", "boolean"],
          correct: 0,
          explanation: "42 without quotes is a numeric value. Writing \"42\" makes it a string, while true and false are boolean values.",
        },
      ),
      makeGuide(
        "Distinguish undefined from null and use the correct check when a value is absent.",
        [
          "[[undefined]] often appears when a variable has been declared but no value was assigned, or when a lookup does not produce a value. [[null]] is a value that can be assigned deliberately to represent an intentional absence, such as a user who has not been selected.",
          "They are both used for absent values, but they are not identical. One historical quirk is that [[typeof null]] returns \"object\". To check for null, compare directly with [[=== null]] instead of relying on typeof.",
        ],
        [
          { label: "Leave a value unassigned", code: "let searchResult;\nconsole.log(searchResult);", detail: "The variable exists, but no value has been assigned, so reading it produces undefined." },
          { label: "Mark an intentional absence", code: "const selectedUser = null;\nconsole.log(selectedUser === null);", detail: "The program explicitly stores null and checks for that exact value. The comparison returns true." },
        ],
        {
          question: "Which expression checks whether selectedUser is exactly null?",
          options: ["selectedUser === null", "typeof selectedUser === \"null\"", "selectedUser = null"],
          correct: 0,
          explanation: "Use strict equality with null. typeof null returns \"object\", while a single equals sign assigns a value instead of checking it.",
        },
      ),
      makeGuide(
        "Convert text into numbers deliberately and detect failed conversions with Number.isNaN.",
        [
          "Values from a form or prompt often arrive as strings. Use [[Number()]] when a numeric calculation needs a number, and use [[String()]] when a value needs to become text. Converting before the operation makes the expected result easier to understand.",
          "A conversion can fail and produce [[NaN]], which stands for Not-a-Number. NaN has a special rule: it is not equal to itself, so [[value === NaN]] never works. Use [[Number.isNaN(value)]] to check whether a conversion produced NaN.",
        ],
        [
          { label: "Convert numeric text before calculating", code: "const rawQuantity = \"3\";\nconst quantity = Number(rawQuantity);\nconst total = quantity * 4;\nconsole.log(total);", detail: "Number changes the text \"3\" into the numeric value 3. Multiplying by four then produces the number 12." },
          { label: "Handle text that is not numeric", code: "const quantity = Number(\"three\");\nconsole.log(Number.isNaN(quantity));", detail: "The word three cannot be converted into a number, so the result is NaN and Number.isNaN reports true." },
        ],
        {
          question: "Which method correctly checks whether a value is NaN?",
          options: ["Number.isNaN(value)", "value === NaN", "typeof value === \"NaN\""],
          correct: 0,
          explanation: "Number.isNaN is the reliable check for NaN. NaN is not equal to itself, and typeof reports the broad type rather than the special value.",
        },
      ),
    ],
    js4: [
      makeGuide(
        "Use if and else to run one of two blocks depending on whether a condition is truthy.",
        [
          "An [[if]] statement checks a condition and runs its block when the result is truthy. An [[else]] block handles the alternative when the condition is falsy. Curly braces group the statements that belong to each branch.",
          "Use a comparison such as [[score >= 70]] when you need to test a value. A single equals sign assigns a value instead of comparing it, so using it inside a condition can change the variable and make the condition unexpectedly true.",
        ],
        [
          { label: "Check a score", code: "const score = 72;\n\nif (score >= 70) {\n    console.log(\"Pass\");\n} else {\n    console.log(\"Try again\");\n}", detail: "The comparison is true because 72 is at least 70, so the first block runs and the else block is skipped." },
          { label: "See the other branch", code: "const score = 55;\n\nif (score >= 70) {\n    console.log(\"Pass\");\n} else {\n    console.log(\"Try again\");\n}", detail: "The condition is false for 55, so JavaScript runs the fallback block instead." },
        ],
        {
          question: "Which operator compares two values for strict equality in JavaScript?",
          options: ["===", "=", "=>"],
          correct: 0,
          explanation: "=== compares value and type without coercion. A single equals sign assigns a value, and => is used in arrow function syntax.",
        },
      ),
      makeGuide(
        "Order else-if conditions so a value is tested against the most specific threshold first.",
        [
          "An [[else if]] adds another condition to an if statement. JavaScript checks the branches from top to bottom and runs only the first branch whose condition is truthy. If none match, the final else block runs.",
          "Place higher thresholds before lower ones. If the condition for 70 is checked before the condition for 90, then a score of 95 already passes the first test and never reaches the A branch. The order of the conditions changes the outcome.",
        ],
        [
          { label: "Check the highest grade first", code: "const score = 95;\nlet grade;\n\nif (score >= 90) {\n    grade = \"A\";\n} else if (score >= 70) {\n    grade = \"B\";\n} else {\n    grade = \"C\";\n}\n\nconsole.log(grade);", detail: "The score and grade variables are declared first. A score of 95 matches the first condition, so grade becomes A." },
          { label: "Try a score in the next range", code: "const score = 72;\nlet grade;\n\nif (score >= 90) {\n    grade = \"A\";\n} else if (score >= 70) {\n    grade = \"B\";\n} else {\n    grade = \"C\";\n}\n\nconsole.log(grade);", detail: "A score of 72 misses the first threshold but meets the second, so the program prints B." },
        ],
        {
          question: "Why should the 90-point condition appear before the 70-point condition?",
          options: ["A score of 95 should match the A branch first", "JavaScript requires conditions to be sorted", "Every branch must run once"],
          correct: 0,
          explanation: "Only the first true branch runs. If 70 is checked first, a score of 95 matches it and never reaches the higher threshold.",
        },
      ),
      makeGuide(
        "Combine conditions with && and || when a decision depends on more than one piece of information.",
        [
          "[[&&]] means both conditions must be truthy, while [[||]] means at least one condition must be truthy. For example, a visitor might need to be at least 18 and have a ticket, or a user might be a member or have a guest pass.",
          "Use parentheses when a decision contains several operators so the grouping is visible. Also remember that JavaScript has truthy and falsy values: zero, an empty string, null, undefined, and false are falsy, while empty arrays and objects are truthy.",
        ],
        [
          { label: "Require both conditions", code: "const age = 20;\nconst hasTicket = true;\n\nif (age >= 18 && hasTicket) {\n    console.log(\"Entry allowed\");\n}", detail: "Both the age check and ticket check must pass. If either one is false, the body is skipped." },
          { label: "Allow one of two options", code: "const isMember = false;\nconst hasGuestPass = true;\n\nif (isMember || hasGuestPass) {\n    console.log(\"Welcome\");\n}", detail: "Only one condition needs to be true. The guest pass is enough even though isMember is false." },
        ],
        {
          question: "Which operator requires both connected conditions to be true?",
          options: ["&&", "||", "!"],
          correct: 0,
          explanation: "&& is logical AND and requires both sides to be truthy. || accepts either side, while ! reverses a truth value.",
        },
      ),
    ],
    js5: [
      makeGuide(
        "Use a for loop to repeat a task with a counter that has a clear start, condition, and update.",
        [
          "A classic [[for]] loop has three parts: an initial value, a condition, and an update. JavaScript checks the condition before each pass. If it is true, the body runs and then the update executes before the next check.",
          "Counting from zero up to but not including five uses [[i < 5]]. This produces five passes with the values zero through four. The stopping condition matters because using [[<=]] would include five as an additional pass.",
        ],
        [
          { label: "Write the counting loop", code: "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}", detail: "The counter starts at zero, increases after each pass, and the loop stops when i becomes five." },
          { label: "Read the result", code: "0\n1\n2\n3\n4", detail: "The condition is checked before the body, so five is never printed when the condition uses less-than rather than less-than-or-equal." },
        ],
        {
          question: "What values are printed by for (let i = 1; i < 4; i++)?",
          options: ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2, 3"],
          correct: 0,
          explanation: "The loop starts at one and stops before four. It therefore prints 1, 2, and 3.",
        },
      ),
      makeGuide(
        "Use while when a repeated task should continue until its condition becomes false.",
        [
          "A [[while]] loop checks its condition before every pass. When the condition is true, the body runs. When it becomes false, the loop ends and the program continues after the closing brace.",
          "Update the value that controls the condition inside the body, or provide another clear exit. If a counter never changes, the condition may stay true and the loop will keep running. Test the start value and update together before using a while loop.",
        ],
        [
          { label: "Decrease the counter", code: "let count = 3;\n\nwhile (count > 0) {\n    console.log(count);\n    count--;\n}", detail: "The counter decreases on each pass. When it reaches zero, the condition is false and JavaScript leaves the loop." },
          { label: "Understand the exit condition", code: "let count = 0;\nwhile (count > 0) {\n    console.log(count);\n}", detail: "The condition is false before the first pass, so the body does not run at all." },
        ],
        {
          question: "What makes a while loop stop?",
          options: ["Its condition becomes false", "The body contains console.log", "The variable name is changed"],
          correct: 0,
          explanation: "JavaScript checks the condition before each pass. When the result becomes false, the loop exits.",
        },
      ),
      makeGuide(
        "Choose for...of to read array values and understand that for...in gives object keys.",
        [
          "The [[for...of]] loop visits values from an iterable such as an array or string. The loop variable receives each value, which makes it a convenient choice when you simply need to process every array item.",
          "The [[for...in]] loop visits enumerable property keys of an object. On an array, those keys are usually index strings rather than the actual values. Use for...of for ordinary array iteration so the loop variable contains each item directly.",
        ],
        [
          { label: "Visit array values", code: "const colors = [\"red\", \"blue\", \"green\"];\n\nfor (const color of colors) {\n    console.log(color);\n}", detail: "The loop variable receives red, then blue, then green. The body works with the values themselves." },
          { label: "See the keys instead", code: "for (const index in colors) {\n    console.log(index);\n}", detail: "This loop prints keys such as 0, 1, and 2. It does not place red, blue, and green in the index variable." },
        ],
        {
          question: "Which loop is usually the right choice when you need each value from an array?",
          options: ["for...of", "for...in", "if...else"],
          correct: 0,
          explanation: "for...of iterates the values of an array. for...in iterates enumerable keys, which is usually not what you want for a simple value-by-value pass.",
        },
      ),
    ],
  },
  php: {
    php3: [
      makeGuide(
        "Use if, elseif, and else to choose a PHP code path based on a condition.",
        [
          "PHP uses [[if]] to test a condition, [[elseif]] to test another possibility, and [[else]] as the fallback. The statements belonging to each branch go inside braces. Only the first branch whose condition is true runs.",
          "Comparison operators such as [[>=]], [[<]], and [[===]] help build conditions. Use [[===]] when both the value and its type should match. A single equals sign is assignment, so it should not be used when the goal is to compare two values.",
        ],
        [
          { label: "Check a score", code: "<?php\n$score = 72;\n\nif ($score >= 90) {\n    echo \"A\";\n} elseif ($score >= 70) {\n    echo \"B\";\n} else {\n    echo \"C\";\n}", detail: "PHP checks the score from top to bottom. A score of 72 fails the first condition and matches the second one." },
          { label: "Use the fallback", code: "<?php\n$score = 55;\n\nif ($score >= 70) {\n    echo \"Pass\";\n} else {\n    echo \"Try again\";\n}", detail: "The condition is false for 55, so the else block runs. It handles values that do not meet the requirement." },
        ],
        {
          question: "Which keyword adds another condition after an if branch in PHP?",
          options: ["elseif", "elif", "otherwise"],
          correct: 0,
          explanation: "PHP uses elseif, which can be followed by more elseif branches and an optional else. elif is used by Python instead.",
        },
      ),
      makeGuide(
        "Use strict comparisons when a PHP condition should match both the value and its type.",
        [
          "PHP's [[==]] operator allows type juggling, which means PHP may convert values before comparing them. The [[===]] operator is stricter: the values and their types must match. This distinction matters when values come from forms or other external input.",
          "For predictable conditions, prefer === unless a conversion is intentional. For example, the text \"5\" and the integer 5 may compare as equal with ==, but they are not identical with ===. Being explicit helps avoid branches running for a value you did not expect.",
        ],
        [
          { label: "Compare a role strictly", code: "<?php\n$role = \"admin\";\n\nif ($role === \"admin\") {\n    echo \"Welcome\";\n}", detail: "Both sides are strings with the same contents, so the strict comparison is true and the welcome message is printed." },
          { label: "Notice the type difference", code: "<?php\n$input = \"5\";\n\nvar_dump($input == 5);\nvar_dump($input === 5);", detail: "The loose comparison can treat the text as a number, while the strict comparison sees that one value is a string and the other is an integer." },
        ],
        {
          question: "Which operator checks that both the value and type match in PHP?",
          options: ["===", "=", "!="],
          correct: 0,
          explanation: "=== is strict equality. A single equals sign assigns a value, and != checks inequality rather than strict equality.",
        },
      ),
      makeGuide(
        "Combine PHP conditions with &&, ||, and ! to express rules involving more than one requirement.",
        [
          "[[&&]] requires both conditions to be true. [[||]] allows either condition to be true, and [[!]] reverses a boolean result. These operators let a program check more than one part of a decision without writing deeply nested if statements.",
          "Think about whether a rule needs every requirement or only one of several options. If both age and permission are required, use &&. If either a membership card or guest pass is enough, use ||. Parentheses can make mixed conditions easier to read.",
        ],
        [
          { label: "Require both conditions", code: "<?php\n$age = 20;\n$hasTicket = true;\n\nif ($age >= 18 && $hasTicket) {\n    echo \"Entry allowed\";\n}", detail: "The visitor must be at least 18 and have a ticket. If either condition is false, the body does not run." },
          { label: "Allow either path", code: "<?php\n$isMember = false;\n$hasGuestPass = true;\n\nif ($isMember || $hasGuestPass) {\n    echo \"Welcome\";\n}", detail: "Only one of the conditions must be true, so the guest pass is enough even though isMember is false." },
        ],
        {
          question: "Which operator should you use when both conditions must be true?",
          options: ["&&", "||", "!"],
          correct: 0,
          explanation: "&& means logical AND and requires both conditions to be true. || allows either side, while ! reverses the result.",
        },
      ),
    ],
    php4: [
      makeGuide(
        "Use a for loop when you want to repeat a block with a counter and a clear stopping point.",
        [
          "A PHP [[for]] loop has three parts: an initial value, a condition, and an update. The condition is checked before each pass. When the condition becomes false, the loop stops and execution continues after its closing brace.",
          "A common counting pattern starts at zero and uses [[$i < 5]] to run five times. The update [[$i++]] increases the counter after each pass. Make sure the condition and update work together so the loop can eventually finish.",
        ],
        [
          { label: "Count from zero to four", code: "<?php\nfor ($i = 0; $i < 5; $i++) {\n    echo $i;\n}", detail: "The loop starts at zero, checks whether i is below five, prints the current value, and increments it." },
          { label: "Change the starting and stopping values", code: "<?php\nfor ($i = 1; $i <= 3; $i++) {\n    echo $i;\n}", detail: "This loop starts at one and includes three because its condition uses less-than-or-equal." },
        ],
        {
          question: "How many times does for ($i = 0; $i < 4; $i++) run?",
          options: ["Four times", "Five times", "It never runs"],
          correct: 0,
          explanation: "The counter values are 0, 1, 2, and 3. When it becomes 4, the condition is false and another pass does not begin.",
        },
      ),
      makeGuide(
        "Choose while or do-while depending on whether the loop should check its condition before or after the first pass.",
        [
          "A [[while]] loop checks its condition first. If the condition is false at the beginning, its body does not run. A [[do-while]] loop runs its body once before checking the condition, so it is useful when one attempt must happen before deciding whether to repeat.",
          "Both loops need a clear stopping condition. Update a counter or change the value being tested inside the body. If the condition never becomes false, the loop will continue for longer than intended.",
        ],
        [
          { label: "Check before each pass", code: "<?php\n$count = 3;\n\nwhile ($count > 0) {\n    echo $count;\n    $count--;\n}", detail: "The condition is checked before printing. The decrement eventually makes count zero and ends the loop." },
          { label: "Run once before checking", code: "<?php\n$count = 0;\n\ndo {\n    echo \"Attempt\";\n    $count++;\n} while ($count < 1);", detail: "The body runs once before the condition is checked. After count increases to one, the condition becomes false." },
        ],
        {
          question: "Which loop always runs its body at least once?",
          options: ["do-while", "while", "for"],
          correct: 0,
          explanation: "do-while evaluates its condition after the body, so the first pass always happens. A while or for loop checks its condition before the body.",
        },
      ),
      makeGuide(
        "Use foreach to process each array value without managing an index yourself.",
        [
          "A PHP [[foreach]] loop visits each item in an array in order. The value after [[as]] receives the current item for that pass. This makes foreach useful when the task is to process every value rather than count positions.",
          "Give the loop variable a name that describes one item, such as [[$color]] for an array named [[$colors]]. Keep the plural collection name and singular item name distinct, then use the exact same spelling throughout the loop body.",
        ],
        [
          { label: "Visit each color", code: "<?php\n$colors = [\"red\", \"blue\", \"green\"];\n\nforeach ($colors as $color) {\n    echo $color;\n}", detail: "The loop assigns red, then blue, then green to the singular variable color and runs the body once for each item." },
          { label: "Use the loop variable consistently", code: "<?php\nforeach ($colors as $color) {\n    echo $colour;\n}", detail: "The loop assigns each value to color, but the body tries to read colour. PHP variable names must match exactly, so this typo refers to a different, undefined variable." },
        ],
        {
          question: "In foreach ($colors as $color), what does $color contain during each pass?",
          options: ["The current array item", "The number of items in the array", "The array's variable name as text"],
          correct: 0,
          explanation: "The variable after as receives the current item for that pass. The loop moves through the array and assigns the next value each time.",
        },
      ),
    ],
    php5: [
      makeGuide(
        "Declare a PHP function with a name and call it whenever the same task is needed.",
        [
          "A PHP function begins with the [[function]] keyword, followed by its name and parentheses. Its instructions go inside braces. Defining the function makes it available for later calls, but the body does not run until the function is called.",
          "Use a function to give a reusable task one clear name. For example, a greeting function can be called for several names without copying the same echo statement into multiple parts of the file.",
        ],
        [
          { label: "Define a greeting function", code: "<?php\nfunction greet() {\n    echo \"Hello, world!\";\n}", detail: "The function is named greet and its body contains the output statement. At this point it has been defined but not yet executed." },
          { label: "Call the function", code: "greet();", detail: "The parentheses call the function, so PHP runs the statements inside its body." },
        ],
        {
          question: "Which keyword begins a PHP function definition?",
          options: ["function", "def", "method"],
          correct: 0,
          explanation: "PHP uses function followed by a name and parentheses. def is used in Python, and method is not a PHP function declaration keyword.",
        },
      ),
      makeGuide(
        "Pass information into a function with parameters and send a calculated result back with return.",
        [
          "Parameters are the named inputs listed in a function definition. When the function is called, the arguments supply the actual values. This lets one function perform the same task for different data instead of hard-coding one value into the function body.",
          "The [[return]] keyword sends a result back to the caller and ends the function. [[echo]] displays output but does not return that value. When another part of the program needs to calculate with the result, return it and let the caller decide how to use it.",
        ],
        [
          { label: "Accept two inputs and calculate", code: "<?php\nfunction lineTotal($price, $quantity) {\n    return $price * $quantity;\n}", detail: "The parameters provide a price and quantity. The function calculates their product and sends that value back to the caller." },
          { label: "Store the returned value", code: "$cartTotal = lineTotal(25, 3);\necho $cartTotal;", detail: "The arguments 25 and 3 produce 75. That returned value is stored in cartTotal and then displayed." },
        ],
        {
          question: "Which keyword sends a calculated value back to the code that called a function?",
          options: ["return", "echo", "function"],
          correct: 0,
          explanation: "return sends the value back to the caller. echo displays it, and function begins a function definition.",
        },
      ),
      makeGuide(
        "Use a default parameter when a function input has a sensible value that callers can omit.",
        [
          "A parameter can have a default value written after an equals sign. When the caller leaves that argument out, PHP uses the default. When a caller supplies a value, that argument replaces the default for that call.",
          "Defaults are useful for optional details such as a greeting name or a display setting. Put required parameters before optional parameters so the function call remains predictable and readers can see which information must be supplied.",
        ],
        [
          { label: "Give the name a default", code: "<?php\nfunction greet($name = \"friend\") {\n    return \"Hello, \" . $name;\n}", detail: "The function can be called without a name, in which case it uses friend. The caller can still provide a different name." },
          { label: "Call with and without the optional value", code: "echo greet();\necho greet(\"Mina\");", detail: "The first call uses the default name. The second passes Mina and uses that value instead." },
        ],
        {
          question: "What value is used by greet($name = \"friend\") when the function is called as greet()?",
          options: ["friend", "null", "An empty array"],
          correct: 0,
          explanation: "The default argument is used when the caller omits that parameter. Passing a name replaces the default for that particular call.",
        },
      ),
    ],
  },
  sql: {
    sql3: [
      makeGuide(
        "Sort query results with ORDER BY and choose the direction with ASC or DESC.",
        [
          "SQL does not guarantee that rows appear in a particular order unless a query includes [[ORDER BY]]. Add the column you want to sort by after that clause. [[ASC]] sorts from low to high and is the default, while [[DESC]] sorts from high to low.",
          "The sort direction belongs after the column name. If you are listing ages from youngest to oldest, use ASC. If you are showing the newest dates first or the highest scores first, use DESC.",
        ],
        [
          { label: "Sort ages from low to high", code: "SELECT name, age\nFROM students\nORDER BY age ASC;", detail: "The result is ordered from the smallest age to the largest. ASC is optional because it is the default direction." },
          { label: "Sort scores from high to low", code: "SELECT name, score\nFROM students\nORDER BY score DESC;", detail: "DESC reverses the order, placing the largest score first and the smallest score last." },
        ],
        {
          question: "Which direction sorts numbers from highest to lowest?",
          options: ["DESC", "ASC", "SIDEWAYS"],
          correct: 0,
          explanation: "DESC means descending order, so larger values appear first. ASC means ascending order, from smaller values to larger ones.",
        },
      ),
      makeGuide(
        "Limit the number of returned rows and use OFFSET when displaying results in pages.",
        [
          "The [[LIMIT]] clause caps how many rows a query returns. It is useful when a page should show only a small group of results instead of loading every matching row at once. Pair it with ORDER BY when the first results need to be predictable.",
          "[[OFFSET]] skips a number of rows before returning the limited group. For example, LIMIT 10 OFFSET 20 skips the first twenty rows and returns the next ten. Keep the clauses in the correct query order: WHERE, ORDER BY, then LIMIT and OFFSET.",
        ],
        [
          { label: "Return the first ten results", code: "SELECT name\nFROM students\nORDER BY name ASC\nLIMIT 10;", detail: "The results are sorted by name, then LIMIT keeps only the first ten rows in that order." },
          { label: "Skip a page of results", code: "SELECT name\nFROM students\nORDER BY name ASC\nLIMIT 10 OFFSET 20;", detail: "The query skips twenty rows from the sorted list and returns the next ten, which represents a later page." },
        ],
        {
          question: "What does LIMIT 10 OFFSET 20 do?",
          options: ["Skips 20 rows, then returns up to 10", "Returns 20 rows and skips 10", "Deletes 20 rows and keeps 10"],
          correct: 0,
          explanation: "OFFSET skips rows before the returned group, and LIMIT caps the number of rows in that group.",
        },
      ),
      makeGuide(
        "Add a second sort column when several rows can have the same value in the first sort column.",
        [
          "A query that sorts only by a non-unique column can leave tied rows in an unspecified order. For example, several students may have the same score. The database can return those tied rows in different orders when the data or query plan changes.",
          "Add a second column as a tie-breaker to make the order more predictable. A unique identifier is often a good choice. This is especially important when using LIMIT and OFFSET, because a changing order can make a row appear on two pages or be missed between pages.",
        ],
        [
          { label: "Sort by score, then by name", code: "SELECT id, name, score\nFROM students\nORDER BY score DESC, name ASC;", detail: "Higher scores appear first. When two students have the same score, their names provide a second ordering rule." },
          { label: "Use a unique final tie-breaker", code: "SELECT id, name, score\nFROM students\nORDER BY score DESC, id ASC;", detail: "The id gives each row a unique place after scores are compared, making the ordering stable for paging." },
        ],
        {
          question: "Why add a unique column after a sort column that can contain ties?",
          options: ["To make the row order predictable", "To remove rows with equal values", "To change the values stored in the table"],
          correct: 0,
          explanation: "A unique tie-breaker gives tied rows a consistent order. It does not remove rows or change the table's stored values.",
        },
      ),
    ],
    sql4: [
      makeGuide(
        "Insert a new row by listing the target columns and supplying values in the same order.",
        [
          "The [[INSERT INTO]] statement adds a new row to a table. Name the columns you intend to fill, then provide the matching values inside [[VALUES]]. The first value belongs to the first listed column, the second to the second column, and so on.",
          "Listing columns explicitly is clearer than relying on the table's full column order. It also makes the statement less fragile if the table later gains another column with a default value. Text values use single quotes, while numeric values are normally written without quotes.",
        ],
        [
          { label: "Choose the columns", code: "INSERT INTO students (name, age)", detail: "The statement names exactly which columns the new row will supply. This makes the expected value order visible." },
          { label: "Supply the matching values", code: "INSERT INTO students (name, age)\nVALUES ('Mina', 18);", detail: "Mina matches the name column and 18 matches age. The number and order of values match the listed columns." },
        ],
        {
          question: "In INSERT INTO students (name, age) VALUES ('Mina', 18), which value is assigned to age?",
          options: ["18", "'Mina'", "The table name"],
          correct: 0,
          explanation: "Values follow the listed column order. Mina belongs to name, and 18 belongs to age.",
        },
      ),
      makeGuide(
        "Insert several rows in one statement by separating value groups with commas.",
        [
          "SQL can add more than one row with a single INSERT statement. After the VALUES keyword, write one parenthesised group for each row and separate the groups with commas. Every group must provide a value for each listed column.",
          "This is more concise than writing a separate INSERT for every row. Keep each group easy to scan so it is clear which values belong together. The order within every group still follows the column list at the start of the statement.",
        ],
        [
          { label: "Insert two rows", code: "INSERT INTO tags (name)\nVALUES ('html'), ('css');", detail: "Each parenthesised group supplies one value for the name column. The comma separates the first row from the second." },
          { label: "Insert rows with two columns", code: "INSERT INTO students (name, age)\nVALUES ('Mina', 18), ('Noah', 19);", detail: "Both groups supply a name followed by an age, matching the same two-column list." },
        ],
        {
          question: "What separates each row's value group in a multi-row INSERT?",
          options: ["A comma", "A slash", "A second VALUES keyword"],
          correct: 0,
          explanation: "A comma separates the parenthesised value groups. Each group represents one row and must match the listed columns.",
        },
      ),
      makeGuide(
        "Understand how defaults and NOT NULL rules affect columns that are omitted from an INSERT.",
        [
          "A column may have a DEFAULT value that the database uses when an INSERT leaves that column out. A [[NOT NULL]] constraint means a row must have a value for that column; an explicitly supplied NULL is not the same as leaving the column out when a default is available.",
          "Before inserting a row, check which columns are required and which have defaults. If a required column has no default, include a valid value. Constraints help protect the table from rows that are missing information the application depends on.",
        ],
        [
          { label: "Let a default fill the column", code: "INSERT INTO users (name)\nVALUES ('Mina');", detail: "If the email column has a default, the database can use it because the INSERT leaves email out of the column list." },
          { label: "Supply a required value", code: "INSERT INTO users (name, email)\nVALUES ('Mina', 'mina@example.com');", detail: "When email is NOT NULL and has no default, the statement supplies an email so the new row satisfies the constraint." },
        ],
        {
          question: "What should an INSERT provide for a NOT NULL column that has no default?",
          options: ["A valid value for that column", "Nothing at all", "A comment explaining the column"],
          correct: 0,
          explanation: "The column must have a value, so the INSERT needs to supply one. A NOT NULL constraint rejects a row that tries to store NULL there.",
        },
      ),
    ],
    sql5: [
      makeGuide(
        "Update existing rows with SET and use WHERE to limit which rows are changed.",
        [
          "The [[UPDATE]] statement changes values in rows that match its condition. The [[SET]] clause names the column and the new value. The [[WHERE]] clause filters the rows that should receive the change, so it is important to check the condition before running the statement.",
          "Without WHERE, every row in the table is updated. When learning or checking a condition, run a SELECT with the same WHERE clause first so you can inspect which rows match before changing them.",
        ],
        [
          { label: "Preview the matching rows", code: "SELECT id, active\nFROM users\nWHERE last_login < '2025-01-01';", detail: "The SELECT shows which users match the condition. You can confirm that these are the rows you intend to update." },
          { label: "Apply the update to that group", code: "UPDATE users\nSET active = 0\nWHERE last_login < '2025-01-01';", detail: "SET changes the active value, and WHERE restricts the change to users whose last login matches the date condition." },
        ],
        {
          question: "What can happen when an UPDATE statement has no WHERE clause?",
          options: ["Every row in the table can be updated", "Only the first row changes", "The table is automatically deleted"],
          correct: 0,
          explanation: "Without a filter, the UPDATE applies to every row. Use a WHERE clause when only a particular group should change.",
        },
      ),
      makeGuide(
        "Delete selected rows with DELETE FROM and a WHERE condition that identifies exactly what should be removed.",
        [
          "The [[DELETE FROM]] statement removes rows from a table. Add a [[WHERE]] clause to choose which rows should be deleted. The table and its columns remain; only the rows that match the condition are removed.",
          "A DELETE without WHERE removes every row in the table, so check the condition carefully. A SELECT using the same condition is a useful preview. [[DROP TABLE]] is different: it removes the table itself, not just the rows inside it.",
        ],
        [
          { label: "Preview expired sessions", code: "SELECT id, expires_at\nFROM sessions\nWHERE expires_at < CURRENT_TIMESTAMP;", detail: "The query shows which sessions have expired according to the current timestamp before anything is removed." },
          { label: "Delete only those sessions", code: "DELETE FROM sessions\nWHERE expires_at < CURRENT_TIMESTAMP;", detail: "The same filter is used for deletion, so only the expired sessions identified by the preview are removed." },
        ],
        {
          question: "Which clause limits the rows removed by DELETE FROM?",
          options: ["WHERE", "ORDER BY", "VALUES"],
          correct: 0,
          explanation: "WHERE filters the rows that match a condition. Without it, DELETE removes all rows from the target table.",
        },
      ),
      makeGuide(
        "Preview a data-changing query with SELECT so the target rows can be checked before the change is made.",
        [
          "A useful habit before UPDATE or DELETE is to copy its WHERE condition into a SELECT statement. The preview shows which rows match without changing the table. Check the returned rows and make sure the result is the intended group.",
          "A condition that is too broad can change or remove more rows than expected, while a condition that is too narrow may miss some intended rows. Reusing the exact same WHERE clause keeps the preview and the final statement aligned.",
        ],
        [
          { label: "Count the rows that match", code: "SELECT COUNT(*)\nFROM sessions\nWHERE expires_at < CURRENT_TIMESTAMP;", detail: "COUNT reports how many rows match the cleanup condition, giving a quick check of the size of the affected group." },
          { label: "Use the reviewed condition", code: "DELETE FROM sessions\nWHERE expires_at < CURRENT_TIMESTAMP;", detail: "The deletion uses the same condition that was reviewed in the SELECT, so the target group does not silently change." },
        ],
        {
          question: "Why should you preview an UPDATE or DELETE condition with SELECT?",
          options: ["To inspect the target rows before changing data", "To automatically reverse the query", "To create a new table"],
          correct: 0,
          explanation: "SELECT lets you inspect the rows that match without changing them. This helps catch a condition that is too broad or too narrow before data is modified.",
        },
      ),
    ],
  },
};
