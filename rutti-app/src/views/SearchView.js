import React, {useEffect, useState, useRef} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    ColorPropType,
} from 'react-native';
import getProducts from '../api/getProducts';
import ProductItem from '../components/ProductItem';
import useDebounce from '../utilities/useDebounce';
import InputField from '../components/common/InputField';
import searchProducts from '../api/searchProducts';
import {Dimensions} from 'react-native';
import {
    removeProductFromList,
    setProductQuantity,
} from '../api/firebaseHelpers';
const DEVICE = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import COLOR from '../../assets/colors';

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
                .finally(() => setIsSearching(false));
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
        <View>
            <View style={{paddingHorizontal: 10}}>
                <InputField
                    placeholder={'Sök efter produkter'}
                    onChangeText={text => onTextChange(text)}
                />

                <View style={{padding: 10, flexDirection: 'row'}}>
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
                            {recipes.totalFound || 0}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Carousel
                    ref={carouselRef}
                    data={[PRODUCT_RESULTS_VIEW, RECIPE_RESULTS_VIEW]}
                    renderItem={
                        ({item}) => {
                            console.log(item);
                            return (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        width: '100%',
                                    }}>
                                    {item === PRODUCT_RESULTS_VIEW && (
                                        <LottieView
                                            source={require('../../assets/animations/cup-of-tea.json')}
                                            autoPlay
                                            loop
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    )}
                                    {item === RECIPE_RESULTS_VIEW && (
                                        <LottieView
                                            source={require('../../assets/animations/recipe.json')}
                                            resizeMode={'contain'}
                                            autoPlay
                                            loop
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    )}
                                </View>
                            );
                        }
                        //     style={{
                        //         width: '100',
                        //         height: '100%',
                        //         paddingHorizontal: 10,
                        //     }}>
                        //     <View
                        //         style={{
                        //             justifyContent: 'center',
                        //             alignItems: 'center',
                        //         }}>

                        //     </View>
                        //     {/* {item === RECIPE_RESULTS_VIEW &&
                        //         (products.length > 0 ? (
                        //             <Text>Recept</Text>
                        //         ) : (
                        //             <View
                        //                 style={{
                        //                     justifyContent: 'center',
                        //                     alignItems: 'center',
                        //                 }}>
                        //                 <LottieView
                        //                     source={require('../../assets/animations/recipe.json')}
                        //                     autoPlay
                        //                     loop
                        //                     height={500}
                        //                     width={'100%'}
                        //                 />
                        //             </View>
                        //         ))} */}
                        // </View>
                    }
                    onBeforeSnapToItem={index => setSelectedResultView(index)}
                    sliderWidth={DEVICE.width}
                    itemWidth={DEVICE.width}
                />
            </View>

            {/* {products.length > 0 ? (
                <></>
            ) : (
                // <ProductPage
                //     list={list}
                //     stores={stores}
                //     productSkus={products}
                //     selectProduct={e => setSelectedProduct(e)}
                // />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <LottieView
                        source={require('../../assets/animations/recipe.json')}
                        autoPlay
                        loop
                        height={500}
                        width={'100%'}
                    />
                </View>
            )} */}
        </View>
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
        borderRadius: 20,
    },
    countPillInactive: {
        marginLeft: 5,
        backgroundColor: COLOR.GRAY_4,
        color: COLOR.WHITE,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
});
