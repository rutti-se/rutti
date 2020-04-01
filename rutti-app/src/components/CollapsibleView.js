import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {Icon} from '../../assets/icomoon';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';

export default props => {
    const [collapsed, setCollapsed] = useState(true);
    function renderTitle() {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <TouchableHighlight
                    underlayColor={'white'}
                    onPress={() => setCollapsed(!collapsed)}>
                    <Icon
                        name={collapsed ? 'chevron-down' : 'chevron-up'}
                        size={30}
                        color={'black'}></Icon>
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderTitle()}
            <Collapsible align={'bottom'} duration={1000} collapsed={collapsed}>
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
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
    },
    button: {},
    body: {
        flex: 1,
    },
});
