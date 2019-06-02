import { combineReducers } from "redux"
import reduceReducers from "reduce-reducers"
import { LOGOUT } from "../constants/auth"
import auth, { initialStateAuth } from "./auth"
import login, { initialStateLogin } from "./login"
import register, { initialStateRegister } from "./register"

export default reduceReducers(
    combineReducers({
        auth,
        login,
        register
    }),
    (state, action) => {
        switch (action.type) {
            case LOGOUT:
                return {
                    ...state,
                    auth: initialStateAuth,
                    login: initialStateLogin,
                    register: initialStateRegister
                };
            default:
                return state
        }
    }
);