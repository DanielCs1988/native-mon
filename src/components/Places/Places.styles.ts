import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'blue',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'blue',
        fontSize: 26,
        fontWeight: 'bold'
    }
});

export default styles;