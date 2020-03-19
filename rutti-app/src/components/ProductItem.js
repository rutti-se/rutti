import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import COLORS from '../../assets/colors';
import RoundButton from './RoundButton';
export default ({productInfo, storeInfo}) => {
    const [lowestPrice, setLowestPrice] = useState(null);

    useEffect(() => {
        let price = Number.MAX_SAFE_INTEGER;
        storeInfo.map(store => {
            if (
                store.priceInformation.price < price &&
                store.priceInformation.price !== null
            ) {
                price = store.priceInformation.price;
            }
        });
        price < Number.MAX_SAFE_INTEGER && setLowestPrice(price);
    }, [storeInfo]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: productInfo.imageUrl}} />
            <Text style={styles.text}> {productInfo.name}</Text>
            <View style={styles.bottom}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
                <RoundButton></RoundButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 180,
        backgroundColor: COLORS.WHITE,
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
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
