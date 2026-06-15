import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import AppText from "./AppText"
import FieldError from "./FieldError"
import extractAmount from "@/utils/amountUtils"
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"

type CurrencyInputProps = TextInputProps & {
    label: string;
    error?: string;
};

export default function CurrencyInput({ label, value, onChangeText, error, onBlur, ...textInputProps }: CurrencyInputProps) {
    const glow = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        boxShadow: `0 0 ${glow.value * 20}px #9d91ef`,
        shadowColor: "#9d91ef",
        elevation: 20,
    }));

    function handleAmountChange(text: string) {
        
        if (text === "") {
            onChangeText?.("");
            return;
        }
        
        const amount = extractAmount(text);

        if (amount === null) {
            return;
        }

        onChangeText?.(amount);
    }

    return (
        <View style={styles.inputContainer}>
            <AppText style={styles.label}>{label}</AppText>
            <Animated.View style={[styles.inputGlow, animatedStyle]}>
                <View style={styles.inputWrapper}>
                    <AppText style={styles.currencySymbol}>£</AppText>
                    <TextInput
                        keyboardType="decimal-pad"
                        style={styles.input} 
                        {...textInputProps}
                        value={value}
                        onChangeText={handleAmountChange}
                        onFocus={() => {
                            glow.value = withTiming(1, {duration: 150,});
                        }}
                        onBlur={(event) => {
                            glow.value = withTiming(0, {duration: 200,});
                            onBlur?.(event);
                        }}
                    />
                </View>
            </Animated.View>
            <FieldError message={error}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "50%",
    },
    inputGlow:{
        borderRadius: 20,
        elevation: 20,
    },
    label: {
        fontSize: 30,
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    inputWrapper: {
        backgroundColor: "rgba(157, 145, 239, 0.2)",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#9d91ef",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
    },
    currencySymbol: {
        fontSize: 17
    },
    input: {
        outlineStyle: "none" as any,
        flex: 1,
        padding: 20,
        paddingLeft: 0,
        fontFamily: "Geom_600SemiBold",
        color: "#6672a2",
        fontSize: 17,
    },
});