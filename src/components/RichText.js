import { Text } from "react-native";

import { FONTS, useTheme } from "../theme";

// Renders prose with inline code marked as [[like this]] in a mono face.
export default function RichText({ text, style }) {
  const { colors } = useTheme();
  const parts = String(text ?? "").split(/(\[\[[^\]]*\]\])/g);

  return (
    <Text style={style}>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith("[[") && part.endsWith("]]")) {
          return (
            <Text
              key={index}
              style={{ fontFamily: FONTS.mono, color: colors.code }}
            >
              {part.slice(2, -2)}
            </Text>
          );
        }

        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
}
