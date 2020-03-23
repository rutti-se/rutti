import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import COLORS from '../../assets/colors';
import RoundButton from './RoundButton';
import FadeInView from '../components/animations/FadeInView';
import calcBestPrice from '../utilities/calcBestPrice';
export default ({productInfo, storeInfo, onPress}) => {
    const [lowestPrice, setLowestPrice] = useState(null);

    useEffect(() => {
        setLowestPrice(calcBestPrice(storeInfo));
    }, [storeInfo]);

    return (
        <View style={styles.container}>
            <FadeInView>
                <Image
                    style={styles.image}
                    source={{uri: productInfo.imageUrl}}
                />
                <Text style={styles.text}> {productInfo.name}</Text>
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
            </FadeInView>
        </View>
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
