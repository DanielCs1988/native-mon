import React from 'react';
import {View, Text, Image, StyleSheet, ImageURISource, Platform} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {Place} from "../../models";
import {Navigator} from "react-native-navigation";
import {PlatformIcon} from "../../utils";

const PlaceDetails = ({ place: { key, name, image }, viewMode, onRemovePlace, navigator }: Props) => (
    <View style={[styles.container, viewMode === 'landscape' ? styles.landscape : null]}>
        <View style={styles.subContainer}>
            <View>
                <Image source={image as ImageURISource} style={styles.placeImage}/>
            </View>
        </View>
        <View style={styles.subContainer}>
            <Text style={styles.placeName}>{name}</Text>
            <IconButton
                icon={PlatformIcon('trash')} color="red" size={30} style={styles.deleteBtn}
                onClick={() => {
                    onRemovePlace(key);
                    navigator.pop({
                        animationType: Platform.OS === 'android' ? 'slide-horizontal' : 'fade'
                    });
                }}
            />
        </View>
    </View>
);

export interface Props {
    place: Place;
    viewMode: string;
    onRemovePlace: (key: string) => void;
    navigator: Navigator;
}

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
    placeImage: {
        width: '100%',
        height: 250
    },
    placeName: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center'
    },
    deleteBtn: {
        justifyContent: 'center'
    }
});

export default PlaceDetails;