import { Pressable, StyleSheet, View, TextInput } from "react-native";
import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import Notification from "@/components/Notification";
import GlowInput from "@/components/GlowInput"
import { useState } from "react";

export default function AddExpenseScreen() {

    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [message, setMessage] = useState("");
    const [notificationType, setNotificiationType] = useState<"success" | "error">("success");
  
  return (
    <View style={styles.screen}>
        <Notification message={message} type={notificationType}/>

        <View style={styles.header}>
            <AppText style={styles.title}>Add Expense</AppText>
        </View>
      
        <View style={styles.main}>
            <View style={styles.form}>
                <GlowInput label="Amount" value={amount} onChangeText={setAmount} placeholder="£0.00" keyboardType="decimal-pad"/>
                <GlowInput label="Decsription" value={description} onChangeText={setDescription} placeholder="Input"/>
            </View>
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
  form: {
    backgroundColor: "#21222c",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    gap: 50,
    borderRadius: 50,
  }
});