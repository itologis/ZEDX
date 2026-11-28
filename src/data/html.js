export default {
  intro: {
    title: "HTML",
    tagline: "The structure of every web page.",
    description: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
    useCases: [
      "Structuring web pages",
      "Creating forms and inputs",
      "Embedding media (images, video)",
      "Building accessible content",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        { id: "h1", title: "Basic Structure", syntax: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>", description: "Every HTML page starts with a DOCTYPE, html, head, and body." },
        { id: "h2", title: "Headings", syntax: "<h1>Main Title</h1>\n<h2>Subtitle</h2>\n<h3>Section</h3>", description: "Headings range from h1 (most important) to h6 (least important)." },
        { id: "h3", title: "Paragraphs", syntax: "<p>This is a paragraph.</p>\n<p>Another paragraph.</p>", description: "The p tag defines a paragraph of text." },
        { id: "h10", title: "Semantic HTML", syntax: "<header>\n  <nav>\n  <main>\n  <article>\n  <section>\n  <footer>", description: "Semantic tags describe the meaning of content, not just presentation." },
        { id: "h9", title: "Div & Span", syntax: '<div class="container">\n  <span>inline text</span>\n</div>', description: "div is a block-level container, span is an inline container." },
        { id: "h4", title: "Links", syntax: '<a href="https://example.com">Click me</a>', description: "The a tag creates hyperlinks. The href attribute defines the destination." },
        { id: "h5", title: "Images", syntax: '<img src="image.jpg" alt="Description">', description: "The img tag embeds images. The src attribute is the image URL." },
        { id: "h6", title: "Lists", syntax: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n<ol>\n  <li>Ordered</li>\n</ol>", description: "ul creates unordered (bulleted) lists, ol creates ordered (numbered) lists." },
        { id: "h7", title: "Tables", syntax: "<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>25</td>\n  </tr>\n</table>", description: "Tables display data in rows and columns." },
        { id: "h8", title: "Forms", syntax: '<form>\n  <label>Name:</label>\n  <input type="text">\n  <button>Submit</button>\n</form>', description: "Forms collect user input. They contain inputs, labels, and buttons." }
      ]
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        {
            "id": "h16",
            "title": "Form Validation & Constraint Attributes",
            "syntax": "<form>\n  <input type=\"email\" required>\n  <input type=\"number\" min=\"1\" max=\"10\">\n  <button>Send</button>\n</form>",
            "description": "HTML input types and constraint attributes let the browser check common form rules before submission. They improve feedback, but server-side validation is still required."
          },
        {
            "id": "h17",
            "title": "Frames, Iframes & Embedded Content",
            "syntax": "<iframe src=\"schedule.html\"\n  title=\"Class schedule\"\n  loading=\"lazy\"\n  width=\"640\" height=\"360\"></iframe>",
            "description": "An iframe embeds another document as a separate browsing context. Titles, sandbox restrictions, and narrowly chosen permissions make embedded content easier to identify and safer to use."
          },
        {
            "id": "h18",
            "title": "Native Interactive Elements",
            "syntax": "<details>\n  <summary>Shipping information</summary>\n  <p>Orders leave within two business days.</p>\n</details>",
            "description": "Elements such as details, summary, and dialog provide native interactive behavior. They are often more reliable and accessible than recreating a widget with generic div elements."
          },
        {
            "id": "h19",
            "title": "Custom Data Attributes",
            "syntax": "<article class=\"book\" data-book-id=\"bk-104\">\n  The Glass Library\n</article>\nconst book = document.querySelector(\".book\");\nconsole.log(book.dataset.bookId);",
            "description": "Custom data attributes store small pieces of page-specific data on an element. JavaScript reads them through the dataset property, using camelCase names."
          }
      ]
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        { id: "h11", title: "Canvas", syntax: '<canvas id="myCanvas" width="200" height="100"></canvas>\n<script>\n  const canvas = document.getElementById("myCanvas");\n  const ctx = canvas.getContext("2d");\n  ctx.fillStyle = "red";\n  ctx.fillRect(0, 0, 150, 75);\n</script>', description: "The canvas tag is used to draw graphics via JavaScript." },
        { id: "h12", title: "Audio & Video", syntax: '<video controls>\n  <source src="video.mp4" type="video/mp4">\n</video>\n<audio controls>\n  <source src="audio.mp3">\n</audio>', description: "HTML5 supports native audio and video playback." },
        { id: "h13", title: "Meta Tags", syntax: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="My page">', description: "Meta tags provide metadata about the HTML document." },
        { id: "h14", title: "SVG", syntax: '<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="blue" />\n</svg>', description: "SVG (Scalable Vector Graphics) defines vector-based graphics." },
        { id: "h15", title: "Semantic Structure", syntax: "<header>\n  <nav>\n    <a href='#'>Home</a>\n  </nav>\n</header>\n<main>\n  <article>Content</article>\n</main>\n<footer>Copyright</footer>", description: "Proper semantic structure improves accessibility and SEO." },


          {
            "id": "h20",
            "title": "Script Loading & Module Scripts",
            "syntax": "<script defer src=\"vendor.js\"></script>\n<script defer src=\"app.js\"></script>\n<script type=\"module\" src=\"main.js\"></script>",
            "description": "Script attributes determine when JavaScript downloads and executes. Understanding parser-blocking scripts, async, defer, and modules helps avoid timing and dependency bugs."
          },
          {
            "id": "h21",
            "title": "Template Elements & DOM Cloning",
            "syntax": "<template id=\"row\">\n  <li class=\"row\"><span class=\"name\"></span></li>\n</template>\nconst copy = document.querySelector(\"#row\").content.cloneNode(true);",
            "description": "A template stores inert markup that is not rendered until JavaScript clones and inserts it. Templates are useful for creating repeated page structures consistently."
          },
          {
            "id": "h22",
            "title": "Web Components & Shadow DOM",
            "syntax": "class UserBadge extends HTMLElement {\n  connectedCallback() {\n    this.textContent = \"Member\";\n  }\n}\ncustomElements.define(\"user-badge\", UserBadge);",
            "description": "Web Components define reusable custom HTML elements. Shadow DOM can encapsulate a component's internal markup and styles from the surrounding document."
          },
          {
            "id": "h23",
            "title": "HTML Resource Security Attributes",
            "syntax": "<a href=\"https://outside.example\"\n   target=\"_blank\"\n   rel=\"noopener noreferrer\">Open resource</a>\n<iframe src=\"preview.html\" sandbox></iframe>",
            "description": "HTML attributes can reduce the capabilities granted to linked or embedded content. They support safer browser defaults but do not replace server security or access control."
          }

]
    }
  ]
};
