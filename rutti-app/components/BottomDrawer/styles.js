import {StyleSheet, Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');
import {ANIMATED} from './constants';
import COLOR from '../../assets/colors';

export default StyleSheet.create({
    container: {
        position: 'absolute',

        left: 0,
        width: DEVICE.width,
        height: Math.abs(ANIMATED.HIDDEN),

        marginBottom: ANIMATED.HIDDEN - ANIMATED.VISIBLE,
        paddingBottom: Math.abs(ANIMATED.FULL_OPEN),

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderColor: COLOR.SECONDARY,

        backgroundColor: COLOR.GRAY_1,

        shadowColor: COLOR.BLACK,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    gestureArea: {
        width: DEVICE.width,
        height: 40,

        marginTop: -10,
        position: 'absolute',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    pullItem: {},

    content: {
        marginVertical: 30,
        paddingHorizontal: 10,

        height: '100%',
    },
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
