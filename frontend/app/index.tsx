import { Pressable, StyleSheet, View } from "react-native";
import AppText from '@/components/AppText';
import MainButton from "@/components/MainButton";


export default function Index() {
  return (
    <View style={styles.screen}>
        <View style={styles.header}>
          <AppText style={styles.title}>BuJet</AppText>
        </View>

        <View style={styles.main}>
          <MainButton title="Add Expense" onPress={() => console.log("Clicked")}/>
          <MainButton title="Budget Details" onPress={() => console.log("Clicked")}/>
          <MainButton title="Save" onPress={() => console.log("Clicked")}/>
          <MainButton title="Reset Data (Dev)" onPress={() => console.log("Clicked")}/>
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
