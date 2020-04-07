import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Icon} from '../../assets/icomoon';
import COLOR from '../../assets/colors';

import InputSpinner from 'react-native-input-spinner';
import RoundButton from './RoundButton';
import FadeInView from '../components/animations/FadeInView';
export default ({product}, props) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setSelectedProduct(product);
    }, [product]);

    return (
        <View
            style={{
                padding: 5,
                marginBottom: 50,
            }}>
            {selectedProduct && (
                <FadeInView>
                    <View
                        style={{
                            backgroundColor: COLOR.GRAY_2,
                            flexDirection: 'row',
                            width: '90%',
                            height: 50,
                            justifyContent: 'space-around',
                            alignSelf: 'center',
                            alignItems: 'center',
                            borderRadius: 25,
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Montserrat-Bold',
                            }}>
                            {selectedProduct.productInfo.brand}
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
            )}
        </View>
    );
};
