import { createStackNavigator } from 'react-navigation'

// Auth Screens
import Register from '../screens/Register'
import Login from '../screens/Login'

export default createStackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    }
}, {
    headerMode: 'none',
})