import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from '../../assets/icomoon';
import COLOR from '../../assets/colors';

import InputSpinner from 'react-native-input-spinner';
import RoundButton from './RoundButton';
import FadeInView from '../components/animations/FadeInView';
export default ({product}, props) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productName, setProductName] = useState(null);

    useEffect(() => {
        setSelectedProduct(null);
        setSelectedProduct(product);
        let name = '';
        product && (name = product.productInfo.name);
        console.log('Name:', name);
        if (name.length > 15) {
            name = name.substring(0, 15) + '...';
        }
        setProductName(name);
    }, [product]);

    function renderSelectedItemView() {
        return (
            <FadeInView duration={500}>
                <View style={styles.contentContainer}>
                    <Text
                        style={{
                            color: 'white',
                            fontFamily: 'Montserrat-Bold',
                        }}>
                        {productName}
                    </Text>
                    <InputSpinner
                        style={{alignSelf: 'center'}}
                        height={30}
                        width={100}
                        max={10}
                        min={1}
                        textColor={'white'}
                        editable={false}
                        color={COLOR.PRIMARY}
                        value={1}></InputSpinner>
                    <RoundButton
                        style={{alignSelf: 'flex-end'}}
                        icon={'buy-online-add'}
                        onPress={() => setSelectedProduct(null)}
                    />
                </View>
            </FadeInView>
        );
    }

    function renderUserView() {
        return (
            <FadeInView duration={500}>
                <View style={styles.contentContainer}>
                    {/* <FadeInView duration={500}> */}
                    <Text style={styles.text}>MotiveradBroccoli66</Text>
                    <RoundButton style={{alignSelf: 'flex-end'}} text={1} />
                    {/* </FadeInView> */}
                </View>
            </FadeInView>
        );
    }
    return (
        <View
            style={{
                padding: 5,
                marginBottom: 50,
            }}>
            {selectedProduct && renderSelectedItemView()}
            {!selectedProduct && renderUserView()}
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: COLOR.GRAY_2,
        flexDirection: 'row',
        width: '90%',
        height: 50,
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    text: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
    },
});
