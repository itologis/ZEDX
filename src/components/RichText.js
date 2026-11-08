import { Text } from "react-native";

import { FONTS, useTheme } from "../theme";
import { parseInlineCode } from "../utils/inlineCode";

// Renders prose with inline code marked as [[like this]] in a mono face.
export default function RichText({ text, style }) {
  const { colors } = useTheme();
  const { parts } = parseInlineCode(text);

  return (
    <Text style={style}>
      {parts.map((part, index) =>
        part.code ? (
          <Text
            key={index}
            style={{ fontFamily: FONTS.mono, color: colors.code }}
          >
            {part.text}
          </Text>
        ) : (
          <Text key={index}>{part.text}</Text>
        ),
      )}
    </Text>
  );
}
