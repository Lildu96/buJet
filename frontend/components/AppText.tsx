import { ReactNode } from "react";
import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";

type AppTextProps = {
    children: ReactNode;
    style?: StyleProp<TextStyle>
}

export default function AppText({ children, style }: AppTextProps) {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Geom_600SemiBold",
  },
});