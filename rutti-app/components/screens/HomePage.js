import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import COLORS from '../../assets/colors';
import BottomDrawer from '../BottomDrawer/BottomDrawer';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <BottomDrawer />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY,
    },
});
