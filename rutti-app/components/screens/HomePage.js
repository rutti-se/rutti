import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../../assets/colors';
import {BottomDrawer} from '../BottomDrawer/BottomDrawer';
import InputField from '../InputField';
import findStores from '../../api/findStores';
import searchProducts from '../../api/searchProducts';
import {Dimensions} from 'react-native';
import useDebounce from '../useDebounce';
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
    // State and setter for search results
    const [results, setResults] = useState([]);
    // State for search status (whether there is a pending API request)
    const [isSearching, setIsSearching] = useState(false);
    // S
    const [products, setProducts] = useState([]);

    const [recipes, setRecipes] = useState([]);
    // Now we call our hook, passing in the current searchTerm value.
    // The hook will only return the latest value (what we passed in) ...
    // ... if it's been more than 500ms since it was last called.
    // Otherwise, it will return the previous value of searchTerm.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            if (debouncedSearchTerm) {
                // Set isSearching state
                setIsSearching(true);
                // Fire off our API call
                searchProducts({q: debouncedSearchTerm, stores}).then(
                    result => {
                        setIsSearching(false);
                        const {products, recipes} = result;
                        setProducts(products);
                        setRecipes(recipes);
                        console.log(result);
                    },
                );
            } else {
                setResults([]);
            }
        },
        // This is the useEffect input array
        // Our useEffect function will only execute if this value changes ...
        // ... and thanks to our hook it will only change if the original ...
        // value (searchTerm) hasn't changed for more than 500ms.
        [debouncedSearchTerm],
    );

    function onTextChange(event) {
        if (event.text && event.text.length > 2) {
            setSearchTerm(event.text);
        }
    }

    function onTextChange(event) {
        if (event.text && event.text.length > 2) {
            setSearchTerm(event.text);
        }
    }

    return (
        <View style={styles.container}>
            <InputField onChange={onTextChange}></InputField>
            <BottomDrawer
                style={{borderTopEndRadius: 100}}
                backgroundColor={COLORS.GRAY_2}
                containerHeight={DEVICE.height / 1.2}
                downDisplay={DEVICE.height / 1.4}
                roundedEdges={true}
                shadow={true}
                startUp={false}>
                <Text>Hello</Text>
            </BottomDrawer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY,
        padding: 50,
    },
});
