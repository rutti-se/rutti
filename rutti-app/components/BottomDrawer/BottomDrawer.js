import React, {Component} from 'react';
import {
    Animated,
    ScrollView,
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native';
import {animatedPosition, panGesture} from './PanResponder';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import RoundButton from '../RoundButton';
import COLOR from '../../assets/colors';

import styles from './styles';
export default class BottomDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {username, amount} = this.props;
        return (
            <Animated.View
                style={[styles.container, {bottom: animatedPosition}]}>
                <PrefersHomeIndicatorAutoHidden />
                <View style={styles.gestureArea} {...panGesture.panHandlers}>
                    <View style={styles.pullItem} />
                </View>

                <SafeAreaView style={styles.content}>
                    <View style={lStyles.barTitle}>
                        <Text style={lStyles.text}>
                            {username}s inköpslista
                        </Text>
                        <RoundButton
                            disabled={true}
                            text={amount}></RoundButton>
                    </View>
                </SafeAreaView>
            </Animated.View>
        );
    }
}

const lStyles = StyleSheet.create({
    text: {
        color: COLOR.WHITE,
        fontSize: 25,
        textAlign: 'center',
    },
    barTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
