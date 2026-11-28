// Guided lessons for topics moving from Intermediate into Beginner.
// Each lesson includes a goal, explanation, worked steps, and a retrieval check.

const guide = (goal, body, walkthrough, check, capstone = null) => ({
  goal,
  body,
  walkthrough,
  check,
  ...(capstone ? { capstone } : {}),
});

export const PROMOTED_BEGINNER_GUIDES = {
  html: {
    h6: [
      guide(
        "Choose an unordered or ordered list based on whether the sequence matters.",
        [
          "The ul element groups items when their order is not important. The ol element groups items when the order or steps matter. In both cases, each item belongs in an li element.",
          "Do not type bullet characters or numbers into ordinary text to imitate a list. Real list markup communicates the structure to browsers and assistive technology, and the browser provides the markers.",
        ],
        [
          { label: "Choose the list type", code: "<ul>", detail: "Use ul for a set of features or choices where changing the order does not change the meaning." },
          { label: "Add each item", code: "<li>Offline access</li>\n<li>Saved bookmarks</li>", detail: "Each separate item gets its own li element inside the list." },
          { label: "Use ordered lists for steps", code: "<ol>\n  <li>Open the file</li>\n  <li>Save your changes</li>\n</ol>", detail: "The browser numbers the items because the sequence is meaningful." },
        ],
        {
          question: "A recipe has steps that must be followed in order. Which list element is the best fit?",
          options: ["<ul>", "<ol>", "<span>"],
          correct: 1,
          explanation: "An ordered list communicates a sequence. An unordered list is better for items with no required order.",
        },
      ),
      guide(
        "Place a nested list inside the list item that owns the related sub-items.",
        [
          "A list item can contain more than a short line of text. It can also contain links, paragraphs, and another list when one item needs its own sub-items.",
          "The nested list belongs inside its parent li. Placing it between two li elements makes the structure harder to understand and can lead to unexpected browser repair.",
        ],
        [
          { label: "Start the parent item", code: "<ul>\n  <li>Fruit</li>\n</ul>", detail: "Fruit is the parent item that will own the smaller list." },
          { label: "Nest its child items", code: "<li>Fruit\n  <ul>\n    <li>Mango</li>\n    <li>Banana</li>\n  </ul>\n</li>", detail: "The nested ul is inside the Fruit li, so Mango and Banana are clearly related to Fruit." },
        ],
        {
          question: "Where should a nested ul be placed when it describes one parent list item?",
          options: ["Inside that parent li", "Between two separate li elements", "After the closing ul"],
          correct: 0,
          explanation: "The nested list is content of the parent item, so it belongs inside that li element.",
        },
      ),
      guide(
        "Select a list element that matches the relationship between the items.",
        [
          "Lists are useful for navigation links, feature sets, steps, and other groups of related items. A list inside nav is a common way to mark up a site's navigation.",
          "When the content is a term and its explanation, use dl with dt and dd. Do not use a table unless the reader needs to compare information across rows and columns.",
        ],
        [
          { label: "Group navigation links", code: "<nav>\n  <ul>\n    <li><a href='/home'>Home</a></li>\n    <li><a href='/about'>About</a></li>\n  </ul>\n</nav>", detail: "The list groups the related navigation destinations, while nav identifies the navigation region." },
          { label: "Represent a term and its meaning", code: "<dl>\n  <dt>Browser</dt>\n  <dd>Software used to open web pages.</dd>\n</dl>", detail: "A description list connects each term with one or more definitions." },
        ],
        {
          question: "Which element is designed for a group of terms and their descriptions?",
          options: ["<dl>", "<table>", "<br>"],
          correct: 0,
          explanation: "A description list uses dl, with dt for a term and dd for its description.",
        },
      ),
    ],
    h7: [
      guide(
        "Build a simple data table using rows, header cells, and data cells.",
        [
          "A table represents information that belongs in a row-and-column grid. The table element contains rows, each row uses tr, and cells use th for headings or td for ordinary data.",
          "Tables are for related data, not for arranging the whole page. Use CSS layout tools for page structure; use a table when readers need to compare values across two dimensions.",
        ],
        [
          { label: "Create the table and its header row", code: "<table>\n  <tr>\n    <th>Name</th>\n    <th>Score</th>\n  </tr>", detail: "The th cells identify what each column contains." },
          { label: "Add a data row", code: "  <tr>\n    <td>Mina</td>\n    <td>92</td>\n  </tr>\n</table>", detail: "Each td contains one value in the matching column." },
        ],
        {
          question: "Which element marks a regular data cell in a table?",
          options: ["<td>", "<th>", "<tr>"],
          correct: 0,
          explanation: "td represents a data cell. th represents a header cell, and tr groups the cells into a row.",
        },
      ),
      guide(
        "Give a table a clear name and identify which cells act as row or column headings.",
        [
          "A caption provides a short name for the table. Thead, tbody, and tfoot can group the header, body, and footer rows. These elements make a larger table easier to read and maintain.",
          "Use scope on header cells to identify the row or column they describe. This extra relationship helps assistive technology explain a data cell in context.",
        ],
        [
          { label: "Name the table", code: "<table>\n  <caption>Exam results</caption>", detail: "The caption tells readers what the table is about." },
          { label: "Mark the column headings", code: "<thead>\n  <tr>\n    <th scope='col'>Name</th>\n    <th scope='col'>Score</th>\n  </tr>\n</thead>", detail: "Each header describes a column, so scope='col' makes that relationship explicit." },
          { label: "Place the records in the body", code: "<tbody>\n  <tr><td>Mina</td><td>92</td></tr>\n</tbody>", detail: "The body contains the actual records that belong under the column headings." },
        ],
        {
          question: "Which attribute value tells assistive technology that a header describes a column?",
          options: ["scope='col'", "colspan='0'", "role='button'"],
          correct: 0,
          explanation: "scope='col' identifies a column header. A caption names the table but does not define cell relationships.",
        },
      ),
      guide(
        "Recognize when a table is appropriate and keep wide tables usable on smaller screens.",
        [
          "A table is useful when values need to be compared by row and column, such as a schedule or a set of measurements. It is not a shortcut for creating page columns or aligning unrelated content.",
          "A wide data table can be placed inside a container that scrolls horizontally. This keeps the table readable without forcing the entire page to overflow sideways.",
        ],
        [
          { label: "Use a table for comparable values", code: "<table>\n  <tr><th>Month</th><th>Sales</th></tr>\n  <tr><td>April</td><td>18</td></tr>\n</table>", detail: "The month and sales value belong together as a record that can be compared with other records." },
          { label: "Keep a wide table contained", code: ".table-scroll {\n  max-width: 100%;\n  overflow-x: auto;\n}", detail: "The wrapper can scroll when the table is wider than the available screen." },
        ],
        {
          question: "Which task is a good reason to use an HTML table?",
          options: ["Compare student names and scores", "Place the page title beside the footer", "Create the site's navigation layout"],
          correct: 0,
          explanation: "A table is appropriate for data with row-and-column relationships. Page layout and navigation should use semantic elements and CSS.",
        },
      ),
    ],
    h8: [
      guide(
        "Create a form that sends named control values to a destination.",
        [
          "A form groups controls that are submitted together. Its action identifies where the data goes, while method chooses how the browser sends it. Each control needs a name because that name becomes the field key in the submitted data.",
          "A control without a name is not included in the form submission. Choose get for values that belong in a URL, such as a search query, and post for data that should be sent in the request body.",
        ],
        [
          { label: "Create the form", code: "<form action='/search' method='get'>", detail: "The browser will send the form data to the search route using a GET request." },
          { label: "Give the control a field name", code: "<input type='text' name='q'>", detail: "The name q becomes the key that the receiving page can read." },
          { label: "Provide a submit control", code: "<button type='submit'>Search</button>\n</form>", detail: "Submitting the form sends the named control value to the action destination." },
        ],
        {
          question: "Which attribute becomes the field name in submitted form data?",
          options: ["name", "placeholder", "class"],
          correct: 0,
          explanation: "The name attribute identifies the submitted value. A placeholder is only a hint shown inside the control.",
        },
      ),
      guide(
        "Give every form input a label and choose a type that describes the expected value.",
        [
          "A label tells people what information a control expects. Connect it to an input with a matching for and id, or place the input inside its label. A placeholder disappears as the person types and should not replace a real label.",
          "The input type gives the browser useful information about the value. Email, password, number, checkbox, and date controls have different meanings and behaviors.",
        ],
        [
          { label: "Give the input a unique id", code: "<input id='email' name='email' type='email'>", detail: "The id gives the label a target, while name identifies the value that will be submitted." },
          { label: "Connect its visible label", code: "<label for='email'>Email address</label>", detail: "Selecting the label focuses the matching input, and assistive technology can announce its purpose." },
          { label: "Make a required value explicit", code: "<input id='email' name='email' type='email' required>", detail: "The required attribute tells the browser that the user must provide a value before normal submission." },
        ],
        {
          question: "Why should an input have a real label instead of only a placeholder?",
          options: ["The label remains available as the control's name", "The placeholder is always submitted to the server", "A label automatically encrypts the value"],
          correct: 0,
          explanation: "A label provides a persistent name for the control. Placeholder text disappears when the user enters a value.",
        },
      ),
      guide(
        "Choose whether a button submits a form or performs a separate interface action.",
        [
          "A button inside a form defaults to submit. That is useful for sending the form, but it can cause trouble when a button is only meant to open a menu or change a setting.",
          "Set type='button' for an action that should not submit. Use type='submit' for the control that sends the form. These explicit types make the behavior clear to both the browser and the next person reading the code.",
        ],
        [
          { label: "Use submit for form submission", code: "<button type='submit'>Send message</button>", detail: "This button asks the browser to submit the form's named values." },
          { label: "Use button for an interface action", code: "<button type='button'>Show help</button>", detail: "This button does not submit the form by default, so JavaScript can use it for a separate action." },
        ],
        {
          question: "A button inside a form opens a help panel and must not submit the form. Which type should it use?",
          options: ["button", "submit", "reset"],
          correct: 0,
          explanation: "type='button' creates a normal action button without submitting the surrounding form.",
        },
        {
          title: "Build a small course-enrolment page",
          prompt: "Create a single HTML page where a learner can read the course details and complete a simple enrolment form. Organize the content so another person can understand the page without seeing its styling.",
          deliverable: "One complete HTML document with a page heading, a course description, a list of requirements, a small schedule table, and an enrolment form.",
          criteria: [
            "Use a meaningful document structure and semantic landmarks.",
            "Use headings, paragraphs, links, and a list to organize the course information.",
            "Use a table only for the schedule's row-and-column data.",
            "Give each form control a label, name, and suitable type.",
            "Make the submit button's purpose explicit.",
          ],
          selfCheck: "Can someone navigate the page and understand what each section and form field is for without relying on color or placeholder text?",
        },
      ),
    ],
    h9: [
      guide(
        "Distinguish a generic block container from an inline container inside text.",
        [
          "A div is a generic block container. It starts on a new line and can group larger pieces of page content. A span is an inline container that sits inside text without creating a new block.",
          "Neither element gives content a special meaning. Use them when no semantic element describes the content's role, and use CSS to decide how the containers look.",
        ],
        [
          { label: "Group a block of content", code: "<div class='card'>\n  <p>Order ready</p>\n</div>", detail: "The div groups a block of related content so it can be styled as one unit." },
          { label: "Mark a small part of a sentence", code: "<p>Order <span class='number'>1042</span> is ready.</p>", detail: "The span wraps only the order number and stays inside the paragraph's text flow." },
        ],
        {
          question: "Which element is intended to wrap a short part of text inside a sentence?",
          options: ["<span>", "<div>", "<main>"],
          correct: 0,
          explanation: "span is an inline container. div is a generic block container, while main identifies the page's primary content.",
        },
      ),
      guide(
        "Use classes for reusable styling hooks and keep IDs unique within the document.",
        [
          "A class can be shared by many elements. It is the usual way to give similar cards, buttons, or labels the same CSS. An id identifies one particular element and should not be repeated on the page.",
          "The same distinction matters to JavaScript. A class selector can find several matching elements, while getElementById looks for one element with that unique ID.",
        ],
        [
          { label: "Share one class across elements", code: "<div class='card'>Book</div>\n<div class='card'>Notebook</div>", detail: "Both elements can receive the same reusable card styling." },
          { label: "Give a unique element an ID", code: "<main id='content'>Page content</main>", detail: "The id gives this main element a unique target for a fragment link or a script." },
        ],
        {
          question: "You want ten cards to share one style. Which attribute should they share?",
          options: ["class", "id", "title"],
          correct: 0,
          explanation: "Classes are reusable across many elements. IDs are meant to be unique.",
        },
      ),
      guide(
        "Choose a semantic element when one describes the content better than a generic div or span.",
        [
          "Look for the content's role before reaching for a generic container. A page header, navigation region, main area, article, or footer has a semantic element that communicates its purpose.",
          "A div is still useful for a styling wrapper that has no special meaning. For inline emphasis or importance, choose a meaningful inline element such as em or strong instead of using span for everything.",
        ],
        [
          { label: "Name the navigation region", code: "<nav>\n  <a href='/books'>Books</a>\n</nav>", detail: "nav communicates that its links form a navigation region." },
          { label: "Use a generic wrapper only when needed", code: "<div class='ad-slot'>Advertisement</div>", detail: "The div is appropriate here because the wrapper has no more specific document role." },
        ],
        {
          question: "Which element should identify the main content region of a page?",
          options: ["<main>", "<div class='main'>", "<span>"],
          correct: 0,
          explanation: "main communicates the role of the page's primary content. A class name on a div does not create the same semantic meaning.",
        },
      ),
    ],
    h10: [
      guide(
        "Use semantic HTML elements to describe the role of each major page region.",
        [
          "Semantic elements tell the browser what a region is for. Header, nav, main, article, aside, and footer describe recognizable roles that are useful to people, assistive technology, and tools that process the page.",
          "A div is a generic container. Replacing every region with a div and a class name may look similar, but it does not provide the same built-in meaning.",
        ],
        [
          { label: "Identify the site header", code: "<header>My learning journal</header>", detail: "header identifies introductory content for the page or a section." },
          { label: "Identify the navigation", code: "<nav>Home · Lessons · About</nav>", detail: "nav describes a group of important navigation links." },
          { label: "Identify the primary content", code: "<main>\n  <h1>Latest lessons</h1>\n</main>", detail: "main identifies the page's primary content region." },
        ],
        {
          question: "Which element identifies the primary content of a page?",
          options: ["<main>", "<aside>", "<footer>"],
          correct: 0,
          explanation: "main identifies the page's primary content. aside is complementary content and footer identifies footer content.",
        },
      ),
      guide(
        "Choose between main, article, and section based on the content's purpose.",
        [
          "The main element contains the page's primary content. An article is a self-contained item that could make sense on its own, such as a post or news story. A section groups content around one theme and normally has a heading.",
          "Do not use section only to create a box. If the content needs a wrapper only for layout or styling, a div is usually clearer.",
        ],
        [
          { label: "Create the primary content region", code: "<main>", detail: "The main region contains the content that is central to this page." },
          { label: "Add a self-contained article", code: "<article>\n  <h1>How I learned HTML</h1>\n  <p>...</p>\n</article>", detail: "The article can be understood as a complete post on its own." },
          { label: "Group a topic within the article", code: "<section>\n  <h2>My first project</h2>\n  <p>...</p>\n</section>", detail: "The section has its own theme and a heading that names it." },
        ],
        {
          question: "A blog post that can stand on its own is best represented by which element?",
          options: ["<article>", "<span>", "<footer>"],
          correct: 0,
          explanation: "article represents a self-contained composition. A section groups a thematic part of a larger page.",
        },
      ),
      guide(
        "Use landmarks intentionally so a page is easier to navigate without overusing them.",
        [
          "Landmarks let people move between major regions of a page. A typical page has one main region, a header, a navigation area when needed, and a footer. A section should represent a real topic rather than simply create another landmark.",
          "Semantic structure is not a competition to use the most elements. Choose each one because it describes the content accurately, and give multiple navigation regions distinct accessible names when their purposes differ.",
        ],
        [
          { label: "Build a simple page outline", code: "<header>Site name</header>\n<nav aria-label='Main'>Links</nav>\n<main id='content'>Page content</main>\n<footer>Contact</footer>", detail: "Each major region has a clear purpose, and main provides an obvious destination for the primary content." },
          { label: "Name a second navigation region", code: "<nav aria-label='Breadcrumb'>Home / Lessons</nav>", detail: "A distinct label helps people tell the breadcrumb navigation from the main navigation." },
        ],
        {
          question: "A page has a main navigation and a breadcrumb navigation. What helps users distinguish them?",
          options: ["Give each nav a clear accessible name", "Use two elements with the same id", "Replace both with plain div elements"],
          correct: 0,
          explanation: "Distinct accessible names explain the purpose of each navigation landmark.",
        },
      ),
    ],
  },
  css: {
    c5: [
      guide(
        "Identify the four layers of the CSS box model and where each one sits.",
        [
          "Every element occupies a rectangular box. From the inside out, it contains content, padding, border, and margin. Content is the text or image, padding creates space around it inside the border, and margin creates space outside the border.",
          "The box model explains why two elements with the same width can occupy different amounts of space. Always consider padding and border when calculating the full size.",
        ],
        [
          { label: "Set the content size", code: ".card {\n  width: 240px;\n}", detail: "With the default content-box model, 240px describes the content area." },
          { label: "Add inner space", code: "padding: 16px;", detail: "Padding creates space between the content and the border." },
          { label: "Add an outside border and margin", code: "border: 1px solid #72927b;\nmargin: 12px;", detail: "The border surrounds the padding, while margin creates separation from neighboring boxes." },
        ],
        {
          question: "Which part of the box model creates space between the content and its border?",
          options: ["Padding", "Margin", "The outline"],
          correct: 0,
          explanation: "Padding creates space inside the border around the content. Margin creates space outside the border between this box and its neighbors.",
        },
      ),
      guide(
        "Use box-sizing to make declared width and height easier to predict.",
        [
          "With content-box, the declared width covers only the content. Padding and border are added outside that width, so the final box becomes larger than the number you wrote.",
          "With border-box, the declared width includes the content, padding, and border. This makes component dimensions easier to plan because adding padding does not unexpectedly increase the outside size.",
        ],
        [
          { label: "Use the predictable sizing rule", code: "* {\n  box-sizing: border-box;\n}", detail: "The universal rule makes the declared dimensions include padding and border." },
          { label: "Set the outside width", code: ".card {\n  width: 240px;\n  padding: 16px;\n  border: 1px solid;\n}", detail: "The card remains 240px wide overall. The content area becomes smaller to make room for its padding and border." },
        ],
        {
          question: "With box-sizing: border-box, what does width: 240px describe?",
          options: ["The full border-box width", "Only the text width", "The margin on both sides"],
          correct: 0,
          explanation: "border-box includes the content, padding, and border within the declared width.",
        },
      ),
      guide(
        "Use margin to separate boxes and recognize when vertical margins collapse.",
        [
          "Margin creates space outside an element's border. Horizontal margins generally add across neighboring boxes, while adjacent vertical margins in normal block flow can collapse so the larger margin is used instead of adding both values.",
          "Padding, a border, or a layout container such as flex or grid can change that behavior. Start with simple spacing and inspect the parent and child when a vertical gap looks different from what you expected.",
        ],
        [
          { label: "Add space outside one box", code: ".notice {\n  margin-bottom: 24px;\n}", detail: "The margin creates separation after the notice box." },
          { label: "Compare adjacent vertical margins", code: ".first { margin-bottom: 24px; }\n.second { margin-top: 16px; }", detail: "In normal block flow, these adjacent vertical margins collapse to 24px rather than 40px." },
        ],
        {
          question: "Two adjacent vertical margins of 24px and 16px collapse in normal block flow. What gap is used?",
          options: ["24px", "40px", "8px"],
          correct: 0,
          explanation: "The larger of the two adjoining positive vertical margins is used.",
        },
      ),
    ],
    c18: [
      guide(
        "Explain how block and inline elements behave in normal document flow.",
        [
          "Normal flow is the browser's default way of placing content when no special layout system changes it. A block box starts on a new line and normally fills the available width. An inline box sits within a line of text.",
          "The display property can change an element's outer behavior. This is why a link can normally sit inside a paragraph, while a div normally begins a new line.",
        ],
        [
          { label: "A block element starts a new line", code: "<p>First paragraph</p>\n<p>Second paragraph</p>", detail: "Each paragraph normally occupies its own block and begins on a new line." },
          { label: "Inline text stays in the line", code: "<p>Read the <a href='/guide'>guide</a> today.</p>", detail: "The link is inline, so it remains part of the paragraph's text flow." },
        ],
        {
          question: "Which display behavior normally starts a new line and takes the available width?",
          options: ["block", "inline", "none"],
          correct: 0,
          explanation: "A block box starts on a new line in normal flow. Inline content participates in the current line.",
        },
      ),
      guide(
        "Use inline-block when an item should stay beside text but still accept a width and height.",
        [
          "An inline-block participates in an inline formatting context, so it can sit beside words or other inline items. Unlike a normal inline box, it can use explicit width and height.",
          "This behavior is useful for compact badges or small controls. For complex rows and columns, flexbox or grid is usually easier to manage than inline-block.",
        ],
        [
          { label: "Choose inline-block", code: ".badge {\n  display: inline-block;\n}", detail: "The badge stays in the text line while gaining block-like sizing behavior." },
          { label: "Set its dimensions", code: ".badge {\n  display: inline-block;\n  min-width: 80px;\n  padding: 4px 8px;\n}", detail: "The badge can now reserve space and receive padding without becoming a full-width block." },
        ],
        {
          question: "Which display value lets an item stay inline while accepting width and height?",
          options: ["inline-block", "inline", "none"],
          correct: 0,
          explanation: "inline-block participates in an inline line while allowing block-like dimensions.",
        },
      ),
      guide(
        "Distinguish removing an element from layout from hiding it while preserving its space.",
        [
          "display: none removes the element from layout and from the accessibility tree. visibility: hidden hides it visually but keeps its layout space. Both should be used carefully so important information is not made unavailable.",
          "Do not hide essential content without an alternative. A visually hidden pattern is a more specialized technique when information should remain available to screen readers even though it is not shown on screen.",
        ],
        [
          { label: "Remove the element from layout", code: ".closed {\n  display: none;\n}", detail: "The element takes up no layout space while this rule applies." },
          { label: "Hide it but preserve its space", code: ".waiting {\n  visibility: hidden;\n}", detail: "The element is not visible, but its original space remains in the layout." },
        ],
        {
          question: "Which property hides an element while keeping its original layout space?",
          options: ["visibility: hidden", "display: none", "position: absolute"],
          correct: 0,
          explanation: "visibility: hidden preserves the layout space. display: none removes the element from layout.",
        },
        {
          title: "Build a responsive profile card",
          prompt: "Create a small profile card using a simple HTML page and your Beginner CSS knowledge. The card should have a name, a short biography, and a status badge that stays beside the text.",
          deliverable: "A styled profile card with readable spacing and a layout that still works when the screen becomes narrow.",
          criteria: [
            "Use a clear selector for the card and its badge.",
            "Apply content, padding, border, and margin intentionally.",
            "Use box-sizing: border-box so the card's width is predictable.",
            "Use normal flow for the main content and inline-block for the compact badge.",
            "Do not hide information that a reader needs.",
          ],
          selfCheck: "Can you explain which part of the card creates its inner spacing, outside spacing, and total width?",
        },
      ),
    ],
  },
  java: {
    j10: [
      guide(
        "Create an array and use its indexes to read and update a fixed set of values.",
        [
          "An array stores several values of one type under one variable name. Its length is fixed when the array is created, and its indexes start at zero.",
          "The last valid index is length minus one. Asking for an index outside that range causes an ArrayIndexOutOfBoundsException, so check the array length when looping.",
        ],
        [
          { label: "Create an array with a fixed length", code: "int[] scores = new int[3];", detail: "The array has three slots, with indexes 0, 1, and 2." },
          { label: "Store values by index", code: "scores[0] = 85;\nscores[1] = 92;\nscores[2] = 78;", detail: "Each assignment writes to one of the array's valid positions." },
          { label: "Read a stored value", code: "System.out.println(scores[1]);", detail: "Index 1 refers to the second value, which is 92." },
        ],
        {
          question: "What is the last valid index of an array whose length is 5?",
          options: ["4", "5", "6"],
          correct: 0,
          explanation: "Array indexes start at zero, so a length of five gives valid indexes 0 through 4.",
        },
      ),
      guide(
        "Recognize the default values Java assigns to array elements.",
        [
          "When Java creates an array, it fills the slots with default values. Numeric primitive elements start at zero, boolean elements start at false, and reference elements start at null.",
          "Null is not the same as an empty object. Calling a method through a null reference causes a NullPointerException, so initialize an object before using it.",
        ],
        [
          { label: "Create a numeric array", code: "int[] counts = new int[2];", detail: "Both slots begin with the primitive default value 0." },
          { label: "Create an array of references", code: "String[] names = new String[2];", detail: "Each slot begins as null because String is a reference type." },
          { label: "Assign a real object before using it", code: "names[0] = \"Mina\";\nSystem.out.println(names[0].length());", detail: "The first slot now refers to a String, so calling length is safe." },
        ],
        {
          question: "What is the initial value of an element in a new int array?",
          options: ["0", "null", "false"],
          correct: 0,
          explanation: "Java initializes every int array element to zero when the array is created, so each slot has a usable numeric default.",
        },
      ),
      guide(
        "Use the Arrays utility methods to inspect and sort an array.",
        [
          "The java.util.Arrays class provides helpful static methods for working with arrays. toString displays the values, sort orders the elements in place, and equals compares the contents of two arrays.",
          "Printing an array variable directly does not show its values. Use Arrays.toString when you want a readable representation, and remember that sort changes the original array.",
        ],
        [
          { label: "Import the utility", code: "import java.util.Arrays;", detail: "The import lets the program refer to Arrays by its short class name." },
          { label: "Sort the values", code: "int[] scores = {92, 78, 85};\nArrays.sort(scores);", detail: "sort changes the same array into ascending order." },
          { label: "Display the contents", code: "System.out.println(Arrays.toString(scores));", detail: "toString produces a readable list of the array's values." },
        ],
        {
          question: "Which method produces a readable String containing an array's values?",
          options: ["Arrays.toString()", "Arrays.length()", "Arrays.print()"],
          correct: 0,
          explanation: "Arrays.toString formats the array contents for display. Arrays does not provide a print method.",
        },
        {
          title: "Build a simple score analyzer",
          prompt: "Write a small console program that stores five student scores in an array, calculates the average, and counts how many scores meet a passing mark.",
          deliverable: "A Java program that reads or uses five scores, processes them, and prints the average and pass count.",
          criteria: [
            "Use an array to store all five scores.",
            "Use a loop to visit every score.",
            "Use an if statement to count passing scores.",
            "Use a method for at least one calculation.",
            "Print a clear summary with the average and pass count.",
          ],
          selfCheck: "Does the program still work when a score is exactly equal to the passing mark or when all five scores are different?",
        },
      ),
    ],
    j16: [
      guide(
        "Describe a small problem by separating its inputs, processing, and outputs.",
        [
          "An algorithm is an ordered set of steps that solves a problem. Before writing code, identify what information the program receives, what it needs to do with that information, and what result it should produce.",
          "Good steps are clear enough that another person can follow them without guessing. Test the plan with a small example and think about boundary cases such as an empty input or a value outside the expected range.",
        ],
        [
          { label: "Identify the input", code: "Input: a student's score", detail: "The input is the information the algorithm needs before it can work." },
          { label: "Describe the processing", code: "Check whether the score is at least 75", detail: "The processing step applies the rule to the supplied value." },
          { label: "State the output", code: "Output: Passed or Needs improvement", detail: "The output is the result the learner or program should receive." },
        ],
        {
          question: "Which part of an algorithm describes the information it receives?",
          options: ["Input", "Output", "Decoration"],
          correct: 0,
          explanation: "Input is the information the algorithm starts with. Output is the result it produces.",
        },
      ),
      guide(
        "Read the common flowchart symbols and follow the arrows through a process.",
        [
          "A flowchart turns an algorithm into a visual path. An oval marks the start or end, a parallelogram represents input or output, a rectangle represents a process, and a diamond represents a decision.",
          "Arrows show the direction of the process. A decision should have clearly labeled branches, and a loop should have an exit path that can eventually be reached.",
        ],
        [
          { label: "Start the process", code: "( Start )", detail: "An oval marks where the flowchart begins." },
          { label: "Read input and process it", code: "/ Input score /\n[ Check score ]", detail: "A parallelogram represents input, while a rectangle represents an action or calculation." },
          { label: "Make a decision", code: "< Is score >= 75? >", detail: "The diamond creates different paths based on whether the condition is true or false." },
        ],
        {
          question: "Which flowchart symbol represents a yes-or-no decision?",
          options: ["Diamond", "Rectangle", "Parallelogram"],
          correct: 0,
          explanation: "A diamond represents a decision. The outgoing arrows show the possible results.",
        },
      ),
      guide(
        "Write pseudocode that describes the algorithm without mixing it with Java syntax.",
        [
          "Pseudocode uses readable instructions such as INPUT, IF, ELSE, REPEAT, and OUTPUT. It describes what the solution does without requiring Java data types, semicolons, or braces.",
          "Keep the steps precise enough to translate into Java. Pseudocode is not a Java program, so use one style consistently instead of combining Java punctuation with pseudocode commands.",
        ],
        [
          { label: "Read a value", code: "INPUT score", detail: "The instruction receives the score before making a decision." },
          { label: "Describe the condition", code: "IF score >= 75 THEN\n    OUTPUT \"Passed\"\nELSE\n    OUTPUT \"Try again\"\nEND IF", detail: "The condition selects one of two outputs. The indentation helps show which instructions belong to each branch." },
        ],
        {
          question: "Which statement is written as pseudocode rather than Java?",
          options: ["INPUT score", "int score = scanner.nextInt();", "System.out.println(score);"],
          correct: 0,
          explanation: "INPUT is a language-neutral pseudocode instruction. The other examples are Java statements.",
        },
      ),
    ],
    j17: [
      guide(
        "Use arithmetic operators to calculate values and understand integer division.",
        [
          "Java provides arithmetic operators such as addition, subtraction, multiplication, division, and remainder. The remainder operator % returns what is left after division.",
          "When both operands are integers, division produces an integer result and discards the fractional part. Use a floating-point operand when the calculation needs a decimal result.",
        ],
        [
          { label: "Calculate a total", code: "int total = 12 + 8;", detail: "The plus operator adds the two integer values." },
          { label: "Find a remainder", code: "int remainder = 17 % 5;", detail: "Five fits into seventeen three times, leaving a remainder of two." },
          { label: "Choose a decimal result", code: "double average = 17 / 5.0;", detail: "The floating-point operand makes the division produce a decimal result." },
        ],
        {
          question: "What value does 17 % 5 produce in Java?",
          options: ["2", "3", "3.4"],
          correct: 0,
          explanation: "The remainder is 2 because 5 multiplied by 3 is 15, leaving 2.",
        },
      ),
      guide(
        "Compare values and combine Boolean conditions with logical operators.",
        [
          "Relational operators compare values and produce a boolean result. Examples include less than, greater than, and equal to. Use == to compare primitive values and use parentheses when a condition combines several ideas.",
          "The operators && and || combine conditions, while ! reverses a Boolean value. Java uses short-circuit evaluation, so the second side may not run when the first side already determines the result.",
        ],
        [
          { label: "Compare one value", code: "boolean passed = score >= 75;", detail: "The comparison is true when score is at least 75." },
          { label: "Require two conditions", code: "boolean eligible = age >= 18 && hasId;", detail: "Both conditions must be true for eligible to become true." },
          { label: "Group a more complex decision", code: "boolean reward = passed && (perfect || bonus);", detail: "Parentheses make it clear that either perfect or bonus is enough after passed is true." },
        ],
        {
          question: "Which operator requires both Boolean conditions to be true?",
          options: ["&&", "||", "!"],
          correct: 0,
          explanation: "Logical AND, written &&, is true only when both conditions are true.",
        },
      ),
      guide(
        "Update variables with assignment operators and make expression order easy to read.",
        [
          "Assignment stores a value in a variable. Compound operators such as += add to the current value and store the result back in that same variable. Increment and decrement change an integer by one.",
          "Operator precedence decides how an expression is grouped. Use parentheses when a calculation might be misread, especially when addition and multiplication appear together.",
        ],
        [
          { label: "Update a running total", code: "total += 5;", detail: "This is a shorter way to add five to total and store the new value." },
          { label: "Use parentheses for the intended order", code: "int result = (score + 3) * 2;", detail: "The parentheses make the addition happen before multiplication." },
        ],
        {
          question: "What is the effect of count += 1?",
          options: ["Add one to count and store it", "Compare count with one", "Set count to the text '1'"],
          correct: 0,
          explanation: "The compound assignment adds one to the existing numeric value and stores the result.",
        },
      ),
    ],
    j18: [
      guide(
        "Create a Scanner that reads console input from System.in.",
        [
          "Scanner is a Java utility that reads input from a source. For keyboard input, create it with System.in and import java.util.Scanner at the top of the file.",
          "Store each value in a variable with a compatible type. Scanner can read text, integers, and decimal values with methods such as nextLine, nextInt, and nextDouble.",
        ],
        [
          { label: "Import Scanner", code: "import java.util.Scanner;", detail: "The import makes the Scanner class available by its short name." },
          { label: "Create the reader", code: "Scanner input = new Scanner(System.in);", detail: "System.in is the standard input stream, usually connected to the keyboard." },
          { label: "Read a number", code: "int age = input.nextInt();", detail: "nextInt reads a token and converts it to an integer." },
        ],
        {
          question: "Which source is normally passed to Scanner to read keyboard input?",
          options: ["System.in", "System.out", "System.err"],
          correct: 0,
          explanation: "System.in is the standard input stream. System.out is used for normal output.",
        },
      ),
      guide(
        "Choose between next and nextLine when reading text from the console.",
        [
          "next reads one token and stops at whitespace. nextLine reads the rest of the current line, including spaces. Choose the method based on whether the user is entering one word or a full line.",
          "After a numeric read such as nextInt, the line break may still be waiting in the input buffer. Consume that line break before using nextLine for the next full answer.",
        ],
        [
          { label: "Read one word", code: "String firstName = input.next();", detail: "next stops at the first whitespace, so it reads one token." },
          { label: "Read a complete line", code: "input.nextLine();\nString address = input.nextLine();", detail: "The first call consumes a pending line break after a numeric read; the second reads the full address." },
        ],
        {
          question: "Which Scanner method reads a complete line that may contain spaces?",
          options: ["nextLine()", "next()", "nextInt()"],
          correct: 0,
          explanation: "nextLine reads the remaining text on a line, including spaces.",
        },
      ),
      guide(
        "Choose print, println, or printf based on how the output should appear.",
        [
          "System.out.print writes text without adding a new line. println writes the text and then moves to the next line. printf supports formatted output, such as showing a decimal value with a fixed number of places.",
          "A Scanner can be closed when the program owns the input source. Be careful with a Scanner over System.in because closing it also closes the shared standard input stream.",
        ],
        [
          { label: "Write without moving to a new line", code: "System.out.print(\"Score: \");", detail: "The next output can continue on the same line." },
          { label: "Write a line", code: "System.out.println(score);", detail: "println adds a line break after the value." },
          { label: "Format a decimal", code: "System.out.printf(\"Average: %.2f%n\", average);", detail: "The format specifier displays two digits after the decimal point and then moves to a new line." },
        ],
        {
          question: "Which method is designed for formatted numeric output?",
          options: ["printf", "nextLine", "close"],
          correct: 0,
          explanation: "printf supports format specifiers for values such as decimal numbers.",
        },
      ),
    ],
  },
  python: {
    p6: [
      guide(
        "Create a list and access its items by index.",
        [
          "A list stores an ordered group of values. Lists can grow or shrink, and each item has an index that starts at zero. Use len to find how many items are stored.",
          "The final valid index is one less than the list length. A negative index counts from the end, while an index outside the list raises IndexError.",
        ],
        [
          { label: "Create a list", code: "subjects = [\"HTML\", \"CSS\", \"Python\"]", detail: "The brackets create an ordered list containing three strings." },
          { label: "Read an item", code: "print(subjects[0])", detail: "Index zero refers to the first item, HTML." },
          { label: "Check how many items it has", code: "print(len(subjects))", detail: "len returns 3 because there are three items in the list." },
        ],
        {
          question: "Which index refers to the first item in a Python list?",
          options: ["0", "1", "-1"],
          correct: 0,
          explanation: "Python list indexes begin at zero. Index -1 refers to the last item.",
        },
      ),
      guide(
        "Use slicing to select a range of list items without changing the original list.",
        [
          "A slice uses start, stop, and an optional step. The start position is included, but the stop position is excluded. This makes it easy to select a portion of the list.",
          "Leaving out the start or stop uses the beginning or end of the list. A step can skip items, and a negative step can read the values in reverse order.",
        ],
        [
          { label: "Choose a range", code: "scores = [72, 85, 91, 68, 88]\nprint(scores[1:4])", detail: "The slice begins at index 1 and stops before index 4, returning 85, 91, and 68." },
          { label: "Take every second item", code: "print(scores[::2])", detail: "A step of two selects every other item." },
          { label: "Read a reversed slice", code: "print(scores[::-1])", detail: "A step of -1 walks through the list from the end to the beginning." },
        ],
        {
          question: "What does items[1:3] include?",
          options: ["Indexes 1 and 2", "Indexes 1, 2, and 3", "Only index 3"],
          correct: 0,
          explanation: "The start is included and the stop is excluded, so indexes 1 and 2 are returned.",
        },
      ),
      guide(
        "Recognize when two variables refer to the same list and when a copy is needed.",
        [
          "Assigning one list variable to another does not create a new list. Both names refer to the same object, so a change made through either name is visible through the other.",
          "Use copy or a full slice to make a shallow copy. A shallow copy creates a new outer list but still shares nested objects inside it.",
        ],
        [
          { label: "Create a second reference", code: "first = [\"red\", \"blue\"]\nsecond = first", detail: "Both names point to the same list object." },
          { label: "Notice the shared change", code: "second.append(\"green\")\nprint(first)", detail: "The original name also shows green because the list itself was changed." },
          { label: "Make a shallow copy", code: "separate = first.copy()", detail: "separate is a new outer list, so appending to it will not change the outer list named first." },
        ],
        {
          question: "Which expression creates a shallow copy of the list items?",
          options: ["items.copy()", "items", "items.append"],
          correct: 0,
          explanation: "copy creates a new outer list. A plain assignment creates another reference to the same list.",
        },
      ),
    ],
    p16: [
      guide(
        "Choose arithmetic operators for calculations and understand floor division.",
        [
          "Python supports addition, subtraction, multiplication, division, floor division, remainder, and exponentiation. Each operator performs a different calculation, so choose the one that matches the problem.",
          "The / operator produces a float. The // operator performs floor division, which rounds down to the next lower integer. This matters for negative values as well as positive ones.",
        ],
        [
          { label: "Calculate a total", code: "total = 18 + 7", detail: "The plus operator adds the values and stores 25 in total." },
          { label: "Divide with a decimal result", code: "average = 25 / 2", detail: "Ordinary division uses the / operator and produces the floating-point result 12.5." },
          { label: "Find whole groups and a remainder", code: "groups = 25 // 4\nleftover = 25 % 4", detail: "Floor division returns 6 whole groups, while the remainder is 1." },
        ],
        {
          question: "Which operator gives the remainder after division?",
          options: ["%", "//", "**"],
          correct: 0,
          explanation: "The percent operator returns the remainder. Double slash is floor division, and double star is exponentiation.",
        },
      ),
      guide(
        "Compare values and combine conditions to make a Boolean decision.",
        [
          "Comparison operators such as ==, !=, <, and >= produce True or False. The logical operators and, or, and not let a program combine or reverse those results.",
          "Python also supports chained comparisons such as 0 <= score <= 100. A chain is a readable way to check that a value stays within a range.",
        ],
        [
          { label: "Compare a value", code: "passed = score >= 75", detail: "passed becomes True when score is at least 75." },
          { label: "Combine two requirements", code: "eligible = age >= 18 and has_id", detail: "Both sides must be true for eligible to be true." },
          { label: "Check a range", code: "valid = 0 <= score <= 100", detail: "The chained comparison checks both boundaries." },
        ],
        {
          question: "Which keyword requires both conditions to be true?",
          options: ["and", "or", "not"],
          correct: 0,
          explanation: "The and keyword returns True only when both conditions are true, so every requirement in the combined expression must pass.",
        },
      ),
      guide(
        "Use membership to check for a value and identity to check for the None object.",
        [
          "The in operator checks whether a value is contained in a list, string, or other collection. It is useful when the program needs to know whether an item is present.",
          "The is operator checks whether two references point to the same object. A common use is checking for None. Use == for ordinary value comparisons, including strings and numbers.",
        ],
        [
          { label: "Check whether an item is present", code: "colors = [\"green\", \"blue\"]\nprint(\"blue\" in colors)", detail: "The expression returns True because blue is one of the list's values." },
          { label: "Check for a missing value", code: "if result is None:\n    print(\"No result yet\")", detail: "is None is the standard way to check whether a value is the None object." },
        ],
        {
          question: "Which operator should usually compare two strings by their value?",
          options: ["==", "is", "in"],
          correct: 0,
          explanation: "Use == for value equality. is checks identity, while in checks membership.",
        },
      ),
    ],
    p17: [
      guide(
        "Read a line from the console and store the returned text.",
        [
          "input displays an optional prompt and waits for the user to type a line. The returned value is always a string, even when the user enters digits.",
          "Store that result in a variable with a name that describes the information. Convert it later if a calculation needs a number.",
        ],
        [
          { label: "Ask a clear question", code: "name = input(\"What is your name? \")", detail: "The prompt tells the user what information is expected." },
          { label: "Use the returned string", code: "print(\"Hello,\", name)", detail: "The variable contains the text the user entered." },
        ],
        {
          question: "What type of value does input return?",
          options: ["str", "int", "bool"],
          correct: 0,
          explanation: "input always returns a string. Convert the value when a different type is needed.",
        },
      ),
      guide(
        "Convert input text deliberately and handle values that cannot be converted.",
        [
          "Use int to convert whole-number text and float to convert decimal text. A conversion can fail when the user enters something that is not a valid number.",
          "A ValueError can be handled with try and except. Give the user a clear message and let them try again instead of allowing an unexpected value to stop the program.",
        ],
        [
          { label: "Convert text to an integer", code: "age_text = input(\"Age: \")\nage = int(age_text)", detail: "int turns numeric text such as 18 into an integer value." },
          { label: "Handle invalid input", code: "try:\n    age = int(age_text)\nexcept ValueError:\n    print(\"Enter a whole number.\")", detail: "The exception block handles text that cannot be converted to an integer." },
        ],
        {
          question: "Which exception is raised when int receives text such as 'hello'?",
          options: ["ValueError", "IndexError", "KeyError"],
          correct: 0,
          explanation: "ValueError means the supplied value has the right general form for the operation but cannot be converted as requested.",
        },
      ),
      guide(
        "Format output so values are easy to read without changing the original data.",
        [
          "print can display several values, separate them with a chosen separator, and end with a chosen string. f-strings are another readable way to place values inside a sentence.",
          "Keep the original numeric value as a number while calculating. Format it only when displaying the result, such as limiting an average to two decimal places.",
        ],
        [
          { label: "Display several values", code: "print(\"Name:\", name, \"Score:\", score)", detail: "print separates the supplied values with spaces by default." },
          { label: "Insert values into text", code: "print(f\"Hello, {name}!\")", detail: "The expression inside braces is evaluated and inserted into the string." },
          { label: "Format a decimal value", code: "print(f\"Average: {average:.2f}\")", detail: "The .2f format displays a floating-point value with two digits after the decimal point." },
        ],
        {
          question: "Which syntax inserts a variable into a Python f-string?",
          options: ["{name}", "$(name)", "%name"],
          correct: 0,
          explanation: "An f-string evaluates expressions placed inside curly braces.",
        },
      ),
    ],
    p18: [
      guide(
        "Normalize text by creating a cleaned version of the original string.",
        [
          "Python strings are immutable, which means string methods return new strings rather than changing the original object. lower and upper change letter case, while strip removes whitespace from the beginning and end.",
          "Normalize input when case or accidental spaces should not affect a comparison. Keep the original string when exact capitalization or spacing matters.",
        ],
        [
          { label: "Receive and inspect text", code: "answer = \"  Python  \"", detail: "The value has extra spaces that may interfere with matching." },
          { label: "Remove surrounding spaces", code: "clean = answer.strip()", detail: "strip returns a new string without the surrounding whitespace." },
          { label: "Normalize the case", code: "normalized = clean.lower()", detail: "The new value is lowercase, making a case-insensitive comparison easier." },
        ],
        {
          question: "Which method removes whitespace from the beginning and end of a string?",
          options: ["strip()", "split()", "join()"],
          correct: 0,
          explanation: "strip removes surrounding whitespace. split separates text into parts, and join combines strings.",
        },
      ),
      guide(
        "Search for text and distinguish a found position from a missing substring.",
        [
          "find returns the position of the first matching substring. If it cannot find the text, it returns -1. A position of zero is a valid result, so it should not be used as a simple True or False check.",
          "Use in when the program only needs to know whether a substring exists. Use startswith and endswith when the position at the beginning or end matters.",
        ],
        [
          { label: "Search for a substring", code: "filename = \"report.txt\"\nposition = filename.find(\".txt\")", detail: "find returns 6 because the substring begins at index 6." },
          { label: "Check for presence directly", code: "if \".txt\" in filename:\n    print(\"Text file\")", detail: "in returns a Boolean and avoids confusing a valid position of zero with a missing value." },
        ],
        {
          question: "What does find return when the substring does not exist?",
          options: ["-1", "0", "None"],
          correct: 0,
          explanation: "find returns -1 when no match is found. A result of zero means the match begins at the first character.",
        },
      ),
      guide(
        "Split text into parts and join a group of strings with a separator.",
        [
          "split breaks a string into a list of smaller strings. By default it splits on runs of whitespace, or you can provide a specific separator.",
          "join combines an iterable of strings and places the chosen separator between each item. It is useful for building a readable line from several words without repeatedly adding strings in a loop.",
        ],
        [
          { label: "Split a sentence into words", code: "words = \"learn Python today\".split()", detail: "split returns a list containing learn, Python, and today." },
          { label: "Clean up one word", code: "words[1] = words[1].upper()", detail: "The second list item is updated to uppercase." },
          { label: "Join the words again", code: "result = \" \".join(words)", detail: "join places one space between each item and returns a new string." },
        ],
        {
          question: "Which expression joins a list of words with a single space between them?",
          options: ["\" \".join(words)", "words.split(\" \")", "words.append(\" \")"],
          correct: 0,
          explanation: "join is called on the separator string and combines the supplied sequence of strings.",
        },
        {
          title: "Build a text summary tool",
          prompt: "Create a small console tool that accepts a sentence, cleans up its spacing and capitalization, checks whether a chosen keyword appears, and reports a simple word count.",
          deliverable: "A Python program that transforms a sentence into a clean summary and prints the result.",
          criteria: [
            "Read text from the console.",
            "Use strip and a case-normalizing method.",
            "Use split to turn the sentence into a list of words.",
            "Use in or find to check for a keyword.",
            "Use join and an f-string to display the cleaned summary and word count.",
          ],
          selfCheck: "Does the tool behave correctly when the keyword is the first word, appears more than once, or is not present?",
        },
      ),
    ],
  },
  javascript: {
    js6: [
      guide(
        "Declare a function and call it when the program needs its instructions to run.",
        [
          "A function groups statements under a name so the same behavior can be used more than once. A function declaration uses the function keyword, a name, optional parameters, and a body.",
          "Defining a function does not run its body. Call it with parentheses to execute the statements inside it.",
        ],
        [
          { label: "Declare the function", code: "function greet() {\n  console.log(\"Hello!\");\n}", detail: "The name greet identifies the reusable block of code." },
          { label: "Call the function", code: "greet();", detail: "The parentheses execute the function body." },
        ],
        {
          question: "What makes a declared JavaScript function run?",
          options: ["Calling it with parentheses", "Adding a comment above it", "Renaming its parameter"],
          correct: 0,
          explanation: "A function declaration defines the reusable instructions, and calling its name with parentheses executes the function body.",
        },
      ),
      guide(
        "Pass information into a function with parameters and return a result when needed.",
        [
          "Parameters are named inputs that a function receives when it is called. Arguments are the actual values supplied for those parameters.",
          "return sends a value back to the caller. Logging a value with console.log only displays it; it does not automatically make that value available to the code that called the function.",
        ],
        [
          { label: "Accept an input parameter", code: "function greet(name) {\n  console.log(\"Hello, \" + name);\n}", detail: "name is the parameter that receives the argument." },
          { label: "Return a calculated value", code: "function double(number) {\n  return number * 2;\n}", detail: "The returned result can be stored or used in another expression." },
          { label: "Use the result", code: "const total = double(8);", detail: "The call evaluates to 16, which is assigned to total." },
        ],
        {
          question: "Which keyword sends a value back from a function?",
          options: ["return", "console", "const"],
          correct: 0,
          explanation: "return ends the function call and provides its result to the caller.",
        },
      ),
      guide(
        "Use local variables to keep a function's temporary work separate from the surrounding code.",
        [
          "A variable declared inside a function is local to that function. It can be used in the function body but is not automatically available outside it.",
          "Return the value that other code needs. This keeps the function's internal steps separate from the rest of the program and makes the result easier to test.",
        ],
        [
          { label: "Create a local value", code: "function makeLabel(name) {\n  const label = \"Reader: \" + name;", detail: "label exists only while the function is running." },
          { label: "Return the useful result", code: "  return label;\n}", detail: "The caller receives the string without needing access to the local variable." },
          { label: "Store the returned value", code: "const title = makeLabel(\"Mina\");", detail: "title now contains the string returned by the function." },
        ],
        {
          question: "How can code outside a function receive a value calculated inside it?",
          options: ["Return the value", "Declare it with a comment", "Print it only"],
          correct: 0,
          explanation: "return sends the calculated value to the caller. Printing only displays it.",
        },
      ),
    ],
    js8: [
      guide(
        "Create an array and access its items with zero-based indexes.",
        [
          "An array stores an ordered list of values. Create one with square brackets, read an item by its index, and use length to find how many items it contains.",
          "The first item has index zero. A list with three items has indexes 0, 1, and 2, so the last item is always at length minus one.",
        ],
        [
          { label: "Create an array", code: "const languages = [\"HTML\", \"CSS\", \"JavaScript\"];", detail: "The square brackets create one array with three ordered values." },
          { label: "Read one item", code: "console.log(languages[1]);", detail: "Index 1 refers to the second value, CSS." },
          { label: "Check the number of items", code: "console.log(languages.length);", detail: "length returns 3 because the array contains three items." },
        ],
        {
          question: "Which index selects the third item in a JavaScript array?",
          options: ["2", "3", "1"],
          correct: 0,
          explanation: "Array indexes start at zero, so the third item is at index 2.",
        },
      ),
      guide(
        "Add and remove array items with methods that change the original array.",
        [
          "push adds an item to the end of an array, while pop removes the last item. shift and unshift work at the start of the array.",
          "These methods mutate the array, which means they change the original array rather than returning a separate copy. Choose the method based on which end of the list should change.",
        ],
        [
          { label: "Add a new final item", code: "const tasks = [\"Read\", \"Practice\"];\ntasks.push(\"Review\");", detail: "push adds Review to the end of the same array." },
          { label: "Remove the final item", code: "const finished = tasks.pop();", detail: "pop removes the last item and returns the removed value." },
        ],
        {
          question: "Which method adds a new item to the end of an array?",
          options: ["push()", "pop()", "shift()"],
          correct: 0,
          explanation: "push adds to the end. pop removes from the end, and shift removes from the beginning.",
        },
      ),
      guide(
        "Create a shallow copy when the new array should have its own outer list.",
        [
          "Assigning an array to another variable copies the reference, not the array itself. Both names still point to the same array, so a change through one name is visible through the other.",
          "slice with no arguments or the spread syntax creates a shallow copy of the outer array. If the array contains objects or other arrays, those nested values are still shared.",
        ],
        [
          { label: "Notice a shared reference", code: "const first = [1, 2];\nconst second = first;", detail: "first and second refer to the same array." },
          { label: "Create a new outer array", code: "const copy = first.slice();", detail: "copy is a different array containing the same item values." },
          { label: "Change only the copy's outer list", code: "copy.push(3);", detail: "The new value is added to copy, while first remains unchanged." },
        ],
        {
          question: "Which expression creates a shallow copy of an array?",
          options: ["items.slice()", "items", "items.length"],
          correct: 0,
          explanation: "slice returns a new array. A plain assignment copies only the reference.",
        },
      ),
    ],
    js9: [
      guide(
        "Create an object literal that groups related properties under one variable.",
        [
          "An object groups related information as key-value pairs. The keys describe the properties, and the values store the information associated with each key.",
          "Use dot notation when the property name is known in the code. Use bracket notation when the key is stored in a variable or contains characters that do not fit dot notation.",
        ],
        [
          { label: "Create an object", code: "const user = {\n  name: \"Mina\",\n  level: 3,\n};", detail: "The object keeps the name and level properties together so related information can be read through one variable." },
          { label: "Read a known property", code: "console.log(user.name);", detail: "Dot notation reads the value stored under the name property." },
          { label: "Read a dynamic property", code: "const field = \"level\";\nconsole.log(user[field]);", detail: "Bracket notation uses the value in field to choose which property to read." },
        ],
        {
          question: "Which expression reads the name property from user?",
          options: ["user.name", "user->name", "user(name)"],
          correct: 0,
          explanation: "Dot notation reads a property when its name is known, while bracket notation is useful when the property key is stored in a variable.",
        },
      ),
      guide(
        "Add, update, and remove object properties with clear assignments.",
        [
          "An object can be updated after it is created. Assign a new value to a property to change it, or assign a new property name to add another value.",
          "The delete operator removes a property. Use it only when the property should no longer exist; assigning a meaningful value such as false or null can be clearer when the property is still part of the object's shape.",
        ],
        [
          { label: "Update a property", code: "user.level = 4;", detail: "The level property now stores the updated value 4, replacing the value that the object held before this assignment." },
          { label: "Add another property", code: "user.active = true;", detail: "The object gains an active property." },
          { label: "Read the updated object", code: "console.log(user.active);", detail: "The property can be read just like the values that were present at creation." },
        ],
        {
          question: "Which statement changes the level property to 4?",
          options: ["user.level = 4;", "user.level == 4;", "user.level(4);"],
          correct: 0,
          explanation: "A single equals sign assigns a new value. Double equals compares values.",
        },
      ),
      guide(
        "Use an object's methods to group behavior with the information it needs.",
        [
          "A property whose value is a function is called a method. A method can read other properties from the same object through this when it is called as an object method.",
          "Call the method through the object, such as user.greet(). Pulling the method into a separate variable changes how it is called and can remove the object receiver that this depends on.",
        ],
        [
          { label: "Add a method to the object", code: "const reader = {\n  name: \"Mina\",\n  greet() {\n    return \"Hello, \" + this.name;\n  },\n};", detail: "greet is a method, and this refers to the reader object when called through reader." },
          { label: "Call it through its object", code: "const message = reader.greet();", detail: "The method can read reader.name through this and return the greeting." },
        ],
        {
          question: "Inside reader.greet(), what does this.name refer to when called as reader.greet()?",
          options: ["The name property of reader", "The name of the browser", "A new global variable"],
          correct: 0,
          explanation: "When called as an object method, this refers to the object before the dot.",
        },
        {
          title: "Build a tiny reading-list tracker",
          prompt: "Create a small JavaScript program that stores several books as objects inside an array, updates a book's reading status, and prints a simple summary.",
          deliverable: "An array of book objects plus functions that add a book, update its status, and summarize the list.",
          criteria: [
            "Represent each book with an object and useful properties.",
            "Store multiple books in an array.",
            "Use a function with parameters to add or update a book.",
            "Use conditions and an operator to count completed books.",
            "Print a readable summary of the collection.",
          ],
          selfCheck: "Does the program still work when the array is empty or when a book's status is changed more than once?",
        },
      ),
    ],
    js17: [
      guide(
        "Use arithmetic and assignment operators to calculate and update values.",
        [
          "JavaScript includes arithmetic operators such as +, -, *, /, %, and **. The plus operator adds numbers but can also join strings, so convert input deliberately when it should represent a number.",
          "Assignment operators store or update values. A compound operator such as += combines an operation with assigning the result back to the same variable.",
        ],
        [
          { label: "Calculate a result", code: "const total = 12 + 8;", detail: "The plus operator adds two numeric values." },
          { label: "Update a variable", code: "let score = 10;\nscore += 5;", detail: "The compound assignment updates score to 15." },
        ],
        {
          question: "What does score += 5 do?",
          options: ["Adds 5 to the current score", "Compares score with 5", "Turns score into a string"],
          correct: 0,
          explanation: "The compound assignment adds five and stores the new value in score.",
        },
      ),
      guide(
        "Compare values with strict equality and relational operators.",
        [
          "The strict equality operator === compares both type and value. The loose equality operator == may convert values before comparing them, which can produce surprising results.",
          "Relational operators compare values such as numbers and strings. Prefer strict equality for predictable checks, and use Number.isNaN when checking for the special NaN numeric value.",
        ],
        [
          { label: "Compare type and value", code: "console.log(5 === \"5\");", detail: "The result is false because one value is a number and the other is a string." },
          { label: "Check an inclusive boundary", code: "const valid = score >= 0 && score <= 100;", detail: "Both comparisons must be true for the score to be within the range." },
        ],
        {
          question: "Which operator compares both value and type without conversion?",
          options: ["===", "==", "="],
          correct: 0,
          explanation: "Strict equality uses ===. A single equals sign assigns a value.",
        },
      ),
      guide(
        "Combine Boolean conditions and choose a fallback that matches the meaning of the value.",
        [
          "The logical operators &&, ||, and ! combine or reverse conditions. The conditional operator chooses between two expressions based on a condition.",
          "Nullish coalescing ?? supplies a fallback only when the left side is null or undefined. Logical OR || also replaces values such as zero and an empty string, so choose the operator that matches the data.",
        ],
        [
          { label: "Combine two conditions", code: "const canEnter = hasTicket && isOpen;", detail: "Both conditions must be true for canEnter to be true." },
          { label: "Provide a missing-value fallback", code: "const pageSize = savedSize ?? 20;", detail: "The default is used only when savedSize is null or undefined." },
          { label: "Notice the difference with OR", code: "const count = savedCount || 20;", detail: "A saved value of zero is falsy, so OR replaces it with 20." },
        ],
        {
          question: "Which operator keeps a valid value of zero instead of replacing it with a fallback?",
          options: ["??", "||", "!"],
          correct: 0,
          explanation: "Nullish coalescing falls back only for null or undefined, not for zero.",
        },
      ),
    ],
  },
  php: {
    php6: [
      guide(
        "Create an indexed PHP array and read values using their numeric keys.",
        [
          "A PHP array stores an ordered group of values under keys. An indexed array usually uses numeric keys beginning at zero, so the first item is stored at index 0.",
          "Use square brackets to read an item. Check that a key exists before relying on it, because an unavailable key can produce a warning.",
        ],
        [
          { label: "Create an indexed array", code: "$colors = ['green', 'blue', 'gold'];", detail: "The array contains three values with indexes 0, 1, and 2." },
          { label: "Read an item", code: "echo $colors[1];", detail: "Index 1 refers to the second item, blue." },
        ],
        {
          question: "Which index refers to the first value in a typical indexed PHP array?",
          options: ["0", "1", "-1"],
          correct: 0,
          explanation: "An indexed PHP array normally begins with the numeric key zero.",
        },
      ),
      guide(
        "Add, count, and visit array values without assuming every key is present.",
        [
          "Append a value with the empty square brackets syntax. count returns how many items the array contains, and foreach visits the values without manually managing an index.",
          "unset removes an item but does not automatically renumber the remaining keys. This matters when using a numeric for loop, because a gap can remain in the key sequence.",
        ],
        [
          { label: "Append a value", code: "$colors[] = 'purple';", detail: "PHP adds the value at the next available numeric key." },
          { label: "Count the array", code: "echo count($colors);", detail: "count returns how many values the array currently contains." },
          { label: "Visit each value", code: "foreach ($colors as $color) {\n    echo $color;\n}", detail: "foreach visits each value without assuming that keys are consecutive." },
        ],
        {
          question: "Which loop is designed to visit every value in a PHP array?",
          options: ["foreach", "switch", "require"],
          correct: 0,
          explanation: "foreach iterates over the values or key-value pairs in an array.",
        },
      ),
      guide(
        "Choose a sorting function based on whether the array's keys should be preserved.",
        [
          "sort orders values and resets their numeric keys. asort orders values while keeping the original keys. ksort orders an array by its keys.",
          "Choose the function based on what the keys mean. If an array uses names or IDs as keys, resetting them can destroy the relationship between each key and its value.",
        ],
        [
          { label: "Sort a simple list", code: "$scores = [92, 78, 85];\nsort($scores);", detail: "sort arranges the numeric values and resets the indexes." },
          { label: "Preserve keys while sorting values", code: "$prices = ['pen' => 12, 'book' => 80];\nasort($prices);", detail: "asort orders the values while keeping pen and book as their keys." },
        ],
        {
          question: "Which function sorts an associative array by value while preserving its keys?",
          options: ["asort()", "sort()", "ksort()"],
          correct: 0,
          explanation: "asort sorts values and preserves their associated keys. sort renumbers keys, while ksort sorts by key.",
        },
      ),
    ],
    php8: [
      guide(
        "Join strings with the dot operator and display their length carefully.",
        [
          "PHP uses the dot operator to concatenate strings. It joins the text on the left with the text on the right and returns one combined string.",
          "strlen counts bytes, not necessarily visible characters. For UTF-8 text that contains accented letters or emoji, multibyte string functions are needed when the task is to count characters.",
        ],
        [
          { label: "Join two pieces of text", code: "$name = 'Mina';\n$message = 'Hello, ' . $name;", detail: "The dot joins the greeting with the value stored in name." },
          { label: "Measure an ordinary string", code: "echo strlen('Hello');", detail: "The function returns the number of bytes in the string." },
        ],
        {
          question: "Which operator joins two strings in PHP?",
          options: [".", "+", "&&"],
          correct: 0,
          explanation: "PHP uses the dot operator to join the left and right strings into one combined string value.",
        },
      ),
      guide(
        "Clean and change the case of text with common PHP string functions.",
        [
          "trim removes whitespace from the beginning and end of a string. strtolower converts letters to lowercase, while strtoupper converts them to uppercase.",
          "These functions return a new string value. Assign the result when the cleaned or transformed text should be used later.",
        ],
        [
          { label: "Remove surrounding spaces", code: "$name = trim('  Mina  ');", detail: "The variable now contains Mina without the extra spaces." },
          { label: "Normalize case", code: "$code = strtolower('ABC-42');", detail: "The result is abc-42, which can be useful for case-insensitive matching." },
          { label: "Display uppercase text", code: "echo strtoupper($name);", detail: "The displayed name is converted to uppercase." },
        ],
        {
          question: "Which function removes whitespace from the start and end of a string?",
          options: ["trim()", "count()", "sort()"],
          correct: 0,
          explanation: "trim removes surrounding whitespace. It does not remove spaces from the middle of a string.",
        },
      ),
      guide(
        "Search for and replace text while choosing a function that matches the task.",
        [
          "str_replace changes matching text and returns the updated string. str_contains answers whether a substring exists, while strpos returns the position of a match or false when none exists.",
          "Search results should be checked carefully. A match at position zero is valid, so use a strict comparison with false when checking strpos. For multibyte text, choose functions designed for UTF-8.",
        ],
        [
          { label: "Replace a word", code: "$message = str_replace('old', 'new', $message);", detail: "The function returns a string with each matching occurrence replaced." },
          { label: "Check for a substring", code: "if (str_contains($message, 'welcome')) {\n    echo 'Found it';\n}", detail: "str_contains returns a Boolean value rather than a numeric position." },
        ],
        {
          question: "Which function returns true or false when checking whether a string contains another string?",
          options: ["str_contains()", "strlen()", "str_replace()"],
          correct: 0,
          explanation: "str_contains checks presence. strlen counts bytes and str_replace creates an updated string.",
        },
        {
          title: "Build a simple course score report",
          prompt: "Create a small PHP program that stores a set of course scores, calculates their average, counts passing scores, and prints a readable report.",
          deliverable: "A PHP script that processes an array of scores and displays a summary for a learner.",
          criteria: [
            "Store multiple numeric scores in an indexed array.",
            "Use a loop to calculate the total and pass count.",
            "Use a function for at least one reusable calculation.",
            "Use operators and comparisons to identify passing scores.",
            "Use string functions or concatenation to format a clear report.",
          ],
          selfCheck: "Does the report handle an empty score list and a score exactly on the passing boundary?",
        },
      ),
    ],
    php16: [
      guide(
        "Use arithmetic and assignment operators to calculate and update values.",
        [
          "PHP supports arithmetic operators such as +, -, *, /, %, and **. Assignment stores a value in a variable, and compound operators such as += update a value using its current contents.",
          "When numeric values come from a form or another external source, validate and convert them before using them in a calculation. Do not assume text is already a number.",
        ],
        [
          { label: "Calculate a total", code: "$subtotal = 120 + 80;", detail: "The addition operator combines the two numeric values." },
          { label: "Update the total", code: "$subtotal += 20;", detail: "The compound assignment increases subtotal by 20 and stores the new value." },
        ],
        {
          question: "What does $total += 10 do?",
          options: ["Adds 10 to the current total", "Compares total with 10", "Joins total with the text 10"],
          correct: 0,
          explanation: "The compound assignment adds the numeric value and stores the result back in total.",
        },
      ),
      guide(
        "Compare values and combine conditions to control the program's decisions.",
        [
          "Comparison operators produce Boolean results. PHP supports loose equality with == and strict equality with ===. Strict comparison checks both type and value, which avoids many surprising conversions.",
          "Logical operators such as &&, ||, and ! combine or reverse conditions. Use parentheses when a condition combines several checks so the intended grouping is easy to read.",
        ],
        [
          { label: "Use strict equality", code: "$isValid = ($age === 18);", detail: "Strict equality checks that the value and type both match." },
          { label: "Combine conditions", code: "$canEnter = ($age >= 18) && $hasTicket;", detail: "Both checks must be true before canEnter becomes true." },
        ],
        {
          question: "Which PHP operator compares both type and value?",
          options: ["===", "==", "="],
          correct: 0,
          explanation: "The triple equals operator performs strict equality. A single equals sign assigns a value.",
        },
      ),
      guide(
        "Join text with concatenation and supply a default for a missing value.",
        [
          "The dot operator joins strings, while the null coalescing operator ?? supplies a fallback when the value on its left is missing or null.",
          "A fallback is not the same as validation. It can prevent a missing-value warning, but an application still needs to check whether the supplied value is valid for the task.",
        ],
        [
          { label: "Join a greeting", code: "$message = 'Hello, ' . $name;", detail: "The dot combines the text and the variable value." },
          { label: "Provide a default", code: "$nickname = $profile['nickname'] ?? 'Reader';", detail: "The default is used when nickname is missing or null." },
          { label: "Use the result", code: "echo 'Welcome, ' . $nickname;", detail: "The resulting value can now be joined with another string." },
        ],
        {
          question: "When does the null coalescing operator use its right-hand value?",
          options: ["When the left value is missing or null", "Whenever the left value is zero", "Whenever the left value is an empty array"],
          correct: 0,
          explanation: "?? uses the fallback for a missing or null value. It does not automatically validate arbitrary input.",
        },
      ),
    ],
  },
  sql: {
    sql6: [
      guide(
        "Create a table by naming its columns and choosing data types for their values.",
        [
          "A relational database stores records in tables. Each table has columns, and each column has a name and a data type that describes the kind of value it can hold.",
          "CREATE TABLE defines the structure before rows are inserted. Choose types that fit the information, such as an integer identifier, a text name, or a numeric age.",
        ],
        [
          { label: "Start the table definition", code: "CREATE TABLE users (", detail: "The statement begins a new table named users." },
          { label: "Declare its columns", code: "  id INTEGER,\n  name VARCHAR(100),\n  age INTEGER,\n  city VARCHAR(100)", detail: "Each column has a name followed by a type that describes the values it stores." },
          { label: "Finish the statement", code: ");", detail: "The closing parenthesis ends the column list and the semicolon ends the SQL statement." },
        ],
        {
          question: "What does CREATE TABLE define?",
          options: ["A table's structure", "A query result only", "A sorted report"],
          correct: 0,
          explanation: "CREATE TABLE defines the columns and basic rules that describe the structure of a new database table.",
        },
      ),
      guide(
        "Use a primary key to identify rows and NOT NULL to require an important value.",
        [
          "A primary key identifies each row in a table. Its values must be unique and cannot be NULL. A table has one primary-key constraint, although that key can contain more than one column.",
          "NOT NULL is a simpler constraint for another required value, such as a person's name. Keep these first rules clear before adding relationships or more advanced constraints.",
        ],
        [
          { label: "Give the row a primary key", code: "id INTEGER PRIMARY KEY,", detail: "The id value distinguishes one user row from every other row." },
          { label: "Require the user's name", code: "name VARCHAR(100) NOT NULL,", detail: "NOT NULL prevents a row from being stored without a name." },
          { label: "Keep ordinary fields optional", code: "age INTEGER,\ncity VARCHAR(100)", detail: "These columns hold additional information without introducing more constraints." },
        ],
        {
          question: "Which constraint identifies each row in a table?",
          options: ["PRIMARY KEY", "ORDER BY", "LIKE"],
          correct: 0,
          explanation: "PRIMARY KEY identifies each row. ORDER BY sorts query results and LIKE matches text patterns.",
        },
      ),
      guide(
        "Review a complete table definition and check that its columns match the data it will store.",
        [
          "A useful table definition starts with the information one row represents. For this example, each row represents one user, so the table needs an id, a name, an age, and a city.",
          "The primary key identifies the row, NOT NULL makes the name required, and the other columns hold optional details. Relationships between tables and advanced constraints belong in later database-design lessons.",
        ],
        [
          { label: "Review the complete table", code: "CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  age INTEGER,\n  city VARCHAR(100)\n);", detail: "The statement defines one simple table that the next Beginner SQL topics can populate and query." },
          { label: "Match each field to its purpose", code: "id    → row identifier\nname  → required text\nage   → whole number\ncity  → text", detail: "A column type should fit the kind of value that the column stores." },
          { label: "Keep advanced relationships for later", code: "users(id, name, age, city)", detail: "This first table stands on its own. Foreign keys and multi-table relationships are introduced after the basic table and row concepts." },
        ],
        {
          question: "Why does the users table need a primary key?",
          options: ["To identify each row uniquely", "To sort the rows automatically", "To make every column required"],
          correct: 0,
          explanation: "A primary key gives each row a unique identifier. It does not automatically sort rows or make every other column required.",
        },
      ),
    ],
  },
};
