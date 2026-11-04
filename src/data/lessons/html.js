// Lessons for the HTML track. A topic with lessons becomes a chapter: the
// topic page walks through them, practice and "mark as read" sit at the end.
// Topics without an entry keep the single-page layout.
//
// Inline code inside prose is marked with [[double brackets]] and rendered in
// mono. Examples are plain strings so they can be pasted into CodePlate.

export default {
  h1: [
    {
      title: "The four parts of a page",
      body: [
        `Every HTML document has the same skeleton: a DOCTYPE, one [[<html>]] element, a [[<head>]], and a [[<body>]]. The browser reads them in that order.`,
        `The DOCTYPE tells the browser to use modern standards. The head holds information about the page; the body holds everything people actually see.`,
      ],
      example: {
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>`,
        caption: `The smallest complete page — lang tells screen readers and search engines which language it is.`,
      },
      gotcha: `A page that starts with [[<html>]] but no [[<!DOCTYPE html>]] runs in quirks mode, where old box-model rules apply. Keep the DOCTYPE first, always.`,
    },
    {
      title: "Head and body have different jobs",
      body: [
        `The [[<head>]] never renders. It carries the tab title, the character encoding, stylesheets, and metadata.`,
        `The [[<body>]] is the document content: headings, paragraphs, images, forms — whatever the reader sees.`,
      ],
      example: {
        code: `<head>
  <meta charset="utf-8">
  <title>ZEDX — HTML</title>
</head>
<body>
  <h1>HTML</h1>
</body>`,
        caption: `title is the tab label and the default title in search results.`,
      },
      gotcha: `Text inside [[<head>]] is not displayed. Putting a heading there makes it disappear, and a [[<meta charset>]] placed too late in the file can be ignored.`,
    },
    {
      title: "What you can leave out",
      body: [
        `Browsers forgive missing [[<html>]], [[<head>]], or [[<body>]] tags and build them for you, so a fragment still renders. That is a convenience, not a reason to omit them.`,
        `Keep the DOCTYPE and a [[<title>]]: without the DOCTYPE the page falls back to quirks mode, and a page without a title is unhelpful in tabs, bookmarks, and search.`,
      ],
      example: {
        code: `<!DOCTYPE html>
<title>Enough?</title>
<p>This renders — the browser supplies
html, head, and body for you.</p>`,
        caption: `Technically valid, but real pages keep the full skeleton for clarity.`,
      },
    },
  ],

  h2: [
    {
      title: "Six levels, one outline",
      body: [
        `[[<h1>]] through [[<h6>]] mark headings. The number is the level, not the font size: h1 is the most important, h6 the least.`,
        `Together they form an outline of the page, like a table of contents. Screen readers and search engines use that outline to understand and navigate.`,
      ],
      example: {
        code: `<h1>Field Guide</h1>
<h2>Getting started</h2>
<h3>Install</h3>
<h3>First project</h3>
<h2>Reference</h2>`,
        caption: `One h1; each h2 starts a section; h3 sits inside an h2.`,
      },
    },
    {
      title: "Nest, don't skip",
      body: [
        `When you start a subsection, step down exactly one level. Going from [[<h2>]] to [[<h4>]] breaks the outline even if the size looks right.`,
        `A page normally has one [[<h1>]] that names it. If a section needs a heading but not a visible one, hide it with CSS rather than dropping the heading.`,
      ],
      example: {
        code: `<h1>Recipes</h1>
<h2>Bread</h2>
<h3>Sourdough</h3>   <!-- correct: step down one -->

<!-- not: <h4>Sourdough</h4> -->`,
        caption: `Heading order is structure; font size is a design decision.`,
      },
      gotcha: `Headings are not a styling tool. If text should simply be large, style it with CSS; if it introduces a section, keep the level honest.`,
    },
    {
      title: "When a heading is the right tool",
      body: [
        `Use a heading when the content below it is a new section of the page — a chapter, a step, a group of cards. Use [[<p>]], [[<strong>]], or [[<div>]] when you only need emphasis or layout.`,
        `Headings are navigation targets: screen readers can jump from heading to heading, and browsers expose them as outline entries.`,
      ],
      example: {
        code: `<h2>Shipping</h2>
<p>Orders leave the warehouse in 24 hours.</p>

<!-- not a heading: just emphasized text -->
<p><strong>Note:</strong> weekend orders ship Monday.</p>`,
        caption: `The first is a section title; the second is emphasis inside a sentence.`,
      },
      gotcha: `A run of headings with no content between them gives screen-reader users a list of empty stops.`,
    },
  ],

  h3: [
    {
      title: "What a paragraph is",
      body: [
        `[[<p>]] marks a block of related sentences — one thought. The browser supplies spacing above and below the block.`,
        `A paragraph can contain inline elements: [[<strong>]], [[<em>]], [[<a>]], [[<span>]], [[<code>]]. It cannot contain other paragraphs or block-level elements.`,
      ],
      example: {
        code: `<p>HTML describes structure.</p>
<p>CSS describes presentation.</p>`,
        caption: `Two thoughts, two paragraphs.`,
      },
    },
    {
      title: "Inside a paragraph",
      body: [
        `Inline tags shape meaning inside the sentence. [[<strong>]] marks importance, [[<em>]] marks stress, [[<a>]] makes a link, [[<code>]] marks code.`,
        `This is where most of a page's text lives: one sentence or several, as long as it stays one idea.`,
      ],
      example: {
        code: `<p>
  Press <strong>Save</strong> before closing the
  <a href="/settings">settings panel</a>.
  The shortcut is <code>Ctrl + S</code>.
</p>`,
        caption: `One paragraph, four inline elements, one idea.`,
      },
      gotcha: `[[<strong>]] is not just bold, and [[<b>]] is not a heading. If the text is a title, use the matching heading element.`,
    },
    {
      title: "Paragraphs vs. line breaks",
      body: [
        `Use [[<p>]] for prose. Do not use it to wrap layout blocks, lists, tables, or images; those have their own elements.`,
        `Do not fake spacing with empty paragraphs ([[<p>&nbsp;</p>]]) or repeated line breaks. Margins belong to CSS, and [[<br>]] is only for a real line break inside one thought — an address or a poem.`,
      ],
      example: {
        code: `<!-- a line break inside one thought -->
<p>
  Ada Lovelace<br>
  1815–1852
</p>`,
        caption: `A br separates lines within a paragraph, not ideas.`,
      },
      gotcha: `A paragraph inside a paragraph is invalid — the browser closes the first one early. Use a [[<div>]] to group blocks, never a [[<p>]].`,
    },
  ],

  h4: [
    {
      title: "A link is a destination",
      body: [
        `[[<a>]] with an [[href]] makes a hyperlink. The href is the destination; the text between the tags is what the reader clicks.`,
        `Without [[href]], [[<a>]] is only a placeholder — not focusable, not announced as a link.`,
      ],
      example: {
        code: `<a href="https://developer.mozilla.org">MDN Web Docs</a>`,
        caption: `The visible text should describe where the link goes.`,
      },
      gotcha: `A link needs a destination. [[<a>]] without href looks like a link but does nothing when clicked or focused.`,
    },
    {
      title: "Absolute, relative, and in-page",
      body: [
        `An absolute URL starts with a scheme, like [[https://…]]. A relative URL resolves against the current page: [[/about]] is the site root, [[about.html]] is the same folder.`,
        `A fragment such as [[#faq]] jumps within the page and needs a matching [[id]] on the target. [[mailto:]] and [[tel:]] open the mail or phone app.`,
      ],
      example: {
        code: `<a href="/pricing">Pricing</a>
<a href="guide.html">Guide</a>
<a href="#faq">Jump to FAQ</a>
<a href="mailto:hi@example.com">Email us</a>`,
        caption: `Four destinations: site root, same folder, same page, mail app.`,
      },
      gotcha: `When a link opens a new tab, add [[rel="noopener"]] (or [[noreferrer]]) — it stops the new page from reaching back through window.opener.`,
    },
    {
      title: "Links vs. buttons",
      body: [
        `A link navigates. A button performs an action — submitting a form, opening a dialog, toggling a menu. Using the wrong one breaks keyboard behavior and screen-reader announcements.`,
        `Write link text that makes sense out of context. "Click here" and "read more" tell the reader nothing when a screen reader lists the links on the page.`,
      ],
      example: {
        code: `<a href="/report.pdf">Download the 2026 report (PDF)</a>
<button type="button">Open filters</button>`,
        caption: `Navigation is a link; an in-page action is a button.`,
      },
      gotcha: `Do not wrap a button in a link or put interactive elements inside [[<a>]] — nested interactive controls are invalid and difficult to operate.`,
    },
  ],

  h5: [
    {
      title: "The image element",
      body: [
        `[[<img>]] embeds a bitmap. It has no closing tag, and the element is replaced by the image it points to — which is why width and height work on it directly.`,
        `[[src]] is the file; [[alt]] is the text alternative, shown if the image fails to load and read aloud by screen readers.`,
      ],
      example: {
        code: `<img src="cat.jpg" alt="A tabby cat asleep on a keyboard">`,
        caption: `The alt text describes the content, not the filename.`,
      },
    },
    {
      title: "Sizing and loading",
      body: [
        `Set [[width]] and [[height]] attributes so the browser reserves space before the file arrives — this prevents the page from jumping as images load.`,
        `[[loading="lazy"]] defers off-screen images. [[srcset]] lets the browser pick a smaller file for small screens.`,
      ],
      example: {
        code: `<img
  src="chart.png"
  alt="Revenue rose 20% in Q3"
  width="600"
  height="400"
  loading="lazy"
>`,
        caption: `Width and height are layout hints; CSS can still resize the image.`,
      },
      gotcha: `Without alt, screen readers read the file URL out loud. Decorative images need an explicit empty alt — [[alt=""]] — so they are skipped.`,
    },
    {
      title: "When an image is the right tool",
      body: [
        `Use [[<img>]] for photos, screenshots, and illustrations. Use CSS for decoration and [[<svg>]] for icons and diagrams that must stay sharp.`,
        `Informative images need alt text that conveys the same information. Do not repeat a nearby caption word for word — describe what the image adds.`,
      ],
      example: {
        code: `<figure>
  <img src="team.jpg" alt="The five-person support team">
  <figcaption>Support, 2026.</figcaption>
</figure>`,
        caption: `figure ties an image to its caption without merging them.`,
      },
      gotcha: `Writing alt text with an image of text is a red flag: real text belongs in HTML, where it scales, selects, and translates.`,
    },
  ],

  h6: [
    {
      title: "Ordered and unordered",
      body: [
        `[[<ul>]] is an unordered list — bullets, where order does not matter. [[<ol>]] is ordered — numbers, where it does. Each item is an [[<li>]].`,
        `The list element supplies the markers; do not type dashes or numbers into the text.`,
      ],
      example: {
        code: `<ul>
  <li>Milk</li>
  <li>Eggs</li>
</ul>

<ol>
  <li>Preheat the oven</li>
  <li>Mix the batter</li>
</ol>`,
        caption: `Same items, different meaning.`,
      },
      gotcha: `A list must contain only list items. Text or a [[<div>]] directly inside [[<ul>]] is invalid — wrap it in an [[<li>]] or move it out.`,
    },
    {
      title: "Nesting lists",
      body: [
        `An [[<li>]] can contain text, links, paragraphs, even another list. A nested list goes inside the item it belongs to, not between items.`,
        `Styling lives in CSS: change markers with [[list-style-type]] rather than the old [[type]] attribute.`,
      ],
      example: {
        code: `<ul>
  <li>
    Fruit
    <ul>
      <li>Apple</li>
      <li>Pear</li>
    </ul>
  </li>
  <li>Bread</li>
</ul>`,
        caption: `The sub-list belongs to the item it expands.`,
      },
    },
    {
      title: "Lists beyond bullets",
      body: [
        `Use a list whenever content is a set of things: navigation links, features, steps. A list inside [[<nav>]] is the standard pattern because assistive tech can announce how many items there are.`,
        `For term-and-definition pairs, use [[<dl>]] with [[<dt>]] and [[<dd>]] instead of a table or a pile of paragraphs.`,
      ],
      example: {
        code: `<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
  </ul>
</nav>

<dl>
  <dt>HTML</dt>
  <dd>Structure and meaning.</dd>
</dl>`,
        caption: `Navigation is a list of links; a glossary is a description list.`,
      },
      gotcha: `A stack of divs with bullet characters is invisible as a list to screen readers, and copying it hands the reader stray bullets.`,
    },
  ],

  h7: [
    {
      title: "Rows and cells",
      body: [
        `A table is [[<table>]] containing rows ([[<tr>]]), and each row contains cells: [[<td>]] for data, [[<th>]] for headers.`,
        `Tables are for data with two or more dimensions — a grid of related values. They are not a layout tool.`,
      ],
      example: {
        code: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Ada</td>
    <td>36</td>
  </tr>
</table>`,
        caption: `Header cells in the first row; data cells below.`,
      },
    },
    {
      title: "Captions and headers",
      body: [
        `[[<caption>]] names the table. [[<thead>]], [[<tbody>]], and [[<tfoot>]] group rows so browsers and assistive tech can treat them separately.`,
        `[[scope="col"]] or [[scope="row"]] tells screen readers which cells a header describes. [[colspan]] and [[rowspan]] merge cells across columns or rows.`,
      ],
      example: {
        code: `<table>
  <caption>Q3 revenue by region</caption>
  <thead>
    <tr><th scope="col">Region</th><th scope="col">Revenue</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">North</th><td>$12k</td></tr>
  </tbody>
</table>`,
        caption: `A caption and scoped headers make the grid readable aloud.`,
      },
      gotcha: `A header cell with no scope forces screen readers to guess the relationship. If the first row or column is a header, say so explicitly.`,
    },
    {
      title: "When a table is the right tool",
      body: [
        `Use a table only when the reader needs to compare values across rows and columns. For page layout, use normal flow, flexbox, or grid in CSS.`,
        `On narrow screens, wide tables need their own scroll container so the page itself does not scroll sideways.`,
      ],
      example: {
        code: `<div style="overflow-x: auto;">
  <table>…</table>
</div>`,
        caption: `Let the table scroll inside its own box.`,
      },
      gotcha: `Layout tables confuse screen readers — every cell becomes an announced coordinate. If the content is not tabular data, it is not a table.`,
    },
  ],

  h8: [
    {
      title: "What a form does",
      body: [
        `[[<form>]] groups controls that are submitted together. [[action]] is where the data goes; [[method]] is how: [[get]] puts it in the URL, [[post]] in the request body.`,
        `Each control has a [[name]] that becomes the field name in the submitted data. A control without a name is not submitted.`,
      ],
      example: {
        code: `<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
  <button type="submit">Subscribe</button>
</form>`,
        caption: `Label, input, submit — the minimum useful form.`,
      },
      gotcha: `A form control with no name looks fine and sends nothing. The server sees an empty request.`,
    },
    {
      title: "Labels, types, and names",
      body: [
        `Every input needs a label. Tie it with [[for="id"]] or wrap the input inside the label. Placeholders disappear when typing and are not a substitute.`,
        `The [[type]] attribute changes the keyboard, validation, and meaning: [[email]], [[password]], [[number]], [[date]], [[checkbox]], [[radio]]. [[required]] blocks submission when empty.`,
      ],
      example: {
        code: `<label for="pw">Password</label>
<input id="pw" name="pw" type="password" required>

<label>
  <input type="checkbox" name="terms">
  I accept the terms
</label>`,
        caption: `for/id pairs the label; wrapping the input is the other valid pattern.`,
      },
      gotcha: `Clicking a label focuses its control only when the pairing is correct. A label with no for and no wrapped input looks fine but does nothing.`,
    },
    {
      title: "Buttons inside forms",
      body: [
        `Use a form when the user is entering or changing data. For actions that submit nothing — opening a menu, toggling a theme — use [[<button type="button">]].`,
        `Inside a form, a [[<button>]] defaults to [[type="submit"]]. If it is not meant to submit, say so explicitly or it will send the form.`,
      ],
      example: {
        code: `<button type="submit">Save changes</button>
<button type="button">Cancel</button>`,
        caption: `Submit is the default inside a form — opt out when you mean something else.`,
      },
      gotcha: `A link styled as a submit button does not submit, does not validate, and is not announced as a button.`,
    },
  ],

  h9: [
    {
      title: "Two generic containers",
      body: [
        `[[<div>]] is a block-level box with no meaning: it starts on a new line and takes the available width. [[<span>]] is an inline box that flows inside text.`,
        `Both exist to group things for styling or scripting when no semantic element fits.`,
      ],
      example: {
        code: `<div class="card">
  <p>Order <span class="id">#1042</span> shipped.</p>
</div>`,
        caption: `The div groups a block; the span marks a piece of the sentence.`,
      },
    },
    {
      title: "Using them as hooks",
      body: [
        `[[class]] is the usual hook for CSS, [[id]] for one-off targets and fragment links. A div can hold any flow content; a span only inline content.`,
        `Structure still matters: a div can be a layout wrapper, but it should wrap something meaningful, not replace every element.`,
      ],
      example: {
        code: `<div class="grid">
  <div class="cell">A</div>
  <div class="cell">B</div>
</div>`,
        caption: `Layout wrappers are the honest use of a div.`,
      },
      gotcha: `A span around a whole paragraph is invalid inline wrapping. Use the element that matches the content instead.`,
    },
    {
      title: "When not to reach for a div",
      body: [
        `Check for a semantic element first: [[<header>]], [[<nav>]], [[<main>]], [[<section>]], [[<article>]], [[<aside>]], [[<footer>]], [[<ul>]], [[<figure>]]. They carry meaning a div throws away.`,
        `A span is right when you need to style a word inside a sentence and no stronger element applies. For emphasis use [[<strong>]] or [[<em>]]; for code, [[<code>]].`,
      ],
      example: {
        code: `<!-- meaningful -->
<header>…</header>
<nav>…</nav>

<!-- generic: no better element exists -->
<div class="ad-slot">…</div>`,
        caption: `Semantic element when one exists; div when none does.`,
      },
      gotcha: `Class names like header or nav do not give a div meaning — screen readers still see an anonymous box.`,
    },
  ],

  h10: [
    {
      title: "Elements that say what they are",
      body: [
        `Semantic elements describe their role: [[<header>]], [[<nav>]], [[<main>]], [[<article>]], [[<section>]], [[<aside>]], [[<footer>]]. A div says nothing; these say what the content is for.`,
        `That meaning is used by screen readers, search engines, reader modes, and your own CSS.`,
      ],
      example: {
        code: `<header>Site name</header>
<nav>Links</nav>
<main>Article</main>
<footer>Copyright</footer>`,
        caption: `Five landmarks instead of five divs.`,
      },
    },
    {
      title: "main, article, section",
      body: [
        `[[<main>]] holds the primary content, once per page. [[<article>]] is something that stands on its own — a post, a card, a comment. [[<section>]] is a thematic group that normally has a heading.`,
        `If a block has no heading and exists only for layout, use a [[<div>]]. A section without a heading is not invalid, but it is usually a sign the element is being used as a div.`,
      ],
      example: {
        code: `<main>
  <article>
    <h1>Release notes</h1>
    <section>
      <h2>Fixes</h2>
      <p>…</p>
    </section>
  </article>
</main>`,
        caption: `main → article → section, each with a matching heading.`,
      },
      gotcha: `More than one [[<main>]] is invalid. It is the one landmark that must be unique per page.`,
    },
    {
      title: "When semantics pay off",
      body: [
        `Use semantic elements when the content has a recognizable role. The payoff is real: keyboard users can jump between landmarks, and search engines weigh structure.`,
        `Do not stack landmarks for their own sake. One main, one page header, and a nav per navigation block is enough; a header inside every card is not a landmark win.`,
      ],
      example: {
        code: `<nav aria-label="Breadcrumb">…</nav>
<main>…</main>`,
        caption: `Label navigation blocks when there is more than one.`,
      },
      gotcha: `A [[<section>]] with no heading and no styling behaves like a div but announces a region — screen-reader users get an unlabeled stop.`,
    },
  ],

  h11: [
    {
      title: "A drawing surface",
      body: [
        `[[<canvas>]] is a bitmap you draw on with JavaScript. In the HTML it is an empty rectangle with a width and height; everything visible comes from the 2D context.`,
        `It is not an image element and not a container. Text inside the canvas tag only shows if the browser cannot run the script.`,
      ],
      example: {
        code: `<canvas id="chart" width="300" height="150">
  A bar chart of sales.
</canvas>`,
        caption: `Width and height set the drawing buffer; CSS can scale it.`,
      },
    },
    {
      title: "Drawing with the 2D context",
      body: [
        `[[getContext("2d")]] returns the drawing API. Set a fill color, then draw shapes; each call paints over the last unless you clear the canvas.`,
        `Coordinates start at the top-left corner, x to the right, y down. The canvas is a bitmap, so redrawing is how you animate.`,
      ],
      example: {
        code: `const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#e2542f";
ctx.fillRect(10, 10, 120, 60);`,
        caption: `Fill style, then a rectangle at (10, 10) sized 120×60.`,
      },
      gotcha: `Setting the canvas size with CSS stretches the bitmap and blurs it. Set width and height attributes for the buffer, CSS for the layout size.`,
    },
    {
      title: "When canvas is the right choice",
      body: [
        `Use canvas for games, live charts, image editing, and anything that redraws many times per second. Use SVG for diagrams and icons that should stay crisp and accessible.`,
        `Canvas content is pixels: not selectable, not searchable, and invisible to screen readers. Always provide a text alternative nearby or inside the tag.`,
      ],
      example: {
        code: `<canvas id="game" width="480" height="320"
  aria-label="Space Invaders"></canvas>`,
        caption: `The canvas needs a name or a text alternative.`,
      },
      gotcha: `A canvas with no fallback content and no label is a blank space to assistive tech — announce what it shows.`,
    },
  ],

  h12: [
    {
      title: "Native media elements",
      body: [
        `[[<video>]] and [[<audio>]] embed media without a plugin. [[controls]] shows the browser's play, pause, and volume UI.`,
        `[[src]] points at one file, or you use child [[<source>]] elements to offer several formats.`,
      ],
      example: {
        code: `<video controls width="480">
  <source src="clip.mp4" type="video/mp4">
</video>`,
        caption: `Controls first — the user decides when it plays.`,
      },
    },
    {
      title: "Sources, tracks, and preload",
      body: [
        `Multiple [[<source>]] elements let the browser pick the first format it can play. The [[type]] attribute helps it choose without downloading.`,
        `[[<track kind="captions">]] adds subtitles. [[preload="metadata"]] fetches duration without the whole file.`,
      ],
      example: {
        code: `<video controls poster="cover.jpg">
  <source src="clip.webm" type="video/webm">
  <source src="clip.mp4" type="video/mp4">
  <track kind="captions" src="clip.vtt" srclang="en" label="English">
</video>`,
        caption: `Formats, a poster frame, and captions.`,
      },
      gotcha: `Captions are not optional for spoken content. A transcript or track is the only way deaf and hard-of-hearing users get the audio.`,
    },
    {
      title: "When to use media",
      body: [
        `Use native media for a recording the user chooses to play. Do not autoplay with sound: browsers block it, and it surprises people.`,
        `Keep files short and compressed. Video is the heaviest asset on most pages, and a 20 MB hero clip undoes every other performance choice.`,
      ],
      example: {
        code: `<video controls muted autoplay playsinline>
  <source src="loop.mp4" type="video/mp4">
</video>`,
        caption: `Autoplay is only acceptable muted — and still not for everyone.`,
      },
      gotcha: `Autoplay without muted is blocked by every major browser, so the video silently never starts. On iOS, playsinline is also required to avoid fullscreen.`,
    },
  ],

  h13: [
    {
      title: "Metadata in the head",
      body: [
        `[[<meta>]] describes the document; it never renders. [[charset]] declares the encoding, name/content pairs describe the page, and property is used by Open Graph.`,
        `The browser reads them while parsing, so order matters for the ones that affect decoding.`,
      ],
      example: {
        code: `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Short lessons on HTML syntax.">`,
        caption: `Charset, viewport, description — the three that matter most.`,
      },
    },
    {
      title: "What each tag does",
      body: [
        `[[viewport]] makes a page usable on phones. Without it, mobile browsers pretend the page is 980px wide and zoom out.`,
        `[[description]] is the snippet search engines often show. Open Graph tags — [[og:title]], [[og:description]], [[og:image]] — control the card when the link is shared.`,
      ],
      example: {
        code: `<meta property="og:title" content="ZEDX — HTML">
<meta property="og:description" content="Learn HTML one page at a time.">
<meta property="og:image" content="https://example.com/card.png">`,
        caption: `Open Graph tags build the link preview.`,
      },
      gotcha: `Duplicates do not override: the first valid meta tag wins, so a second description is silently ignored.`,
    },
    {
      title: "When meta tags help",
      body: [
        `Use them for encoding, mobile layout, and accurate previews. Keep the description honest and short — that is what people read in search results.`,
        `Skip meta keywords (ignored by search engines) and meta refresh redirects (they break the back button). Use an HTTP redirect or a server rule instead.`,
      ],
      example: {
        code: `<!-- not recommended -->
<meta name="keywords" content="html, learn, code">
<meta http-equiv="refresh" content="0; url=/new-page">`,
        caption: `Both are legacy patterns with better replacements.`,
      },
    },
  ],

  h14: [
    {
      title: "Vector graphics in HTML",
      body: [
        `[[<svg>]] draws shapes from math instead of pixels, so it stays sharp at any size. It can be written inline in HTML or loaded as an image.`,
        `The [[viewBox]] defines the internal coordinate system: [[viewBox="0 0 100 100"]] means a 100×100 grid that scales to whatever size the element gets.`,
      ],
      example: {
        code: `<svg viewBox="0 0 100 100" width="80" height="80">
  <circle cx="50" cy="50" r="40" fill="#e2542f" />
</svg>`,
        caption: `A circle in a 100×100 coordinate system.`,
      },
    },
    {
      title: "Shapes and accessible names",
      body: [
        `Basic shapes — [[rect]], [[circle]], [[line]], [[polygon]] — cover simple drawings; [[path]] covers everything else with its d commands. [[fill]] and [[stroke]] control paint.`,
        `An inline SVG is part of the document, so screen readers can see it. Give it a [[<title>]] and [[role="img"]] when it carries meaning, and [[aria-hidden="true"]] when it is decorative.`,
      ],
      example: {
        code: `<svg viewBox="0 0 24 24" role="img" aria-labelledby="t">
  <title id="t">Warning</title>
  <path d="M12 2 L22 20 H2 Z" fill="#e2542f" />
</svg>`,
        caption: `A title element names the graphic for assistive tech.`,
      },
      gotcha: `A viewBox with no width and height can collapse to zero in some layouts — size the element in CSS or in attributes.`,
    },
    {
      title: "When SVG beats a bitmap",
      body: [
        `Use SVG for icons, logos, charts, and diagrams — anything with clean edges that should scale. Use JPEG or WebP for photographs; SVG cannot represent photographic detail efficiently.`,
        `Inline SVG can be styled with CSS and animated. An SVG loaded through [[<img>]] is simpler and cacheable, but the page cannot reach inside it.`,
      ],
      example: {
        code: `<img src="logo.svg" alt="ZEDX" width="32" height="32">`,
        caption: `Image form when you do not need to style or script the shapes.`,
      },
      gotcha: `An SVG loaded as an image cannot be styled from the page, and its internal title may not be announced — put the alt on the img.`,
    },
  ],

  h15: [
    {
      title: "The document outline",
      body: [
        `A well-structured page reads like a book: a title, chapters, sections. Landmarks — [[header]], [[nav]], [[main]], [[aside]], [[footer]] — mark the regions; headings mark the sections inside them.`,
        `The outline comes from heading order, not font size. Assistive tech can list the headings and jump between landmarks.`,
      ],
      example: {
        code: `<h1>ZEDX</h1>
<h2>Languages</h2>
<h3>HTML</h3>
<h2>About</h2>`,
        caption: `One h1 names the page; h2s divide it; h3s subdivide.`,
      },
    },
    {
      title: "Assembling a full page",
      body: [
        `A typical page is header → nav → main → footer, with articles or sections inside main. [[<aside>]] holds content related to the main flow but not essential to it.`,
        `Add a skip link as the first focusable element so keyboard users can jump past the navigation.`,
      ],
      example: {
        code: `<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>…</header>
  <nav aria-label="Main">…</nav>
  <main id="main">…</main>
  <footer>…</footer>
</body>`,
        caption: `Landmarks plus a skip link: the standard accessible skeleton.`,
      },
      gotcha: `A skip link needs a real target. Without an element with that id, it jumps nowhere and the keyboard user is no better off.`,
    },
    {
      title: "When structure needs labels",
      body: [
        `If a page has more than one [[<nav>]] or [[<aside>]], give each one an [[aria-label]] so they can be told apart in a landmark list.`,
        `Do not nest landmarks that duplicate meaning — a [[<header>]] inside main is a section header, not the page header. Check the result in the accessibility tree.`,
      ],
      example: {
        code: `<nav aria-label="Main">…</nav>
<nav aria-label="Breadcrumb">…</nav>`,
        caption: `Two navigation blocks, two distinct names.`,
      },
      gotcha: `A page without main has no skip-to-content target, and a div-only layout reads as one long unlabeled block.`,
    },
  ],
};
