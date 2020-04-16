import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import useDebounce from '../utilities/useDebounce';
import InputField from '../components/common/InputField';
import searchProducts from '../api/searchProducts';
import {Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-snap-carousel';
import COLOR from '../../assets/colors';
import SearchResultList from '../components/search-results/SearchResultList';
import SearchRecipeList from '../components/search-results/SearchRecipeList';

const PRODUCT_RESULTS_VIEW = 0;
const RECIPE_RESULTS_VIEW = 1;

export default ({stores, list, setSelectedProduct}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [products, setProducts] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedResultView, setSelectedResultView] = useState(
        PRODUCT_RESULTS_VIEW,
    );
    const carouselRef = useRef(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearchTerm) {
            console.log('searching', debouncedSearchTerm);
            setIsSearching(true);
            searchProducts({q: debouncedSearchTerm, stores})
                .then(({products, recipes}) => {
                    setProducts(products);
                    setRecipes(recipes);
                })
                .catch(error => console.log('search error: ', error))
                .finally(() => {
                    setIsSearching(false);
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

    return (
        <>
            <View style={{paddingHorizontal: 10}}>
                <InputField
                    placeholder={'Sök efter produkter'}
                    onChangeText={text => onTextChange(text)}
                />

                <View
                    style={{padding: 10, paddingTop: 20, flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={{flexDirection: 'row'}}
                        onPressOut={() =>
                            carouselRef.current.snapToItem(
                                PRODUCT_RESULTS_VIEW,
                                true,
                                true,
                            )
                        }>
                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    opacity:
                                        selectedResultView ===
                                        PRODUCT_RESULTS_VIEW
                                            ? 1
                                            : 0.6,
                                },
                            ]}>
                            Produkter
                        </Text>
                        <Text
                            style={[
                                styles.countPill,
                                {
                                    opacity:
                                        selectedResultView ===
                                        PRODUCT_RESULTS_VIEW
                                            ? 1
                                            : 0.6,
                                },
                            ]}>
                            {products.length || 0}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flexDirection: 'row', marginLeft: 10}}
                        onPressOut={() =>
                            carouselRef.current.snapToItem(
                                RECIPE_RESULTS_VIEW,
                                true,
                                true,
                            )
                        }>
                        <Text
                            style={[
                                styles.subtitle,
                                {
                                    opacity:
                                        selectedResultView ===
                                        RECIPE_RESULTS_VIEW
                                            ? 1
                                            : 0.6,
                                },
                            ]}>
                            Recept
                        </Text>
                        <Text
                            style={[
                                styles.countPill,
                                {
                                    opacity:
                                        selectedResultView ===
                                        RECIPE_RESULTS_VIEW
                                            ? 1
                                            : 0.6,
                                },
                            ]}>
                            {recipes?.recipes?.length || 0}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Carousel
                    ref={carouselRef}
                    data={[PRODUCT_RESULTS_VIEW, RECIPE_RESULTS_VIEW]}
                    renderItem={({item}) => {
                        return (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                }}>
                                {item === PRODUCT_RESULTS_VIEW &&
                                    (products.length > 0 ? (
                                        <>
                                            <SearchResultList
                                                productSkus={products}
                                                list={list}
                                                stores={stores}
                                                setSelectedProduct={
                                                    setSelectedProduct
                                                }
                                            />
                                        </>
                                    ) : (
                                        <LottieView
                                            source={require('../../assets/animations/cup-of-tea.json')}
                                            resizeMode={'contain'}
                                            autoPlay
                                            loop
                                            height={'65%'}
                                            width={'100%'}
                                        />
                                    ))}

                                {item === RECIPE_RESULTS_VIEW &&
                                    (recipes?.recipes?.length > 0 ? (
                                        <SearchRecipeList
                                            recipes={recipes.recipes}
                                        />
                                    ) : (
                                        <View
                                            style={{
                                                height: '100%',
                                                width: '80%',
                                            }}>
                                            <LottieView
                                                source={require('../../assets/animations/recipe.json')}
                                                resizeMode={'contain'}
                                                autoPlay
                                                loop
                                                height={'60%'}
                                                width={'100%'}
                                            />
                                        </View>
                                    ))}
                            </View>
                        );
                    }}
                    onBeforeSnapToItem={index => setSelectedResultView(index)}
                    sliderWidth={DEVICE.width}
                    itemWidth={DEVICE.width}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
    },
    countPill: {
        marginLeft: 5,
        backgroundColor: COLOR.PRIMARY,
        color: COLOR.WHITE,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        overflow: 'hidden',
    },
});
