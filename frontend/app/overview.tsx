import { StyleSheet, View } from "react-native";
import AppText from '@/components/AppText';
import Notification from "@/components/Notification";
import HomeButton from '@/components/HomeButton';
import { usePageTransition } from "@/utils/pageAnimations";
import { useLayoutEffect } from "react";
import Animated from "react-native-reanimated";

export default function Overview() {

    const {slideAnimatedStyle, slideInFromRight, slideHome } = usePageTransition();

    useLayoutEffect(() => {
        slideInFromRight();
    }, []);

    return (
        <View style={styles.screen}>
            {/* <Notification message={message} type={notificationType}/> */}

            <View style={styles.header}>
                <Animated.View style={[slideAnimatedStyle, styles.headerContent]}>
                    <HomeButton onPress={slideHome}/>
                    <AppText style={styles.title}>Overview</AppText>
                </Animated.View>
            </View>

            <View style={styles.main}>
                <Animated.View style={[styles.dataContainer, slideAnimatedStyle]}>
                </Animated.View>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#292a36",
  },
  header: {
    backgroundColor: "#21222c",
    padding: 50,
},
headerContent:{
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    backgroundColor: "rgb(33, 34, 44)",
    paddingTop: 50,
    paddingBottom: 60,
    alignItems: "center",
    width: "80%",
    gap: 50,
    borderRadius: 50,
  }
});
