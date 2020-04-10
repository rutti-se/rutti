import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RoundButton from './RoundButton';

export default ({onValueChange, textColor}, props) => {
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        onValueChange(amount);
    }, [amount]);
    function addValue() {
        setAmount(amount + 1);
    }

    function subValue() {
        if (amount > 1) {
            setAmount(amount - 1);
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
                {amount}
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
