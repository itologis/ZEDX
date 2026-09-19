export default {
  intro: {
    title: "CSS",
    tagline: "The styling language that controls how HTML looks.",
    description: "CSS (Cascading Style Sheets) describes presentation: colors, spacing, layout, fonts, animation.",
    useCases: [
      "Styling colors, fonts, and spacing",
      "Building responsive layouts (flexbox/grid)",
      "Animations and transitions",
      "Adapting design to screen size",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        { id: "c1", title: "Basic Rule Syntax", syntax: "selector {\n  property: value;\n}", description: "A CSS rule targets element(s) with a selector, then sets one or more property: value pairs inside braces." },
        { id: "c2", title: "Selectors", syntax: "p { }        /* element */\n.box { }     /* class */\n#main { }    /* id */\n* { }        /* all elements */", description: "Selectors choose which elements a rule applies to." },
        { id: "c4", title: "Colors", syntax: "color: red;\ncolor: #ff0000;\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5);", description: "Colors can be named, hex, rgb/rgba, or hsl." },
        { id: "c14", title: "Units", syntax: "width: 100px;   /* pixels */\nwidth: 50%;     /* percent of parent */\nwidth: 2em;     /* relative to font */", description: "CSS supports absolute (px) and relative (%, em, rem, vw, vh) units." },
        { id: "c17", title: "Comments", syntax: "/* This is a comment */", description: "CSS comments are wrapped in /* */ and are ignored by the browser." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Sheets", "Color Style Syntax"], correct: 0 },
          { question: "Which selector targets an element by its ID?", options: [".class", "#id", "*", "element"], correct: 1 },
          { question: "What property changes text color?", options: ["font-color", "text-color", "color", "background-color"], correct: 2 },
          { question: "Which unit is relative to the parent element's font size?", options: ["px", "em", "rem", "vw"], correct: 1 },
          { question: "What does 'cascading' mean in CSS?", options: ["Styles flow like water", "More specific rules override general ones", "CSS is only for waterfalls", "All styles are equal"], correct: 1 }
        ]
      }
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "c5", title: "Box Model", syntax: "div {\n  margin: 10px;\n  border: 1px solid black;\n  padding: 10px;\n  width: 200px;\n}", description: "Every element is a box: content, padding, border, and margin." },
        { id: "c9", title: "Typography", syntax: "p {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 1.5;\n}", description: "Controls text appearance: font, size, weight, and spacing." },
        { id: "c10", title: "Backgrounds", syntax: 'div {\n  background-color: #eee;\n  background-image: url("bg.png");\n  background-size: cover;\n}', description: "Sets an element's background color and/or image." },
        { id: "c3", title: "Combinators", syntax: "div p { }     /* descendant */\ndiv > p { }   /* direct child */\ndiv + p { }   /* adjacent sibling */", description: "Combinators describe relationships between selectors." },
        { id: "c11", title: "Pseudo-classes", syntax: "a:hover { }\nli:first-child { }\ninput:focus { }", description: "Pseudo-classes style elements based on state or position." },
        { id: "c12", title: "Pseudo-elements", syntax: 'p::before { content: "→ "; }\np::first-line { }', description: "Pseudo-elements style a specific part of an element." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "Which is NOT part of the Box Model?", options: ["Margin", "Padding", "Background", "Border"], correct: 2 },
          { question: "What does 'flex-direction: row' do?", options: ["Arranges items in a column", "Arranges items in a row", "Hides all items", "Makes items round"], correct: 1 },
          { question: "Which pseudo-class targets a hovered element?", options: ["a:visited", "a:active", "a:hover", "a:focus"], correct: 2 },
          { question: "What does 'box-sizing: border-box' do?", options: ["Includes padding and border in width/height", "Excludes padding from width/height", "Adds a shadow", "Makes the box round"], correct: 0 },
          { question: "Which is NOT a valid CSS position value?", options: ["static", "relative", "absolute", "flexible"], correct: 3 }
        ]
      }
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        { id: "c6", title: "Flexbox", syntax: ".container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n}", description: "Arranges children in a single row or column with easy alignment." },
        { id: "c7", title: "Grid", syntax: ".container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n}", description: "Arranges children into rows and columns - best for 2D layouts." },
        { id: "c8", title: "Positioning", syntax: ".box {\n  position: relative | absolute | fixed | sticky;\n  top: 0;\n  left: 0;\n}", description: "Controls how an element is placed: relative, absolute, fixed, or sticky." },
        { id: "c13", title: "Media Queries", syntax: "@media (max-width: 600px) {\n  .box {\n    display: none;\n  }\n}", description: "Applies styles based on screen size - key for responsive design." },
        { id: "c15", title: "Variables", syntax: ":root {\n  --main-color: blue;\n}\n.box {\n  color: var(--main-color);\n}", description: "Custom properties store reusable values." },
        { id: "c16", title: "Transitions", syntax: ".box {\n  transition: all 0.3s ease-in-out;\n}\n.box:hover {\n  transform: scale(1.1);\n}", description: "Animates a property change smoothly over time." },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          { question: "What does 'grid-template-columns: 1fr 1fr 1fr' do?", options: ["Creates 3 equal columns", "Creates 1 column with 3 rows", "Creates 3 unequal columns", "Creates a single column"], correct: 0 },
          { question: "Which media query targets phones?", options: ["@media (min-width: 1024px)", "@media (max-width: 600px)", "@media (orientation: landscape)", "@media (print)"], correct: 1 },
          { question: "How do you define a CSS variable?", options: ["$color: blue;", "--color: blue;", "@color: blue;", "var(color: blue);"], correct: 1 },
          { question: "What does 'transform: scale(1.1)' do?", options: ["Moves the element", "Rotates the element", "Makes it 10% bigger", "Makes it 10% smaller"], correct: 2 },
          { question: "What is the 'gap' property used for?", options: ["Adds space between flex/grid items", "Adds space inside an element", "Adds a border", "Creates a gap in text"], correct: 0 }
        ]
      }
    }
  ]
};
