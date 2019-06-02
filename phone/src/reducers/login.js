import {
    SUCCESS_LOGIN,
    REQUEST_LOGIN,
    FAIL_LOGIN,
    RESET_LOGIN
} from "../constants/login"

export const initialStateLogin = {
    busy: false,
    errors: {
        username: false,
        password: false
    }
}

export default (state = initialStateLogin, action) => {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                busy: true
            }
        case SUCCESS_LOGIN:
            return {
                ...state,
                busy: false
            }
        case FAIL_LOGIN:
            return {
                ...state,
                busy: false,
                errors: action.payload
            }
        case RESET_LOGIN:
            return initialStateLogin
        default:
            return state
    }
}