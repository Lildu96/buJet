import { StyleSheet, Pressable, View } from "react-native";
import AppText from "./AppText"
import Animated, {useAnimatedStyle, useSharedValue, withTiming, runOnJS} from "react-native-reanimated"
import { useState } from "react";

type DropdownProps = {
    label: string;
    option: string[];
    selected: string;
    onSelect: (option: string) => void;
    placeholder?: string;
};



export default function Dropdown({ label, option, selected, onSelect, placeholder = "Select Option" }: DropdownProps) {
    const glow = useSharedValue(0);
    const dropdownHeight = useSharedValue(0);

    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const animatedStyle = useAnimatedStyle(() => ({
        boxShadow: `0 0 ${glow.value * 20}px #9d91ef`,
        elevation: glow.value > 0 ? 20 : 0,
    }));

    const dropdownAnimatedStyle = useAnimatedStyle(() => ({
        maxHeight: dropdownHeight.value,
    }));

    function setDropdown(nextOpen: boolean) {
        if(nextOpen) {
            setIsMounted(true);
            setIsOpen(true);

            glow.value = withTiming(1, { duration: 200});
            dropdownHeight.value = withTiming(250, { duration: 250 });
        } else {

            setIsOpen(false);

            glow.value = withTiming(0, { duration: 200 });
            dropdownHeight.value = withTiming(
                0,
                { duration: 250 },
                () => {
                    runOnJS(setIsMounted)(false);
                }
            )

        }

        
    }

    return (
        <View style={styles.inputContainer}>
            <AppText style={styles.label}>{label}</AppText>

            <Animated.View style={[styles.pressable, animatedStyle,]}>

                <Pressable
                    style={[
                        styles.input, isMounted && styles.inputOpen
                    ]}
                    onPress={() => setDropdown(!isOpen)}
                >
                    <AppText  style={styles.text} >{selected || placeholder}</AppText>
                </Pressable>

                
                <Animated.ScrollView style={[styles.optionContainer, dropdownAnimatedStyle]} showsVerticalScrollIndicator={false}>
                    {option.map((option) => (
                        <Pressable
                            key={option}
                            style={({ hovered, pressed }) => [styles.option, (hovered || pressed) && styles.optionActive]}
                            onPress={() => {
                                onSelect(option);
                                setDropdown(false);
                            }}
                        >
                            <AppText style={styles.text}>{option}</AppText>
                        </Pressable>
                    ))}
                </Animated.ScrollView>
                
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    //Entire Container including Label
    inputContainer: {
        width: "50%",
        gap: 20,
    },
    label: {
        fontSize: 30,
        alignSelf: "flex-start",
    },
    //Entire Container excluding Label
    pressable:{
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#9d91ef",
    },
    //Pressable Dropdown
    input: {
        backgroundColor: "rgba(157, 145, 239, 0.2)",
        borderRadius: 20,
        padding: 20,
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    //Options Box
    optionContainer: {
        backgroundColor: "rgba(157, 145, 239, 0.2)",
        
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    
    //Individual Options
    option: {
        padding: 20,
    },
    //Option hovered or pressed
    optionActive: {
        backgroundColor: "rgba(33, 34, 44, 0.7)",
        transitionDuration: "200ms",
    },

    text: {
        fontFamily: "Geom_600SemiBold",
        color: "#6672a2",
        fontSize: 17,
        alignSelf: "flex-start",
    }
});