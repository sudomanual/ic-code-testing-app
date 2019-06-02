import {
    REQUEST_REGISTER,
    SUCCESS_REGISTER,
    FAIL_REGISTER,
    RESET_REGISTER,
    UPDATE_REGISTER_ERRORS
} from "../constants/register"

export const initialStateRegister = {
    busy: false,
    errors: {
        username: false,
        password: false,
        confirmPassword: false
    }
};

export default (state = initialStateRegister, action) => {
    switch (action.type) {
        case REQUEST_REGISTER:
            return {
                ...state,
                busy: true
            }
        case SUCCESS_REGISTER:
            return {
                ...state,
                busy: false
            }
        case FAIL_REGISTER:
            return {
                ...state,
                busy: false
            }
        case RESET_REGISTER:
            return initialStateRegister
        case UPDATE_REGISTER_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state
    }
};