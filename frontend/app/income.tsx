import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import HomeButton from '@/components/HomeButton';
import Notification from "@/components/Notification";
import Dropdown from "@/components/Dropdown";
import CurrencyInput from '@/components/CurrencyInput';
import { usePageTransition } from "@/utils/pageAnimations";
import Animated from "react-native-reanimated";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View, } from "react-native";
import { addIncome } from "@/api/budget_api";

export default function IncomeScreen() {

  const {slideAnimatedStyle, slideIn } = usePageTransition();

  useLayoutEffect(() => {
    slideIn();
  }, []);

  const incomeOptions = ["Salary", "Refund", "Other"]

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");
  const [notificationType, setNotificiationType] = useState<"success" | "error">("success");

  const [amountError, setAmountError] = useState("");
  
  function validateIncome() {
    if (!amount) {
      setAmountError("Please enter an amount");
      return false;
    }

    setAmountError("");
    return true;
  }

  async function handleIncome() {
    const isValid = validateIncome();

    if (!isValid) {
        return;
    }

    const newIncome={
      amount: Number(amount),
      category,
      createdAt: new Date().toISOString(),
    }

    try {
          await addIncome(newIncome);
          // Reset Form
          setAmount("");
          setCategory("");

          setNotificiationType("success");
          setMessage("Income saved successfully");
        } catch (error) {
          setNotificiationType("error");
          setMessage("Failed to add income")
        }
    
        setTimeout(() => {
          setMessage("");
        }, 2000);
    
  }
  
  return (
    <View style={styles.screen}>
        <Notification message={message} type={notificationType}/>

        <View style={styles.header}>
          <Animated.View style={[slideAnimatedStyle, styles.headerContent]}>
            <HomeButton/>
            <AppText style={styles.title}>Income</AppText>
          </Animated.View>  
        </View>
      
        <View style={styles.main}>
            <Animated.View style={[styles.form, slideAnimatedStyle]}>
              <CurrencyInput label="Amount" placeholder="0.00" value={amount} onChangeText={setAmount} onBlur={validateIncome} error={amountError}/>
              <Dropdown
                  label="Category"
                  option={incomeOptions}
                  selected={category}
                  onSelect={setCategory}
              />
              <MainButton wrapperStyle={styles.buttonWrapper} buttonStyle={styles.button} textStyle={styles.buttonText} title="Add Income" onPress={handleIncome}/>
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
  headerContent: {
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