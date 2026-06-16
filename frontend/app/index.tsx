import { StyleSheet, useWindowDimensions, View } from "react-native";
import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import Notification from "@/components/Notification";
import { resetData } from "@/api/budget_api";
import { usePageTransition } from "@/utils/pageAnimations";
import { useState } from "react";
import { router } from "expo-router";
import Animated from "react-native-reanimated";

export default function Index() {

  const {slideAnimatedStyle, slideToPage } = usePageTransition();

  //notifation
  const [message, setMessage] = useState("");
  const [notificationType, setNotificiationType] = useState<"success" | "error">("success");

  const handleResetData = async () => {
    try {
      await resetData();
  
      setNotificiationType("success");
      setMessage("Budget data reset successfully");
    } catch (error) {
      setNotificiationType("error");
      setMessage("Failed to reset budget data")
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <View style={styles.screen}>
        <Notification message={message} type={notificationType}/>

        <View style={styles.header}>
          <AppText style={styles.title}>BuJet</AppText>
        </View>

        <View style={styles.main}>
          <Animated.View style={[styles.buttonContainer, slideAnimatedStyle]}>
            <MainButton title="Add Income" onPress={() => slideToPage("/income")}/>
            <MainButton title="Add Expense" onPress={() => slideToPage("/add-expense")}/>
            <MainButton title="Overview" onPress={() => slideToPage("/overview")}/>
            <MainButton title="Reset Data (Dev)" onPress={handleResetData}/>
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
    alignItems: "center",
  },
  title: {
    fontSize: 50,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "rgb(33, 34, 44)",
    width: "75%",
    height: "75%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
});
