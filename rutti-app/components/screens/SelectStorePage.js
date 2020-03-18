import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../../assets/colors';

export default () => {
    let [zipCode, setZipCode] = useState(null);
    let [stores, setStores] = useState([]);

    useEffect(() => {
        if (zipCode) {
            findStores({zipCode}).then(stores => setStores(stores));
        }
    }, [zipCode]); //När denna är tom körs det en gång

    function onTextChange(event) {
        if (event.text && event.text.length > 2) {
            setZipCode(event.text);
        }
    }
    return (
        <View>
            <InputField onChange={onTextChange}></InputField>
        </View>
    );
};
