import React, {Component} from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import COLORS from '../../assets/colors';
//import BottomDrawer from '../BottomDrawer/BottomDrawer';
import {Icon} from '../../assets/icomoon/';
import BottomDrawer from 'rn-bottom-drawer';
import {Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const TAB_BAR_HEIGHT = 49;
        const {} = this.props;
        return (
            <View style={styles.container}>
                <BottomDrawer
                    style={{borderTopEndRadius: 100}}
                    backgroundColor={COLORS.GRAY_2}
                    containerHeight={DEVICE.height / 1.2}
                    downDisplay={DEVICE.height / 1.4}
                    roundedEdges={true}
                    shadow={true}
                    startUp={false}></BottomDrawer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY,
        padding: 50,
    },
});
