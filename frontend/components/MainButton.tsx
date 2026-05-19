import { Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"


type MainButtonProps = {
  title: string;
  onPress: () => void;
};

export default function MainButton({ title, onPress}: MainButtonProps) {
    const scale = useSharedValue(1);
    const scaleTiming = {
        duration: 150,
    };
    const scaleUp = () => {
        scale.value = withTiming(1.07, scaleTiming)
    };
    const scaleDown = () => {
        scale.value = withTiming(1, scaleTiming)
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
            <Pressable 
                onHoverIn={scaleUp}
                onHoverOut={scaleDown}
                onPressIn={scaleUp}
                onPressOut={scaleDown}
                onPress={onPress}
                style={({ hovered, pressed }) => [styles.button, (hovered || pressed) && styles.buttonActive,]}
            >
            {({ hovered, pressed }) => (
                    <AppText style={[styles.text, (hovered || pressed) && styles.textActive,]}>{title}</AppText>
            )}
            </Pressable>
        </Animated.View>
    )
}



const styles = StyleSheet.create({
    buttonWrapper: {
        width: "50%",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#f77ec6',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 25,
        width: "100%"
        // maxWidth: 400,
    },
    buttonActive: {
        boxShadow: '0 0 20px #ff82bb',
        shadowColor: "#ff82bb",
        elevation: 20,
    },
    text: {
        fontSize: 30,
        textAlign: "center",
    },
    textActive: {
        color: '#f8f8f2'
    }
})