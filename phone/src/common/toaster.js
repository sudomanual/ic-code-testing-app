import Toast from "react-native-root-toast"

export const toastError = (content) => {
    Toast.show(content, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        backgroundColor: 'red',
        textColor: 'white',
        animation: true,
        hideOnPress: true,
        delay: 0
    });
}