import React, {useEffect, useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ShoppingListItem from './ShoppingListItem';
import getProducts from '../../api/getProducts';
import COLOR from '../../../assets/colors';
import {
    removeProductFromList,
    setProductQuantity,
} from '../../api/firebaseHelpers';
import LinearGradient from 'react-native-linear-gradient';
import PickupList from './PickupList';
import Button from '../common/Button';
import FadeInView from '../animations/FadeInView';

let cacheMap = new Map();

export default ({list, stores}, props) => {
    let [products, setProducts] = useState([]);
    const [pickupListVisible, setPickupListVisible] = useState(false);

    useEffect(() => {
        if (list && stores) {
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
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 1000,
            }}>
            {pickupListVisible ? (
                <FadeInView>
                    <PickupList
                        products={products}
                        stores={stores}
                        list={list}
                        close={() => setPickupListVisible(false)}
                    />
                </FadeInView>
            ) : (
                <FadeInView>
                    <View
                        style={{
                            height: '100%',
                            width: '95%',
                            alignSelf: 'center',
                        }}>
                        <ScrollView>
                            <TouchableWithoutFeedback>
                                <View
                                    style={{
                                        paddingVertical: 10,
                                        justifyContent: 'center',
                                    }}>
                                    {products.map(product => (
                                        <ShoppingListItem
                                            setQuantity={quantity =>
                                                setProductQuantity(
                                                    list.id,
                                                    product.sku,
                                                    quantity,
                                                )
                                            }
                                            removeItem={() =>
                                                removeProductFromList(
                                                    list.id,
                                                    product.sku,
                                                    product.quantity,
                                                )
                                            }
                                            product={product}
                                        />
                                    ))}
                                    <Button
                                        text="Hitta bästa rutt"
                                        type={'primary'}
                                        inAnimatedView={true}
                                        onPress={() => {
                                            setPickupListVisible(true);
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                        <LinearGradient
                            style={{
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                height: 10,
                            }}
                            colors={[
                                'rgba(51, 51, 51, 1)',
                                'rgba(51, 51, 51, 0)',
                            ]}
                            pointerEvents={'none'}
                        />
                        <LinearGradient
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: 10,
                            }}
                            colors={[
                                'rgba(51, 51, 51, 0)',
                                'rgba(51, 51, 51, 1)',
                            ]}
                            pointerEvents={'none'}
                        />
                    </View>
                </FadeInView>
            )}
        </View>
    );
};
