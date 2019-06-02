import { loginService } from "../services"
import {
    REQUEST_LOGIN,
    SUCCESS_LOGIN,
    FAIL_LOGIN,
    RESET_LOGIN
} from "../constants/login"

/**
 * Log the user in
 * @param data
 * @param onSuccess
 * @returns {Function}
 */
export const login = (username, password, navigation, onSuccess = () => {}) => {
    return dispatch => {
        dispatch({ type: REQUEST_LOGIN })
        loginService.login({ username, password }).then((data) => {
            dispatch({ type: SUCCESS_LOGIN, payload: data.token })
            navigation.navigate("Home")
            onSuccess(data)
        }, () => {
            dispatch({ type: FAIL_LOGIN, payload: { password: true, username: true } })
        })
    }
};

/**
 * Reset Login
 * @returns {Function}
 */
export const resetLogin = () => {
    return dispatch => {
        dispatch({ type: RESET_LOGIN })
    }
};