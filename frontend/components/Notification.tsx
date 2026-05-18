import { StyleSheet } from "react-native";
import AppText from "./AppText";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import { useEffect, useState } from "react";

type notificationProps = {
    message: string;
    type: "success" | "error"
};

export default function Notification({message, type}: notificationProps) {
    const[displayMessage, setDisplayMessage] = useState(message);
    const opacity = useSharedValue(0);
    const notificationColors =
        type === "success"
            ? {
                borderColor: "#61ea73",
                backgroundColor: "rgba(97, 234, 115, 0.3)",
                color: "#61ea73"
            } : {
                borderColor: "#de5d59",
                backgroundColor: "rgba(222, 93, 89, 0.3)",
                color: "#de5d59"
            };
    
    const glowColors =
        type === "success"
            ? {
                shadowColor: "#61ea73",
                boxShadow: "0px 0px 20px #61ea73",
            } : {
                shadowColor: "#de5d59",
                boxShadow: "0px 0px 20px #de5d59",
            };
    
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
        <Animated.View style={[styles.notificationGlow, glowColors, animatedStyle]}>
            <AppText style={[styles.notification, notificationColors]}>{displayMessage}</AppText>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    notification: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderRadius: 10,
    },
    notificationGlow: {
        zIndex: 999,
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        borderRadius: 10,
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 20,
    },
});