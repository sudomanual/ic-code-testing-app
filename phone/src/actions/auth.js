import AsyncStorage from "@react-native-community/async-storage"
import { STORAGE_TOKEN_KEY } from "react-native-dotenv"
import { authService } from "../services"
import {
    REQUEST_AUTH_CHECK,
    SUCCESS_AUTH_CHECK,
    FAIL_AUTH_CHECK,
    UPDATE_AUTH,
    LOGOUT
} from "../constants/auth"

/**
 * Auth check to validate token
 * @param navigation
 * @returns {Function}
 */
export const authCheck = (navigation) => {
    return async dispatch => {
        let token =  await AsyncStorage.getItem(STORAGE_TOKEN_KEY)
        if(token) {
            dispatch({ type: REQUEST_AUTH_CHECK })
            await authService.authCheck().then((data) => {
                dispatch({ type: SUCCESS_AUTH_CHECK, payload: data.user })
                navigation.navigate("Home")
            }, () => {
                dispatch({ type: FAIL_AUTH_CHECK })
                navigation.navigate("Login")
            })
            return
        }
        navigation.navigate("Login")
    }
};

/**
 * Updates auth
 * @param user
 * @returns {Function}
 */
export const updateAuth = (user) => {
    return dispatch => {
        dispatch({ type: UPDATE_AUTH , payload: user })
    }
};

/**
 * Logout dispatch and navigate to Login route
 * @param navigation
 * @returns {Function}
 */
export const logout = (navigation) => {
    return async dispatch => {
        await AsyncStorage.removeItem(STORAGE_TOKEN_KEY)
        dispatch({ type: LOGOUT })
        navigation.navigate("Login")
    }
};