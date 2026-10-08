import Checkbox from "./Checkbox";
import GlowInput from "./GlowInput";
import FieldError from "./FieldError";
import { useZoomAnimation } from "@/utils/zoomAnimation";

import Animated from "react-native-reanimated";

import { StyleSheet, View, } from "react-native";
import { useEffect, useState } from "react";

type RecurringCheckboxProps = {
    checked:  boolean;
    onToggle: (checked: boolean) => void;
    dayOfMonth: string;
    onChangeDay: (value: string) => void;
    validationTrigger: number;
};

export default function RecurringCheckbox({ checked, onToggle, dayOfMonth, onChangeDay, validationTrigger }: RecurringCheckboxProps) {
    const dateZoomStyle = useZoomAnimation(checked)

    const [dayError, setDayError] = useState("")

    function validateDay() {
        if (!checked){
            setDayError("");
            return true;
        }

        const day = Number(dayOfMonth)
        if (!dayOfMonth) {
        setDayError("Please enter a payment date");
        return false;
        } else if (day < 1 || day > 31 || !Number.isInteger(day)) {
            setDayError("Please enter a date between 1 and 31")
            return false;
        }

        setDayError("");
        return true;
    }

    useEffect(() => {
        if (validationTrigger > 0){
            validateDay();
        }
    }, [validationTrigger]);


    return (
        <View style={styles.monthlyRow}>
            <Checkbox
                label="Repeat monthly"
                checked={checked}
                onPress={() => onToggle(!checked)}
            />
            <Animated.View style={dateZoomStyle}>
                <GlowInput
                    containerStyle={styles.dateInputContainer}
                    labelStyle={styles.dateLabel}
                    inputStyle={styles.dateInput}
                    label="Payment Date"
                    value={dayOfMonth}
                    onChangeText={onChangeDay}
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="1"
                    onBlur={validateDay}
                />
                <FieldError message={dayError}/>
            </Animated.View>
        </View>
    )
};

const styles =StyleSheet.create ({
    monthlyRow: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "auto",
    },
    dateLabel: {
        fontSize: 17,
        flexShrink: 0,
        alignSelf: "center",
    },
    dateInput: {
        width: 70,
        textAlign: "center",
    },
});