import React, {Component} from 'react';
import PropTypes from 'prop-types';
import COLOR from '../../../assets/colors';
import {
    PanResponder,
    Animated,
    Dimensions,
    View,
    StyleSheet,
    Platform,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class BottomDrawer extends Component {
    static propTypes = {
        /**
         * Height of the drawer.
         */
        containerHeight: PropTypes.number.isRequired,

        /**
         * The amount of offset to apply to the drawer's position.
         * If the app uses a header and tab navigation, offset should equal
         * the sum of those two components' heights.
         */
        offset: PropTypes.number,

        /**
         * Set to true to have the drawer start in up position.
         */
        startUp: PropTypes.bool,

        /**
         * How much the drawer's down display falls beneath the up display.
         * Ex: if set to 20, the down display will be 20 points underneath the up display.
         */
        downDisplay: PropTypes.number,

        /**
         * The background color of the drawer.
         */
        backgroundColor: PropTypes.string,

        /**
         * Set to true to give the top of the drawer rounded edges.
         */
        roundedEdges: PropTypes.bool,

        /**
         * Set to true to give the drawer a shadow.
         */
        shadow: PropTypes.bool,

        /**
         * A callback function triggered when the drawer swiped into up position
         */
        onExpanded: PropTypes.func,

        /**
         * A callback function triggered when the drawer swiped into down position
         */
        onCollapsed: PropTypes.func,
    };

    static defaultProps = {
        offset: 0,
        startUp: false,
        backgroundColor: COLOR.GRAY_1,
        roundedEdges: true,
        shadow: true,
        dragBar: true,
        containerHeight: SCREEN_HEIGHT / 1.2,
        downDisplay: SCREEN_HEIGHT / 1.4,

        onExpanded: () => {},
        onCollapsed: () => {},
    };
    constructor(props) {
        super(props);

        /**
         * TOGGLE_THRESHOLD is how much the user has to swipe the drawer
         * before its position changes between up / down.
         */
        this.TOGGLE_THRESHOLD = this.props.containerHeight / 11;
        this.DOWN_DISPLAY =
            this.props.downDisplay || this.props.containerHeight / 1.5;

        /**
         * UP_POSITION and DOWN_POSITION calculate the two (x,y) values for when
         * the drawer is swiped into up position and down position.
         */
        this.UP_POSITION = this._calculateUpPosition(
            SCREEN_HEIGHT,
            this.props.containerHeight,
            this.props.offset,
        );

        this.DOWN_POSITION = this._calculateDownPosition(
            this.UP_POSITION,
            this.DOWN_DISPLAY,
        );

        this.state = {
            currentPosition: this.props.startUp
                ? this.UP_POSITION
                : this.DOWN_POSITION,
        };
    }
    render() {
        return (
            <Animator
                currentPosition={this.state.currentPosition}
                setCurrentPosition={position =>
                    this.setCurrentPosition(position)
                }
                toggleThreshold={this.TOGGLE_THRESHOLD}
                upPosition={this.UP_POSITION}
                downPosition={this.DOWN_POSITION}
                roundedEdges={this.props.roundedEdges}
                shadow={this.props.shadow}
                dragBar={this.props.dragBar}
                containerHeight={this.props.containerHeight}
                backgroundColor={this.props.backgroundColor}
                onExpanded={() => this.props.onExpanded()}
                onCollapsed={() => this.props.onCollapsed()}>
                <View style={styles.dragBar(this.props.dragBar)} />

                <View
                    style={{
                        height: Math.sqrt(SCREEN_HEIGHT),
                        backgroundColor: this.props.backgroundColor,
                    }}>
                    {this.props.children}
                </View>
            </Animator>
        );
    }

    setCurrentPosition(position) {
        this.setState({currentPosition: position});
    }

    _calculateUpPosition(screenHeight, containerHeight, offset) {
        return {
            x: 0,
            y: screenHeight - (containerHeight + offset),
        };
    }

    _calculateDownPosition(upPosition, downDisplay) {
        return {
            x: 0,
            y: upPosition.y + downDisplay,
        };
    }
}

export class Animator extends Component {
    constructor(props) {
        super(props);

        this.position = new Animated.ValueXY(this.props.currentPosition);

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => {
                return Platform.OS === 'ios' || e.nativeEvent.locationY < 100;
            },
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderRelease,
        });
    }

    render() {
        return (
            <Animated.View
                style={[
                    {...this.position.getLayout(), left: 0},
                    StyleSheet.flatten([
                        styles.animationContainer(
                            this.props.containerHeight,
                            this.props.backgroundColor,
                        ),
                        styles.roundedEdges(this.props.roundedEdges),
                        styles.shadow(this.props.shadow),
                    ]),
                ]}
                {...this._panResponder.panHandlers}>
                {this.props.children}
            </Animated.View>
        );
    }

    _handlePanResponderMove = (e, gesture) => {
        if (this._swipeInBounds(gesture)) {
            this.position.setValue({
                y: this.props.currentPosition.y + gesture.dy,
            });
        } else {
            this.position.setValue({
                y: this.props.upPosition.y - this._calculateEase(gesture),
            });
        }
    };

    _handlePanResponderRelease = (e, gesture) => {
        if (
            gesture.dy > this.props.toggleThreshold &&
            this.props.currentPosition === this.props.upPosition
        ) {
            this._transitionTo(this.props.downPosition, this.props.onCollapsed);
        } else if (
            gesture.dy < -this.props.toggleThreshold &&
            this.props.currentPosition === this.props.downPosition
        ) {
            this._transitionTo(this.props.upPosition, this.props.onExpanded);
        } else {
            this._resetPosition();
        }
    };

    // returns true if the swipe is within the height of the drawer.
    _swipeInBounds(gesture) {
        return (
            this.props.currentPosition.y + gesture.dy > this.props.upPosition.y
        );
    }

    _calculateEase(gesture) {
        return Math.min(Math.sqrt(gesture.dy * -1), Math.sqrt(SCREEN_HEIGHT));
    }

    _transitionTo(position, callback) {
        Animated.spring(this.position, {
            toValue: position,
        }).start(() => this.props.onExpanded());

        this.props.setCurrentPosition(position);
        callback();
    }

    _resetPosition() {
        Animated.spring(this.position, {
            toValue: this.props.currentPosition,
        }).start();
    }
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
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
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
    dragBar: dragBar => {
        return (
            dragBar == true && {
                backgroundColor: COLOR.GRAY_4,
                width: 70,
                height: 5,
                borderRadius: 25,
                alignSelf: 'center',
                marginTop: 10,
            }
        );
    },
};
