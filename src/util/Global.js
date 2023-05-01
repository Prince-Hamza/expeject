import * as Application from 'expo-application';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";

//export const serverUrl = 'http://192.168.1.18:5000';
export const serverUrl = 'http://137.184.186.231:5000';
//export const serverUrl = "https://msm-nodejs-mysql.herokuapp.com"
export const getDeviceId = async () => {
    if (Platform.OS === 'android') {
        return Application.androidId;

    } else {
        let deviceId = await SecureStore.getItemAsync('deviceId');

        if (!deviceId) {
            deviceId = Constants.deviceId; //or generate uuid

            await SecureStore.setItemAsync('deviceId', deviceId);
        }

        return deviceId;
    }

}

export const getStoredId = async () => {

    try {
        const deviceId = await AsyncStorage.getItem('@deviceId')

        return deviceId;

    } catch (e) {
        console.log(e);
    }

}
export const removeStoredId = async () => {

    try {
        const deviceId = await AsyncStorage.removeItem('@deviceId')
        console.log("device Id Removed");


    } catch (e) {
        console.log(e);
    }

}

export const setStoredId = async (id) => {
    try {
        const deviceId = await AsyncStorage.setItem('@deviceId', id)

    } catch (e) {
        console.log(e);
    }
}