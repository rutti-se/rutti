import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import Button from './Button';
import InputField from './InputField';
import {emailLogin} from '../api/signInMethods';
import COLORS from '../../assets/colors';
import RoundButton from './RoundButton';

export default ({onLoginComplete, goToRegistration, backPress}) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [faultyInputs, setFaultyInputs] = useState({});
    let [loading, setLoading] = useState(false);

    function login() {
        faultyInputs = {};

        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email,
        );

        const okPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
            password,
        );

        faultyInputs.email = !validEmail;
        faultyInputs.okPassword = !okPassword;

        setFaultyInputs(faultyInputs);

        if (!faultyInputs.email && !faultyInputs.okPassword) {
            setLoading(true);
            emailLogin(email, password)
                .then(signInResult => {
                    if (signInResult && signInResult.user) {
                        //Successful login
                        console.log('logged in ', signInResult.user);
                        onLoginComplete(signInResult.user);
                    }
                })
                .catch(error => {
                    Alert.alert('Något blev fel!', error.error.message);
                })
                .finally(() => setLoading(false));
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.text}>Logga in</Text>
                </View>
                <View style={styles.inputForm}>
                    <InputField
                        onChangeText={text => setEmail(text)}
                        type={'email-address'}
                        name={'email'}
                        labelText={'E-post'}></InputField>

                    <InputField
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                        name={'password'}
                        labelText={'Lösenord'}></InputField>
                </View>

                <View style={styles.bottomContainer}>
                    <Button
                        shadow={true}
                        onPress={() => login()}
                        isLoading={loading}
                        text={'Logga in!'}></Button>
                    {goToRegistration && (
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textAlign: 'center',
                                paddingTop: 20,
                            }}
                            onPress={() => goToRegistration()}>
                            Har du inget konto? Registrera dig här.
                        </Text>
                    )}
                    <View style={{marginTop: 30, paddingBottom: 30}}>
                        <RoundButton onPress={backPress} icon={'arrow-left'} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: COLORS.SECONDARY,
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 48,
        margin: 20,
        fontFamily: 'Montserrat-Bold',
    },
    inputForm: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    bottomContainer: {
        width: '90%',
        marginTop: 20,
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
