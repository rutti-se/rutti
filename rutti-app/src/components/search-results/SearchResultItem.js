import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import calcBestPrice from '../../utilities/calcBestPrice';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Img from '../common/Img';

import Popup from '../common/Popup';
import DetailedProduct from '../shopping-list/DetailedProduct';

export default ({product, onPress, isLoading, setQuantity, removeItem}) => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [productName, setProductName] = useState(null);
    const [isPromotion, setIsPromotion] = useState(false);
    const [promotion, setPromotion] = useState(null);
    useEffect(() => {
        if (product && product.data && product.data.storeInformation) {
            let priceInformation = calcBestPrice(product.data.storeInformation);
            setLowestPrice(priceInformation.price);
            setIsPromotion(priceInformation.promotion.isPromotion);
            setPromotion(priceInformation.promotion);
            let name =
                product.data.productInformation.name.length > 0
                    ? product.data.productInformation.name
                    : product.data.productInformation.brand;
            setProductName(name);
        }
    }, [product]);

    const RenderBottom = () => {
        return (
            <View style={styles.bottom}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
                <RoundButton icon={'plus'} onPress={() => onPress(product)} />
            </View>
        );
    };

    const RenderPromotion = () => {
        return (
            <View
                style={{
                    flex: 1,
                    height: '20%',
                    top: 0,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    backgroundColor: COLOR.PRIMARY,
                    opacity: 0.9,
                    justifyContent: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    zIndex: 1001,
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        opacity: 1,
                    }}>
                    {promotion.noOfItemsToDiscount > 1 && (
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.promotion}>
                                {promotion.noOfItemsToDiscount}
                            </Text>
                            <Text
                                style={[styles.promotionText, {marginLeft: 5}]}>
                                för
                            </Text>
                        </View>
                    )}

                    <Text style={styles.promotion}>
                        {promotion.promotionPrice}
                    </Text>
                    <Text style={styles.promotionText}>
                        {promotion?.noOfItemsToDiscount > 1 ? ':-' : '/st'}
                    </Text>
                </View>
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
            {product && product.data && (
                <>
                    {isPromotion && <RenderPromotion />}
                    <TouchableOpacity
                        style={{maxHeight: 170}}
                        onPress={() => setPopupVisible(true)}>
                        <View>
                            <Img
                                style={styles.image}
                                resizeMode="contain"
                                source={
                                    product?.data?.productInformation?.imageUrl
                                }
                            />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.text}>{productName}</Text>
                    <Text style={styles.infoText}>
                        {productName?.length > 0
                            ? product?.data?.productInformation?.brand
                            : ''}
                    </Text>

                    <RenderBottom />
                    <Popup
                        isVisible={popupVisible}
                        close={() => {
                            setPopupVisible(false);
                        }}>
                        <DetailedProduct
                            setQuantity={quantity => {
                                setQuantity(quantity);
                                setPopupVisible(false);
                            }}
                            product={product}
                            removeItem={removeItem}
                        />
                    </Popup>
                </>
            )}
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
        backgroundColor: COLOR.WHITE,
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
    infoText: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    bottom: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },

    price: {
        color: COLOR.PRIMARY,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        alignSelf: 'flex-end',
        textAlign: 'center',
    },
    priceText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        alignSelf: 'flex-start',
    },

    promotion: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    promotionText: {
        color: COLOR.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        textAlign: 'center',
        alignSelf: 'center',
        marginRight: 3,
    },
});
