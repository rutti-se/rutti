import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import COLORS from '../../assets/colors';
import {BottomDrawer} from '../components/common/BottomDrawer';
import InputField from '../components/common/InputField';
import findStores from '../api/findStores';
import searchProducts from '../api/searchProducts';
import useDebounce from '../utilities/useDebounce';
import SelectStorePage from './SelectStorePage';
import ProductPage from './ProductPage';
import FadeInView from '../components/animations/FadeInView';
import LottieView from 'lottie-react-native';
import Button from '../components/common/Button';
import {firebase} from '@react-native-firebase/auth';
import {Dimensions} from 'react-native';
import * as RootNavigation from '../views/RootNavigation';
import AddItemView from '../components/shopping-list/AddItemView';
import BottomDrawerContent from '../views/BottomDrawerContent';
const DEVICE = Dimensions.get('window');
import {getStores, getCurrentListRef} from '../api/firebaseHelpers';

export default () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [selectedProduct, setSelectedProduct] = useState(null);
    let [user, setUser] = useState(null);
    let [stores, setStores] = useState(null);
    let [list, setList] = useState(null);

    useEffect(() => {
        let unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            }
            unsubscribe();
        });
    }, []);

    useEffect(() => {
        if (user) {
            console.log(user.displayName);
            getStores(user.displayName)
                .then(stores => {
                    setStores(stores);
                })
                .catch(error => console.log(error));
            getCurrentListRef(user.displayName).then(listRef =>
                listRef.onSnapshot(
                    snapshot => {
                        console.log('id:', snapshot.id);
                        let listObject = snapshot.data();
                        listObject.id = snapshot.id;
                        setList(listObject);
                    },
                    () => 'list update error',
                ),
            );
        }
    }, [user]);

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
                    productSkus={products}
                    selectProduct={e => setSelectedProduct(e)}
                />
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
            <InputField onChangeText={text => onTextChange(text)} />
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
                <BottomDrawerContent
                    list={list}
                    stores={stores}
                    logout={() => logout()}
                    selectedProduct={selectedProduct}
                />
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
