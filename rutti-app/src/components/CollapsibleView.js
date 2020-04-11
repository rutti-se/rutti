import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {Icon} from '../../assets/icomoon';
import Collapsible from 'react-native-collapsible';
import COLORS from '../../assets/colors';

export default props => {
    const [collapsed, setCollapsed] = useState(true);
    function renderTitle() {
        return (
            <TouchableHighlight
                underlayColor={'white'}
                onPress={() => setCollapsed(!collapsed)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{props.title}</Text>

                    <Icon
                        name={collapsed ? 'chevron-down' : 'chevron-up'}
                        size={30}
                        color={'black'}
                    />
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <View style={styles.container}>
            {renderTitle()}
            <Collapsible align={'bottom'} duration={600} collapsed={collapsed}>
                <View style={styles.body}>{props.children}</View>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
    },
    button: {},
    body: {
        flex: 1,
        paddingBottom: 20,
    },
});
