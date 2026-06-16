import { Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";
import { usePageTransition } from "@/utils/pageAnimations";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"
import { router } from "expo-router";

const AnimatedAppText = Animated.createAnimatedComponent(AppText);

export default function HomeButton() {

    const { slideHome } = usePageTransition();

    const glow = useSharedValue(0);

    const glowUp = () => {
        console.log("hover in")
        glow.value = withTiming(1, {duration: 200});
    };
    const glowDown = () => {
        glow.value = withTiming(0, { duration: 200});
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            textShadowRadius: glow.value * 5,
            textShadowColor: "#9d91ef",
        };
    });

    return(
        <Pressable 
            style={styles.pressableContainer}
            onPress={() => slideHome()}
            onHoverIn={glowUp}
            onHoverOut={glowDown}
            onPressIn={glowUp}
            onPressOut={glowDown}
        >
            <AnimatedAppText style={[styles.text, animatedStyle]}>{"← Home"}</AnimatedAppText>
        </Pressable>   
    )
}

const styles = StyleSheet.create({
    pressableContainer: {
        position: "absolute",
        zIndex: 10,
    },
    text: {
    }
});