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
        <Animated.View style={animatedStyle}>
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
    button: {
        borderColor: '#f77ec6',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 50,
    },
    buttonActive: {
        shadowColor: "#ff82bb",
        shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    },
    text: {
        fontSize: 30,
    },
    textActive: {
        color: '#f8f8f2'
    }
})