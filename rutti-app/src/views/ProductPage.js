import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import getProducts from '../api/getProducts';
import ProductItem from '../components/ProductItem';
import {Dimensions} from 'react-native';

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
                    if (res.status !== '400') {
                        newDetails[res.data.productInformation.gtin] = res.data;
                    }
                });

                setProductDetails(newDetails);
                setIsLoading(false);
            });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function renderProductItems({item}) {
        if (item && list && item.productInformation) {
            let index = list.products.findIndex(
                e => e.sku === item?.productInformation.gtin,
            );

            let listItem;
            if (index >= 0) {
                listItem = list.products[index];
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
                    product={listItem ? listItem : item}
                    setQuantity={quantity =>
                        setProductQuantity(list.id, product.sku, quantity)
                    }
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
