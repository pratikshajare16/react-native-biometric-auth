import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import LocalAuth from 'react-native-local-auth';
const FaceRecognizationEx2 = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const handleFaceRecognition = async () => {
        try {
            // Check if biometric sensor is available
            const { available, biometryType } = await rnBiometrics.isSensorAvailable();

            if (!available) {
                Alert.alert('Error', 'Biometric authentication is not available on this device.');
                return;
            }

            if (biometryType === ReactNativeBiometrics.FaceID) {
                // Prompt the user for Face ID authentication
                const result = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate with Face ID' });

                if (result.success) {
                    Alert.alert('Success', 'Face recognized successfully!');
                } else {
                    Alert.alert('Error', 'Face recognition failed or was canceled.');
                }
            } else {
                Alert.alert('Error', 'Face ID is not supported on this device.');
            }
        } catch (error) {
            console.error('Error during biometric authentication:', error);
            Alert.alert('Error', 'An error occurred while attempting to authenticate.');
        }
    };

    // const authenticate = async () => {
    //     try {
    //         const result = await LocalAuth.authenticate({
    //             reason: 'Please authenticate to proceed',
    //         });

    //         Alert.alert("Success", "Face recognized!");
    //     } catch (error) {
    //         Alert.alert("Error", error.message || "Authentication failed");
    //     }
    // };

    return (
        <View style={styles.container}>
            <Button title="Unlock with Face Recognition" onPress={handleFaceRecognition} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default FaceRecognizationEx2;
