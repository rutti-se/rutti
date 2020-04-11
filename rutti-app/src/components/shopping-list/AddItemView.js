import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import FadeInView from '../animations/FadeInView';
import Spinner from '../common/Spinner';
import Img from '../common/Img';
export default ({addToList, product, cancel}, props) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productName, setProductName] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setSelectedProduct(null);
        setSelectedProduct(product);
        let name = '';
        product && (name = product?.data?.productInformation?.name);
        if (name && name.length > 15) {
            name = name.substring(0, 15) + '...';
        }
        setProductName(name);
    }, [product]);

    function renderSelectedItemView() {
        return (
            <FadeInView duration={500}>
                <View
                    style={[
                        styles.contentContainer,
                        {backgroundColor: COLOR.WHITE},
                    ]}>
                    <RoundButton
                        style={{alignSelf: 'flex-end'}}
                        icon={'cross'}
                        color={COLOR.GRAY_2}
                        small={true}
                        inAnimatedView={true}
                        onPress={() => cancel()}
                    />
                    <Img
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: 'white',
                        }}
                        source={
                            selectedProduct?.data?.productInformation?.imageUrl
                        }
                    />

                    <Text
                        style={{
                            color: 'black',
                            fontFamily: 'Montserrat-Bold',
                        }}>
                        {productName}
                    </Text>
                    <Spinner
                        inAnimatedView={true}
                        onValueChange={value => setQuantity(value)}
                    />
                    <RoundButton
                        style={{alignSelf: 'flex-end'}}
                        icon={'check'}
                        color={COLOR.COOP}
                        small={'true'}
                        inAnimatedView={true}
                        onPress={() => {
                            addToList({
                                quantity: quantity,
                                sku:
                                    selectedProduct?.data?.productInformation
                                        ?.gtin,
                            });
                            setSelectedProduct(null);
                        }}
                    />
                </View>
            </FadeInView>
        );
    }

    return (
        <View style={styles.container}>
            {selectedProduct && renderSelectedItemView()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 50,
        alignSelf: 'center',
        marginBottom: 40,
    },
    contentContainer: {
        padding: 5,
        borderRadius: 25,
        backgroundColor: COLOR.GRAY_2,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
    },
});
