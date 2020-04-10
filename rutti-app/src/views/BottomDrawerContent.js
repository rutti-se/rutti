import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import AddItemView from '../components/shopping-list/AddItemView';
import Button from '../components/common/Button';
import ShoppingList from '../components/shopping-list/ShoppingList';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const containerHeight = SCREEN_HEIGHT / 1.3;

export default ({selectedProduct, user, logout}, props) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {}, [user]);

    useEffect(() => {
        setProduct(selectedProduct);
    }, [selectedProduct]);

    return (
        <View
            style={{
                flexDirection: 'column',
                marginTop: 10,
                height: containerHeight,
            }}>
            <AddItemView
                addToList={e => console.log('Add:', e)}
                product={product}
            />
            <View style={{flex: 1 / 2}}>
                <ShoppingList editItem={e => setProduct(e)} />
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
