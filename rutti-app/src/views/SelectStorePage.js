import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputField from '../components/common/InputField';
import findStores from '../api/findStores';
import COLORS from '../../assets/colors';

export default () => {
    let [zipCode, setZipCode] = useState(null);
    let [stores, setStores] = useState([]);

    useEffect(() => {
        if (zipCode) {
            console.log(zipCode);
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
            <InputField onChange={onTextChange} />
            <View>
                {stores.map(store => (
                    <>
                        <Text>{store.store}</Text>

                        {console.log('Store: ', store)}
                    </>
                ))}
            </View>
        </View>
    );
};
