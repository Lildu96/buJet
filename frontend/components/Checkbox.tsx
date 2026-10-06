import { useEffect } from "react";
import Animated from "react-native-reanimated";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { StyleSheet, Pressable, View } from "react-native";
import AppText from "./AppText"

type CheckboxProps = {
    label: string;
    checked: boolean;
    onPress: () => void;
}

export default function Checkbox({ label, checked, onPress }: CheckboxProps) {
    const glow = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        boxShadow: `0 0 ${glow.value * 20}px #9d91ef`,
        shadowColor: "#9d91ef",
        elevation: 20,
    }));

    useEffect(() => {
        if (checked) {
            glow.value = withTiming(1, {duration: 150,});
        } else {
            glow.value = withTiming(0, {duration: 200,});
        }
    })

    const boxStyle = (checked) ? [styles.box, styles.checkedBox] : styles.box

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Animated.View style={[boxStyle, animatedStyle]}>
                {checked ? <AppText style={styles.tick}>✓</AppText> : null}
            </Animated.View>
            <AppText style={styles.label}>{label}</AppText>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    container: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
    },
    box: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#9d91ef",
        backgroundColor: "rgba(157, 145, 239, 0.2)",
    },
    checkedBox: {

    },
    tick: {
        fontSize: 17,
        color: "#9d91ef",
        paddingBottom: 2,
    },
    label: {
        fontSize: 17,
    },
})