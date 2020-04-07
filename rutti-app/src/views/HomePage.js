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
import LottieView from 'lottie-react-native';
import Button from '../components/Button';
import {firebase} from '@react-native-firebase/auth';
import {Dimensions} from 'react-native';
import * as RootNavigation from '../views/RootNavigation';
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
        storeId: '307',
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

    function logout() {
        firebase
            .auth()
            .signOut()
            .then(() => RootNavigation.replace('SignIn'));
    }

    return (
        <View style={styles.container}>
            <InputField onChangeText={text => onTextChange(text)}></InputField>
            {/*  <SelectStorePage /> */}
            <View
                style={[{marginBottom: DEVICE.height / 4.8}, {marginTop: 10}]}>
                {renderProductPage()}
            </View>
            {!results.length > 0 && (
                <LottieView
                    source={require('../../assets/animations/search.json')}
                    autoPlay
                    loop
                    style={{
                        height: 250,
                        width: 250,
                    }}
                />
            )}

            <BottomDrawer>
                <Text>Hello</Text>
                <Button
                    text="Logga ut"
                    shadow={true}
                    type={'secondary'}
                    onPress={() => {
                        logout();
                    }}></Button>
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
