import { Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from "react-native";
import AppText from "./AppText";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"


type MainButtonProps = {
  title: string;
  onPress: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

}

export default function MainButton({ title, onPress, buttonStyle, textStyle, wrapperStyle }: MainButtonProps) {
    const glow = useSharedValue(0);
    const scale = useSharedValue(1);
    const scaleTiming = {
        duration: 150,
    };
    const scaleUp = () => {
        scale.value = withTiming(1.07, scaleTiming)
    };
    const scaleDown = () => {
        scale.value = withTiming(1, scaleTiming)
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],

            boxShadow: `0 0 ${glow.value * 20}px #ff82bb`,
            elevation: glow.value > 0 ? 20 : 0,

            borderRadius: 20,
        };
    });

    const focusStyling = () => {
        glow.value = withTiming(1);
    };
    const blurStyling = () => {
        glow.value = withTiming(0);
    };

    return (
        <View style={[wrapperStyle, styles.buttonWrapper,]}>
            <Animated.View style={[animatedStyle,]}>
                <Pressable 
                    onHoverIn={scaleUp}
                    onHoverOut={scaleDown}
                    onPressIn={scaleUp}
                    onPressOut={scaleDown}
                    onFocus={focusStyling}
                    onBlur={blurStyling}
                    onPress={onPress}
                    style={styles.pressable}
                >
                    {({ hovered, pressed }) => (
                        <View style={[styles.button, buttonStyle, (hovered || pressed) && styles.buttonActive]}>                        
                            <AppText style={[styles.text, (hovered || pressed) && styles.textActive, textStyle]}>{title}</AppText>
                        </View>
                    )}
                </Pressable>
            </Animated.View>
        </View>
    )
}



const styles = StyleSheet.create({
    buttonWrapper: {
        width: "50%",
        borderRadius: 20,
    },
    pressable: {
        outlineStyle: "none" as any,      
    },
    button: {
        outlineStyle: "none" as any,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#f77ec6',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 25,
        width: "100%"  
    },
    buttonActive: {
        boxShadow: '0 0 20px #ff82bb',
        shadowColor: "#ff82bb",
        elevation: 20,
    },
    text: {
        fontSize: 30,
    },
    textActive: {
        color: '#f8f8f2'
    }
})