import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import getProducts from '../api/getProducts';
import ProductItem from '../components/ProductItem';
import ProductModal from '../views/ProductModal';
import {Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');

export default ({productSkus, stores}) => {
    const [productDetails, setProductDetails] = useState([]);
    const [aboutProduct, setAboutProduct] = useState(null);

    useEffect(() => {
        if (productSkus && productSkus.length > 0 && stores) {
            setProductDetails([]);
            getProducts({stores, productSkus}).then(result => {
                var arr = [];
                result.map(res => {
                    res.status !== '400' && arr.push(res);
                });
                setProductDetails(arr);
            });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function showProductDetail(product) {
        setAboutProduct(product);
    }
    function renderProductItems({index}) {
        return (
            <ProductItem
                productInfo={productDetails[index].data.productInformation}
                storeInfo={productDetails[index].data.storeInformation}
                onPress={showProductDetail}
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
                data={productDetails}
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
