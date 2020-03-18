import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../../assets/colors';
import {BottomDrawer} from '../BottomDrawer/BottomDrawer';
import InputField from '../InputField';
import findStores from '../../api/findStores';
import searchProducts from '../../api/findStores';
import {Dimensions} from 'react-native';
const DEVICE = Dimensions.get('window');

export default () => {
    let [zipCode, setZipCode] = useState('21420');
    let [stores, setStores] = useState([]);

    useEffect(() => {
        if (zipCode) {
            findStores({zipCode}).then(stores => setStores(stores));
        }
    }, [zipCode]); //När denna är tom körs det en gång

    console.log(stores);

    function onTextChange(event) {
        console.log(event.text);
        if (event.text && event.text.length > 2) {
            const q = event.text;
            console.log(stores[0].data.stores);
            searchProducts({q, stores}).then(result => console.log(result));
        }

        //searchProducts(event.text, stores).then(result => console.log(result));
    }

    return (
        <View style={styles.container}>
            <InputField onChange={onTextChange}></InputField>
            <BottomDrawer
                style={{borderTopEndRadius: 100}}
                backgroundColor={COLORS.GRAY_2}
                containerHeight={DEVICE.height / 1.2}
                downDisplay={DEVICE.height / 1.4}
                roundedEdges={true}
                shadow={true}
                startUp={false}>
                <Text>Hello</Text>
            </BottomDrawer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY,
        padding: 50,
    },
});
