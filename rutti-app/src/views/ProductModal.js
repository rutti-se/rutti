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
const DEVICE = Dimensions.get('window');
import calcBestPrice from '../utilities/calcBestPrice';
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
                        justifyContent: 'center',
                    }}>
                    <ImageBackground
                        style={styles.image}
                        source={{
                            uri: productInfo.imageUrl,
                        }}></ImageBackground>
                    <View
                        style={{
                            position: 'absolute',
                            right: 5,
                            top: 5,
                        }}>
                        <RoundButton
                            color="white"
                            icon="cross"
                            iconColor="black"
                            onPress={closeButton}></RoundButton>
                    </View>
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
                <View style={styles.productInformation}>
                    <View style={{flexDirection: 'row'}}>
                        <View
                            style={{
                                flexDirection: 'column',
                                flex: 4,
                            }}>
                            <ScrollView>
                                <Text style={styles.titleText}>
                                    Ingredienser
                                </Text>
                                <Text style={styles.infoText}>
                                    {productInfo.ingredientInfo}
                                </Text>

                                <Text style={styles.titleText}>
                                    Näringsvärde per 100g
                                </Text>
                                <Text style={styles.infoText}>
                                    {productInfo.nutritionalInfo}
                                </Text>
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                left: '10%',
                                bottom: '10%',
                            }}>
                            <RoundButton icon={'buy-online-add'}></RoundButton>
                        </View>
                    </View>
                </View>
            </FadeInView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: '80%',
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
        marginLeft: 10,
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
