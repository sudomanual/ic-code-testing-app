import {
    REQUEST_AUTH_CHECK,
    SUCCESS_AUTH_CHECK,
    FAIL_AUTH_CHECK,
    UPDATE_AUTH
} from "../constants/auth"

export const initialStateAuth = {
    busy: false,
    user: null
};

export default (state = initialStateAuth, action) => {
    switch (action.type) {
        case REQUEST_AUTH_CHECK:
            return {
                ...state,
                busy: true
            }
        case SUCCESS_AUTH_CHECK:
            return {
                ...state,
                busy: false,
                user: action.payload
            }
        case UPDATE_AUTH:
            return {
                ...state,
                user: action.payload
            }
        case FAIL_AUTH_CHECK:
            return {
                ...state,
                busy: false
            }
        default:
            return state
    }
};