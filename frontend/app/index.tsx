import { StyleSheet, Text, View } from "react-native";
import AppText from '@/components/AppText'

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default function Index() {
  return (
    <View style={styles.screen}>
        <View style={styles.header}>
          <AppText>BuJet</AppText>
        </View>

        <View style={styles.main}>
          <AppText>Edit app/index.tsx to edit this screen.</AppText>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    padding: 60,
    alignItems: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
