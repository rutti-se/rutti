import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import COLORS from '../../assets/colors';
import RoundButton from './common/RoundButton';
import calcBestPrice from '../utilities/calcBestPrice';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Img from './common/Img';

export default ({productInfo, storeInfo, onPress, onItemPress, isLoading}) => {
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
                    icon={'buy-online-add'}
                    onPress={() => onPress({productInfo, storeInfo})}
                />
            </View>
        );
    };

    return (
        <SkeletonContent
            containerStyle={styles.skeletonContent}
            isLoading={isLoading}
            layout={[
                {key: 'image', width: 170, height: 170, marginBottom: 6},
                {key: 'titleText', width: 120, height: 14, marginBottom: 6},
            ]}>
            <TouchableOpacity
                style={{maxHeight: 170}}
                onPress={() => onItemPress({productInfo, storeInfo})}>
                <Img
                    style={styles.image}
                    resizeMode="contain"
                    source={productInfo?.imageUrl}
                />
            </TouchableOpacity>
            <Text style={styles.text}>
                {productInfo?.name.length > 0
                    ? productInfo?.name
                    : productInfo?.brand}
            </Text>
            <RenderBottom />
        </SkeletonContent>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skeletonContent: {
        flex: 1 / 2,
        backgroundColor: COLORS.WHITE,
        padding: 5,
        margin: 5,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
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
        marginTop: 10,
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
