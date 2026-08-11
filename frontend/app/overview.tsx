import { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import API_URL from "@/api/budget_api"
import AppText from '@/components/AppText';
import HomeButton from '@/components/HomeButton';
import Notification from "@/components/Notification";
import { usePageTransition } from "@/utils/pageAnimations";

export default function Overview() {

  const [overview, setOverview] = useState({
    incomeTotal:0,
    expenseTotal: 0,
    remainingBudget: 0,
  })

  async function loadOverview() {
    const response = await fetch(`${API_URL}/overview`);
    const data = await response.json();

    setOverview({
      incomeTotal: data.income_total,
      expenseTotal: data.expense_total,
      remainingBudget: data.remaining_budget,
    })
  }

    const {slideAnimatedStyle, slideInFromRight, slideHome } = usePageTransition();

    useLayoutEffect(() => {
        slideInFromRight();
    }, []);

    useEffect(() => {
      loadOverview();
    }, []);

    return (
        <View style={styles.screen}>
            {/* <Notification message={message} type={notificationType}/> */}

            <View style={styles.header}>
                <Animated.View style={[slideAnimatedStyle, styles.headerContent]}>
                    <HomeButton onPress={slideHome}/>
                    <AppText style={styles.title}>Overview</AppText>
                </Animated.View>
            </View>

            <View style={styles.main}>
                <Animated.View style={[styles.dataContainer, slideAnimatedStyle]}>
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
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    backgroundColor: "rgb(33, 34, 44)",
    paddingTop: 50,
    paddingBottom: 60,
    alignItems: "center",
    width: "80%",
    gap: 50,
    borderRadius: 50,
  }
});
