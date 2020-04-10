import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RoundButton from './RoundButton';

export default ({defaultValue, onValueChange, textColor}, props) => {
    const [quantity, setQuantity] = useState(defaultValue || 1);

    useEffect(() => {
        onValueChange(quantity);
    }, [quantity]);
    function addValue() {
        setQuantity(quantity + 1);
    }

    function subValue() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    return (
        <View style={styles.container}>
            <RoundButton onPress={() => subValue()} small="true" text="-" />
            <Text
                style={[
                    styles.value,
                    {color: textColor ? textColor : 'black'},
                ]}>
                {quantity}
            </Text>
            <RoundButton onPress={() => addValue()} small="true" text="+" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
    value: {
        fontSize: 20,
    },
});
