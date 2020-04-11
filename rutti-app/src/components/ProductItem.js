import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import COLOR from '../../assets/colors';
import RoundButton from './common/RoundButton';
import calcBestPrice from '../utilities/calcBestPrice';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Img from './common/Img';
import Popup from './common/Popup';
import DetailedProduct from './shopping-list/DetailedProduct';

export default ({product, onPress, isLoading, setQuantity, removeItem}) => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        if (product) {
            let temp = product;
            if (!temp.data) {
                temp = {
                    sku: !temp.sku || product?.productInformation?.gtin,
                    data: product,
                };
            }
            setCurrentProduct(temp);
        }
    }, [product]);

    useEffect(() => {
        if (currentProduct) {
            currentProduct.data.storeInformation &&
                setLowestPrice(
                    calcBestPrice(currentProduct.data.storeInformation),
                );
        }
    }, [currentProduct]);

    const RenderBottom = () => {
        return (
            <View style={styles.bottom}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
                <RoundButton
                    icon={'buy-online-add'}
                    onPress={() => onPress(currentProduct)}
                />
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
            {currentProduct && currentProduct.data && (
                <>
                    <TouchableOpacity
                        style={{maxHeight: 170}}
                        onPress={() => setPopupVisible(true)}>
                        <Img
                            style={styles.image}
                            resizeMode="contain"
                            source={
                                currentProduct?.data?.productInformation
                                    ?.imageUrl
                            }
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        {currentProduct?.data?.productInformation?.name.length >
                        0
                            ? currentProduct?.data?.productInformation?.name
                            : currentProduct?.data?.productInformation?.brand}
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
                            product={currentProduct}
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
});
