import { ReactNode, useEffect } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import AppText from "./AppText"

type FieldErrorProps = {
    message?: string;
    style?: StyleProp<ViewStyle>;
}

export default function FieldError({ message, style }: FieldErrorProps) {
    const opacity = useSharedValue(0);
    const height = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        height: height.value,
        overflow: "hidden",
    }));

    useEffect (() => {
        if (message) {
            opacity.value = withTiming(1, { duration: 300 });
            height.value = withTiming(24, { duration: 300 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            height.value = withTiming(0, { duration: 300 });
        }
    }, [message]);

    return(
        <Animated.View style={[animatedStyle, style]}>
            <AppText style={styles.errorText}>{message}</AppText>
        </Animated.View>
    ); 
}

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: "#de5d59",
        alignSelf: "flex-start"
    },
})