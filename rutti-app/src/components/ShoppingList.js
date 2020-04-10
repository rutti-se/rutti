import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import ShoppingListItem from './ShoppingListItem';
export default ({selectedProduct, user, logout}, props) => {
    const product = {
        productInformation: {
            gtin: '7310867541046',
            name: 'Färskost Crème Svensk Karaktär 125g',
            brand: 'Allerum',
            imageUrl:
                'https://assets.icanet.se/t_product_large_v1,f_auto/7310867541046.jpg',
            description:
                'Konsument önskar att det fanns en färskost som hade en intensivare smak av ost önskat en ost med samma naturlighet och fräschör som färskost men med en intensivare ostsmak. Allerum Crème är Sveriges första färskost med en rik och intensiv smak av lagrad hårdost! Allerum Crème är ett bekvämt och enkelt sätt att få ett smakrikt och lyxigt pålägg. En Allerum i bredbart format helt enkelt.',
            salesUnit: 'st',
            originCountry: null,
            ingredientInfo:
                'Allerum prästost (MJÖLK, salt, syrningskultur, löpe), färskost (pastöriserad MJÖLK och GRÄDDE, mjölksyra, SMÖR, salt, naturlig arom, konserveringsmedel (sorbinsyra), surhetsreglerande medel (natriumcitrat)).  Allerum prästost 32 %.',
            weight: '138',
            nutritionalInfo:
                'Energi (kcal) 230 kcal, Energi (kJ) 960 kJ, Fett 20 g, Varav mättat fett 12 g, Kolhydrater 1.8 g, Varav socker 1.8 g, Protein 11 g, Salt 0.9 g',
        },
        storeInformation: [
            {
                store: {
                    retailer: 'ica',
                    storeId: '09808',
                },
                priceInformation: {
                    price: 18.95,
                    comparePrice: 151.6,
                    comparePriceUnit: 'pkg',
                    isPromotion: false,
                    currentPromotions: [],
                },
            },
            {
                store: {
                    retailer: 'citygross',
                    storeId: '307',
                },
                priceInformation: {
                    price: 16.5,
                    comparePrice: 132,
                    comparePriceUnit: 'st',
                    isPromotion: null,
                    currentPromotions: [],
                },
            },
        ],
    };
    return (
        <View
            style={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 1000,
            }}>
            <View style={{height: '100%'}}>
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <View>
                            <ShoppingListItem product={product} />
                            <ShoppingListItem product={product} />
                            <ShoppingListItem product={product} />
                            <ShoppingListItem product={product} />
                            <ShoppingListItem product={product} />
                            <ShoppingListItem product={product} />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        </View>
    );
};
