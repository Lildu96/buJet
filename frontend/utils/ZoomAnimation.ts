import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export const useZoomAnimation = (isActive: boolean) => {
    const scale = useSharedValue(0.9)
    const opacity = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { scale: scale.value }
            ],
        };
    });

    useEffect(() => {
        if (isActive) {
            scale.value = 0.9
            opacity.value = 0

            scale.value = withTiming(1, { duration: 250 });
            opacity.value = withTiming (1, { duration: 200 });
        } else {
        scale.value = withTiming (0.9, { duration: 200 });
        opacity.value = withTiming (0, { duration: 200 });
        }
    }, [ isActive ])

    return animatedStyle
}