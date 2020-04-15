import React, {useRef} from 'react';
import {TextInput, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import COLOR from '../../../assets/colors';
import FadeInView from '../animations/FadeInView';

export default props => {
    return (
        <View>
            <Text
                style={[
                    {
                        color: COLOR.PRIMARY,
                        fontFamily: 'Montserrat-Bold',
                        paddingBottom: 10,
                        paddingTop: 10,
                    },
                ]}>
                {props.labelText}
            </Text>
            {props.invalidInput && props.invalidMessage && (
                <Text
                    style={{
                        color: COLOR.PRIMARY,
                        fontFamily: 'Montserrat',
                        paddingBottom: 10,
                    }}>
                    {props.invalidMessage}
                </Text>
            )}
            <TextInput
                style={{
                    backgroundColor: 'white',
                    borderRadius: 25,
                    padding: 15,
                    color: 'black',
                    borderWidth: props.invalidInput ? 2 : 0,
                    borderColor: props.invalidInput ? 'red' : 'green',
                }}
                {...props}
            />
        </View>
    );
};
