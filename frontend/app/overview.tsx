import { StyleSheet, View } from "react-native";
import AppText from '@/components/AppText';
import Notification from "@/components/Notification";
import HomeButton from '@/components/HomeButton';

export default function Overview() {
    return (
        <View style={styles.screen}>
            {/* <Notification message={message} type={notificationType}/> */}

            <View style={styles.header}>
                <HomeButton/>
                <AppText style={styles.title}>Overview</AppText>
            </View>

            <View style={styles.main}>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
