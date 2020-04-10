import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import FadeInView from '../animations/FadeInView';
import Spinner from '../common/Spinner';
import Img from '../common/Img';
export default ({addToList, product}, props) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productName, setProductName] = useState(null);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        setSelectedProduct(null);
        setSelectedProduct(product);
        let name = '';
        product && (name = product.productInfo.name);
        if (name.length > 15) {
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
                        onPress={() => setSelectedProduct(null)}
                    />
                    <Img
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: 'white',
                        }}
                        source={selectedProduct.productInfo.imageUrl}
                    />

                    <Text
                        style={{
                            color: 'black',
                            fontFamily: 'Montserrat-Bold',
                        }}>
                        {productName}
                    </Text>
                    <Spinner onValueChange={value => setAmount(value)} />
                    <RoundButton
                        style={{alignSelf: 'flex-end'}}
                        icon={'check'}
                        color={COLOR.COOP}
                        small={'true'}
                        onPress={() => {
                            addToList({
                                amount: amount,
                                sku: selectedProduct.productInfo.gtin,
                            });
                            setSelectedProduct(null);
                        }}
                    />
                </View>
            </FadeInView>
        );
    }

    function renderUserView() {
        return (
            <FadeInView duration={500}>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>MotiveradBroccoli66</Text>

                    <RoundButton style={{alignSelf: 'flex-end'}} text={1} />
                </View>
            </FadeInView>
        );
    }
    return (
        <View style={styles.container}>
            {selectedProduct && renderSelectedItemView()}
            {!selectedProduct && renderUserView()}
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
