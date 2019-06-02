import { registerService } from "../services"
import {
    REQUEST_REGISTER,
    SUCCESS_REGISTER,
    FAIL_REGISTER,
    RESET_REGISTER,
    UPDATE_REGISTER_ERRORS
} from "../constants/register"

/**
 * Register new user
 * @param data
 * @param onSuccess
 * @returns {Function}
 */
export const register = (username, password, onSuccess = () => {}) => {
    return dispatch => {
        dispatch({ type: REQUEST_REGISTER })
        registerService.register(username, password).then(() => {
            dispatch({ type: SUCCESS_REGISTER })
            onSuccess()
        }, () => {
            dispatch({ type: FAIL_REGISTER, payload: { confirmPassword: true, password: true, username: true }  })
        })
    }
};

/**
 * Reset register
 * @returns {Function}
 */
export const resetRegister = () => {
    return dispatch => {
        dispatch({ type: RESET_REGISTER })
    }
};

/**
 * Update register errors
 * @returns {Function}
 */
export const updateRegisterErrors = (errors) => {
    return dispatch => {
        dispatch({ type: UPDATE_REGISTER_ERRORS, payload: errors })
    }
};