import {Dimensions, Animated, PanResponder} from 'react-native';

const DEVICE = Dimensions.get('window');
import {ANIMATED} from './constants';

const STARTING_POSITION = ANIMATED.HIDDEN - ANIMATED.FULL_OPEN;
const animatedPosition = new Animated.Value(STARTING_POSITION);

function animateMove(toValue) {
    Animated.spring(animatedPosition, {
        toValue,
        tension: 120,
    }).start();
}

function movementValue(gestureState) {
    return DEVICE.height - gestureState.moveY + ANIMATED.VISIBLE;
}

function onMoveShouldSetPanResponder(_, gestureState) {
    return gestureState.dy >= 10 || gestureState.dy <= -10;
}

function onPanResponderMove(_, gestureState) {
    const toValue = Math.min(0, movementValue(gestureState));

    animateMove(toValue);
}

function onPanResponderRelease(_, gestureState) {
    const isMovedMoreThenHalf =
        movementValue(gestureState) < STARTING_POSITION / 2;
    const toValue = isMovedMoreThenHalf ? STARTING_POSITION : 0;

    animateMove(toValue);
}

const panGesture = PanResponder.create({
    onPanResponderMove,
    onPanResponderRelease,
    onMoveShouldSetPanResponder,
    onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
});

export {animatedPosition, panGesture};
