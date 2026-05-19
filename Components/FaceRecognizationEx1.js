import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { NativeModules } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';


const { BiometricManager } = NativeModules;

const FaceRecognizationEx1 = () => {

    const [messgae, setMessage] = useState();

    // Request camera permission
    const requestCameraPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.CAMERA); // For Android
        // OR
        // const result = await request(PERMISSIONS.IOS.CAMERA); // For iOS

        if (result === RESULTS.GRANTED) {
            console.log('Camera permission granted');
            authenticateWithFaceID()
        } else {
            console.log('Camera permission denied');
        }
    };

    const authenticateWithFaceID = () => {

        const rnBiometrics = new ReactNativeBiometrics();
        requestCameraPermission
        rnBiometrics.isSensorAvailable()
            .then((result) => {
                const { available, biometryType } = result;

                if (available) {
                    if (biometryType === ReactNativeBiometrics.TouchID) {
                        setMessage('Fingerprint sensor available');
                    } else if (biometryType === ReactNativeBiometrics.FaceID) {
                        setMessage('Face recognition available');
                    } else {
                        setMessage('Other biometric sensor available:', biometryType);
                    }
                } else {
                    setMessage('No biometric sensors available');
                }
            })
            .catch((error) => {
                setMessage('Error checking biometric availability:', error);
            });


        rnBiometrics.simplePrompt({ promptMessage: 'Scan your face to authenticate' })
            .then((resultObject) => {
                const { success } = resultObject;

                if (success) {
                    Alert.alert('Authentication Successful', 'Welcome!');
                    // Navigate to the next page here
                } else {
                    Alert.alert('Authentication Failed', 'Face ID not recognized or canceled.');
                }
            })
            .catch((error) => {
                console.error('Error during biometric authentication:', error);
                Alert.alert('Error', 'Biometric authentication failed.');
            });
    };




    return (
        <View style={styles.container}>
            <Button title="Authenticate with Face ID" onPress={requestCameraPermission} />
            <Text>{messgae}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FaceRecognizationEx1;
