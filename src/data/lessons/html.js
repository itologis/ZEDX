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
      wrong: {
        code: `<html>
  <head><title>Hello</title></head>
  <body><h1>Hello</h1></body>
</html>`,
        why: `Without [[<!DOCTYPE html>]] the page renders in quirks mode, where the old box model applies.`,
      },
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
      wrong: {
        code: `<head>
  <h1>Hello</h1>
  <meta charset="utf-8">
</head>`,
        why: `The heading sits inside the head, so it never appears on the page.`,
      },
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
      wrong: {
        code: `<DOCTYPE html>
<html>
  <body><p>Hello</p></body>
</html>`,
        why: `[[<DOCTYPE>]] is not the DOCTYPE declaration; the browser treats it as an unknown element and stays in quirks mode.`,
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
      wrong: {
        code: `<h1>Field Guide</h1>
<h3>Install</h3>
<h3>First project</h3>`,
        why: `Jumping from [[<h1>]] to [[<h3>]] leaves a hole in the outline — readers hear a level that was never opened.`,
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
      wrong: {
        code: `<h2>Recipes</h2>
<h4>Sourdough</h4>`,
        why: `The step from h2 to h4 skips h3, so the subsection hangs off a level that does not exist.`,
      },
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
      wrong: {
        code: `<h2>Shipping</h2>
<h2>Returns</h2>
<h2>Contact</h2>`,
        why: `Three headings with nothing between them become three empty stops in a screen reader's heading list.`,
      },
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
      wrong: {
        code: `<p>
  <div>Not inside a paragraph</div>
</p>`,
        why: `A block element closes the paragraph early, so the browser produces an empty p followed by a div.`,
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
      wrong: {
        code: `<p>Please <b>do not</b> delete the file.</p>`,
        why: `[[<b>]] only changes weight; it tells assistive tech nothing about importance.`,
      },
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
      wrong: {
        code: `<p>First line</p>
<p>&nbsp;</p>
<p>Second line</p>`,
        why: `The empty paragraph is real content to a screen reader — it announces a blank line instead of creating space.`,
      },
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
      wrong: {
        code: `<a>Read the guide</a>`,
        why: `An anchor without [[href]] is not focusable and is not announced as a link.`,
      },
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
      wrong: {
        code: `<a href="#pricing">Pricing</a>
<!-- no element with id="pricing" on the page -->`,
        why: `A fragment link with no matching id scrolls nowhere and still changes the URL.`,
      },
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
      wrong: {
        code: `<a href="/settings">
  <button>Settings</button>
</a>`,
        why: `A button inside a link nests two interactive controls in one — invalid, and awkward to operate by keyboard.`,
      },
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
      wrong: {
        code: `<img src="cat.jpg">`,
        why: `With no alt, a screen reader reads the file name aloud instead of describing the picture.`,
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
      wrong: {
        code: `<img src="hero.jpg" alt="Team photo" style="width: 100%">`,
        why: `With no width and height attributes the browser cannot reserve space, so the page jumps when the image loads.`,
      },
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
      wrong: {
        code: `<figure>
  <img src="team.jpg" alt="Support, 2026.">
  <figcaption>Support, 2026.</figcaption>
</figure>`,
        why: `The alt repeats the caption word for word, so the image adds nothing when read aloud.`,
      },
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
      wrong: {
        code: `<ul>
  Choose one:
  <li>Milk</li>
</ul>`,
        why: `Text directly inside [[<ul>]] is invalid; only [[<li>]] elements may be children.`,
      },
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
      wrong: {
        code: `<ul>
  <li>Fruit</li>
  <ul>
    <li>Apple</li>
  </ul>
</ul>`,
        why: `The nested list is a sibling of the item, not inside it — the browser reads two lists, not a sub-list.`,
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
      wrong: {
        code: `<div>• Home</div>
<div>• Docs</div>`,
        why: `Bullet characters in divs are just text: no list semantics, no item count, and they copy as stray characters.`,
      },
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
      wrong: {
        code: `<table>
  <tr><td>Logo</td><td>Menu</td></tr>
  <tr><td>Content</td><td>Sidebar</td></tr>
</table>`,
        why: `A layout table turns visual positions into data coordinates that screen readers announce cell by cell.`,
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
      gotcha: `For simple tables, browsers often infer header relationships from the row structure. For more complex tables, use scope or explicit header associations so each data cell has an unambiguous heading.`,
      wrong: {
        code: `<table>
  <tr><td>Region</td><td>Revenue</td></tr>
  <tr><td>North</td><td>$12k</td></tr>
</table>`,
        why: `The first row uses td instead of th, so those cells are not exposed as column headers. Use th for header cells; scope makes row or column relationships explicit, especially in more complex tables.`,
      },
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
      wrong: {
        code: `<table style="width: 1200px">…</table>`,
        why: `A fixed-width table wider than the screen forces the whole page to scroll sideways.`,
      },
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
      wrong: {
        code: `<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" type="email">
</form>`,
        why: `The input has no [[name]], so the browser sends nothing for it.`,
      },
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
      wrong: {
        code: `<input name="email" placeholder="Email address">`,
        why: `A placeholder is not a label: it disappears as soon as the user types, and it is not announced as the field's name.`,
      },
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
      wrong: {
        code: `<a href="#" onclick="save()">Save</a>`,
        why: `A link styled as a submit button does not submit, does not validate, and is not announced as a button.`,
      },
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
      wrong: {
        code: `<span class="card">
  <p>Order shipped.</p>
</span>`,
        why: `A span may only contain inline content; a paragraph inside it is invalid and the browser breaks the wrapper.`,
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
      wrong: {
        code: `<div id="cell">A</div>
<div id="cell">B</div>`,
        why: `[[id]] must be unique — a second one is invalid, and [[getElementById]] returns only the first match.`,
      },
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
      wrong: {
        code: `<div class="header">Site name</div>
<div class="nav">Links</div>`,
        why: `Class names give a div no meaning; these are still anonymous boxes, not landmarks.`,
      },
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
      wrong: {
        code: `<div class="header">Site name</div>
<div class="nav">Links</div>
<div class="main">Article</div>`,
        why: `The page has no landmarks at all, so screen readers cannot jump to navigation or main content.`,
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
      wrong: {
        code: `<main>First article</main>
<main>Second article</main>`,
        why: `A page should expose only one visible main landmark at a time. Multiple visible main elements create an ambiguous primary-content structure; use one main element containing the page's primary content.`,
      },
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
      wrong: {
        code: `<section>
  <p>Some text.</p>
</section>`,
        why: `The section has no heading, so it announces an unlabeled region that gives no clue what it contains.`,
      },
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
      wrong: {
        code: `<canvas id="chart" style="width: 600px"></canvas>`,
        why: `CSS stretches the default 300×150 buffer to 600px, so every line is drawn at double size and blurred.`,
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
      wrong: {
        code: `const ctx = canvas.getContext("2d");
ctx.fillRect(10, 10, 120, 60);
ctx.fillStyle = "#e2542f";`,
        why: `The fill style is set after the rectangle — the shape already painted keeps the old colour.`,
      },
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
      wrong: {
        code: `<canvas id="chart" width="300" height="150"></canvas>`,
        why: `No fallback text and no label: assistive tech sees an empty box with nothing to announce.`,
      },
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
      wrong: {
        code: `<video src="clip.mp4"></video>`,
        why: `Without [[controls]] there is no way to start, pause, or seek the video.`,
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
      wrong: {
        code: `<video controls src="clip.mp4"></video>`,
        why: `The spoken audio has no captions, so deaf and hard-of-hearing viewers get nothing.`,
      },
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
      wrong: {
        code: `<video autoplay src="ad.mp4"></video>`,
        why: `Unmuted autoplay is blocked by browsers, and where it is not, it starts talking without warning.`,
      },
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
      wrong: {
        code: `<head>
  <title>Page</title>
</head>`,
        why: `No charset and no viewport: the browser guesses the encoding, and phones render the page zoomed out.`,
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
      wrong: {
        code: `<meta name="viewport" content="width=980">`,
        why: `A fixed viewport width forces phones to scale a desktop layout down instead of adapting it.`,
      },
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
      wrong: {
        code: `<meta http-equiv="refresh" content="0; url=/new-page">`,
        why: `A meta refresh breaks the back button and is ignored by many crawlers; redirect at the server instead.`,
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
      wrong: {
        code: `<svg width="80" height="80">
  <circle cx="50" cy="50" r="40" />
</svg>`,
        why: `With no [[viewBox]] the units are pixels, so the circle at (50, 50) with radius 40 is clipped by the frame.`,
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
      wrong: {
        code: `<svg viewBox="0 0 24 24">
  <path d="M12 2 L22 20 H2 Z" />
</svg>`,
        why: `The icon has no [[<title>]] or label, so a meaningful graphic is silent to assistive tech.`,
      },
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
      wrong: {
        code: `<img src="icon.jpg" alt="Menu" width="24" height="24">`,
        why: `A bitmap icon blurs on high-density screens; SVG stays sharp at every size.`,
      },
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
      wrong: {
        code: `<h2>ZEDX</h2>
<h3>Languages</h3>`,
        why: `Starting at h2 leaves the page with no h1, so its name never appears at the top of the outline.`,
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
      wrong: {
        code: `<header>Site name</header>
<nav>Links</nav>
<div id="main">Article</div>
<footer>Copyright</footer>`,
        why: `No [[<main>]] landmark means the "skip to content" target does not exist.`,
      },
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
      wrong: {
        code: `<nav>Main links</nav>
<nav>Breadcrumb</nav>`,
        why: `Two navigation landmarks with no names are indistinguishable in a landmark list.`,
      },
    },
  ],

  "h16": [
  {
    "title": "Choose the right input type",
    "body": [
      "The type attribute describes the kind of value a control expects. email, number, date, and url give the browser useful information and can provide suitable input interfaces.",
      "A meaningful type is not proof that a value is genuine. The server must validate submitted data again, because browser checks can be bypassed."
    ],
    "example": {
      "code": "<label>Email\n  <input type=\"email\" name=\"email\">\n</label>\n<label>Age\n  <input type=\"number\" name=\"age\" min=\"13\">\n</label>",
      "caption": "Use types that match the expected data."
    },
    "wrong": {
      "code": "<input type=\"text\" name=\"age\">",
      "why": "A text control accepts arbitrary text. Use number when the value must be numeric."
    }
  },
  {
    "title": "Apply built-in constraints",
    "body": [
      "required, min, max, minlength, maxlength, and pattern describe simple input rules. The browser checks those constraints as part of form validation.",
      "Use pattern only when a specific format is required. A title or nearby help text should explain the expected format instead of leaving users to guess."
    ],
    "example": {
      "code": "<input name=\"code\"\n  pattern=\"[A-Z]{2}[0-9]{4}\"\n  title=\"Two letters followed by four digits\"\n  required>",
      "caption": "The field must match a short code format."
    },
    "wrong": {
      "code": "<input name=\"code\" pattern=\"[A-Z]{2}[0-9]{4}\">",
      "why": "Without required, an empty field may still pass validation."
    }
  },
  {
    "title": "Use the Constraint Validation API",
    "body": [
      "checkValidity() reports whether controls pass their constraints. reportValidity() asks the browser to display its validation feedback for invalid controls.",
      "Let native validation do the basic work. Custom submission code should preserve labels, keyboard access, and useful error messages."
    ],
    "example": {
      "code": "const form = document.querySelector(\"form\");\nform.addEventListener(\"submit\", event => {\n  if (!form.checkValidity()) {\n    event.preventDefault();\n    form.reportValidity();\n  }\n});",
      "caption": "Check constraints before handling the submission."
    },
    "wrong": {
      "code": "form.addEventListener(\"submit\", () => {\n  form.submit();\n});",
      "why": "Calling submit() directly skips the normal submit-event validation flow."
    }
  }
],
  "h17": [
  {
    "title": "Embed another document",
    "body": [
      "iframe creates a nested browsing context. Its src identifies the document, while width and height reserve an area for the embedded content.",
      "Give each frame a useful title so a screen-reader user can understand its purpose without opening it first."
    ],
    "example": {
      "code": "<iframe src=\"schedule.html\"\n  title=\"Class schedule\"\n  width=\"600\" height=\"400\"></iframe>",
      "caption": "The title explains the frame's purpose."
    },
    "wrong": {
      "code": "<iframe src=\"schedule.html\"></iframe>",
      "why": "The frame has no accessible name, so its purpose is unclear."
    }
  },
  {
    "title": "Load and permit content deliberately",
    "body": [
      "loading=\"lazy\" can defer an off-screen frame. The allow attribute grants browser features such as fullscreen only when the embedded content needs them.",
      "Avoid giving external content broad permissions by default. Request only the capabilities needed for the feature being displayed."
    ],
    "example": {
      "code": "<iframe src=\"video.html\"\n  title=\"Project video\"\n  loading=\"lazy\"\n  allow=\"fullscreen\"></iframe>",
      "caption": "The frame is deferred and receives one needed capability."
    },
    "wrong": {
      "code": "<iframe src=\"video.html\"\n  allow=\"camera; microphone; geolocation; fullscreen\"></iframe>",
      "why": "The frame requests unrelated permissions without a demonstrated need."
    }
  },
  {
    "title": "Understand sandbox boundaries",
    "body": [
      "sandbox restricts actions available to an embedded page, such as script execution or form submission. Add tokens only when a specific feature requires them.",
      "A sandbox is not a replacement for server security. Review the whole permission combination, especially when same-origin content is involved."
    ],
    "example": {
      "code": "<iframe src=\"preview.html\"\n  title=\"Document preview\"\n  sandbox></iframe>",
      "caption": "Begin with the restrictions enabled."
    },
    "wrong": {
      "code": "<iframe src=\"preview.html\"\n  sandbox=\"allow-scripts allow-same-origin allow-top-navigation allow-forms\"></iframe>",
      "why": "If preview.html is same-origin, combining allow-scripts and allow-same-origin lets its script access the parent page and remove the iframe sandbox attribute, effectively escaping the sandbox. Do not use this combination for untrusted same-origin content; isolate untrusted content on a separate origin."
    }
  }
],
  "h18": [
  {
    "title": "Build a disclosure",
    "body": [
      "details creates a disclosure widget. Its summary child is the visible control that expands or collapses the remaining content.",
      "Use the open attribute when the content should be expanded at first. A disclosure is useful for optional supporting information."
    ],
    "example": {
      "code": "<details>\n  <summary>Grading policy</summary>\n  <p>Projects use the published rubric.</p>\n</details>",
      "caption": "The browser supplies the disclosure interaction."
    },
    "wrong": {
      "code": "<div onclick=\"toggleInfo()\">Grading policy</div>",
      "why": "A clickable div has no native disclosure semantics or keyboard behavior."
    }
  },
  {
    "title": "Open a dialog",
    "body": [
      "dialog represents a dialog box. show() opens a non-modal dialog, while showModal() opens it modally and makes the rest of the document inert.",
      "Give a dialog an accessible name and a clear close control. Think about where focus should move when it opens and where it should return afterward."
    ],
    "example": {
      "code": "const dialog = document.querySelector(\"#notice\");\ndialog.showModal();",
      "caption": "showModal creates a modal dialog."
    },
    "wrong": {
      "code": "document.querySelector(\"#notice\").style.display = \"block\";",
      "why": "Changing display does not provide modal behavior or focus management."
    }
  },
  {
    "title": "Prefer native behavior when it fits",
    "body": [
      "Native elements provide built-in semantics and keyboard behavior. A custom widget means the developer must recreate its state, focus behavior, and accessibility support.",
      "Use a link for navigation, a button for an action, details for disclosure, and dialog for a dialog. Choose the element based on the user's task."
    ],
    "example": {
      "code": "<details>\n  <summary>Advanced settings</summary>\n  <label><input type=\"checkbox\"> Enable alerts</label>\n</details>",
      "caption": "The disclosure is handled by the browser."
    },
    "wrong": {
      "code": "<button aria-expanded=\"false\">Advanced settings</button>",
      "why": "The button state is not connected to a panel or a working disclosure interaction."
    }
  }
],
  "h19": [
  {
    "title": "Add custom data",
    "body": [
      "A custom data attribute begins with data- and stores a string associated with an element. Use descriptive names such as data-item-id or data-action.",
      "Data attributes are visible and editable in developer tools. Never store secrets or use them as proof that a user has permission to do something."
    ],
    "example": {
      "code": "<button data-action=\"save\" data-item-id=\"42\">\n  Save item\n</button>",
      "caption": "The attributes describe the element's application context."
    },
    "wrong": {
      "code": "<button data=\"save\">Save item</button>",
      "why": "data alone is not the custom-data attribute pattern. Use an attribute beginning with data-."
    }
  },
  {
    "title": "Read dataset values",
    "body": [
      "The dataset property exposes custom data attributes as a DOMStringMap. A name such as data-item-id becomes dataset.itemId.",
      "Dataset values are strings. Convert a value deliberately when it represents a number, and handle attributes that may be absent."
    ],
    "example": {
      "code": "const button = document.querySelector(\"button\");\nconst itemId = Number(button.dataset.itemId);",
      "caption": "Convert the stored string before numeric use."
    },
    "wrong": {
      "code": "const id = button.dataset[\"data-item-id\"];",
      "why": "dataset keys omit the data- prefix. Use dataset.itemId or getAttribute()."
    }
  },
  {
    "title": "Use data for UI context, not authority",
    "body": [
      "Data attributes are useful for identifying items and actions in event handlers. They keep small UI details close to the element they describe.",
      "A visitor can edit the DOM. Server-side code must validate identifiers and check permissions before changing protected data."
    ],
    "example": {
      "code": "document.addEventListener(\"click\", event => {\n  const button = event.target.closest(\"[data-action]\");\n  if (!button) return;\n  if (button.dataset.action === \"save\") {\n    saveItem(button.dataset.itemId);\n  }\n});",
      "caption": "Delegate behavior using a data-action attribute."
    },
    "wrong": {
      "code": "if (button.dataset.isAdmin === \"true\") {\n  deleteAccount();\n}",
      "why": "A visitor can change a data attribute. It must never grant administrative permission."
    }
  }
],
  "h20": [
  {
    "title": "Understand parser-blocking scripts",
    "body": [
      "A classic script without async or defer is fetched and executed while the HTML parser is paused. A slow script can delay the rest of the page from being parsed.",
      "A script that needs elements later in the document should run after those elements exist, or wait for the DOM to be ready."
    ],
    "example": {
      "code": "<body>\n  <main id=\"app\"></main>\n  <script src=\"app.js\"></script>\n</body>",
      "caption": "The main element appears before the script runs."
    },
    "wrong": {
      "code": "<head>\n  <script src=\"app.js\"></script>\n</head>",
      "why": "The script may run before the body elements exist."
    }
  },
  {
    "title": "Compare async and defer",
    "body": [
      "defer downloads in parallel, then executes after parsing is complete. Deferred classic scripts preserve their document order, making them suitable for dependent files.",
      "async also downloads in parallel but executes as soon as it is ready. Use it for independent scripts when execution order does not matter."
    ],
    "example": {
      "code": "<script defer src=\"vendor.js\"></script>\n<script defer src=\"app.js\"></script>",
      "caption": "The dependent app file runs after the vendor file."
    },
    "wrong": {
      "code": "<script async src=\"vendor.js\"></script>\n<script async src=\"app.js\"></script>",
      "why": "The files may execute in either order, which can break dependencies."
    }
  },
  {
    "title": "Load JavaScript modules",
    "body": [
      "A module script uses import and export, runs in strict mode, and is deferred by default. Its top-level variables stay within the module scope.",
      "Keep module dependencies explicit. Imported bindings do not automatically become global variables available to later classic scripts."
    ],
    "example": {
      "code": "<script type=\"module\" src=\"main.js\"></script>\n// main.js\nimport { start } from \"./app.js\";\nstart();",
      "caption": "The entry module imports only what it needs."
    },
    "wrong": {
      "code": "<script type=\"module\">\nimport { start } from \"./app.js\";\n</script>\n<script>start();</script>",
      "why": "The imported binding is module-scoped and is not available to the classic script."
    }
  }
],
  "h21": [
  {
    "title": "Store reusable markup",
    "body": [
      "Content inside template is inert while the template remains in the document. Its elements are not displayed as page content just because the template was parsed.",
      "Give templates stable identifiers when scripts need to find them. Keep the markup semantic and provide the same accessible names expected from ordinary page content."
    ],
    "example": {
      "code": "<template id=\"notice-template\">\n  <article>\n    <h2></h2>\n    <p></p>\n  </article>\n</template>",
      "caption": "The template describes a reusable notice."
    },
    "wrong": {
      "code": "<template id=\"notice-template\">\n  <script>showAlert()</script>\n</template>",
      "why": "A script in an inert template does not run merely because the template exists."
    }
  },
  {
    "title": "Clone the template content",
    "body": [
      "The content property returns a DocumentFragment. cloneNode(true) creates a deep copy of its nested elements so the copy can be filled with new values.",
      "Use textContent for plain text supplied by users or external data. Avoid parsing untrusted values as HTML."
    ],
    "example": {
      "code": "const template = document.querySelector(\"#notice-template\");\nconst card = template.content.cloneNode(true);\ncard.querySelector(\"h2\").textContent = \"Update\";",
      "caption": "Clone the content and fill the copy."
    },
    "wrong": {
      "code": "const card = template.cloneNode(false);\ncard.querySelector(\"h2\").textContent = \"Update\";",
      "why": "This clones the template element without its nested content."
    }
  },
  {
    "title": "Insert a document fragment",
    "body": [
      "A DocumentFragment can hold multiple nodes before they are added to the live document. Appending the fragment moves its children into the target container.",
      "Build each item before insertion. This keeps the work organized and avoids repeated updates to the live document."
    ],
    "example": {
      "code": "const list = document.querySelector(\"#notices\");\nconst fragment = template.content.cloneNode(true);\nfragment.querySelector(\"p\").textContent = \"Saved\";\nlist.append(fragment);",
      "caption": "Append a completed fragment."
    },
    "wrong": {
      "code": "list.innerHTML += userProvidedText;",
      "why": "This parses untrusted input as markup. Use textContent for plain text."
    }
  }
],
  "h22": [
  {
    "title": "Define a custom element",
    "body": [
      "A custom element name must contain a hyphen, such as user-badge. Its class extends HTMLElement and can react when an instance is connected to the document.",
      "Register the name with customElements.define() only once. Check the browser's customElements registry if application code may be initialized more than once."
    ],
    "example": {
      "code": "class UserBadge extends HTMLElement {\n  connectedCallback() {\n    this.textContent = \"Member\";\n  }\n}\ncustomElements.define(\"user-badge\", UserBadge);",
      "caption": "The browser upgrades matching elements after registration."
    },
    "wrong": {
      "code": "class UserBadge {\n  connectedCallback() {\n    this.textContent = \"Member\";\n  }\n}\ncustomElements.define(\"user-badge\", UserBadge);",
      "why": "A custom element class must extend HTMLElement."
    }
  },
  {
    "title": "Attach a shadow root",
    "body": [
      "attachShadow() creates a shadow root to hold a component's internal structure. Styles inside it are scoped to the component rather than applying to the whole document.",
      "Shadow DOM is an encapsulation tool, not a security boundary. Do not put secrets inside it or rely on it to protect sensitive data."
    ],
    "example": {
      "code": "class StatusCard extends HTMLElement {\n  constructor() {\n    super();\n    const root = this.attachShadow({ mode: \"open\" });\n    root.innerHTML = \"<p>Ready</p>\";\n  }\n}",
      "caption": "The component owns its internal tree."
    },
    "wrong": {
      "code": "this.attachShadow({ mode: \"closed\" });\nthis.shadowRoot.innerHTML = \"<p>Ready</p>\";",
      "why": "With a closed root, this.shadowRoot is null. Use the reference returned by attachShadow or open mode."
    }
  },
  {
    "title": "Place supplied content with slots",
    "body": [
      "A slot marks where children supplied by the component user should appear. Named slots provide specific places for a title, summary, or action.",
      "Keep the component meaningful when JavaScript is delayed. Supplied light-DOM content can provide useful fallback content and preserve semantics."
    ],
    "example": {
      "code": "this.shadowRoot.innerHTML =\n  '<header><slot name=\"title\"></slot></header><slot></slot>';",
      "caption": "Named and default slots accept different children."
    },
    "wrong": {
      "code": "<user-card>\n  <h2 slot=\"heading\">Profile</h2>\n</user-card>",
      "why": "The component expects a slot named title, but the child uses heading. Slot names must match."
    }
  }
],
  "h23": [
  {
    "title": "Protect links opened in a new tab",
    "body": [
      "target=_blank opens a new browsing context. The noopener relation prevents the destination from receiving a usable window.opener reference to the page that opened it.",
      "noreferrer also suppresses the Referer header and implies noopener in modern browser behavior. Choose the relation that matches the link's privacy needs."
    ],
    "example": {
      "code": "<a href=\"https://docs.example\"\n   target=\"_blank\"\n   rel=\"noopener noreferrer\">\n  Open documentation\n</a>",
      "caption": "State the intended relationship explicitly."
    },
    "wrong": {
      "code": "<a href=\"https://docs.example\" target=\"_blank\">Open</a>",
      "why": "Add rel=\"noopener\" when the destination should not control the opening page."
    }
  },
  {
    "title": "Restrict embedded content",
    "body": [
      "sandbox applies restrictions to an iframe, including limits on scripts, forms, and navigation. It is safest to start with no tokens and add only the specific permissions the frame needs.",
      "Each token relaxes a restriction. Review combinations carefully, especially when content shares the same origin as the parent page."
    ],
    "example": {
      "code": "<iframe src=\"preview.html\"\n  title=\"Document preview\"\n  sandbox></iframe>",
      "caption": "Begin with sandbox restrictions enabled."
    },
    "wrong": {
      "code": "<iframe src=\"preview.html\"\n  sandbox=\"allow-scripts allow-same-origin allow-top-navigation allow-forms\"></iframe>",
      "why": "If preview.html is same-origin, combining allow-scripts and allow-same-origin lets its script access the parent page and remove the iframe sandbox attribute, effectively escaping the sandbox. Do not use this combination for untrusted same-origin content; isolate untrusted content on a separate origin."
    }
  },
  {
    "title": "Set referrer behavior deliberately",
    "body": [
      "referrerpolicy controls how much referring-page information a resource request sends. The correct value depends on whether the destination needs the full URL, only the origin, or no referrer.",
      "These attributes do not make a remote server trustworthy. Use a Content Security Policy and server-side access controls where appropriate."
    ],
    "example": {
      "code": "<img src=\"https://cdn.example/photo.jpg\"\n  alt=\"Mountain lake\"\n  referrerpolicy=\"no-referrer\">",
      "caption": "The image request omits referrer information."
    },
    "wrong": {
      "code": "<img src=\"photo.jpg\" referrerpolicy=\"allow-all\">",
      "why": "allow-all is not a valid referrer policy value. Use a documented value such as no-referrer."
    }
  }
],
};
