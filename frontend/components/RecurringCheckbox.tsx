import Checkbox from "./Checkbox";
import GlowInput from "./GlowInput";
import { useZoomAnimation } from "@/utils/zoomAnimation";

import Animated from "react-native-reanimated";

import { StyleSheet, View, } from "react-native";

type RecurringCheckboxProps = {
    checked:  boolean;
    onToggle: (checked: boolean) => void;
    dayOfMonth: string;
    onChangeDay: (value: string) => void;
};

export default function RecurringCheckbox({ checked, onToggle, dayOfMonth, onChangeDay }: RecurringCheckboxProps) {
    const dateZoomStyle = useZoomAnimation(checked)

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
                />
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