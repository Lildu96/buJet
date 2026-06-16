import { router } from "expo-router";
import { useWindowDimensions } from "react-native";
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

  
type PageRoute = "/income" | "/add-expense" | "/overview";

export function usePageTransition() {
    const slideX = useSharedValue(0);
    const { width } = useWindowDimensions();

    const slideAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value}],
  }));

    const slideToPage = (page: PageRoute) => {
    slideX.value = withTiming(-width, { duration: 300 }, () => {
      runOnJS(router.push)(page);
    });
  };

  return {
    slideAnimatedStyle,
    slideToPage,
  };
}