import { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import API_URL from "@/api/budget_api"
import AppText from '@/components/AppText';
import HomeButton from '@/components/HomeButton';
import MainButton from "@/components/MainButton";
import { usePageTransition } from "@/utils/pageAnimations";
import { useZoomAnimation } from "@/utils/zoomAnimation";

export default function Overview() {

  const [overview, setOverview] = useState({
    incomeTotal:0,
    expenseTotal: 0,
    remainingBudget: 0,
  })

  // Zoom transition and states for expense/income buttons
  const [selectedType, setSelectedType] = useState("expense");
  const isExpenseActive = selectedType === "expense"

  const expenseZoomStyle = useZoomAnimation(isExpenseActive)

  // Load backend
  async function loadOverview() {
    const response = await fetch(`${API_URL}/overview`);
    const data = await response.json();

    setOverview({
      incomeTotal: data.income_total,
      expenseTotal: data.expense_total,
      remainingBudget: data.remaining_budget,
    })
  }

  useEffect(() => {
    loadOverview();
  }, []);

  // Page load transition
  const {slideAnimatedStyle, slideInFromRight, slideHome } = usePageTransition();
  
  useLayoutEffect(() => {
    slideInFromRight();
  }, []);

  //Buttons and functionality
  function showExpenses() {
    setSelectedType("expense");
  }

  function showIncome() {
    setSelectedType("income");
  }

  function showBudget() {}

  function showPersonal() {}

  function showJet() {} 

  function ExpenseButtons() {
    return (
    <Animated.View style={[ styles.expenseButtons, expenseZoomStyle ]}>
      <MainButton wrapperStyle={styles.accountButtonWrapper} title="Budget" onPress={showBudget}/>
      <MainButton wrapperStyle={styles.accountButtonWrapper} title="Personal" onPress={showPersonal}/>
      <MainButton wrapperStyle={styles.accountButtonWrapper} title="Jet" onPress={showJet}/>
    </Animated.View>
    )
  };
  
  return (
      <View style={styles.screen}>
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
                <ExpenseButtons/>
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
