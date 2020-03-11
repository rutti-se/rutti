import React, {Component} from 'react';
import {
    Animated,
    View,
    SafeAreaView,
    Text,
    TouchableHighlight,
} from 'react-native';

import {animatedPosition, panGesture, onPanPress} from './PanResponder';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import RoundButton from '../RoundButton';
import {Icon} from '../../assets/icomoon/';

import styles from './styles';
export default class BottomDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {isEnflated: false};

        this.handlePanPress = this.handlePanPress.bind(this);
    }

    handlePanPress() {
        const enflated = this.state.isEnflated;
        this.setState({isEnflated: !enflated});
        onPanPress(this.state.isEnflated);
    }

    render() {
        const {username, amount} = this.props;
        return (
            <Animated.View
                style={[styles.container, {bottom: animatedPosition}]}>
                <PrefersHomeIndicatorAutoHidden />

                <View {...panGesture.panHandlers}>
                    <TouchableHighlight
                        underlayColor="transparent"
                        {...panGesture.panHandlers}
                        style={styles.gestureArea}
                        onPress={this.handlePanPress}>
                        <Icon
                            name={
                                this.state.isEnflated
                                    ? 'chevron-down'
                                    : 'chevron-up'
                            }
                            size={30}
                            color={'white'}></Icon>
                    </TouchableHighlight>
                </View>

                <SafeAreaView style={styles.content}>
                    <View style={styles.barTitle}>
                        <Text style={styles.text}>{username}s inköpslista</Text>
                        <RoundButton
                            disabled={true}
                            text={amount}></RoundButton>
                    </View>
                </SafeAreaView>
            </Animated.View>
        );
    }
}
