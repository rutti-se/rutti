import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import getProducts from '../api/getProducts';
import ProductItem from '../components/ProductItem';
import ProductModal from '../views/ProductModal';
import {Dimensions} from 'react-native';

const DEVICE = Dimensions.get('window');

const storeInfo = [
    {
        store: {
            retailer: 'ica',
            storeId: '09808',
        },
        priceInformation: {
            price: 11.95,
            isPromotion: false,
            currentPromotions: [],
        },
    },
    {
        store: {
            retailer: 'coop',
            storeId: '257300',
        },
        priceInformation: {
            price: 8.95,
            comparePrice: '319.64',
            comparePriceUnit: 'kr/kg',
            isPromotion: false,
            currentPromotions: [],
        },
    },
];

export default ({productSkus, stores, selectProduct}) => {
    const [productDetails, setProductDetails] = useState([]);
    const [aboutProduct, setAboutProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const skeletons = [...Array(20).keys()];

    useEffect(() => {
        setIsLoading(true);

        if (productSkus && productSkus.length > 0 && stores) {
            let newDetails = {};
            productSkus.forEach(sku => {
                newDetails[sku] = {productInformation: {gtin: sku}};
            });
            setProductDetails(newDetails);

            getProducts({stores, productSkus}).then(result => {
                result.map(res => {
                    if (res.status !== '400') {
                        newDetails[res.data.productInformation.gtin] = res.data;
                    }
                });

                setProductDetails(newDetails);
                setIsLoading(false);
            });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function showProductDetail(product) {
        setAboutProduct(product);
    }

    function addToCart(product) {
        console.log(product);
    }

    function renderProductItems({item, index}) {
        return (
            <ProductItem
                productInfo={item?.productInformation}
                storeInfo={item?.storeInformation}
                /* onPress={showProductDetail} */
                onPress={e => selectProduct(e)}
                addToCart={addToCart}
                isLoading={isLoading}
                index={index}></ProductItem>
        );
    }

    return (
        <View>
            {aboutProduct && (
                <View style={{height: DEVICE.height / 1.1, width: '100%'}}>
                    <ProductModal
                        productInfo={aboutProduct.productInfo}
                        storeInfo={aboutProduct.storeInfo}
                        closeButton={() =>
                            setAboutProduct(null)
                        }></ProductModal>
                </View>
            )}

            <FlatList
                data={isLoading ? skeletons : Object.values(productDetails)}
                style={styles.container}
                renderItem={renderProductItems}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});
