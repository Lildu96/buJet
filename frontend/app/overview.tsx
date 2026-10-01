import { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Animated from "react-native-reanimated";

import API_URL from "@/api/budget_api"
import AppText from '@/components/AppText';
import HomeButton from '@/components/HomeButton';
import MainButton from "@/components/MainButton";
import Notification from "@/components/Notification";
import { usePageTransition } from "@/utils/pageAnimations";

export default function Overview() {

  const [overview, setOverview] = useState({
    incomeTotal:0,
    expenseTotal: 0,
    remainingBudget: 0,
  })
  const [selectedType, setSelectedType] = useState("expense");

  async function loadOverview() {
    const response = await fetch(`${API_URL}/overview`);
    const data = await response.json();

    setOverview({
      incomeTotal: data.income_total,
      expenseTotal: data.expense_total,
      remainingBudget: data.remaining_budget,
    })
  }

  function showExpenses() {
    setSelectedType("expense");
  }

  function showIncome() {
    setSelectedType("income");
  }

  const {slideAnimatedStyle, slideInFromRight, slideHome } = usePageTransition();

  useLayoutEffect(() => {
      slideInFromRight();
  }, []);

  useEffect(() => {
    loadOverview();
  }, []);

  function showBudget() {}

  function showPersonal() {}

  function showJet() {} 

  function ExpenseAccountButtons() {
    return (
    <View style={styles.expenseButtons}>
      <MainButton wrapperStyle={styles.accountButtonWrapper} title="Budget" onPress={showBudget}/>
      <MainButton wrapperStyle={styles.accountButtonWrapper} title="Personal" onPress={showPersonal}/>
      <MainButton wrapperStyle={styles.accountButtonWrapper} title="Jet" onPress={showJet}/>
    </View>
    )
  }

  let expenseButtons = null

  if (selectedType == "expense") {
    expenseButtons = <ExpenseAccountButtons/>
  }
  
  return (
      <View style={styles.screen}>
          {/* <Notification message={message} type={notificationType}/> */}

          <View style={styles.header}>
              <Animated.View style={[slideAnimatedStyle, styles.headerContent]}>
                  <HomeButton onPress={slideHome}/>
                  <AppText style={styles.title}>Overview</AppText>
              </Animated.View>
          </View>

          <Animated.View style={[styles.typeSelector, slideAnimatedStyle]}>
              <MainButton wrapperStyle={styles.buttonWrapper} buttonStyle={styles.button} title="Income" onPress={showIncome}/>
              <MainButton wrapperStyle={styles.buttonWrapper} buttonStyle={styles.button} title="Expenses" onPress={showExpenses}/>
          </Animated.View>

          <View style={styles.main}>
              <Animated.View style={[styles.dataContainer, slideAnimatedStyle]}>
                {expenseButtons}
                <View>
                  <AppText>Income: £{overview.incomeTotal}</AppText>
                  <AppText>Expenses: £{overview.expenseTotal}</AppText>
                  <AppText>Remaining: £{overview.remainingBudget}</AppText>
                </View>
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
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 30,
  },
  buttonWrapper: {
    width: "40%",
  },
  accountButtonWrapper: {
    flex: 1,
  },
  button: {
    backgroundColor: "#21222c",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: "#21222c",
    padding: 50,
    alignItems: "center",
    width: "80%",
    // gap: 50,
    borderRadius: 50,
  },
  expenseButtons: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    gap: 20,
    marginBottom: 30,
  }
});
