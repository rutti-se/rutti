import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from 'react-native';

import COLORS from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import FadeInView from '../animations/FadeInView';
import calcBestPrice from '../../utilities/calcBestPrice';
import Button from '../common/Button';
import Img from '../common/Img';
import CollapsibleView from '../CollapsibleView';
import {Dimensions} from 'react-native';
import Spinner from '../common/Spinner';

const DEVICE = Dimensions.get('window');

export default ({product, inShoppingList}) => {
    const [lowestPrice, setLowestPrice] = useState(null);

    useEffect(() => {
        setLowestPrice(calcBestPrice(product.data.storeInformation));
    }, [product.data.storeInformation]);

    function renderTop() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Img
                    style={styles.image}
                    source={product.data.productInformation.imageUrl}
                />
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
                        {product.data.productInformation.name.length > 0
                            ? product.data.productInformation.name
                            : product.data.productInformation.brand}
                    </Text>
                    <Text style={styles.infoText}>
                        {product.data.productInformation.name.length > 0
                            ? product.data.productInformation.brand
                            : ''}
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
                {renderStores()}
                <View
                    style={{
                        flex: 1,
                        marginRight: '5%',
                        alignItems: 'flex-end',
                    }}
                />
            </View>
        );
    }

    function renderStores() {
        return (
            <View style={styles.storeContainer}>
                {product.data.storeInformation.map(store => {
                    return (
                        <View style={{width: 75, marginRight: 10}}>
                            <Button
                                text={
                                    store.store.retailer === 'citygross'
                                        ? 'c.g'
                                        : store.store.retailer
                                }
                                small={true}
                                backgroundColor={COLORS[store.store.retailer]}
                            />
                        </View>
                    );
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
                        {product.data.productInformation.description}
                    </Text>
                    <View style={{marginTop: 10}}>
                        <CollapsibleView title={'Ingredienser'}>
                            <Text style={styles.infoText}>
                                {product.data.productInformation.ingredientInfo}
                            </Text>
                        </CollapsibleView>

                        <CollapsibleView title={'Näringsvärde per 100g'}>
                            <Text style={styles.infoText}>
                                {
                                    product.data.productInformation
                                        .nutritionalInfo
                                }
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
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                            padding: 20,
                            paddingTop: 5,
                            paddingBottom: 5,
                            backgroundColor: COLORS.GRAY_5,
                            borderRadius: 25,
                        }}>
                        <View style={{marginRight: 10}}>
                            <RoundButton
                                disabled={!product.quantity}
                                icon={'cross'}
                                color={
                                    product.quantity
                                        ? COLORS.GRAY_2
                                        : COLORS.GRAY_4
                                }
                                inAnimatedView={false}
                                onPress={() => cancel()}
                            />
                        </View>
                        <Spinner
                            inAnimatedView={false}
                            onValueChange={() => console.log('quantity')}
                        />
                        <View style={{marginLeft: 10}}>
                            <RoundButton
                                icon={'check'}
                                color={COLORS.COOP}
                                inAnimatedView={false}
                                onPress={() => {
                                    addToList({
                                        quantity: quantity,
                                        sku: selectedProduct.productInfo.gtin,
                                    });
                                    setSelectedProduct(null);
                                }}
                            />
                        </View>
                    </View>

                    {renderProductDetails()}
                </ScrollView>
            </FadeInView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.WHITE,
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
        marginRight: 12,
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
