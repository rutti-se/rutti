import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from 'react-native';

import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import FadeInView from '../animations/FadeInView';
import calcBestPrice from '../../utilities/calcBestPrice';
import Button from '../common/Button';
import Img from '../common/Img';
import CollapsibleView from '../CollapsibleView';
import {Dimensions} from 'react-native';
import Spinner from '../common/Spinner';
import {removeProductFromList} from '../../api/firebaseHelpers';
import filterStores from '../../utilities/filterStores';

const DEVICE = Dimensions.get('window');

export default ({product, setQuantity, removeItem}) => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [spinnerValue, setSpinnerValue] = useState(product.quantity);
    const [inStores, setInStores] = useState(null);

    useEffect(() => {
        if (product && product.storeInformation) {
            setLowestPrice(calcBestPrice(product?.data?.storeInformation));

            setInStores(filterStores(product?.data?.storeInformation));
        }
    }, [product]);

    function renderTop() {
        return (
            product &&
            product.data &&
            product.data.productInformation && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <Img
                        style={styles.image}
                        source={product?.data?.productInformation?.imageUrl}
                    />
                </View>
            )
        );
    }

    function renderNameAndPrice() {
        return (
            product &&
            product.data &&
            product.data.productInformation && (
                <View style={styles.nameContainer}>
                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 2.5,
                        }}>
                        <Text style={styles.text}>
                            {product?.data?.productInformation?.name?.length > 0
                                ? product?.data?.productInformation?.name
                                : product?.data?.productInformation?.brand}
                        </Text>
                        <Text style={styles.infoText}>
                            {product?.data?.productInformation?.name?.length > 0
                                ? product?.data?.productInformation?.brand
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
            )
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
                    }}
                />
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
                        {product?.data?.productInformation?.description}
                    </Text>
                    <View style={{marginTop: 10}}>
                        <CollapsibleView title={'Ingredienser'}>
                            <Text style={styles.infoText}>
                                {
                                    product?.data?.productInformation
                                        ?.ingredientInfo
                                }
                            </Text>
                        </CollapsibleView>

                        <CollapsibleView title={'Näringsvärde per 100g'}>
                            <Text style={styles.infoText}>
                                {
                                    product?.data?.productInformation
                                        ?.nutritionalInfo
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
                            backgroundColor: COLOR.GRAY_5,
                            borderRadius: 25,
                        }}>
                        <View style={{marginRight: 10}}>
                            <RoundButton
                                disabled={!product.quantity}
                                icon={'cross'}
                                color={
                                    product.quantity
                                        ? COLOR.GRAY_2
                                        : COLOR.GRAY_4
                                }
                                inAnimatedView={false}
                                onPress={() => {
                                    removeItem();
                                }}
                            />
                        </View>
                        <Spinner
                            inAnimatedView={false}
                            defaultValue={spinnerValue}
                            onValueChange={value => setSpinnerValue(value)}
                        />
                        <View style={{marginLeft: 10}}>
                            <RoundButton
                                icon={'check'}
                                color={COLOR.COOP}
                                inAnimatedView={false}
                                onPress={() => {
                                    setQuantity(spinnerValue);
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
        marginRight: 12,
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
