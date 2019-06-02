import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    keyboardAvoiding: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: "100%"
    },
    title: {
        marginBottom: 30,
        fontSize: 30
    },
    subTitle: {
        textAlign: 'center',
        marginBottom: 15
    },
    username: {
        marginBottom: 0,
        marginLeft: 0
    },
    password: {
        marginBottom: 0,
        marginLeft: 0
    },
    confirmPassword: {
        marginBottom: 0,
        marginLeft: 0
    },
    mainButton: {
        marginVertical: 15
    }
});

export default styles;