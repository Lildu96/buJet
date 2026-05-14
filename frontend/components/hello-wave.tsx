import Animated from 'react-native-reanimated';

export function Paws() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          from : { transform: [{ rotate: '25deg' }] },
          '50%': { transform: [{ rotate: '-25deg' }] },
          to : { transofmr: [{ rotate: '0deg' }] }
        },
        animationDirection: 'alternate',
        animationIterationCount: 3,
        animationDuration: '1s',
      }}>
      🐾
    </Animated.Text>
  );
}
