import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ShoppingListItem from './ShoppingListItem';
import getProducts from '../../api/getProducts';
import COLOR from '../../../assets/colors';
import {
    removeProductFromList,
    setProductQuantity,
} from '../../api/firebaseHelpers';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Button from '../common/Button';
import RoundButton from '../common/RoundButton';

import {TouchableOpacity} from 'react-native-gesture-handler';

const NO_OPTION_SELECTED = 0;
const OPTION_SUSTAINABLE = 1;
const OPTION_ECONOMICAL = 2;

export default ({stores, products, close}, props) => {
    const [pickupOption, setPickupOption] = useState(NO_OPTION_SELECTED);
    const [listVisible, setListVisible] = useState(false);

    useEffect(() => {
        console.log('products changed');
    }, [products, stores]);

    return (
        <View style={{height: '100%'}}>
            {!listVisible ? (
                <View style={{height: '100%'}}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}>
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 20,
                                color: 'white',
                                fontFamily: 'Montserrat-Bold',
                            }}>
                            Hur vill du handla?
                        </Text>
                        <View style={{position: 'absolute', top: 0, left: 10}}>
                            <RoundButton
                                icon={'arrow-left'}
                                iconColor={COLOR.WHITE}
                                color={COLOR.PRIMARY}
                                inAnimatedView={true}
                                onPress={close}
                            />
                        </View>
                    </View>
                    <Text
                        style={{
                            width: '100%',
                            marginTop: 20,
                            paddingHorizontal: '20%',
                            textAlign: 'center',
                            fontSize: 14,
                            color: COLOR.GRAY_5,
                            fontFamily: 'Montserrat',
                            marginBottom: 50,
                        }}>
                        I en butik, för att vara effektiv? Eller kanske i flera,
                        för att spara pengar?
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: '50%',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor:
                                    pickupOption === OPTION_SUSTAINABLE
                                        ? COLOR.PRIMARY
                                        : COLOR.SECONDARY,
                                borderRadius: 10,
                                marginHorizontal: 10,
                            }}>
                            <TouchableOpacity
                                style={{height: '100%', width: '100%'}}
                                onPressOut={() =>
                                    setPickupOption(OPTION_SUSTAINABLE)
                                }>
                                <View
                                    style={{
                                        marginTop: 20,
                                        height: '80%',
                                        width: '100%',
                                        alignItems: 'center',
                                    }}>
                                    <LottieView
                                        source={require('../../../assets/animations/sustainable.json')}
                                        resizeMode={'contain'}
                                        autoPlay
                                        loop
                                        height={'70%'}
                                        width={'100%'}
                                    />
                                </View>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        paddingVertical: 15,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color:
                                            pickupOption === OPTION_SUSTAINABLE
                                                ? COLOR.WHITE
                                                : COLOR.GRAY_1,
                                        fontFamily: 'Montserrat-Bold',
                                    }}>
                                    Miljösmart
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor:
                                    pickupOption === OPTION_ECONOMICAL
                                        ? COLOR.PRIMARY
                                        : COLOR.SECONDARY,
                                borderRadius: 10,
                                marginHorizontal: 10,
                            }}>
                            <TouchableOpacity
                                style={{height: '100%', width: '100%'}}
                                onPressOut={() =>
                                    setPickupOption(OPTION_ECONOMICAL)
                                }>
                                <View
                                    style={{
                                        marginTop: 15,
                                        height: '80%',
                                        width: '100%',
                                        alignItems: 'center',
                                    }}>
                                    <LottieView
                                        source={require('../../../assets/animations/economical.json')}
                                        resizeMode={'contain'}
                                        autoPlay
                                        loop
                                        height={'70%'}
                                        width={'100%'}
                                    />
                                </View>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        paddingVertical: 15,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color:
                                            pickupOption === OPTION_ECONOMICAL
                                                ? COLOR.WHITE
                                                : COLOR.GRAY_1,
                                        fontFamily: 'Montserrat-Bold',
                                    }}>
                                    Sparsamt
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop: 100, marginHorizontal: 10}}>
                        <Button
                            disabled={pickupOption === NO_OPTION_SELECTED}
                            text="Fortsätt"
                            type={'primary'}
                            inAnimatedView={true}
                            onPress={() => {
                                setListVisible(true);
                            }}
                        />
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        zIndex: 1000,
                    }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}>
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 20,
                                color: 'white',
                                fontFamily: 'Montserrat-Bold',
                            }}>
                            {pickupOption === OPTION_SUSTAINABLE &&
                                'Miljösmart'}
                            {pickupOption === OPTION_ECONOMICAL && 'Sparsamt'}
                        </Text>
                        <View style={{position: 'absolute', top: 0, left: 10}}>
                            <RoundButton
                                icon={'arrow-left'}
                                iconColor={COLOR.WHITE}
                                color={COLOR.PRIMARY}
                                inAnimatedView={true}
                                onPress={() => setListVisible(false)}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            height: '100%',
                            marginTop: 20,
                            width: '95%',
                            alignSelf: 'center',
                        }}>
                        <ScrollView>
                            <TouchableWithoutFeedback>
                                <View
                                    style={{
                                        paddingVertical: 10,
                                        justifyContent: 'center',
                                    }}>
                                    {products.map(product => (
                                        <ShoppingListItem
                                            setQuantity={quantity =>
                                                setProductQuantity(
                                                    list.id,
                                                    product.sku,
                                                    quantity,
                                                )
                                            }
                                            removeItem={() =>
                                                removeProductFromList(
                                                    list.id,
                                                    product.sku,
                                                    product.quantity,
                                                )
                                            }
                                            product={product}
                                        />
                                    ))}
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                        <LinearGradient
                            style={{
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                height: 10,
                            }}
                            colors={[
                                'rgba(51, 51, 51, 1)',
                                'rgba(51, 51, 51, 0)',
                            ]}
                            pointerEvents={'none'}
                        />
                        <LinearGradient
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: 10,
                            }}
                            colors={[
                                'rgba(51, 51, 51, 0)',
                                'rgba(51, 51, 51, 1)',
                            ]}
                            pointerEvents={'none'}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        left: 10,
        top: 0,
    },
});
