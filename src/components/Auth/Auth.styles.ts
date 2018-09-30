import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgImage: {
        flex: 1,
        width: '100%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#aaa',
        width: '80%'
    },
    password: {
        width: '45%'
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: '#29AAF4'
    }
});

export default styles;