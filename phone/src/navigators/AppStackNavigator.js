import { createStackNavigator } from 'react-navigation';

// App Screens
import Home from '../screens/Home';

export default createStackNavigator({
    Home: {
        screen: Home
    },
}, {
    initialRouteKey: 'Home',
    headerMode: 'none',
})