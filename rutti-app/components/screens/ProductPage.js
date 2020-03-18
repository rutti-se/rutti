import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputField from '../InputField';
import getProducts from '../../api/getProducts';
import COLORS from '../../assets/colors';

export default ({productSkus, stores}) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        if (productSkus && productSkus.length > 0 && stores) {
            console.log('Skus: ', productSkus);
            getProducts({stores, productSkus}).then(result => {
                setProductDetails(result);
            });
        }
    }, [stores, productSkus]); //När denna är tom körs det en gång

    function renderProductItems() {
        productDetails.map(detail =>
            console.log(detail.data.productInformation),
        );
    }
    return (
        <View>
            {/* {productSkus.map(sku => (
                <>
                    <Text>{sku}</Text>
                </>
            ))}
 */}

            {renderProductItems()}
        </View>
    );
};
