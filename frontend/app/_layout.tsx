import { Stack } from "expo-router";
import { useFonts, Geom_600SemiBold } from '@expo-google-fonts/geom';


export default function RootLayout() {
  const [loaded] = useFonts({
    Geom_600SemiBold
})
  if (!loaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", animationDuration: 300, }}/>;
}


