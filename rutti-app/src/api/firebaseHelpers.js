import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function emailSignUp(email, password, username) {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredentials = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            if (userCredentials.user) {
                await userCredentials.user.updateProfile({
                    displayName: username,
                });

                let user = firestore()
                    .collection('users')
                    .doc(username);

                let firstList = await firestore()
                    .collection('lists')
                    .add({name: 'Inköpslista', author: user, users: []});

                await user.set({lists: [firstList], stores: []});

                resolve({
                    user: {
                        ...userCredentials.user,
                        ...{displayName: username},
                    },
                });
            }
        } catch (error) {
            reject({error});
        }
    });
}

export function emailLogin(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredentials = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);

            resolve({user: userCredentials.user});
        } catch (error) {
            reject({error});
        }
    });
}

export function saveStores(username, stores) {
    return new Promise(async (resolve, reject) => {
        try {
            await firestore()
                .collection('users')
                .doc(username)
                .update({stores: stores});

            resolve();
        } catch (error) {
            reject({error});
        }
    });
}
export function getStores(username) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await firestore()
                .collection('users')
                .doc(username)
                .get();

            if (user.exists) {
                let data = user.data();
                resolve(data.stores);
            } else {
                throw new Error('No user found.');
            }
        } catch (error) {
            reject({error});
        }
    });
}
