import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import AppText from "./AppText"
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"

type GlowInputProps = TextInputProps & {
    label: string
};

export default function GlowInput({ label, ...textInputProps }: GlowInputProps) {
    const glow = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        boxShadow: `0 0 ${glow.value * 20}px #9d91ef`,
        shadowColor: "#9d91ef",
        elevation: 20,
    }));

    return (
        <View style={styles.inputContainer}>
            <AppText style={styles.label}>{label}</AppText>
            <Animated.View style={[styles.inputGlow, animatedStyle]}>
                <TextInput 
                    style={styles.input} 
                    {...textInputProps}
                    onFocus={() => {
                        glow.value = withTiming(1, {duration: 150,});
                    }}
                    onBlur={() => {
                        glow.value = withTiming(0, {duration: 200,});
                    }}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "50%",
        gap: 20,
    },
    inputGlow:{
        borderRadius: 20,
        elevation: 20,
    },
    label: {
        fontSize: 30,
        alignSelf: "flex-start",
    },
    input: {
        outlineStyle: "none" as any,
        backgroundColor: "rgba(157, 145, 239, 0.2)",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#9d91ef",
        padding: 20,
        fontFamily: "Geom_600SemiBold",
        color: "#6672a2",
        fontSize: 17,
    },
});