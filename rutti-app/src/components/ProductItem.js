import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../../assets/colors';
import RoundButton from './RoundButton';
import calcBestPrice from '../utilities/calcBestPrice';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Img from './Img';

export default ({productInfo, storeInfo, onPress, isLoading}) => {
    const [lowestPrice, setLowestPrice] = useState(null);

    useEffect(() => {
        storeInfo && setLowestPrice(calcBestPrice(storeInfo));
    }, [storeInfo]);

    const RenderBottom = () => {
        return (
            <View style={styles.bottom}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
                <RoundButton
                    icon={'info'}
                    onPress={() =>
                        onPress({productInfo, storeInfo})
                    }></RoundButton>
            </View>
        );
    };

    return (
        <SkeletonContent
            containerStyle={styles.container}
            isLoading={isLoading}
            layout={[
                {key: 'image', width: 170, height: 170, marginBottom: 6},
                {key: 'text', width: 120, height: 14, marginBottom: 6},
            ]}>
            <Img style={styles.image} source={productInfo?.imageUrl} />
            <Text style={styles.text}> {productInfo?.name}</Text>
            <RenderBottom></RenderBottom>
        </SkeletonContent>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2,
        backgroundColor: COLORS.WHITE,
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 170,
        height: 170,
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    bottom: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },

    price: {
        color: COLORS.PRIMARY,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        alignSelf: 'flex-end',
        marginLeft: 5,
        textAlign: 'center',
    },
    priceText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginBottom: 2,
    },
});
