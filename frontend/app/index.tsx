import { Pressable, StyleSheet, View } from "react-native";
import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import Notification from "@/components/Notification";
import { resetData } from "@/api/budget_api";
import { useState } from "react";

export default function Index() {

  const [message, setMessage] = useState("");

  const handleResetData = async () => {
    await resetData();

    setMessage("Budget data reset successfully");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <View style={styles.screen}>
        <Notification message={message}/>

        <View style={styles.header}>
          <AppText style={styles.title}>BuJet</AppText>
        </View>

        <View style={styles.main}>
          <MainButton title="Add Expense" onPress={() => console.log("Clicked")}/>
          <MainButton title="Budget Details" onPress={() => console.log("Clicked")}/>
          <MainButton title="Save" onPress={() => console.log("Clicked")}/>
          <MainButton title="Reset Data (Dev)" onPress={handleResetData}/>
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
    gap: 50,
    alignItems: "center",
  },
});
