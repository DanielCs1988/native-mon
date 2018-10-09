import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    drawerBg: {
        height: 120,
        width: '100%',
        alignSelf: 'stretch',
        position: 'absolute'
    },
    drawerLogo: {
        height: 80,
        width: 80,
        position: 'absolute',
        alignSelf: 'center',
        top: 20
    },
    drawerContent: {
        marginTop: 120
    },
    text: {
        fontSize: 16,
        marginLeft: 20
    },
    icon: {
        color: "#777", fontSize: 26, width: 30
    }
});

export default styles;