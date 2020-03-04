import {Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');
export const ANIMATED = {
    /* HIDDEN: -800,
    FULL_OPEN: -200,
    VISIBLE: -700, */
    HIDDEN: -DEVICE.height,
    FULL_OPEN: -(DEVICE.height / 4),
    VISIBLE: -DEVICE.height + 100,
};
