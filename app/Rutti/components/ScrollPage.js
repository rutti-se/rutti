import React, {Component} from 'react';
import {
    Animated,
    ScrollView,
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import COLOR from '../assets/colors';

const DEVICE = Dimensions.get('window');
export default class ScrollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {} = this.props;
        return (
            <ScrollView
                horizontal={true}
                overScrollMode={'never'}
                bounces={false}
                style={styles.ScrollView}>
                //Page 1
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={[COLOR.PRIMARY, '#FD7790']}
                    style={styles.page}>
                    //Content
                    <Text style={styles.text}>PAGE 1</Text>
                </LinearGradient>
                //Page 2
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#FD7790', '#FEC6D1']}
                    style={styles.page}>
                    //Content
                    <Text style={styles.text}>PAGE 2</Text>
                </LinearGradient>
                //Page 3
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#FEC6D1', '#FEE5EA']}
                    style={styles.page}>
                    //Content
                    <Text style={[styles.text, {color: 'black'}]}>PAGE 3</Text>
                </LinearGradient>
                //Page 4
                <View style={[styles.page, {backgroundColor: COLOR.SECONDARY}]}>
                    //Content
                    <Text style={[styles.text, {color: 'black'}]}>PAGE 4</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: DEVICE.width,
        justifyContent: 'center',
    },
    ScrollView: {},
    text: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
});
