import { Alert, Platform } from "react-native";

// react-native-web ships `Alert` as a no-op, so any confirm wired to it
// silently does nothing in the browser. Native keeps the platform dialog;
// web falls back to the browser's own confirm prompt.
export const confirmAction = ({
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  destructive = false,
  onConfirm,
}) => {
  if (Platform.OS === "web") {
    const text = message ? `${title}\n\n${message}` : title;
    const confirmed =
      typeof window !== "undefined" && typeof window.confirm === "function"
        ? window.confirm(text)
        : true;

    if (confirmed) onConfirm?.();
    return;
  }

  Alert.alert(title, message, [
    { text: cancelText, style: "cancel" },
    {
      text: confirmText,
      style: destructive ? "destructive" : "default",
      onPress: onConfirm,
    },
  ]);
};
