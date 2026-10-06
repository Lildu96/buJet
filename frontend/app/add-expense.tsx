import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import HomeButton from '@/components/HomeButton';
import Notification from "@/components/Notification";
import GlowInput from "@/components/GlowInput"
import CurrencyInput from '@/components/CurrencyInput';
import Dropdown from "@/components/Dropdown";
import Checkbox from '@/components/Checkbox';
import { usePageTransition } from '@/utils/pageAnimations';
import { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Animated from 'react-native-reanimated';
import { addExpense, getLibrary, getAccounts } from "@/api/budget_api";

type Account = {
  id: number;
  name: string;
};

export default function AddExpenseScreen() {

  const {slideAnimatedStyle, slideInFromRight, slideHome } = usePageTransition();

  useLayoutEffect(() => {
    slideInFromRight();
  }, []);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const accountNames = accounts.map((account) => account.name);

  //Checkbox variables
  const [isMonthly, setIsMonthly] = useState(false);
  const [dayOfMonth, setDayOfMonth] = useState("");

  const [message, setMessage] = useState("");
  const [notificationType, setNotificiationType] = useState<"success" | "error">("success");

  const [amountError, setAmountError] = useState("");

  //Creates text input for checkbox
  const monthlyDayInput = isMonthly ? (
    <View style={styles.dayContainer}>
      <AppText style={styles.dayLabel}>Day</AppText>

      <TextInput
        style={styles.dayInput}
        value={dayOfMonth}
        onChangeText={setDayOfMonth}
        keyboardType="number-pad"
        maxLength={2}
        placeholder="1"
        placeholderTextColor="#6672a2"
      />
    </View>
  ) : null;

  useEffect(() => {
    async function loadFormOptions() {
      const library = await getLibrary();
      const loadedAccounts = await getAccounts();

      setCategories(library.expenseCategories);
      setAccounts(loadedAccounts);
    }
    
    loadFormOptions();
  
  }, []);
  
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
      category: selectedCategory,
      account: selectedAccount,
      createdAt: new Date().toISOString(),
    }

    try {
          await addExpense(newExpense);
          // Reset Form
          setAmount("");
          setDescription("");
          setSelectedCategory("");
          setSelectedAccount("");
      
          setNotificiationType("success");
          setMessage("Expenses saved successfully");
        } catch (error) {
          setNotificiationType("error");
          setMessage("Failed to add expense")
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
            <HomeButton onPress={slideHome}/>
            <AppText style={styles.title}>Add Expense</AppText>
          </Animated.View>
        </View>
      
        <View style={styles.main}>
            <Animated.View style={[styles.form, slideAnimatedStyle]}>
              <CurrencyInput label="Amount" placeholder="0.00" value={amount} onChangeText={setAmount} onBlur={validateExpense} error={amountError}/>
              <GlowInput label="Description" value={description} onChangeText={setDescription} placeholder="Enter Description"/>
              <Dropdown
                label="Category"
                option={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
              <Dropdown
                label="Account"
                option={accountNames}
                selected={selectedAccount}
                onSelect={setSelectedAccount}
              />
              <View style={styles.monthlyRow}>
                <Checkbox
                  label="Repeat monthly"
                  checked = {isMonthly}
                  onPress={() => setIsMonthly(!isMonthly)}
                />
                {monthlyDayInput}
              </View>
              <MainButton wrapperStyle={styles.buttonWrapper} buttonStyle={styles.button} textStyle={styles.buttonText} title="Add Expense" onPress={handleAddExpense}/>
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
  monthlyRow: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dayLabel: {
    fontSize: 17,
  },
  dayInput: {
    width: 60,
    paddingVertical: 8,
    // paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#9d91ef",
    borderRadius: 8,
    backgroundColor: "rgba(157, 145, 239, 0.2)",
    color: "#6672a2",
    // fontFamily: "Geom_600SemiBold",
    fontSize: 17,
    textAlign: "center",
    outlineStyle: "none" as any,
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
