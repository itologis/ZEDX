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
        { id: "h4", title: "Links", syntax: '<a href="https://example.com">Click me</a>', description: "The a tag creates hyperlinks. The href attribute defines the destination." },
        { id: "h5", title: "Images", syntax: '<img src="image.jpg" alt="Description">', description: "The img tag embeds images. The src attribute is the image URL." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
          { question: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
          { question: "What is the correct HTML tag for a paragraph?", options: ["<paragraph>", "<p>", "<text>", "<para>"], correct: 1 },
          { question: "Which tag is used for the largest heading?", options: ["<heading>", "<h1>", "<head>", "<h6>"], correct: 1 },
          { question: "What does the <br> tag do?", options: ["Creates bold text", "Creates a line break", "Creates a horizontal line", "Creates a paragraph"], correct: 1 }
        ]
      }
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "h6", title: "Lists", syntax: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n<ol>\n  <li>Ordered</li>\n</ol>", description: "ul creates unordered (bulleted) lists, ol creates ordered (numbered) lists." },
        { id: "h7", title: "Tables", syntax: "<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>25</td>\n  </tr>\n</table>", description: "Tables display data in rows and columns." },
        { id: "h8", title: "Forms", syntax: '<form>\n  <label>Name:</label>\n  <input type="text">\n  <button>Submit</button>\n</form>', description: "Forms collect user input. They contain inputs, labels, and buttons." },
        { id: "h9", title: "Div & Span", syntax: '<div class="container">\n  <span>inline text</span>\n</div>', description: "div is a block-level container, span is an inline container." },
        { id: "h10", title: "Semantic HTML", syntax: "<header>\n  <nav>\n  <main>\n  <article>\n  <section>\n  <footer>", description: "Semantic tags describe the meaning of content, not just presentation." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "Which tag is used for an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correct: 0 },
          { question: "What does the <img> tag use for the image source?", options: ["src", "href", "link", "source"], correct: 0 },
          { question: "Which tag is used for a table row?", options: ["<td>", "<tr>", "<th>", "<table>"], correct: 1 },
          { question: "What does HTML5 stand for?", options: ["HTML version 5", "Hyper Text Markup Language 5", "Both A and B", "None"], correct: 2 },
          { question: "Which tag is used for a division/container?", options: ["<div>", "<span>", "<section>", "<article>"], correct: 0 }
        ]
      }
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
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What is the purpose of the <canvas> tag?", options: ["Draw graphics", "Display images", "Play videos", "Create forms"], correct: 0 },
          { question: "Which attribute is used for inline CSS?", options: ["style", "class", "id", "css"], correct: 0 },
          { question: "What does the <meta> tag do?", options: ["Provides metadata", "Creates a link", "Adds an image", "Creates a table"], correct: 0 },
          { question: "Which tag is used for semantic meaning of a header?", options: ["<header>", "<head>", "<h1>", "<top>"], correct: 0 },
          { question: "What does the <nav> tag represent?", options: ["Navigation links", "Network settings", "New article", "Normal text"], correct: 0 }
        ]
      }
    }
  ]
};
