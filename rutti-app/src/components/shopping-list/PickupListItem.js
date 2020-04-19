import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import StoreSticker from '../common/StoreSticker';
import Popup from '../common/Popup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from '../../../assets/icomoon';
import DetailedProduct from './DetailedProduct';

const OPTION_SUSTAINABLE = 1;
const OPTION_ECONOMICAL = 2;

export default (
    {product, productBestPrice, removeItem, setQuantity, setPickup},
    props,
) => {
    const [productName, setProductName] = useState(null);
    const [pickedUp, setPickedUp] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        let name = '';
        product.data && (name = product.data.productInformation.name);
        if (name.length > 25) {
            name = name.substring(0, 25) + '...';
        }
        setProductName(name);
    }, [product]);

    useEffect(() => {}, [productBestPrice]);
    const RenderPromotion = () => {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                {productBestPrice.cheapestStore[0] &&
                    productBestPrice.cheapestStore[0].priceInformation
                        .isPromotion && (
                        <View
                            style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                backgroundColor: COLOR.SECONDARY,
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderRadius: 25,
                            }}>
                            {productBestPrice.cheapestStore[0].priceInformation
                                .currentPromotions[0].noOfItemsToDiscount >
                                1 && (
                                <Text style={styles.promotionText}>
                                    {
                                        productBestPrice.cheapestStore[0]
                                            .priceInformation
                                            .currentPromotions[0]
                                            .noOfItemsToDiscount
                                    }{' '}
                                    för{' '}
                                </Text>
                            )}
                            <Text style={styles.promotion}>
                                {(productBestPrice.price / product.quantity) *
                                    productBestPrice.cheapestStore[0]
                                        .priceInformation.currentPromotions[0]
                                        .noOfItemsToDiscount}
                                {productBestPrice.cheapestStore[0]
                                    .priceInformation.currentPromotions[0]
                                    .noOfItemsToDiscount > 1
                                    ? ':-'
                                    : '/st'}
                            </Text>
                        </View>
                    )}
            </View>
        );
    };

    return (
        <View style={[styles.container, {opacity: pickedUp ? 0.4 : 1}]}>
            <RoundButton
                text={product.quantity}
                iconColor={'white'}
                color={COLOR.GRAY_1}
                inAnimatedView={true}
                onPress={() => setPopupVisible(true)}
            />

            <View style={styles.leftContainer}>
                {product.data && (
                    <>
                        <Text style={styles.text}>{productName}</Text>
                        {/* {inStores && renderStores()} */}
                    </>
                )}
            </View>
            <View style={styles.rightContainer}>
                <RenderPromotion />
                {productBestPrice.grantedPromotion && (
                    <Text
                        style={[
                            styles.priceText,
                            {
                                alignSelf: 'center',
                                textDecorationLine: 'line-through',
                                textDecorationColor: 'white',
                                fontSize: 15,
                            },
                        ]}>
                        (
                        {(
                            productBestPrice.cheapestStore[0].priceInformation
                                .price * product.quantity
                        ).toFixed(2)}
                        :-)
                    </Text>
                )}
                {product.data && (
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Text style={styles.priceText}>från</Text>
                        <Text
                            style={[
                                styles.price,
                                {
                                    color: productBestPrice.grantedPromotion
                                        ? COLOR.PRIMARY
                                        : COLOR.WHITE,
                                },
                            ]}>
                            {productBestPrice.price}:-
                        </Text>
                    </View>
                )}
            </View>
            <View
                style={[
                    styles.checkBox,
                    {
                        backgroundColor: pickedUp ? COLOR.GREEN : COLOR.GRAY_4,
                    },
                ]}>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPressOut={() => setPickedUp(!pickedUp)}>
                    <Icon name={'check'} size={40} color={'white'} />
                </TouchableOpacity>
            </View>
            <Popup
                isVisible={popupVisible}
                close={() => {
                    setPopupVisible(false);
                }}>
                <DetailedProduct
                    setQuantity={quantity => {
                        setQuantity(quantity).then(() =>
                            setPopupVisible(false),
                        );
                    }}
                    product={product}
                    removeItem={() => {
                        removeItem().then(() => setPopupVisible(false));
                    }}
                />
            </Popup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: COLOR.GRAY_2,
        flexDirection: 'row',
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        paddingRight: 40,
    },
    leftContainer: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        alignContent: 'space-between',
    },
    rightContainer: {
        marginLeft: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        flex: 1,
        fontFamily: 'Montserrat-bold',
        fontSize: 15,
        color: COLOR.WHITE,
        textAlign: 'left',
    },
    storeContainer: {
        marginTop: 5,
        flexDirection: 'row',
    },
    price: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 5,
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginRight: 5,
    },
    priceText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        marginBottom: 3,
        color: COLOR.WHITE,
        alignSelf: 'flex-end',
    },
    checkBox: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    promotion: {
        fontFamily: 'Montserrat-Bold',
        color: COLOR.PRIMARY,
        fontSize: 15,
    },
    promotionText: {
        fontFamily: 'Montserrat-Regular',
        color: COLOR.PRIMARY,
        fontSize: 15,
    },
});
