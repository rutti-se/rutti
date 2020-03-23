import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import COLORS from '../../assets/colors';
import {BottomDrawer} from '../components/BottomDrawer/BottomDrawer';
import InputField from '../components/InputField';
import findStores from '../api/findStores';
import searchProducts from '../api/searchProducts';
import useDebounce from '../utilities/useDebounce';
import SelectStorePage from './SelectStorePage';
import ProductPage from './ProductPage';
import FadeInView from '../components/animations/FadeInView';

import {Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');

const stores = [
    {
        retailer: 'ica',
        storeId: '09808',
    },
    {
        retailer: 'coop',
        storeId: '257300',
    },
    {
        retailer: 'citygross',
        storeId: '704',
    },
];

export default () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [results, setResults] = useState([]);

    const [isSearching, setIsSearching] = useState(false);

    const [products, setProducts] = useState([]);

    const [recipes, setRecipes] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);

            searchProducts({q: debouncedSearchTerm, stores}).then(result => {
                setIsSearching(false);
                const {products, recipes} = result;
                setProducts(products);
                setRecipes(recipes);
            });
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]);

    function onTextChange(text) {
        if (text && text.length > 2) {
            setSearchTerm(text);
        }
    }

    function renderProductPage() {
        return (
            products &&
            products.length > 0 &&
            stores && (
                <ProductPage
                    stores={stores}
                    productSkus={products}></ProductPage>
            )
        );
    }

    return (
        <View style={styles.container}>
            <InputField onChangeText={text => onTextChange(text)}></InputField>
            {/*  <SelectStorePage /> */}
            <View
                style={[{marginBottom: DEVICE.height / 4.8}, {marginTop: 10}]}>
                {renderProductPage()}
            </View>
            <BottomDrawer
                style={{borderTopEndRadius: 100}}
                backgroundColor={COLORS.GRAY_2}
                containerHeight={DEVICE.height / 1.2}
                downDisplay={DEVICE.height / 1.4}
                roundedEdges={true}
                shadow={true}
                startUp={false}
                dragBar={true}>
                <Text>Hello</Text>
            </BottomDrawer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY,
        padding: 20,
    },
});
