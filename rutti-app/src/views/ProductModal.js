import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    BackHandler,
    ScrollView,
} from 'react-native';
import COLORS from '../../assets/colors';
import RoundButton from '../components/RoundButton';
import FadeInView from '../components/animations/FadeInView';
import {Dimensions} from 'react-native';
import calcBestPrice from '../utilities/calcBestPrice';
const DEVICE = Dimensions.get('window');
import Button from '../components/Button';

export default ({productInfo, storeInfo, onPress, closeButton}) => {
    const [lowestPrice, setLowestPrice] = useState(null);

    useEffect(() => {
        setLowestPrice(calcBestPrice(storeInfo));
    }, [storeInfo]);

    return (
        <View style={styles.container}>
            <FadeInView>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignContent: 'flex-end',
                    }}>
                    <ImageBackground
                        style={styles.image}
                        source={{uri: productInfo.imageUrl}}></ImageBackground>

                    <RoundButton
                        color="white"
                        icon="cross"
                        iconColor="black"
                        style={{alignSelf: 'flex-end'}}
                        onPress={closeButton}></RoundButton>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.text}>{productInfo.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.priceText}>från</Text>
                        <Text style={styles.price}>{lowestPrice}:-</Text>
                    </View>
                </View>

                <View style={styles.storeContainer}>
                    {storeInfo.map(store => {
                        return (
                            <View style={{width: 75, marginRight: 10}}>
                                <Button
                                    text={store.store.retailer}
                                    small={true}
                                    backgroundColor={
                                        COLORS[store.store.retailer]
                                    }></Button>
                            </View>
                        );
                    })}
                </View>
                <ScrollView>
                    <View style={styles.productInformation}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', flex: 4}}>
                                <Text style={styles.titleText}>
                                    Ingredienser
                                </Text>
                                <Text style={styles.infoText}>
                                    {productInfo.ingredientInfo}
                                </Text>
                            </View>
                            <View style={{flex: 1}}></View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', flex: 4}}>
                                <Text style={styles.titleText}>
                                    Näringsvärde per 100g
                                </Text>
                                <Text style={styles.infoText}>
                                    {productInfo.nutritionalInfo}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    left: '10%',
                                }}>
                                <RoundButton
                                    icon={'buy-online-add'}></RoundButton>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </FadeInView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.WHITE,
        padding: 5,
        margin: 5,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    image: {
        width: DEVICE.width / 1.5,
        height: DEVICE.width / 1.5,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 22,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        color: 'black',
        width: '60%',
    },
    bottom: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    nameContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    storeContainer: {
        height: 40,
        flexDirection: 'row',
    },
    productInformation: {
        flex: 4.5,
        margin: 10,
        justifyContent: 'flex-start',
    },
    titleText: {
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
    },
    infoText: {
        fontFamily: 'Montserrat-Regular',
        marginBottom: 20,
    },
});
