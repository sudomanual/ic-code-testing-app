import { createDrawerNavigator, createAppContainer } from "react-navigation"
import AuthStackNavigator from "./AuthStackNavigator"
import AppStackNavigator from "./AppStackNavigator"
import AuthLoading from "../screens/AuthLoading"
import Drawer from "./Drawer"

const AppNavigator = createDrawerNavigator({
    AuthLoading: {
        screen: AuthLoading
    },
    AuthStackNavigator: AuthStackNavigator,
    AppStackNavigator: AppStackNavigator
}, {
    initialRouteName: "AuthLoading",
    contentComponent: Drawer,
    drawerWidth: 250,
});

export default createAppContainer(AppNavigator);