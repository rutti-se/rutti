import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import COLORS from '../../assets/colors';
import RoundButton from './RoundButton';
import FadeInView from '../components/animations/FadeInView';
import calcBestPrice from '../utilities/calcBestPrice';
import SkeletonItem from './SkeletonItem';

export default ({productInfo, storeInfo, onPress, index}) => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setLowestPrice(calcBestPrice(storeInfo));
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
        <View style={styles.container}>
            {/*             {isLoading && <SkeletonItem></SkeletonItem>} */}

            <FadeInView index={index} duration={500}>
                <Image
                    style={styles.image}
                    onLoadEnd={() => setIsLoading(false)}
                    source={{uri: productInfo.imageUrl}}
                />

                <Text style={styles.text}> {productInfo.name}</Text>
                <RenderBottom></RenderBottom>
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
