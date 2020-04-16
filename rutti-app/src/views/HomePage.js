import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import COLOR from '../../assets/colors';
import {BottomDrawer} from '../components/common/BottomDrawer';
import {firebase} from '@react-native-firebase/auth';
import BottomDrawerContent from '../views/BottomDrawerContent';
import {
    getStores,
    getCurrentListRef,
    getCurrentUserRef,
} from '../api/firebaseHelpers';
import RuttiLogo from '../../assets/rutti_logo_notext.svg';
import Settings from '../components/Settings';
import SearchView from './SearchView';
const DEVICE = Dimensions.get('window');

export default () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    let [user, setUser] = useState(null);
    let [stores, setStores] = useState(null);
    let [list, setList] = useState(null);
    let [lists, setLists] = useState(null);

    useEffect(() => {
        let unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            }
            unsubscribe();
        });
    }, []);

    useEffect(() => {
        if (user) {
            getCurrentUserRef(user.displayName).then(userRef => {
                userRef.onSnapshot(
                    snapshot => {
                        let userObject = snapshot.data();
                        setStores(userObject.stores);
                    },
                    () => 'user update error',
                );
            });
            getCurrentListRef(user.displayName).then(listRef =>
                listRef.onSnapshot(
                    snapshot => {
                        console.log('id:', snapshot.id);
                        let listObject = snapshot.data();
                        listObject.id = snapshot.id;
                        setList(listObject);
                    },
                    () => 'list update error',
                ),
            );
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 10,
                }}>
                <RuttiLogo width={40} height={40} />

                <Settings stores={stores} username={user?.displayName} />
            </View>

            <SearchView
                list={list}
                stores={stores}
                setSelectedProduct={setSelectedProduct}
            />

            <BottomDrawer>
                <BottomDrawerContent
                    list={list}
                    stores={stores}
                    selectedProduct={selectedProduct}
                />
            </BottomDrawer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.SECONDARY,
        paddingTop: 20,
    },
});
