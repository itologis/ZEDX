import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function MoltenBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={["#1c1022", "#130d18", "#0e0a12"]}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.orb,
          {
            top: -90,
            left: -70,
            width: 300,
            height: 300,
            backgroundColor: "#ff6a3d",
          },
        ]}
      />
      <View
        style={[
          styles.orb,
          {
            top: 280,
            right: -110,
            width: 340,
            height: 340,
            backgroundColor: "#ff3d77",
          },
        ]}
      />
      <View
        style={[
          styles.orb,
          {
            bottom: -110,
            left: 10,
            width: 320,
            height: 320,
            backgroundColor: "#7a5cff",
          },
        ]}
      />

      <BlurView
        intensity={90}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.5,
  },
});
