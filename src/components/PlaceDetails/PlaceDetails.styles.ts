import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    landscape: {
        flexDirection: 'row'
    },
    subContainer: {
        flex: 1
    },
    imageAndMapContainer: {
        flex: 2
    },
    placeImage: {
        width: '100%',
        height: '100%'
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center'
    },
    deleteBtn: {
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default styles;