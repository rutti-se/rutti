import React, {useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import AddItemView from '../components/shopping-list/AddItemView';
import Button from '../components/common/Button';
import RoundButton from '../components/common/RoundButton';

import ShoppingList from '../components/shopping-list/ShoppingList';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const containerHeight = SCREEN_HEIGHT / 1.3;
import FadeInView from '../components/animations/FadeInView';
import COLOR from '../../assets/colors';
import {addProductToList} from '../api/firebaseHelpers';

export default ({selectedProduct, user, list, stores}, props) => {
    let [productCount, setProductCount] = useState(0);
    let [productToAdd, setProductToAdd] = useState(null);

    useEffect(() => {
        try {
            if (list && list.products) {
                let count = 0;
                list.products.forEach(product => (count += product.quantity));
                setProductCount(count);
            }
        } catch (error) {
            console.log(error);
        }
    }, [list]);

    useEffect(() => {
        setProductToAdd(selectedProduct);
    }, [selectedProduct]);

    return (
        <View
            style={{
                flexDirection: 'column',
                marginTop: 10,
                height: containerHeight,
            }}>
            {productToAdd ? (
                <AddItemView
                    addToList={({sku, quantity}) => {
                        addProductToList(list.id, sku, quantity);
                        setProductToAdd(null);
                    }}
                    cancel={() => setProductToAdd(null)}
                    product={productToAdd}
                />
            ) : (
                <View style={styles.container}>
                    {list && (
                        <FadeInView duration={500}>
                            <View style={styles.contentContainer}>
                                <Text style={styles.text}>{list.name}</Text>

                                <RoundButton
                                    style={{alignSelf: 'flex-end'}}
                                    text={productCount}
                                />
                            </View>
                        </FadeInView>
                    )}
                </View>
            )}

            <View style={{flex: 3}}>
                <ShoppingList list={list} stores={stores} />
            </View>
            <View style={{flex: 1 / 2, justifyContent: 'flex-end'}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 50,
        alignSelf: 'center',
        marginBottom: 40,
    },
    contentContainer: {
        padding: 5,
        borderRadius: 25,
        backgroundColor: COLOR.GRAY_2,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        justifyContent: 'space-between',

        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
    },
});
