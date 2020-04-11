import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import COLORS from '../../../assets/colors';
import Img from '../common/Img';
import Button from '../common/Button';
import RoundButton from '../common/RoundButton';
import AddItemView from '../../components/shopping-list/AddItemView';
import Spinner from '../common/Spinner';
import calcBestPrice from '../../utilities/calcBestPrice';
import Popup from '../common/Popup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from '../../../assets/icomoon';
import DetailedProduct from './DetailedProduct';
import filterStores from '../../utilities/filterStores';

export default ({product, removeItem}, props) => {
    const [lowestPrice, setLowestPrice] = useState(null);
    const [productName, setProductName] = useState(null);
    const [inStores, setInStores] = useState(null);
    const [pickedUp, setPickedUp] = useState(false);

    const [popupVisible, setPopupVisible] = useState(false);
    useEffect(() => {
        let name = '';
        product.data && (name = product.data.productInformation.name);
        if (name.length > 25) {
            name = name.substring(0, 25) + '...';
        }
        setProductName(name);
        if (product.data) {
            setLowestPrice(calcBestPrice(product.data.storeInformation));
            setInStores(filterStores(product.data.storeInformation));
        }
    }, [product.data]);

    function renderStores() {
        return (
            <View style={styles.storeContainer}>
                {inStores.map(store => {
                    if (store.isSelected) {
                        return (
                            <View style={{width: 60, marginRight: 5}}>
                                <Button
                                    disabled={true}
                                    text={
                                        store.retailer === 'citygross'
                                            ? 'c.g'
                                            : store.retailer
                                    }
                                    extraSmall={true}
                                    backgroundColor={COLORS[store.retailer]}
                                />
                            </View>
                        );
                    }
                })}
            </View>
        );
    }

    return (
        <View style={[styles.container, {opacity: pickedUp ? 0.4 : 1}]}>
            <RoundButton
                text={product.quantity}
                iconColor={'white'}
                color={COLORS.GRAY_1}
                inAnimatedView={true}
                onPress={() => setPopupVisible(true)}
            />

            <View style={styles.leftContainer}>
                {product.data && (
                    <>
                        <Text style={styles.text}>{productName}</Text>
                        {inStores && renderStores()}
                    </>
                )}
            </View>
            <View style={styles.rightContainer}>
                {product.data && (
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Text style={styles.priceText}>från</Text>
                        <Text style={styles.price}>{lowestPrice}:-</Text>
                    </View>
                )}
            </View>
            <View
                style={[
                    styles.checkBox,
                    {
                        backgroundColor: pickedUp
                            ? COLORS.GREEN
                            : COLORS.GRAY_4,
                    },
                ]}>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPressOut={() => setPickedUp(!pickedUp)}>
                    <Icon name={'check'} size={40} color={'white'} />
                </TouchableOpacity>
            </View>
            <Popup
                isVisible={popupVisible}
                close={() => {
                    console.log('close');
                    setPopupVisible(false);
                }}>
                <DetailedProduct product={product} />
            </Popup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: COLORS.GRAY_2,
        flexDirection: 'row',
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        paddingRight: 40,
    },
    leftContainer: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        alignContent: 'space-between',
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text: {
        flex: 1,
        fontFamily: 'Montserrat-bold',
        fontSize: 15,
        color: COLORS.WHITE,
        textAlign: 'left',
    },
    storeContainer: {
        marginTop: 5,
        flexDirection: 'row',
    },
    price: {
        color: COLORS.WHITE,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: 5,
        textAlign: 'center',
        alignSelf: 'flex-start',
    },
    priceText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        marginBottom: 3,
        color: COLORS.WHITE,
        alignSelf: 'flex-end',
    },
    checkBox: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
});
