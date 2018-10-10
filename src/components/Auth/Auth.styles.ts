import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        opacity: 0.9,
        width: '80%',
        marginBottom: 10,
        paddingLeft: 5
    },
    button: {
        marginVertical: 10,
        alignSelf: 'center'
    }
});

export default styles;