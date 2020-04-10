import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../../../assets/colors';
import Img from '../common/Img';
import Button from '../common/Button';
import RoundButton from '../common/RoundButton';
import AddItemView from '../../components/shopping-list/AddItemView';
import Spinner from '../common/Spinner';
import calcBestPrice from '../../utilities/calcBestPrice';
export default ({product}, props) => {
    const [amount, setAmount] = useState(1);
    const [lowestPrice, setLowestPrice] = useState(null);
    useEffect(() => {
        setLowestPrice(calcBestPrice(product.storeInformation));
    }, [product]);

    function renderStores() {
        return (
            <View style={styles.storeContainer}>
                {product.storeInformation.map(store => {
                    return (
                        <View style={{width: 75, marginRight: 10}}>
                            <Button
                                text={
                                    store.store.retailer === 'citygross'
                                        ? 'c.g'
                                        : store.store.retailer
                                }
                                small={true}
                                backgroundColor={COLORS[store.store.retailer]}
                            />
                        </View>
                    );
                })}
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.text}>{product.productInfo.name}</Text>
                {renderStores()}
            </View>
            <View style={styles.rightContainer}>
                <Spinner
                    textColor={'white'}
                    onValueChange={value => {
                        setAmount(value);
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                    <Text style={styles.priceText}>från</Text>
                    <Text style={styles.price}>{lowestPrice}:-</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: COLORS.GRAY_2,
        flexDirection: 'row',
        marginBottom: 2,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        marginLeft: 10,
        alignSelf: 'flex-start',
        flexDirection: 'column',
        alignContent: 'space-between',
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    text: {
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
        alignSelf: 'flex-end',
        marginLeft: 5,
        textAlign: 'center',
    },
    priceText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        alignSelf: 'flex-end',
        marginBottom: 2,
        color: COLORS.WHITE,
    },
});
