import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AddItemView from '../components/AddItemView';
import Button from '../components/Button';
export default ({selectedProduct, logout}, props) => {
    return (
        <View style={{flexDirection: 'column', marginTop: 10}}>
            <AddItemView
                addToList={e => console.log('Add:', e)}
                product={selectedProduct}
            />
            <Button
                text="Logga ut"
                shadow={true}
                type={'primary'}
                onPress={logout}
            />
        </View>
    );
};
