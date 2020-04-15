import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import getProducts from '../../api/getProducts';
import SearchResultItem from './SearchResultItem';
import {Dimensions} from 'react-native';
import {
    removeProductFromList,
    setProductQuantity,
} from '../../api/firebaseHelpers';
const DEVICE = Dimensions.get('window');

export default ({productSkus, stores, setSelectedProduct, list}) => {
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

            getProducts({stores, productSkus})
                .then(result => {
                    result.map(res => {
                        if (
                            res.status !== '400' &&
                            res.data &&
                            res.data.productInformation
                        ) {
                            newDetails[res.data.productInformation.gtin] =
                                res.data;
                        }
                    });
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setProductDetails(newDetails);
                    setIsLoading(false);
                });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function renderProductItems({item, index}) {
        let listQuantity = 0;
        let conditionalProps;

        if (item && list && item?.productInformation) {
            let itemIndex = list.products.findIndex(
                e => e.sku === item?.productInformation.gtin,
            );

            if (itemIndex >= 0)
                listQuantity = list.products[itemIndex].quantity;

            conditionalProps =
                listQuantity > 0
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
        }

        return (
            <>
                <SearchResultItem
                    product={{
                        data: item,
                        sku: item.productInformation.gtin,
                        quantity: listQuantity,
                    }}
                    setQuantity={quantity => {
                        setProductQuantity(
                            list.id,
                            item.productInformation.gtin,
                            quantity,
                        );
                    }}
                    onPress={e => setSelectedProduct(e)}
                    isLoading={isLoading}
                    index={index}
                    {...conditionalProps}
                />
                {index === productDetails?.length - 1 && (
                    <View style={{height: 50}} />
                )}
            </>
        );
    }

    return (
        <View style={{width: '100%', paddingHorizontal: 10}}>
            <FlatList
                data={Object.values(productDetails)}
                style={styles.resultList}
                renderItem={renderProductItems}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    resultList: {paddingBottom: 40},
});
