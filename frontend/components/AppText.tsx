import { forwardRef, ReactNode } from "react";
import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";

type AppTextProps = {
    children: ReactNode;
    style?: StyleProp<TextStyle>
}

const AppText = forwardRef<Text, AppTextProps>(
  ({ children, style }, ref) => {
    return (
      <Text ref={ref} style={[styles.text, style]}>
        {children}
      </Text>
    );
  }
);

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Geom_600SemiBold",
    color: "#6672a2",
    textAlign: "center",
  },
});