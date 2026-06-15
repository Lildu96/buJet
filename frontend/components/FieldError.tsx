import { ReactNode } from "react";
import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";
import AppText from "./AppText"

type FieldErrorProps = {
    message?: string;
}

export default function FieldError({ message }: FieldErrorProps) {

    if (!message) {
        return null;
    }

    return(
        <AppText style={styles.errorText}>{message}</AppText>
    );
}

const styles = StyleSheet.create({
    errorText: {
        color: "#de5d59",
        alignSelf: "flex-start"
    },
})