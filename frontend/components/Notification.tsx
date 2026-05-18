import { StyleSheet } from "react-native";
import AppText from "./AppText";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import { useEffect, useState } from "react";

type notificationProps = {
    message: string;
};

export default function Notification({message}: notificationProps) {
    const[displayMessage, setDisplayMessage] = useState(message);
    const opacity = useSharedValue(0);
    
    useEffect(() => {
        if (message) {
            setDisplayMessage(message)
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            opacity.value = withTiming(0, { duration: 300 });
            
            setTimeout(() => {
                setDisplayMessage("");
            }, 300);
        }
    }, [message]);
    
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    
    if (!displayMessage) return null;

    return (
        <Animated.View style={[styles.notificationGlow, animatedStyle]}>
            <AppText style={styles.notification}>{displayMessage}</AppText>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    notification: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderColor: "#61ea73",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "rgba(97, 234, 115, 0.3)",
        color: "#61ea73",
    },
    notificationGlow: {
        zIndex: 999,
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        borderRadius: 10,
        shadowColor: "#61ea73",
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 20,
    },
});