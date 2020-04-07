import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import {firebase} from '@react-native-firebase/auth';
import * as RootNavigation from '../views/RootNavigation';

// Calling the following function will open the FB login dialogue:
export async function facebookLogin() {
    try {
        // Login with permissions
        const result = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
        ]);

        if (result.isCancelled) {
            throw new Error('User cancelled the login process');
        }

        console.log(
            `Login success with permissions: ${result.grantedPermissions.toString()}`,
        );

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw new Error('Something went wrong obtaining access token');
        }

        const credential = firebase.auth.FacebookAuthProvider.credential(
            data.accessToken,
        );

        // login with credential
        const firebaseUserCredential = await firebase
            .auth()
            .signInWithCredential(credential);

        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

        if (firebaseUserCredential.user) {
            RootNavigation.replace(
                'Home',
                firebaseUserCredential.user.toJSON(),
            );
        }
    } catch (e) {
        console.error(e);
    }
}

// Calling this function will open Google for login.
export async function googleLogin() {
    try {
        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId:
                '267478448957-36dpovnt82hop9ksgcslanrjnnbofnhp.apps.googleusercontent.com', // required
        });

        const {accessToken, idToken} = await GoogleSignin.signIn();

        const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
        );

        await firebase.auth().signInWithCredential(credential);

        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
        console.error(e);
    }
}

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

                await firestore()
                    .collection('users')
                    .doc(username)
                    .set();

                resolve({user: userCredentials});
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

            resolve({user: userCredentials});
        } catch (error) {
            reject({error});
        }
    });
}
