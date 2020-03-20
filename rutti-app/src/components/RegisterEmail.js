import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Button from './Button';
import InputField from './InputField';
import {emailSignUp} from '../api/signInMethods';
import COLORS from '../../assets/colors';
import getGeneratedUsername from '../api/getGeneratedUsername';
import RoundButton from './RoundButton';

export default props => {
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmedPassword, setConfirmedPassword] = useState('');

    let [faultyInputs, setFaultyInputs] = useState({});

    useEffect(() => {
        randomUsername();
    }, []);

    function randomUsername() {
        getGeneratedUsername().then(result => {
            setUsername(result.username);
        });
    }

    function signUp() {
        faultyInputs = {};

        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email,
        );

        const okPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
            password,
        );

        const matchingPassword = password === confirmedPassword;

        console.log(password, confirmedPassword, matchingPassword);

        faultyInputs.email = !validEmail;
        faultyInputs.okPassword = !okPassword;
        faultyInputs.matchingPassword = !matchingPassword;

        console.log(faultyInputs);
        setFaultyInputs(faultyInputs);

        if (
            !faultyInputs.email &&
            !faultyInputs.okPassword &&
            !faultyInputs.matchingPassword
        ) {
            //Register
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.text}>Registrera</Text>
            </View>
            <View style={styles.inputForm}>
                <View>
                    <Text
                        style={{
                            color: COLORS.PRIMARY,
                            fontFamily: 'Montserrat-Bold',
                            paddingBottom: 10,
                            paddingTop: 10,
                        }}>
                        Användarnamn
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {username}
                        </Text>
                        <RoundButton
                            onPress={() => randomUsername()}
                            icon={'arrow-left'}
                        />
                    </View>
                </View>

                <InputField
                    onChangeText={text => setEmail(text)}
                    invalidInput={faultyInputs.email}
                    invalidMessage={'Du måste ange en riktig e-post.'}
                    type={'email-address'}
                    name={'email'}
                    labelText={'E-post'}></InputField>
                <InputField
                    onChangeText={text => setPassword(text)}
                    secure={true}
                    invalidInput={faultyInputs.okPassword}
                    invalidMessage={
                        'Lösenordet måste vara minst 6 tecken långt och innehålla minst en stor bokstav eller siffra.'
                    }
                    name={'password'}
                    labelText={'Lösenord'}></InputField>
                <InputField
                    onChangeText={text => setConfirmedPassword(text)}
                    autoCorrect={false}
                    invalidInput={faultyInputs.matchingPassword}
                    invalidMessage={'Lösenorden stämmer inte överens.'}
                    secure={true}
                    name={'confirmedPassword'}
                    labelText={'Bekräfta lösenord'}></InputField>
            </View>

            <View style={styles.bottomContainer}>
                <Button
                    shadow={true}
                    onPress={() => signUp()}
                    text={'Registrera mig!'}></Button>
            </View>
        </SafeAreaView>
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
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
