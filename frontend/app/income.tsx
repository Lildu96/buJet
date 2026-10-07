import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";
import HomeButton from '@/components/HomeButton';
import Notification from "@/components/Notification";
import Dropdown from "@/components/Dropdown";
import CurrencyInput from '@/components/CurrencyInput';
import RecurringCheckbox from '@/components/RecurringCheckbox';
import { usePageTransition } from "@/utils/pageAnimations";
import Animated from "react-native-reanimated";
import { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, } from "react-native";
import { addIncome, getLibrary } from "@/api/budget_api";

type Account = {
  id: number;
  name: string;
};

export default function IncomeScreen() {

  const {slideAnimatedStyle, slideInFromRight, slideHome } = usePageTransition();

  useLayoutEffect(() => {
    slideInFromRight();
  }, []);

  const [amount, setAmount] = useState("");
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

  useEffect(() => {
      async function loadCategories() {
        const library = await getLibrary();
  
        setCategories(library.incomeCategories);
      }
      
      loadCategories();
    }, []);
  
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
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    }

    try {
          await addIncome(newIncome);
          // Reset Form
          setAmount("");
          setSelectedCategory("");

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
            <HomeButton onPress={slideHome}/>
            <AppText style={styles.title}>Income</AppText>
          </Animated.View>  
        </View>
      
        <View style={styles.main}>
            <Animated.View style={[styles.form, slideAnimatedStyle]}>
              <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>  
                <CurrencyInput label="Amount" placeholder="0.00" value={amount} onChangeText={setAmount} onBlur={validateIncome} error={amountError}/>
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
                  <RecurringCheckbox
                    checked={isMonthly}
                    onToggle={setIsMonthly}
                    dayOfMonth={dayOfMonth}
                    onChangeDay={setDayOfMonth}
                  />
                <MainButton wrapperStyle={styles.buttonWrapper} buttonStyle={styles.button} textStyle={styles.buttonText} title="Add Income" onPress={handleIncome}/>
              </ScrollView>
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
    width: "80%",
    height: "75%",
    borderRadius: 50,
  },
  scroll: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 60,
    gap: 50,
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