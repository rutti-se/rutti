import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import AddItemView from '../components/shopping-list/AddItemView';
import Button from '../components/common/Button';
import ShoppingList from '../components/shopping-list/ShoppingList';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const containerHeight = SCREEN_HEIGHT / 1.3;

export default ({selectedProduct, user, logout}, props) => {
    useEffect(() => {}, [user]);

    return (
        <View
            style={{
                flexDirection: 'column',
                marginTop: 10,
                height: containerHeight,
            }}>
            <AddItemView
                addToList={e => console.log('Add:', e)}
                product={selectedProduct}
            />
            <View style={{flex: 1 / 2}}>
                <ShoppingList />
            </View>
            <View style={{flex: 1 / 2, justifyContent: 'flex-end'}}>
                <Button
                    text="Logga ut"
                    shadow={true}
                    type={'primary'}
                    onPress={logout}
                />
            </View>
        </View>
    );
};
