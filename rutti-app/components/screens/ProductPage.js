import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import InputField from '../InputField';
import getProducts from '../../api/getProducts';
import COLORS from '../../assets/colors';
import ProductItem from '../ProductItem';

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

    renderProductItems = ({index}) => {
        if (productDetails[index].status !== 400) {
            return (
                <ProductItem
                    productInfo={productDetails[index].data.productInformation}
                    storeInfo={
                        productDetails[index].data.storeInformation
                    }></ProductItem>
            );
        }
    };

    return (
        <FlatList
            data={productDetails}
            style={styles.container}
            renderItem={this.renderProductItems}
            numColumns={2}></FlatList>
    );
};

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
    },
});
