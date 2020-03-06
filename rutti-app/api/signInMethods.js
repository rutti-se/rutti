import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import {firebase} from '@react-native-firebase/auth';

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
    } catch (e) {
        console.error(e);
    }
}

// Calling this function will open Google for login.
export async function googleLogin() {
    try {
        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '', // required
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
