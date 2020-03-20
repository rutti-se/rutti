import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import InputField from '../components/InputField';
import getProducts from '../api/getProducts';
import COLORS from '../../assets/colors';
import ProductItem from '../components/ProductItem';

export default ({productSkus, stores}) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        if (productSkus && productSkus.length > 0 && stores) {
            setProductDetails([]);
            getProducts({stores, productSkus}).then(result => {
                setProductDetails(result);
            });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function renderProductItems({index}) {
        if (productDetails[index].status !== 400) {
            return (
                <ProductItem
                    productInfo={productDetails[index].data.productInformation}
                    storeInfo={
                        productDetails[index].data.storeInformation
                    }></ProductItem>
            );
        }
    }

    return (
        <View>
            <Text>Visar sökresultat</Text>
            <FlatList
                data={productDetails}
                style={styles.container}
                renderItem={renderProductItems}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
    },
});
