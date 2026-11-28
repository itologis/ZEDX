// Lessons for the CSS track. Same shape as the HTML track: three steps per
// topic, each with a working example and a wrong-code counter-example.

export default {
  c1: [
    {
      title: "Selector, braces, declarations",
      body: [
        `A CSS rule is a selector, a pair of braces, and one or more declarations inside. A declaration is a property, a colon, a value, and a semicolon.`,
        `The selector picks the elements. The declarations say what to change. Whitespace and line breaks do not matter; the semicolons do.`,
      ],
      example: {
        code: `p {
  color: #191712;
  font-size: 16px;
}`,
        caption: `One selector, two declarations, one closing brace.`,
      },
      wrong: {
        code: `p {
  color: #191712
  font-size: 16px;
}`,
        why: `The missing semicolon makes [[16px]] part of the colour value, so the browser drops both declarations.`,
      },
    },
    {
      title: "Grouping selectors and shorthand",
      body: [
        `A comma groups selectors: every selector in the list gets the same block. Without the comma, the rule means something else entirely.`,
        `Shorthand properties such as [[margin]] set several longhands at once. [[margin: 0 0 12px]] means top 0, sides 0, bottom 12px.`,
      ],
      example: {
        code: `h1,
h2 {
  margin: 0 0 12px;
  line-height: 1.2;
}`,
        caption: `The comma applies one block to both headings.`,
      },
      wrong: {
        code: `h1 h2 {
  margin: 0 0 12px;
}`,
        why: `Without the comma this selects an [[<h2>]] inside an [[<h1>]], which almost never exists — the rule silently does nothing.`,
      },
    },
    {
      title: "Order and the cascade",
      body: [
        `When two rules have equal specificity, the later one wins. The cascade is the "C" in CSS: source order, specificity, and importance decide the result.`,
        `Keep specificity low and let order do the work. Reaching for [[!important]] to beat a rule you wrote yourself is a sign the selector is too heavy.`,
      ],
      example: {
        code: `.note {
  color: #6b6559;
}

.note {
  color: #b03a0a;
}`,
        caption: `Same specificity: the second rule wins.`,
      },
      wrong: {
        code: `.note {
  color: #6b6559 !important;
}

.note {
  color: #b03a0a;
}`,
        why: `[[!important]] outranks the later rule, so every later attempt to restyle the note is ignored.`,
      },
    },
  ],

  c2: [
    {
      title: "Element, class, and id",
      body: [
        `[[p]] selects every paragraph element. [[.card]] selects elements whose class contains card. [[#main]] selects the one element with that id.`,
        `Classes are reusable and the normal hook for styling. Ids are unique and better kept for fragment links and JavaScript.`,
      ],
      example: {
        code: `p { color: #3b362d; }
.card { padding: 16px; }
#main { max-width: 720px; }`,
        caption: `Element, class, id — from broad to specific.`,
      },
      wrong: {
        code: `card {
  padding: 16px;
}`,
        why: `The missing dot turns the class selector into an element selector for a [[<card>]] tag, so no card is styled.`,
      },
    },
    {
      title: "Descendant and grouped selectors",
      body: [
        `A space is the descendant combinator: [[article p]] matches paragraphs anywhere inside an article. The comma is not a combinator — it starts a second selector.`,
        `Group selectors when they share declarations, and keep the group short enough that a change does not surprise one of the members.`,
      ],
      example: {
        code: `article p {
  margin-bottom: 12px;
}

article,
aside {
  padding: 24px;
}`,
        caption: `Space means "inside"; comma means "and also".`,
      },
      wrong: {
        code: `article, p {
  margin-bottom: 12px;
}`,
        why: `This styles every article and every paragraph on the page, not just the paragraphs inside articles.`,
      },
    },
    {
      title: "Specificity in practice",
      body: [
        `Specificity ranks selectors: id beats class, class beats element. It is a tie-breaker, not a goal — a heavier selector is harder to override later.`,
        `Style by class and keep selectors shallow. If a rule needs five elements to find its target, the markup probably needs a class.`,
      ],
      example: {
        code: `.card-title {
  font-size: 1.25rem;
}`,
        caption: `One class, easy to override, easy to reuse.`,
      },
      wrong: {
        code: `#app .layout .card h2.title span {
  font-size: 1.25rem;
}`,
        why: `Five levels of specificity mean any later change needs an even heavier selector or [[!important]].`,
      },
    },
  ],

  c4: [
    {
      title: "Named and hex colours",
      body: [
        `[[color]] sets text; [[background-color]] sets the box behind it. A hex value is a hash followed by three, four, six, or eight digits.`,
        `Three-digit hex is shorthand: [[#f00]] is [[#ff0000]]. Six digits are the normal form; eight add alpha at the end.`,
      ],
      example: {
        code: `.alert {
  color: #f8f4ea;
  background-color: #b03a0a;
}`,
        caption: `Light text on a dark accent — a deliberate pair.`,
      },
      wrong: {
        code: `.alert {
  color: #b03a0;
}`,
        why: `Five hex digits are not a valid colour, so the browser throws the declaration away and keeps the inherited colour.`,
      },
    },
    {
      title: "rgb, hsl, and alpha",
      body: [
        `[[rgb(176 58 10)]] and [[hsl(22 89% 36%)]] describe the same colour in different models. Add a fourth value or a slash for transparency.`,
        `Hsl is easier to reason about when you want a lighter or darker version of one hue: change the lightness, keep the rest.`,
      ],
      example: {
        code: `.badge {
  background: hsl(22 89% 36% / 0.12);
  color: hsl(22 89% 30%);
}`,
        caption: `One hue, two lightnesses, one alpha.`,
      },
      wrong: {
        code: `.badge {
  background: rgba(176, 58, 10);
}`,
        why: `[[rgba()]] needs an alpha channel — with three arguments it is invalid and the background stays transparent.`,
      },
    },
    {
      title: "Contrast is part of the colour",
      body: [
        `Colour is not only hue: text has to stay readable against its background. Body text needs a contrast ratio of at least 4.5:1; large text needs 3:1.`,
        `Muted grey is where contrast usually fails. Test the pair, not the swatch in isolation — the same grey can pass on white and fail on beige.`,
      ],
      example: {
        code: `.meta {
  color: #6b6559;
  background: #f3f0e9;
}`,
        caption: `A muted grey that still clears 4.5:1 on the paper tone.`,
      },
      wrong: {
        code: `.meta {
  color: #a09889;
  background: #f3f0e9;
}`,
        why: `That pair lands around 2.5:1 — below the 4.5:1 minimum, so the text is unreadable for many people in daylight.`,
      },
    },
  ],

  c14: [
    {
      title: "px, %, em, rem",
      body: [
        `[[px]] is an absolute unit. [[%]] depends on the parent. [[em]] depends on the element's own font size, and [[rem]] on the root font size.`,
        `Use [[rem]] for spacing and type so a user's browser font setting still scales the page. Use [[px]] for hairlines and borders.`,
      ],
      example: {
        code: `html { font-size: 16px; }

.card {
  padding: 1rem;
  width: 50%;
}`,
        caption: `Spacing in rem, width in percent.`,
      },
      wrong: {
        code: `.card {
  font-size: 1.25em;
  padding: 1.25em;
}`,
        why: `[[em]] compounds through nested elements: a card inside a card multiplies its own font size again, and spacing drifts.`,
      },
    },
    {
      title: "Viewport units",
      body: [
        `[[vw]] and [[vh]] are percentages of the viewport. [[100vw]] is the full width, even under a scrollbar in some browsers.`,
        `On mobile, [[100vh]] is taller than the visible screen while the browser chrome is showing. Prefer [[dvh]] for full-height layouts.`,
      ],
      example: {
        code: `.hero {
  min-height: 100dvh;
}`,
        caption: `dvh tracks the dynamic visible height as browser bars move.`,
      },
      wrong: {
        code: `.hero {
  min-height: 100vh;
}`,
        why: `On phones the address bar makes [[100vh]] taller than the visible area, so the bottom of the hero hides behind browser chrome.`,
      },
    },
    {
      title: "Choosing a unit",
      body: [
        `Match the unit to what should scale. Type and spacing in rem, line height as a unitless number, borders in px, and containers in percent or fr.`,
        `A unitless [[line-height]] multiplies the element's font size, so it stays proportional when the text size changes.`,
      ],
      example: {
        code: `p {
  font-size: 1rem;
  line-height: 1.5;
  border-bottom: 1px solid #d8d2c6;
}`,
        caption: `Proportional line height, fixed hairline.`,
      },
      wrong: {
        code: `p {
  font-size: 1rem;
  line-height: 20px;
}`,
        why: `A fixed line height does not grow with the font. At a larger text size the lines overlap.`,
      },
    },
  ],

  c17: [
    {
      title: "The one comment syntax",
      body: [
        `CSS comments start with [[/*]] and end with [[*/]]. They can span lines and can appear anywhere whitespace is allowed.`,
        `There are no single-line comments in CSS. A [[//]] line is not skipped — it becomes part of the following declaration and breaks it.`,
      ],
      example: {
        code: `/* Primary action */
.button {
  background: #b03a0a;
}`,
        caption: `A label above the rule it describes.`,
      },
      wrong: {
        code: `// Primary action
.button {
  background: #b03a0a;
}`,
        why: `The parser reads [[// Primary action .button]] as one selector, so the rule never applies.`,
      },
    },
    {
      title: "Where comments help",
      body: [
        `Use comments for section headers, browser workarounds, and the reason behind a surprising value. Do not narrate what the property already says.`,
        `A comment explaining why a rule exists survives a refactor; a comment repeating the value does not.`,
      ],
      example: {
        code: `/* Safari clips the sticky header without this */
.header {
  transform: translateZ(0);
}`,
        caption: `The comment records the reason, not the syntax.`,
      },
      wrong: {
        code: `<!-- Primary action -->
.button {
  background: #b03a0a;
}`,
        why: `HTML comment syntax is not valid in a stylesheet; the browser tries to parse it as a selector.`,
      },
    },
    {
      title: "Dead rules and unterminated comments",
      body: [
        `Commenting a rule out is fine while debugging. Shipping it is not: dead rules still cost bytes and confuse the next reader.`,
        `An unterminated [[/*]] swallows everything after it. A single missing [[*/]] can disable the rest of the stylesheet.`,
      ],
      example: {
        code: `/* .legacy-banner {
  display: none;
} */

.banner {
  display: none;
}`,
        caption: `Closed properly — and the dead rule is removed before shipping.`,
      },
      wrong: {
        code: `/* .legacy-banner {
  display: none;
}

.banner {
  display: none;
}`,
        why: `The comment is never closed, so every rule after it is ignored.`,
      },
    },
  ],

  c5: [
    {
      title: "Content, padding, border, margin",
      body: [
        `Every element is a box with four layers: content, padding, border, and margin. Padding is inside the border; margin is outside it.`,
        `Width and height normally describe the content box only. Padding and border are added on top unless you change [[box-sizing]].`,
      ],
      example: {
        code: `.card {
  width: 200px;
  padding: 16px;
  border: 1px solid #d8d2c6;
  margin: 24px 0;
}`,
        caption: `The visible box is wider than 200px by default.`,
      },
      wrong: {
        code: `.card {
  width: 200px;
  padding: 16px;
  border: 1px solid #d8d2c6;
}`,
        why: `With the default content-box sizing the border box is 234px wide, not 200px — the extra width breaks grid math.`,
      },
    },
    {
      title: "box-sizing: border-box",
      body: [
        `[[box-sizing: border-box]] makes width and height include padding and border. Almost every modern stylesheet sets it globally.`,
        `Once it is global, a 200px card stays 200px wide no matter how much padding it gains. Layout arithmetic stops surprising you.`,
      ],
      example: {
        code: `*,
*::before,
*::after {
  box-sizing: border-box;
}`,
        caption: `Set it once and let every box obey the same maths.`,
      },
      wrong: {
        code: `.card {
  box-sizing: content-box;
  width: 100%;
  padding: 16px;
}`,
        why: `A 100% width plus padding is wider than its parent, so the card overflows instead of fitting.`,
      },
    },
    {
      title: "Vertical margins collapse",
      body: [
        `Adjacent vertical margins collapse into the larger of the two, not the sum. A 24px bottom margin meeting a 24px top margin produces 24px.`,
        `Collapsing stops at padding, borders, and flex or grid containers. If two blocks refuse to behave, check whether a parent creates a new formatting context.`,
      ],
      example: {
        code: `p { margin: 24px 0; }

/* two paragraphs: 24px between, not 48px */`,
        caption: `Adjacent vertical margins merge.`,
      },
      wrong: {
        code: `.a { margin-bottom: 24px; }
.b { margin-top: 24px; }

/* expecting 48px between them */`,
        why: `The margins collapse to 24px. If you need 48px, set one margin or use padding on a parent.`,
      },
    },
  ],

  c9: [
    {
      title: "Font family stacks",
      body: [
        `[[font-family]] takes a list. The browser uses the first family that is installed and falls back down the list. Always end with a generic family such as [[sans-serif]].`,
        `Family names with spaces need quotes. Without them, [[IBM Plex Sans]] is read as three separate families and usually falls back to a default.`,
      ],
      example: {
        code: `body {
  font-family: "IBM Plex Sans", system-ui, sans-serif;
}`,
        caption: `Named face, system fallback, generic family.`,
      },
      wrong: {
        code: `body {
  font-family: IBM Plex Sans;
}`,
        why: `Unquoted multi-word names are parsed as a list of families, so the intended font is never matched.`,
      },
    },
    {
      title: "Size, weight, and line height",
      body: [
        `[[font-size]] sets the type size, [[font-weight]] the boldness, and [[line-height]] the distance between baselines.`,
        `Line height should be a unitless multiplier so it scales with the font. Body text usually sits between 1.4 and 1.7.`,
      ],
      example: {
        code: `p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}`,
        caption: `Unitless line height grows with the text.`,
      },
      wrong: {
        code: `p {
  font-size: 16px;
  line-height: 16px;
}`,
        why: `A line height equal to the font size leaves no room for ascenders and descenders; multi-line text collides.`,
      },
    },
    {
      title: "Measure, rhythm, and emphasis",
      body: [
        `Measure is the length of a line: around 45–75 characters for comfortable reading. [[max-width: 65ch]] caps it without knowing the font size.`,
        `Use font weight and size to build hierarchy, not colour alone. Keep the number of sizes small; a page with seven sizes has no hierarchy.`,
      ],
      example: {
        code: `p {
  max-width: 65ch;
  font-size: 1rem;
  line-height: 1.6;
}`,
        caption: `A comfortable measure at any viewport width.`,
      },
      wrong: {
        code: `p {
  max-width: 1200px;
}`,
        why: `At 16px that is roughly 150 characters per line — the eye loses its place returning to the next line.`,
      },
    },
  ],

  c10: [
    {
      title: "Colour and image",
      body: [
        `[[background-color]] paints a colour. [[background-image]] paints an image on top. Both belong to the same background layer.`,
        `The [[background]] shorthand resets every background longhand it does not mention, including colour. Mix shorthand and longhand carefully.`,
      ],
      example: {
        code: `.hero {
  background-color: #12110e;
  background-image: url("grain.png");
}`,
        caption: `Colour below, texture above.`,
      },
      wrong: {
        code: `.hero {
  background-color: #12110e;
  background: url("grain.png");
}`,
        why: `The shorthand resets the colour to transparent, so the dark base disappears.`,
      },
    },
    {
      title: "Size, position, repeat",
      body: [
        `[[background-size: cover]] fills the box and crops the overflow. [[contain]] fits the whole image and leaves empty space.`,
        `[[background-position]] moves the image inside the box, and [[background-repeat]] decides whether it tiles.`,
      ],
      example: {
        code: `.hero {
  background-image: url("photo.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
        caption: `Cover plus center: no distortion, no gaps.`,
      },
      wrong: {
        code: `.hero {
  background-size: 100% 100%;
}`,
        why: `Forcing both dimensions stretches the image and distorts faces and text. Use cover or contain.`,
      },
    },
    {
      title: "Overlays and readability",
      body: [
        `Text over an image needs a predictable background. A scrim — a semi-transparent colour layer — keeps contrast stable whatever the photo does.`,
        `Stack layers in one [[background-image]]: the gradient first, the photo second. The first layer is drawn on top.`,
      ],
      example: {
        code: `.hero {
  background-image:
    linear-gradient(#12110ecc, #12110ecc),
    url("photo.jpg");
  background-size: cover;
  color: #f8f4ea;
}`,
        caption: `A dark scrim keeps the text readable on any photo.`,
      },
      wrong: {
        code: `.hero {
  background-image: url("photo.jpg");
  color: #f8f4ea;
}`,
        why: `Contrast now depends on the photo. A bright frame makes the text disappear; add a scrim instead.`,
      },
    },
  ],

  c3: [
    {
      title: "Descendant versus child",
      body: [
        `A space matches any descendant at any depth. [[>]] matches only a direct child.`,
        `Use the child combinator when the structure is fixed and you do not want nested elements to inherit the rule by accident.`,
      ],
      example: {
        code: `.menu > li {
  border-bottom: 1px solid #d8d2c6;
}`,
        caption: `Only the top-level items get the rule.`,
      },
      wrong: {
        code: `.menu > a {
  color: #b03a0a;
}`,
        why: `The links sit inside the list items, not directly under the menu, so the selector matches nothing.`,
      },
    },
    {
      title: "Siblings: + and ~",
      body: [
        `[[+]] matches the next sibling only. [[~]] matches every later sibling at the same level. Both ignore children and look sideways.`,
        `A common pattern is [[h2 + p]] to give the paragraph directly after a heading less top margin.`,
      ],
      example: {
        code: `h2 + p {
  margin-top: 4px;
}`,
        caption: `The paragraph immediately after each heading.`,
      },
      wrong: {
        code: `h2 + p {
  color: #6b6559;
}

/* expecting every paragraph after the heading */`,
        why: `[[+]] stops at the first sibling; later paragraphs are untouched. Use [[~]] for all of them.`,
      },
    },
    {
      title: "Keeping combinators shallow",
      body: [
        `Combinators describe structure. Every level you add makes the selector more brittle: move one wrapper and the rule stops matching.`,
        `Prefer a class on the element you mean. Reach for combinators when the relationship itself is the point, such as a label next to its input.`,
      ],
      example: {
        code: `.field label {
  font-weight: 600;
}`,
        caption: `One relationship, easy to read.`,
      },
      wrong: {
        code: `body main article section div p span {
  color: #3b362d;
}`,
        why: `The rule breaks the moment a wrapper is added or removed, and its specificity is unpleasant to override.`,
      },
    },
  ],

  c11: [
    {
      title: "State: hover, focus, active",
      body: [
        `[[hover]] is the pointer over the element, [[focus]] is keyboard or programmatic focus, and [[active]] is the moment it is pressed.`,
        `Anything you reveal on hover must also appear on focus. Keyboard users never hover.`,
      ],
      example: {
        code: `a:hover,
a:focus-visible {
  text-decoration: underline;
}`,
        caption: `One affordance for pointer and keyboard.`,
      },
      wrong: {
        code: `a:hover {
  color: #b03a0a;
}`,
        why: `Keyboard users get no state change at all. Pair hover with [[:focus-visible]].`,
      },
    },
    {
      title: "Position: first-child, nth-child",
      body: [
        `[[first-child]] means the element is the first child of its parent — not the first element of its type.`,
        `[[nth-child(2n)]] selects every second child, [[nth-child(3)]] the third. Use [[first-of-type]] when you mean the first paragraph among siblings of any kind.`,
      ],
      example: {
        code: `li:nth-child(2n + 1) {
  background: #e9e4d9;
}`,
        caption: `Odd rows get a tint — no extra classes needed.`,
      },
      wrong: {
        code: `p:first-child {
  margin-top: 0;
}`,
        why: `This only matches a paragraph that is the first child of its parent. A heading above it makes the paragraph the second child, so the rule fails.`,
      },
    },
    {
      title: "Forms: checked, disabled, invalid",
      body: [
        `[[checked]] styles a selected checkbox or radio. [[disabled]] styles a control that cannot be used. [[invalid]] matches a value that fails validation.`,
        `[[invalid]] fires before the user has typed anything on a required field, which is why [[:user-invalid]] exists — it waits until the user has interacted.`,
      ],
      example: {
        code: `input:user-invalid {
  border-color: #b03a0a;
}`,
        caption: `Show the error after the user has had a chance to fill it.`,
      },
      wrong: {
        code: `input:invalid {
  border-color: #b03a0a;
}`,
        why: `Every empty required field is already invalid on load, so the form looks broken before the user touches it.`,
      },
    },
  ],

  c12: [
    {
      title: "::before and ::after",
      body: [
        `[[::before]] and [[::after]] create a box inside the element, before or after its content. They only render when [[content]] is set.`,
        `The content can be empty — [[content: ""]] — which is the usual way to add a decorative shape or clear a float.`,
      ],
      example: {
        code: `.rule::before {
  content: "";
  display: block;
  height: 2px;
  background: #b03a0a;
}`,
        caption: `An empty pseudo-element used as a line.`,
      },
      wrong: {
        code: `.rule::before {
  display: block;
  height: 2px;
  background: #b03a0a;
}`,
        why: `Without [[content]], the pseudo-element is not generated at all and nothing appears.`,
      },
    },
    {
      title: "::first-line, ::first-letter, ::marker",
      body: [
        `[[::first-line]] styles the first formatted line of a block. [[::first-letter]] styles the first letter — the classic drop cap. [[::marker]] styles list bullets and numbers.`,
        `These pseudo-elements accept only a subset of properties. Setting margins or layout on a first letter is ignored by the spec.`,
      ],
      example: {
        code: `p::first-letter {
  font-size: 3rem;
  float: left;
  line-height: 1;
}`,
        caption: `A drop cap with type properties only.`,
      },
      wrong: {
        code: `p::first-letter {
  margin-left: 8px;
}`,
        why: `[[::first-letter]] does not accept margin in the spec, so the declaration has no effect.`,
      },
    },
    {
      title: "Generated content is decoration",
      body: [
        `Text in [[content]] is not in the DOM. It can be missed by screen readers, cannot be selected or translated reliably, and is invisible to search engines.`,
        `Use pseudo-elements for decoration — icons, rules, counters. Put real words in the HTML.`,
      ],
      example: {
        code: `.external::after {
  content: " ↗";
}`,
        caption: `A decorative glyph, with the link text carrying the meaning.`,
      },
      wrong: {
        code: `.status::before {
  content: "Status: active";
}`,
        why: `The only copy of the status text lives in CSS, so assistive tech and translation tools may never see it.`,
      },
    },
  ],

  c6: [
    {
      title: "The flex container",
      body: [
        `[[display: flex]] turns the element into a flex container and its direct children into flex items. Items sit in a row by default.`,
        `[[justify-content]] distributes items along the main axis, [[align-items]] across it, and [[gap]] spaces them without margins.`,
      ],
      example: {
        code: `.row {
  display: flex;
  align-items: center;
  gap: 12px;
}`,
        caption: `One axis, even spacing, no margin hacks.`,
      },
      wrong: {
        code: `.row {
  justify-content: space-between;
}`,
        why: `Without [[display: flex]] the container is a normal block and both alignment properties are ignored.`,
      },
    },
    {
      title: "Growing, shrinking, and min-width",
      body: [
        `[[flex: 1]] means grow and shrink equally from a zero basis. Items share the free space instead of sizing to content.`,
        `Flex items have [[min-width: auto]] by default, so long words refuse to shrink and push the row wider. Set [[min-width: 0]] on the item that contains them.`,
      ],
      example: {
        code: `.label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
        caption: `min-width 0 lets the item shrink; the text truncates instead of overflowing.`,
      },
      wrong: {
        code: `.label {
  flex: 1;
  white-space: nowrap;
}`,
        why: `The automatic minimum size wins, the item refuses to shrink, and the long label overflows the row.`,
      },
    },
    {
      title: "Wrapping",
      body: [
        `Flex items stay on one line unless you set [[flex-wrap: wrap]]. Wrapped lines are distributed by [[align-content]] on the container.`,
        `A row of fixed-width cards needs wrapping to survive a narrow screen. Without it the row scrolls sideways or overflows.`,
      ],
      example: {
        code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}`,
        caption: `Cards drop to the next line instead of squeezing.`,
      },
      wrong: {
        code: `.cards {
  display: flex;
  gap: 16px;
}

.cards > * {
  width: 240px;
}`,
        why: `The default [[nowrap]] keeps six 240px cards on one line, so the row overflows on every phone.`,
      },
    },
  ],

  c7: [
    {
      title: "Columns, rows, and fr",
      body: [
        `[[display: grid]] creates rows and columns. [[grid-template-columns]] defines the track sizes, and [[fr]] distributes the remaining space.`,
        `[[gap]] works in both axes and replaces margin arithmetic between cells.`,
      ],
      example: {
        code: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}`,
        caption: `Three equal columns with even gutters.`,
      },
      wrong: {
        code: `.grid {
  display: grid;
  grid-template-columns: repeat(3 1fr);
}`,
        why: `The missing comma makes the value invalid, so the declaration is dropped and the grid collapses to one column.`,
      },
    },
    {
      title: "Placing an item",
      body: [
        `[[grid-column]] and [[grid-row]] place an item on the grid. The values are lines, not cell numbers: [[1 / 3]] starts at line 1 and stops before line 3.`,
        `Use [[span 2]] when you know the width but not the exact line. Both syntaxes can be combined.`,
      ],
      example: {
        code: `.wide {
  grid-column: 1 / span 2;
}`,
        caption: `Start at line 1 and cover two tracks.`,
      },
      wrong: {
        code: `.wide {
  grid-column: 1 / 2;
}

/* expecting a two-column-wide item */`,
        why: `Line 2 is the end of the first column, so the item covers one track. Use [[1 / 3]] or [[span 2]].`,
      },
    },
    {
      title: "Responsive grids without media queries",
      body: [
        `[[repeat(auto-fit, minmax(220px, 1fr))]] fits as many 220px tracks as possible and stretches them to fill the row.`,
        `[[auto-fill]] keeps empty tracks; [[auto-fit]] collapses them. For a card grid, auto-fit is usually what you want.`,
      ],
      example: {
        code: `.cards {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
        caption: `One declaration covers phone, tablet, and desktop.`,
      },
      wrong: {
        code: `.cards {
  grid-template-columns:
    repeat(auto-fit, 220px);
}`,
        why: `Fixed tracks leave empty space on wide screens instead of stretching the cards to fill it.`,
      },
    },
  ],

  c8: [
    {
      title: "static, relative, absolute",
      body: [
        `[[static]] is the default: the element follows normal flow. [[relative]] keeps it in flow but lets you offset it visually.`,
        `[[absolute]] takes the element out of flow and positions it against the nearest positioned ancestor. Without one, it positions against the page.`,
      ],
      example: {
        code: `.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
        caption: `The card anchors the badge.`,
      },
      wrong: {
        code: `.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`,
        why: `With no positioned ancestor the badge anchors to the document and lands in the corner of the page.`,
      },
    },
    {
      title: "fixed and sticky",
      body: [
        `[[fixed]] pins the element to the viewport and removes it from flow. [[sticky]] behaves normally until a threshold, then sticks inside its scrolling container.`,
        `Sticky needs a scroll container and room to travel. An ancestor with [[overflow: hidden]] becomes that container and can stop it from sticking where you expected.`,
      ],
      example: {
        code: `.toc {
  position: sticky;
  top: 24px;
}`,
        caption: `Sticks while the article scrolls, inside the article's container.`,
      },
      wrong: {
        code: `.wrapper {
  overflow: hidden;
}

.toc {
  position: sticky;
  top: 24px;
}`,
        why: `The wrapper becomes the sticky containing block and clips it, so the table of contents never sticks to the viewport.`,
      },
    },
    {
      title: "z-index and stacking contexts",
      body: [
        `[[z-index]] orders positioned elements inside the same stacking context. A new context is created by transforms, opacity below 1, filters, and flex or grid children with z-index.`,
        `A high number is not a global guarantee. If a parent creates a context, its children can never rise above a sibling of that parent.`,
      ],
      example: {
        code: `.modal {
  position: fixed;
  z-index: 10;
}`,
        caption: `A small number is enough inside its own context.`,
      },
      wrong: {
        code: `.modal {
  position: static;
  z-index: 9999;
}`,
        why: `z-index has no effect on a static element, so the modal stays behind the overlay no matter how large the number is.`,
      },
    },
  ],

  c13: [
    {
      title: "Mobile-first min-width",
      body: [
        `Write the small-screen layout as the base, then add [[min-width]] queries for larger screens. The stylesheet reads in the order the screen grows.`,
        `Media queries do not add specificity. A later base rule can still override a query if both selectors have equal weight.`,
      ],
      example: {
        code: `.nav {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: flex;
  }
}`,
        caption: `Hidden by default, shown when there is room.`,
      },
      wrong: {
        code: `@media (max-width: 600px) {
  .nav {
    display: none;
  }
}`,
        why: `Phones lose the navigation entirely with no replacement. Hiding a nav needs a menu control, not just display: none.`,
      },
    },
    {
      title: "Ranges and combined conditions",
      body: [
        `Queries can combine features with [[and]] and a comma acts as "or". Width ranges can be written with two conditions or with the range syntax.`,
        `Check that the range actually overlaps: a minimum wider than the maximum matches nothing.`,
      ],
      example: {
        code: `@media (min-width: 600px) and (max-width: 900px) {
  .sidebar {
    display: none;
  }
}`,
        caption: `Tablet only: 600px through 900px.`,
      },
      wrong: {
        code: `@media (min-width: 900px) and (max-width: 600px) {
  .sidebar {
    display: none;
  }
}`,
        why: `No viewport can be both at least 900px and at most 600px, so the block never runs.`,
      },
    },
    {
      title: "Container queries and preferences",
      body: [
        `[[@container]] styles a component by its own width, not the viewport. It needs a container with [[container-type: inline-size]] and a name if several nest.`,
        `[[prefers-reduced-motion]] and [[prefers-color-scheme]] read the user's system settings. They are requests, not decoration.`,
      ],
      example: {
        code: `.card-wrap {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}`,
        caption: `The card adapts to its slot, wherever the slot is.`,
      },
      wrong: {
        code: `.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}`,
        why: `A container cannot query itself; the query targets the nearest ancestor container, so this never matches the card's own width.`,
      },
    },
  ],

  c15: [
    {
      title: "Defining and using variables",
      body: [
        `A custom property starts with two dashes: [[--accent: #b03a0a]]. Read it with [[var(--accent)]].`,
        `Custom properties are inherited and resolved at use time, which is what makes them useful for theming.`,
      ],
      example: {
        code: `:root {
  --accent: #b03a0a;
}

.button {
  background: var(--accent);
}`,
        caption: `Declared once at the root, used anywhere below it.`,
      },
      wrong: {
        code: `.button {
  background: --accent;
}`,
        why: `Without [[var()]] the value is read as a literal colour name, which is invalid, so the button gets no background.`,
      },
    },
    {
      title: "Fallbacks and scope",
      body: [
        `[[var(--accent, #b03a0a)]] uses the fallback when the property is undefined. The fallback is only for a missing value, not for an invalid one.`,
        `Variables cascade, so redefining one on a section changes it for everything inside that section and nowhere else.`,
      ],
      example: {
        code: `.callout {
  --accent: #14707d;
  border-left: 2px solid var(--accent);
}`,
        caption: `A local override that leaves the rest of the page alone.`,
      },
      wrong: {
        code: `.card {
  --ink: #191712;
}

.footer {
  color: var(--ink);
}`,
        why: `The variable is defined on the card and does not exist on the footer, so the colour falls back to inherited text.`,
      },
    },
    {
      title: "Theming with variables",
      body: [
        `Define the palette once, then change the values under a theme selector. Components keep using the same variable names.`,
        `Because custom properties are inherited, a theme class on the root or on a section is enough — no component needs to know which theme is active.`,
      ],
      example: {
        code: `:root {
  --paper: #f3f0e9;
  --ink: #191712;
}

[data-theme="dark"] {
  --paper: #12110e;
  --ink: #f0ece1;
}

body {
  background: var(--paper);
  color: var(--ink);
}`,
        caption: `One switch, every component follows.`,
      },
      wrong: {
        code: `.button {
  background: #b03a0a;
  color: #f8f4ea;
}`,
        why: `Hard-coded colours cannot follow the theme. The button keeps its light-mode values when the rest of the page goes dark.`,
      },
    },
  ],

  c16: [
    {
      title: "Transitioning a property",
      body: [
        `[[transition]] animates a property from one value to another. Name the property, the duration, the timing function, and optionally a delay.`,
        `A transition needs a start and an end state — usually a pseudo-class such as hover or a class toggled by JavaScript.`,
      ],
      example: {
        code: `.button {
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #8f2f08;
}`,
        caption: `Only the colour animates, over 200ms.`,
      },
      wrong: {
        code: `.button {
  transition: all 0.3s;
}`,
        why: `[[all]] animates layout properties too, so resizing and font changes become janky, expensive animations.`,
      },
    },
    {
      title: "What can animate cheaply",
      body: [
        `[[transform]] and [[opacity]] run on the compositor and avoid layout work. Width, height, top, and margin force the browser to reflow every frame.`,
        `Animate a transform instead of the layout: [[scale]] rather than width, [[translate]] rather than left.`,
      ],
      example: {
        code: `.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}`,
        caption: `Movement without reflow.`,
      },
      wrong: {
        code: `.card {
  transition: height 0.3s ease;
}

.card:hover {
  height: 320px;
}`,
        why: `Animating height triggers layout on every frame and jitters when the content changes. Use max-height or a transform.`,
      },
    },
    {
      title: "Reduced motion",
      body: [
        `Some people get motion sickness from movement, and the operating system exposes that preference as [[prefers-reduced-motion]].`,
        `Respect it by removing transforms and long transitions, not by hiding the feature. A fade can stay; a slide should not.`,
      ],
      example: {
        code: `@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}`,
        caption: `Same layout, no movement for those who asked for none.`,
      },
      wrong: {
        code: `.card {
  transition: transform 0.5s ease;
}

.card:hover {
  transform: translateX(40px) rotate(6deg);
}`,
        why: `A large slide and rotation plays for everyone, including users who set reduced motion. Wrap it in the media query.`,
      },
    },
  ],

  "c18": [
  {
    "title": "Block and inline boxes",
    "body": [
      "A block box begins on a new line in normal flow. An inline box flows within a line of text, so width and height do not behave like they do on a normal block box.",
      "Common block elements include div and p. Common inline elements include span, a, and strong. CSS can change their default display behavior."
    ],
    "example": {
      "code": ".panel { display: block; }\n.tag { display: inline; }",
      "caption": "The panel begins a new block; the tag flows with text."
    },
    "wrong": {
      "code": ".tag { display: inline; width: 120px; }",
      "why": "A normal inline box does not honor width as a block or inline-block would."
    }
  },
  {
    "title": "Use inline-block for compact controls",
    "body": [
      "inline-block participates in an inline formatting context but accepts width and height like a block. It suits badges and compact controls that should sit beside text.",
      "Whitespace in the markup can create visible gaps between inline-block items. Use flexbox or grid when more complex alignment is needed."
    ],
    "example": {
      "code": ".chip {\n  display: inline-block;\n  padding: .25rem .75rem;\n}",
      "caption": "The chip flows inline but keeps a padded box."
    },
    "wrong": {
      "code": ".chip {\n  display: inline;\n  width: 120px;\n}",
      "why": "Inline elements do not honor width like inline-block."
    }
  },
  {
    "title": "Hide content intentionally",
    "body": [
      "display:none removes an element from layout and the accessibility tree. visibility:hidden keeps its layout space but hides it from view and assistive technology.",
      "Do not hide essential content without an accessible alternative. If content should be visually hidden but remain available to assistive technology, use a deliberate visually-hidden pattern."
    ],
    "example": {
      "code": ".help { display: none; }\n.help.is-open { display: block; }",
      "caption": "The help content appears only in the open state."
    },
    "wrong": {
      "code": ".save-button { display: none; }",
      "why": "The essential action disappears for all users. Provide an accessible alternative before hiding a control."
    }
  }
],
  "c19": [
  {
    "title": "Float an image beside text",
    "body": [
      "A floated element moves toward the left or right edge of its containing block. Inline content can flow around it, which makes float useful for text wrapping around an image.",
      "Float is not a replacement for flexbox or grid. Use it for text wrapping, and use modern layout tools for navigation or columns."
    ],
    "example": {
      "code": ".article-image {\n  float: right;\n  width: 12rem;\n  margin: 0 0 1rem 1rem;\n}",
      "caption": "Paragraph text flows around the image."
    },
    "wrong": {
      "code": ".navigation {\n  float: left;\n  width: 33%;\n}",
      "why": "Using float for a multi-column navigation layout complicates alignment. Use flexbox or grid."
    }
  },
  {
    "title": "Clear preceding floats",
    "body": [
      "clear specifies which side's floats an element must move below. clear:left responds to left floats, clear:right to right floats, and clear:both to either side.",
      "A later section may appear beside a floated image when it should start beneath it. Apply clear to that section when the content flow needs to move past the float."
    ],
    "example": {
      "code": ".footer { clear: both; }",
      "caption": "The footer starts below floats on either side."
    },
    "wrong": {
      "code": ".footer { float: both; }",
      "why": "both is not a valid float value. The clear property accepts both."
    }
  },
  {
    "title": "Contain floats with flow-root",
    "body": [
      "A parent can establish a new block formatting context so its height contains floated children. display:flow-root provides a direct way to do this without extra markup.",
      "Avoid the old clearfix hack when a modern formatting context solves the problem. Check how margin behavior changes after creating the new context."
    ],
    "example": {
      "code": ".card {\n  display: flow-root;\n  border: 1px solid #888;\n}",
      "caption": "The card's height includes its floated descendants."
    },
    "wrong": {
      "code": ".card { display: inline; }",
      "why": "Changing the parent to inline does not contain the float. Use flow-root or another layout method."
    }
  }
],
  "c20": [
  {
    "title": "Create a linear gradient",
    "body": [
      "linear-gradient() creates a gradient along a line. Set a direction or angle, then give the color stops that mark where each color appears.",
      "A gradient is an image value. Use background-image or the background shorthand, and choose a fallback background color for older or limited rendering environments."
    ],
    "example": {
      "code": ".banner {\n  background-color: #29483f;\n  background-image: linear-gradient(90deg, #192f29, #72927b);\n}",
      "caption": "The gradient runs from left to right."
    },
    "wrong": {
      "code": ".banner {\n  background-color: linear-gradient(red, blue);\n}",
      "why": "background-color accepts a color, not an image. Use background or background-image."
    }
  },
  {
    "title": "Use radial gradients and color stops",
    "body": [
      "radial-gradient() radiates from a center point rather than following a straight line. Multiple stops can create a focal glow or a sharp transition between colors.",
      "Keep text readable over the full gradient. Check contrast at the lightest and darkest parts of the background."
    ],
    "example": {
      "code": ".orb {\n  background: radial-gradient(circle at 30% 30%, #e1eade, #72927b 45%, #192f29);\n}",
      "caption": "The brightest color begins near the upper-left."
    },
    "wrong": {
      "code": ".orb {\n  background: radial-gradient(circle, red, blue to right);\n}",
      "why": "The radial gradient syntax does not accept that trailing direction. Use a valid shape and color-stop sequence."
    }
  },
  {
    "title": "Distinguish opacity from alpha",
    "body": [
      "opacity affects the entire element, including its text and children. An alpha color affects only the color where it is applied, so foreground text can remain fully opaque.",
      "Use alpha in the background color when only the surface should be translucent. Use opacity when the complete element should fade."
    ],
    "example": {
      "code": ".panel {\n  background: rgb(25 47 41 / 75%);\n  color: white;\n}",
      "caption": "Only the background is translucent."
    },
    "wrong": {
      "code": ".panel { opacity: .75; }",
      "why": "This fades the text and all children along with the background."
    }
  }
],
  "c21": [
  {
    "title": "Set a border",
    "body": [
      "A border surrounds an element's content and padding. Its shorthand can set width, style, and color together, while border-radius rounds its corners.",
      "A border contributes to box size unless box-sizing and declared dimensions account for it. Use consistent border styles across components."
    ],
    "example": {
      "code": ".card {\n  border: 1px solid #72927b;\n  border-radius: .75rem;\n}",
      "caption": "The shorthand sets width, style, and color."
    },
    "wrong": {
      "code": ".card { border: -1px solid #72927b; }",
      "why": "Border widths cannot be negative, so the browser rejects this border declaration."
    }
  },
  {
    "title": "Use outlines for focus",
    "body": [
      "An outline is drawn outside the border and does not change an element's layout size. It is useful for showing keyboard focus.",
      "Do not remove browser focus indicators unless replacing them with a clear alternative. :focus-visible can target states where a visible indicator is especially useful."
    ],
    "example": {
      "code": "button:focus-visible {\n  outline: 3px solid #29483f;\n  outline-offset: 3px;\n}",
      "caption": "The offset separates the indicator from the control."
    },
    "wrong": {
      "code": "button:focus { outline: none; }",
      "why": "This removes the visible focus indicator needed by keyboard users."
    }
  },
  {
    "title": "Create shadows without changing layout",
    "body": [
      "box-shadow paints one or more shadows behind an element. Its values describe horizontal offset, vertical offset, blur, spread, and color.",
      "Shadows do not reserve layout space and can be clipped by ancestor overflow. Use them sparingly so elevation remains meaningful."
    ],
    "example": {
      "code": ".card {\n  box-shadow: 0 .5rem 1.5rem rgb(0 0 0 / 14%);\n}",
      "caption": "A soft shadow suggests a raised surface."
    },
    "wrong": {
      "code": ".card { width: calc(100% + 30px); }",
      "why": "Changing width is not a shadow effect and changes layout. Use box-shadow for visual elevation."
    }
  }
],
  "c22": [
  {
    "title": "Calculate with calc",
    "body": [
      "calc() performs arithmetic inside a CSS value. It can combine compatible units, such as a viewport height minus a fixed header size.",
      "Keep spaces around plus and minus operators. Parentheses can make the intended grouping clearer."
    ],
    "example": {
      "code": ".content {\n  width: calc(100% - 2rem);\n  min-height: calc(100vh - 4rem);\n}",
      "caption": "Subtract fixed spacing from a flexible size."
    },
    "wrong": {
      "code": ".content { width: calc(100%-2rem); }",
      "why": "Addition and subtraction operators in calc() require surrounding whitespace."
    }
  },
  {
    "title": "Compare values with min and max",
    "body": [
      "min() returns the smallest argument, while max() returns the largest. They are useful for a fluid width with a maximum cap or a gutter with a minimum size.",
      "Use compatible values and test the layout at narrow and wide widths. The chosen value must still suit the property it is assigned to."
    ],
    "example": {
      "code": ".content {\n  width: min(92%, 70rem);\n  padding-inline: max(1rem, 4vw);\n}",
      "caption": "The content has a maximum width and a minimum gutter."
    },
    "wrong": {
      "code": ".content { width: min(92% 70rem); }",
      "why": "Arguments in min() must be separated by commas. Without the comma, the function value is invalid."
    }
  },
  {
    "title": "Clamp fluid values",
    "body": [
      "clamp(min, preferred, max) uses the preferred value while keeping it between the stated minimum and maximum. It is useful for fluid typography and spacing.",
      "Choose bounds that protect readability on small and large screens. Test actual content, not only the numeric result."
    ],
    "example": {
      "code": "h1 { font-size: clamp(2rem, 5vw, 4rem); }",
      "caption": "The heading scales but stays within limits."
    },
    "wrong": {
      "code": "h1 { font-size: clamp(5vw, 2rem, 4rem); }",
      "why": "The first argument is the minimum. On a wide screen, 5vw can exceed 4rem; because clamp() resolves as max(minimum, min(preferred, maximum)), that larger minimum wins and defeats the intended cap. Put 5vw in the second position."
    }
  }
],
  "c23": [
  {
    "title": "Move, rotate, and scale",
    "body": [
      "translate() moves an element, rotate() turns it, and scale() changes its visual size. Multiple transform functions can appear in one transform declaration.",
      "Transforms affect painting, not the element's original space in normal flow. Other content continues as though the transformed element had not moved."
    ],
    "example": {
      "code": ".tile {\n  transform: translateX(1rem) rotate(4deg);\n}",
      "caption": "The tile moves and rotates visually."
    },
    "wrong": {
      "code": ".tile { transform: margin-left(1rem); }",
      "why": "margin-left() is not a transform function. Use translateX() for a visual shift."
    }
  },
  {
    "title": "Choose a transform origin",
    "body": [
      "transform-origin selects the point used for rotation and scaling. The default is the center, but a corner or edge can make an object appear anchored to a hinge or pivot.",
      "Changing the origin does not move the element's layout box. It changes how the transformed drawing is calculated around its anchor."
    ],
    "example": {
      "code": ".door {\n  transform-origin: left center;\n  transform: rotateY(25deg);\n}",
      "caption": "The door rotates around its left edge."
    },
    "wrong": {
      "code": ".door { transform: left; }",
      "why": "The transform property needs a transform function. transform-origin only defines the anchor."
    }
  },
  {
    "title": "Understand stacking and layout effects",
    "body": [
      "A transformed element can create a new stacking context and affect how positioned descendants are layered. It can also establish a containing block for some positioned descendants.",
      "Avoid transforming a large page container just to nudge a small child. Apply the transform to the specific element and inspect overlays and fixed descendants."
    ],
    "example": {
      "code": ".icon { transform: translateY(-2px); }",
      "caption": "Only the icon receives the visual adjustment."
    },
    "wrong": {
      "code": ".page { transform: translateZ(0); }",
      "why": "Transforming the whole page can create an unnecessary stacking context and affect fixed descendants."
    }
  }
],
  "c24": [
  {
    "title": "Define keyframe stages",
    "body": [
      "@keyframes names an animation and describes styles at percentages along its timeline. from and to can represent the beginning and end.",
      "Keep each sequence focused on one clear change. Too many simultaneous moving properties can make an interface harder to follow."
    ],
    "example": {
      "code": "@keyframes fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}",
      "caption": "The element fades from transparent to opaque."
    },
    "wrong": {
      "code": "@frames fade-in { from { opacity: 0; } }",
      "why": "@frames is not the CSS at-rule. Use @keyframes."
    }
  },
  {
    "title": "Configure an animation",
    "body": [
      "animation-name selects the keyframes, duration sets the cycle length, timing-function controls pacing, and iteration-count determines repetition.",
      "Use finite repetitions for feedback. Infinite movement should have a clear purpose and should not distract from the content."
    ],
    "example": {
      "code": ".toast {\n  animation: fade-in 240ms ease-out 1;\n  animation-fill-mode: both;\n}",
      "caption": "The toast animates once and retains its final state."
    },
    "wrong": {
      "code": ".toast { animation: fade-in -1s infinite; }",
      "why": "A negative animation duration is invalid. Use a positive time value."
    }
  },
  {
    "title": "Respect reduced motion",
    "body": [
      "Movement can explain a state change, but some users prefer reduced motion. prefers-reduced-motion lets a stylesheet reduce or remove non-essential animation.",
      "Do not rely on movement alone to communicate success, errors, or progress. The information should remain understandable when animation is disabled."
    ],
    "example": {
      "code": "@media (prefers-reduced-motion: reduce) {\n  .toast { animation: none; }\n}",
      "caption": "The toast stays static for users requesting reduced motion."
    },
    "wrong": {
      "code": ".toast { animation: pulse 1s infinite; }",
      "why": "This loops for everyone. Provide a reduced-motion alternative and avoid unnecessary infinite movement."
    }
  }
],
  "c25": [
  {
    "title": "Declare cascade layers",
    "body": [
      "@layer creates named groups of CSS rules. A layer-order statement can establish the priority order before the layer contents appear.",
      "For normal declarations of the same origin, later layers have higher priority than earlier layers. Unlayered normal declarations have priority over layered normal declarations."
    ],
    "example": {
      "code": "@layer reset, base, components, utilities;\n@layer base { body { margin: 0; } }\n@layer components { .card { padding: 1rem; } }",
      "caption": "The declared order makes layer priority explicit."
    },
    "wrong": {
      "code": "@layer utilities, components;\n@layer components { .button { color: gray; } }\n@layer utilities { .button { color: green; } }",
      "why": "For normal declarations, the later utilities layer wins. Do not assume the first layer has highest priority."
    }
  },
  {
    "title": "Use feature queries",
    "body": [
      "@supports checks whether the browser recognizes a property-value declaration. It is useful for progressive enhancement when a newer layout should be applied only where supported.",
      "Keep a working fallback outside the feature query. A support check detects recognition, not every possible browser bug."
    ],
    "example": {
      "code": ".layout { display: block; }\n@supports (display: grid) {\n  .layout { display: grid; grid-template-columns: 1fr 1fr; }\n}",
      "caption": "The basic layout still works without the enhancement."
    },
    "wrong": {
      "code": "@media (display: grid) {\n  .layout { display: grid; }\n}",
      "why": "Media queries check viewport or device features. Use @supports to test CSS declaration support."
    }
  },
  {
    "title": "Combine support conditions",
    "body": [
      "Feature queries can combine conditions with and, or, and not. Parentheses keep each tested declaration clear when several features are required.",
      "A support query should not make essential content disappear in browsers that lack the enhancement. Test the fallback path as well as the enhanced path."
    ],
    "example": {
      "code": "@supports (display: grid) and (gap: 1rem) {\n  .gallery { display: grid; gap: 1rem; }\n}",
      "caption": "Both declarations must be supported."
    },
    "wrong": {
      "code": "@supports display: grid {\n  .gallery { display: grid; }\n}",
      "why": "The feature query condition needs parentheses around its declaration."
    }
  }
],
};
