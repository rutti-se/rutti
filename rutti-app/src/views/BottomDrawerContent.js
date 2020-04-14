import React, {useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import AddItemView from '../components/shopping-list/AddItemView';
import Button from '../components/common/Button';
import RoundButton from '../components/common/RoundButton';
import {Icon} from '../../assets/icomoon';
import {TouchableOpacity} from 'react-native-gesture-handler';

import ShoppingList from '../components/shopping-list/ShoppingList';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const containerHeight = SCREEN_HEIGHT / 1.3;
import FadeInView from '../components/animations/FadeInView';
import COLOR from '../../assets/colors';
import {addProductToList} from '../api/firebaseHelpers';
import SelectShoppingList from '../components/shopping-list/SelectShoppingList';

export default ({selectedProduct, user, list, stores}, props) => {
    let [productCount, setProductCount] = useState(0);
    let [productToAdd, setProductToAdd] = useState(null);
    let [selectListVisible, setSelectListVisible] = useState(false);

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
                                <TouchableOpacity
                                    onPressOut={() =>
                                        setSelectListVisible(true)
                                    }>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={[
                                                styles.text,
                                                {marginRight: 5},
                                            ]}>
                                            {list.name}
                                        </Text>
                                        <Icon
                                            name={'chevron-down'}
                                            size={15}
                                            color={'white'}
                                        />
                                    </View>
                                </TouchableOpacity>

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
            <SelectShoppingList
                selectListVisible={selectListVisible}
                setSelectListVisible={setSelectListVisible}
            />
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
