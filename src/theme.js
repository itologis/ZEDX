import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// "The Manual" design system: a print reference book, not an app.
// Two themes share one structure — paper, plate, ink, rules, one red accent.
// Type carries the hierarchy; there are no cards, shadows, gradients or blur.

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const RADIUS = 2;

// Static Plex faces are loaded once in App.js. Each weight is its own family,
// so styles must not also set fontWeight (Android would synthesise it).
export const FONTS = {
  sans: "IBMPlexSans_400Regular",
  sansMedium: "IBMPlexSans_500Medium",
  sansSemiBold: "IBMPlexSans_600SemiBold",
  sansBold: "IBMPlexSans_700Bold",
  mono: "IBMPlexMono_400Regular",
  monoMedium: "IBMPlexMono_500Medium",
  monoSemiBold: "IBMPlexMono_600SemiBold",
};

// Language identity is a 7px print swatch. The bright screen set is unreadable
// on paper (1.35:1–2.39:1), so light mode uses darker print inks (all ≥4.5:1).
const LANG_DARK = {
  html: "#f472b6",
  css: "#60a5fa",
  java: "#fb923c",
  python: "#4ade80",
  javascript: "#facc15",
  php: "#a78bfa",
  sql: "#22d3ee",
};

const LANG_LIGHT = {
  html: "#b0346f",
  css: "#2563a8",
  java: "#a84a06",
  python: "#2f7a4a",
  javascript: "#7d6200",
  php: "#6d4bb5",
  sql: "#14707d",
};

export const THEMES = {
  dark: {
    scheme: "dark",
    paper: "#12110e",
    plate: "#1a1814",
    ink: "#f0ece1",
    body: "#c9c2b3",
    muted: "#a09889",
    rule: "#2b2822",
    ruleStrong: "#403b32",
    accent: "#e2542f",
    onAccent: "#14110d",
    code: "#ded8ca",
    lang: LANG_DARK,
  },
  light: {
    scheme: "light",
    paper: "#f3f0e9",
    plate: "#e9e4d9",
    ink: "#191712",
    body: "#3b362d",
    muted: "#6b6559",
    rule: "#d8d2c6",
    ruleStrong: "#b3ab9b",
    accent: "#b03a0a",
    onAccent: "#f8f4ea",
    code: "#242019",
    lang: LANG_LIGHT,
  },
};

export const TYPO = {
  display: {
    fontFamily: FONTS.sansBold,
    fontSize: 52,
    lineHeight: 49,
    letterSpacing: -1.8,
  },
  title: {
    fontFamily: FONTS.sansBold,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -1.5,
  },
  // Section head: level names, confirmation titles, featured blocks.
  section: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  // Secondary block/state title. Deliberately below section.
  h2: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  // Contents-page row: the primary list on Home.
  row: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  // List row title: saved pages, search results, exam rows, topic titles.
  item: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  // Brand/descriptor line under a display title.
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 20,
    lineHeight: 28,
  },
  question: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  lede: {
    fontFamily: FONTS.sans,
    fontSize: 17,
    lineHeight: 28,
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    lineHeight: 24,
  },
  small: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
  },
  label: {
    fontFamily: FONTS.monoMedium,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 1.45,
    textTransform: "uppercase",
  },
  meta: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  tiny: {
    fontFamily: FONTS.mono,
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: 0.9,
    textTransform: "uppercase",
  },
  code: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    lineHeight: 22,
  },
  option: {
    fontFamily: FONTS.mono,
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    fontFamily: FONTS.monoSemiBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
};

const ThemeContext = createContext(null);
const STORAGE_KEY = "zedx_theme";

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState("dark");

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (mounted && (stored === "light" || stored === "dark")) {
          setScheme(stored);
        }
      })
      .catch((error) => {
        console.warn("Could not read saved theme:", error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const toggle = useCallback(() => {
    setScheme((previous) => {
      const next = previous === "dark" ? "light" : "dark";
      AsyncStorage.setItem(STORAGE_KEY, next).catch((error) => {
        console.warn("Could not save theme:", error);
      });
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      scheme,
      isDark: scheme === "dark",
      colors: THEMES[scheme],
      toggle,
    }),
    [scheme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
