import React, {useState} from 'react';
import {
    View,
    Dimensions,
    Animated,
    PanResponder,
    StyleSheet,
} from 'react-native';

export default ({children}, props) => {
    let [currentPosition, setCurrentPosition] = useState(
        props.startUp ? UP_POSITION : DOWN_POSITION,
    );

    const SCREEN_HEIGHT = Dimensions.get('window').height;

    let TOGGLE_THRESHOLD = props.containerHeight / 11;
    let DOWN_DISPLAY = props.downDisplay || props.containerHeight / 1.5;

    let UP_POSITION = _calculateUpPosition(
        SCREEN_HEIGHT,
        props.containerHeight,
        props.offset,
    );

    let DOWN_POSITION = _calculateDownPosition(UP_POSITION, DOWN_DISPLAY);

    function _calculateUpPosition(screenHeight, containerHeight, offset) {
        return {
            x: 0,
            y: screenHeight - (containerHeight + offset),
        };
    }

    function _calculateDownPosition(upPosition, downDisplay) {
        return {
            x: 0,
            y: upPosition.y + downDisplay,
        };
    }

    console.log('upPosition'.UP_POSITION);
    console.log('height', props.containerHeight);
    return (
        <>
            {UP_POSITION && props.containerHeight && (
                <Animator
                    currentPosition={currentPosition}
                    setCurrentPosition={position =>
                        setCurrentPosition(position)
                    }
                    toggleThreshold={TOGGLE_THRESHOLD}
                    upPosition={UP_POSITION}
                    downPosition={DOWN_POSITION}
                    roundedEdges={props.roundedEdges}
                    shadow={props.shadow}
                    containerHeight={props.containerHeight}
                    backgroundColor={props.backgroundColor}
                    onExpanded={() => props.onExpanded()}
                    onCollapsed={() => props.onCollapsed()}>
                    {children}

                    <View
                        style={{
                            height: Math.sqrt(SCREEN_HEIGHT),
                            backgroundColor: props.backgroundColor,
                        }}
                    />
                </Animator>
            )}
        </>
    );
};

function Animator(props) {
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    let position = new Animated.ValueXY(props.currentPosition);

    let _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: _handlePanResponderMove,
        onPanResponderRelease: _handlePanResponderRelease,
    });

    function _handlePanResponderMove(e, gesture) {
        if (_swipeInBounds(gesture)) {
            position.setValue({
                y: props.currentPosition.y + gesture.dy,
            });
        } else {
            position.setValue({
                y: props.upPosition.y - _calculateEase(gesture),
            });
        }
    }

    function _handlePanResponderRelease(e, gesture) {
        if (
            gesture.dy > props.toggleThreshold &&
            props.currentPosition === props.upPosition
        ) {
            _transitionTo(props.downPosition, props.onCollapsed);
        } else if (
            gesture.dy < -props.toggleThreshold &&
            props.currentPosition === props.downPosition
        ) {
            _transitionTo(props.upPosition, props.onExpanded);
        } else {
            _resetPosition();
        }
    }

    // returns true if the swipe is within the height of the drawer.
    function _swipeInBounds(gesture) {
        return props.currentPosition.y + gesture.dy > props.upPosition.y;
    }

    function _calculateEase(gesture) {
        return Math.min(Math.sqrt(gesture.dy * -1), Math.sqrt(SCREEN_HEIGHT));
    }

    function _transitionTo(position, callback) {
        Animated.spring(position, {
            toValue: position,
        }).start(() => props.onExpanded());

        props.setCurrentPosition(position);
        callback();
    }

    function _resetPosition() {
        Animated.spring(position, {
            toValue: props.currentPosition,
        }).start();
    }

    return (
        <Animated.View
            style={[
                {...position.getLayout(), left: 0},
                StyleSheet.flatten([
                    styles.animationContainer(
                        props.containerHeight,
                        props.backgroundColor,
                    ),
                    styles.roundedEdges(props.roundedEdges),
                    styles.shadow(props.shadow),
                ]),
            ]}
            {..._panResponder.panHandlers}>
            {props.children}
        </Animated.View>
    );
}

const styles = {
    animationContainer: (height, color) => ({
        width: SCREEN_WIDTH,
        position: 'absolute',
        height: height + Math.sqrt(SCREEN_HEIGHT),
        backgroundColor: color,
    }),
    roundedEdges: rounded => {
        return (
            rounded == true && {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }
        );
    },
    shadow: shadow => {
        return (
            shadow == true && {
                shadowColor: '#CECDCD',
                shadowRadius: 3,
                shadowOpacity: 5,
            }
        );
    },
};
