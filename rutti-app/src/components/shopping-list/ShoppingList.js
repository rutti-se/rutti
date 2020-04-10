import React, {useEffect, useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ShoppingListItem from './ShoppingListItem';
import getProducts from '../../api/getProducts';
let cacheMap = new Map();

export default ({list, stores}, props) => {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        if (list && stores) {
            console.log(list.products);
            setProducts(list.products);
            let productsWithoutData = [];
            list.products.forEach((product, index) => {
                if (cacheMap.has(product.sku)) {
                    product.data = cacheMap.get(product.sku);
                } else {
                    productsWithoutData.push(product.sku);
                }
            });
            getProducts({stores, productSkus: productsWithoutData})
                .then(result => {
                    if (result) {
                        result.forEach(productResult => {
                            cacheMap.set(
                                productResult.data.productInformation.gtin,
                                productResult.data,
                            );
                        });
                    }
                    let productList = [];
                    list.products.forEach((product, index) => {
                        if (cacheMap.has(product.sku)) {
                            product.data = cacheMap.get(product.sku);
                            productList.push(product);
                        }
                    });
                    setProducts(productList);
                })
                .catch(error => console.log(error));
        }
    }, [list]);

    return (
        <View
            style={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 1000,
            }}>
            <View style={{height: '100%'}}>
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <View>
                            {products.map(product => (
                                <ShoppingListItem product={product} />
                            ))}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        </View>
    );
};
