import { createStackNavigator } from "react-navigation"

// Auth Screens
import Register from "../screens/Register"
import Login from "../screens/Login"

export default createStackNavigator({
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    },

}, {
    headerMode: "none",
});