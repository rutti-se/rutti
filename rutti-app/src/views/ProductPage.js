import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import getProducts from '../api/getProducts';
import ProductItem from '../components/ProductItem';
import {Dimensions} from 'react-native';
import {
    removeProductFromList,
    setProductQuantity,
} from '../api/firebaseHelpers';
const DEVICE = Dimensions.get('window');

export default ({productSkus, stores, selectProduct, list}) => {
    const [productDetails, setProductDetails] = useState([]);
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
                    if (
                        res.status !== '400' &&
                        res.data &&
                        res.data.productInformation
                    ) {
                        newDetails[res.data.productInformation.gtin] = res.data;
                    }
                });

                setProductDetails(newDetails);
                setIsLoading(false);
            });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function renderProductItems({item, index}) {
        if (item && list && item.productInformation) {
            let itemIndex = list.products.findIndex(
                e => e.sku === item?.productInformation.gtin,
            );

            let listItem;
            if (itemIndex >= 0) {
                listItem = list.products[itemIndex];
            }

            let conditionalProps = listItem
                ? {
                      removeItem: () => {
                          removeProductFromList(
                              list.id,
                              listItem.sku,
                              listItem.quantity,
                          );
                      },
                  }
                : null;

            return (
                <ProductItem
                    product={{
                        data: item,
                        sku: item.productInformation.gtin,
                        quantity: listItem?.quantity,
                    }}
                    setQuantity={quantity => {
                        setProductQuantity(
                            list.id,
                            item.productInformation.gtin,
                            quantity,
                        );
                    }}
                    onPress={e => selectProduct(e)}
                    isLoading={isLoading}
                    index={index}
                    {...conditionalProps}
                />
            );
        }
    }

    return (
        <View>
            <FlatList
                data={isLoading ? skeletons : Object.values(productDetails)}
                style={styles.container}
                renderItem={renderProductItems}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});
