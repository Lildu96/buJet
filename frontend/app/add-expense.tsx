import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import Notification from "@/components/Notification";
import GlowInput from "@/components/GlowInput"
import CurrencyInput from '@/components/CurrencyInput';
import Dropdown from "@/components/Dropdown";
import library from "../data/library.json";
import { useState } from "react";
import { StyleSheet, View, } from "react-native";
import { addExpense } from "@/api/budget_api";

export default function AddExpenseScreen() {

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");
  const [notificationType, setNotificiationType] = useState<"success" | "error">("success");

  const [amountError, setAmountError] = useState("");
  
  function validateExpense() {
    if (!amount) {
      setAmountError("Please enter an amount");
      return false;
    }

    setAmountError("");
    return true;
  }

  async function handleAddExpense() {
    const isValid = validateExpense();

    if (!isValid) {
        return;
    }

    const newExpense ={
      amount: Number(amount),
      description,
      category,
      createdAt: new Date().toISOString(),
    }

    try {
          await addExpense(newExpense);
      
          setNotificiationType("success");
          setMessage("Expenses saved successfully");
        } catch (error) {
          setNotificiationType("error");
          setMessage("Failed to add expense")
        }
    
        setTimeout(() => {
          setMessage("");
        }, 2000);
    
    // Reset Form
    setAmount("");
    setDescription("");
    setCategory("");
  }
  
  return (
    <View style={styles.screen}>
        <Notification message={message} type={notificationType}/>

        <View style={styles.header}>
            <AppText style={styles.title}>Add Expense</AppText>
        </View>
      
        <View style={styles.main}>
            <View style={styles.form}>
              <CurrencyInput label="Amount" placeholder="0.00" value={amount} onChangeText={setAmount} onBlur={validateExpense} error={amountError}/>
              <GlowInput label="Decsription" value={description} onChangeText={setDescription} placeholder="Enter Description"/>
              <Dropdown
                  label="Category"
                  option={library.categories}
                  selected={category}
                  onSelect={setCategory}
              />
              <MainButton wrapperStyle={styles.buttonWrapper} buttonStyle={styles.button} textStyle={styles.buttonText} title="Add Expense" onPress={handleAddExpense}/>
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
    backgroundColor: "rgb(33, 34, 44)",
    paddingTop: 50,
    paddingBottom: 60,
    alignItems: "center",
    width: "80%",
    gap: 50,
    borderRadius: 50,
  },
  buttonWrapper: {
    marginTop: 50,
  },
  button: {
    paddingVertical: 20,
  },
  buttonText: {
    fontSize: 20
  },
});