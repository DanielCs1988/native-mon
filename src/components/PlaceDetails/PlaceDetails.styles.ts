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
        flex: 1,
        alignItems: 'center'
    },
    imageAndMapContainer: {
        flex: 2
    },
    placeImage: {
        width: '100%',
        height: '100%'
    },
    placeName: {
        marginVertical: 12
    },
    deleteBtn: {
        alignSelf: 'center',
        marginTop: 8
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default styles;