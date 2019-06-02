import AsyncStorage from "@react-native-community/async-storage"
import { STORAGE_TOKEN_KEY } from "react-native-dotenv";
import request from "../common/request"

const login = credentials => request.post('/login', credentials)
    .then( async ({ data }) => {
        await AsyncStorage.setItem(STORAGE_TOKEN_KEY, data.token)
        return data
    }).catch(error => {
        return Promise.reject(error)
    });

export const loginService = {
    login
};
