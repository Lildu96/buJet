import { Pressable, StyleSheet, View } from "react-native";
import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import Notification from "@/components/Notification";
import { useState } from "react";

export default function AddExpenseScreen() {

    const [message, setMessage] = useState("");
    const [notificationType, setNotificiationType] = useState<"success" | "error">("success");

    const handleResetData = async () => {
        try {
            await resetData();

            setNotificiationType("success");
            setMessage("Expense added successfully");
        } catch (error) {
            setNotificiationType("error");
            setMessage("Failed to add expense")
        }

        setTimeout(() => {
            setMessage("");
        }, 2000);
    };
  
  return (
    <View style={styles.screen}>
        <Notification message={message} type={notificationType}/>

        <View style={styles.header}>
            <AppText style={styles.title}>Add Expense</AppText>
        </View>
      
        <View style={styles.main}>
            
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