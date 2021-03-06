import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import COLOR from '../../assets/colors';
import RoundButton from '../components/common/RoundButton';
import FadeInView from '../components/animations/FadeInView';
import calcBestPrice from '../utilities/calcBestPrice';
import Button from '../components/common/Button';
import Img from '../components/common/Img';
import CollapsibleView from '../components/CollapsibleView';
import {Dimensions} from 'react-native';
import filterStores from '../utilities/filterStores';

const DEVICE = Dimensions.get('window');
export default ({productInfo, storeInfo, onPress, closeButton}) => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [inStores, setInStores] = useState(null);
    useEffect(() => {
        setLowestPrice(calcBestPrice(storeInfo));
        setInStores(filterStores(storeInfo));
    }, [storeInfo]);

    function renderTop() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Img style={styles.image} source={productInfo.imageUrl} />
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
                        onPress={closeButton}
                    />
                </View>
            </View>
        );
    }

    function renderNameAndPrice() {
        return (
            <View style={styles.nameContainer}>
                <View
                    style={{
                        flexDirection: 'column',
                        flex: 2.5,
                    }}>
                    <Text style={styles.text}>
                        {productInfo.name.length > 0
                            ? productInfo.name
                            : productInfo.brand}
                    </Text>
                    <Text style={styles.infoText}>
                        {productInfo.name.length > 0 ? productInfo.brand : ''}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
            </View>
        );
    }

    function renderMiddle() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {inStores && renderStores()}
                <View
                    style={{
                        flex: 1,
                        marginRight: '5%',
                        alignItems: 'flex-end',
                    }}>
                    <RoundButton
                        onPress={() => onPress({productInfo, storeInfo})}
                        icon={'buy-online-add'}
                    />
                </View>
            </View>
        );
    }

    function renderStores() {
        return (
            <View style={styles.storeContainer}>
                {inStores.map(store => {
                    if (store.isSelected) {
                        return (
                            <View style={{width: 75, marginRight: 10}}>
                                <Button
                                    disabled={true}
                                    text={
                                        store.retailer === 'citygross'
                                            ? 'c.g'
                                            : store.retailer
                                    }
                                    small={true}
                                    backgroundColor={COLOR[store.retailer]}
                                />
                            </View>
                        );
                    }
                })}
            </View>
        );
    }

    function renderProductDetails() {
        return (
            <View style={styles.productInformation}>
                <View
                    style={{
                        flexDirection: 'column',
                    }}>
                    <Text styles={styles.infoText}>
                        {productInfo.description}
                    </Text>
                    <View style={{marginTop: 10}}>
                        <CollapsibleView title={'Ingredienser'}>
                            <Text style={styles.infoText}>
                                {productInfo.ingredientInfo}
                            </Text>
                        </CollapsibleView>

                        <CollapsibleView title={'Näringsvärde per 100g'}>
                            <Text style={styles.infoText}>
                                {productInfo.nutritionalInfo}
                            </Text>
                        </CollapsibleView>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FadeInView>
                <ScrollView>
                    {renderTop()}
                    {renderNameAndPrice()}
                    {renderMiddle()}
                    {renderProductDetails()}
                </ScrollView>
            </FadeInView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: '80%',
        width: '100%',
        backgroundColor: COLOR.WHITE,
        padding: 10,
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
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        color: 'black',
    },
    bottom: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    nameContainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    price: {
        color: COLOR.PRIMARY,
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
        flexDirection: 'row',
    },
    productInformation: {
        flex: 4.5,
        paddingTop: 10,
        marginRight: '5%',
    },
    infoText: {
        fontFamily: 'Montserrat-Regular',
        borderRadius: 50,
    },
});
