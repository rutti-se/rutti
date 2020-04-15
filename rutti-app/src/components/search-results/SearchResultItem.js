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
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
                <RoundButton icon={'plus'} onPress={() => onPress(product)} />
            </View>
        );
    };

    const RenderPromotion = () => {
        return (
            <ImageBackground
                style={{
                    width: 120,
                    height: 90,
                    position: 'absolute',
                    justifyContent: 'center',
                    left: '5%',
                    top: '50%',
                }}
                resizeMode={'contain'}
                source={require('../../../assets/promotion.png')}>
                <View
                    style={{
                        alignSelf: 'center',
                        flexDirection: 'column',
                    }}>
                    {promotion.noOfItemsToDiscount > 0 && (
                        <Text style={styles.promotionText}>
                            {promotion.noOfItemsToDiscount} för
                        </Text>
                    )}
                    <Text style={styles.promotion}>
                        {promotion.promotionPrice}:-
                    </Text>
                </View>
            </ImageBackground>
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
                    <TouchableOpacity
                        style={{maxHeight: 170}}
                        onPress={() => setPopupVisible(true)}>
                        <View>
                            <Img
                                style={styles.image}
                                isPromotion={true}
                                promotionText={'2 för'}
                                promotionValue={30}
                                resizeMode="contain"
                                source={
                                    product?.data?.productInformation?.imageUrl
                                }
                            />
                            {isPromotion && <RenderPromotion />}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.text}>{productName}</Text>
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
        marginLeft: 5,
        textAlign: 'center',
    },
    priceText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginBottom: 2,
    },

    promotion: {
        color: COLOR.PRIMARY,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    promotionText: {
        color: COLOR.PRIMARY,
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        textAlign: 'center',
    },
});
