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
        { id: "c17", title: "Comments", syntax: "/* This is a comment */", description: "CSS comments are wrapped in /* */ and are ignored by the browser." },
        { id: "c4", title: "Colors", syntax: "color: red;\ncolor: #ff0000;\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5);", description: "Colors can be named, hex, rgb/rgba, or hsl." },
        { id: "c14", title: "Units", syntax: "width: 100px;   /* pixels */\nwidth: 50%;     /* percent of parent */\nwidth: 2em;     /* relative to font */", description: "CSS supports absolute (px) and relative (%, em, rem, vw, vh) units." },
        { id: "c5", title: "Box Model", syntax: "div {\n  margin: 10px;\n  border: 1px solid black;\n  padding: 10px;\n  width: 200px;\n}", description: "Every element is a box: content, padding, border, and margin." },
        {
            "id": "c18",
            "title": "Display Modes & Normal Flow",
            "syntax": ".panel { display: block; }\n.tag { display: inline-block; }\n.hidden { display: none; }",
            "description": "display controls an element's outer layout role and, for some values, its inner formatting context. Understanding normal flow explains the default layout before flexbox or grid is introduced."
          }
      ]
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        { id: "c3", title: "Combinators", syntax: "div p { }     /* descendant */\ndiv > p { }   /* direct child */\ndiv + p { }   /* adjacent sibling */", description: "Combinators describe relationships between selectors." },
        { id: "c9", title: "Typography", syntax: "p {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 1.5;\n}", description: "Controls text appearance: font, size, weight, and spacing." },
        { id: "c10", title: "Backgrounds", syntax: 'div {\n  background-color: #eee;\n  background-image: url("bg.png");\n  background-size: cover;\n}', description: "Sets an element's background color and/or image." },
        { id: "c11", title: "Pseudo-classes", syntax: "a:hover { }\nli:first-child { }\ninput:focus { }", description: "Pseudo-classes style elements based on state or position." },
        { id: "c12", title: "Pseudo-elements", syntax: 'p::before { content: "→ "; }\np::first-line { }', description: "Pseudo-elements style a specific part of an element." },
        {
            "id": "c19",
            "title": "Float & Clear",
            "syntax": ".thumbnail { float: left; margin: 0 1rem 1rem 0; }\n.article { display: flow-root; }",
            "description": "float moves a box toward one side and lets inline content flow around it. clear moves an element below earlier floats. Flexbox and grid are usually better for full page layouts."
          },
        {
            "id": "c20",
            "title": "Gradients & Opacity",
            "syntax": ".banner {\n  background: linear-gradient(90deg, #192f29, #72927b);\n}\n.panel { background: rgb(25 47 41 / 75%); }",
            "description": "Gradients create image-like color transitions without external image files. Opacity controls the transparency of a complete element, while alpha colors can make only a painted color translucent."
          },
        {
            "id": "c21",
            "title": "Borders, Outlines & Shadows",
            "syntax": ".card {\n  border: 1px solid #72927b;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgb(0 0 0 / 12%);\n}\nbutton:focus-visible { outline: 3px solid currentColor; }",
            "description": "Borders, outlines, and shadows shape a component's visible boundary. They look related but affect layout and keyboard focus feedback in different ways."
          }
      ]
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


          {
            "id": "c22",
            "title": "CSS Math Functions",
            "syntax": ".content { width: min(92%, 70rem); }\nh1 { font-size: clamp(2rem, 5vw, 4rem); }\n.panel { height: calc(100vh - 5rem); }",
            "description": "calc(), min(), max(), and clamp() calculate CSS values from other values. They help build fluid layouts that respond to available space without adding many breakpoints."
          },
          {
            "id": "c23",
            "title": "Transforms & Transform Origin",
            "syntax": ".tile {\n  transform-origin: center;\n  transform: translateY(-4px) rotate(3deg) scale(1.02);\n}",
            "description": "Transforms visually move, rotate, or scale elements without changing their original normal-flow layout space. transform-origin sets the point around which a transform occurs."
          },
          {
            "id": "c24",
            "title": "Keyframe Animations",
            "syntax": "@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.04); }\n}\n.badge { animation: pulse 1.2s ease-in-out infinite; }",
            "description": "Keyframes describe how styles change over time. The animation property connects an element to a named sequence and controls duration, pacing, repetition, and direction."
          },
          {
            "id": "c25",
            "title": "Cascade Layers & Feature Queries",
            "syntax": "@layer reset, components, utilities;\n@layer components { .card { padding: 1rem; } }\n@supports (display: grid) { .layout { display: grid; } }",
            "description": "Cascade layers organize groups of CSS rules into explicit priority order. @supports checks whether a browser recognizes a declaration before applying progressive enhancements."
          }

]
    }
  ]
};
