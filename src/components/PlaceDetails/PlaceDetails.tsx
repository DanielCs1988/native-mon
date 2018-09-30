import React from 'react';
import {View, Text, Image, StyleSheet, ImageURISource, Platform} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {Place} from "../../models";
import {Navigator} from "react-native-navigation";
import {PlatformIcon} from "../../utils";

const PlaceDetails = ({ place: { key, name, image }, onRemovePlace, navigator }: Props) => (
    <View style={styles.container}>
        <View>
            <Image source={image as ImageURISource} style={styles.placeImage} />
            <Text style={styles.placeName}>{name}</Text>
        </View>
        <View>
            <IconButton
                icon={PlatformIcon('trash')} color="red" size={30} style={styles.deleteBtn}
                onClick={() => {
                    onRemovePlace(key);
                    navigator.pop({
                        animationType: Platform.OS === 'android' ? 'slide-horizontal' : 'fade'
                    });
                }}/>
        </View>
    </View>
);

export interface Props {
    place: Place;
    onRemovePlace: (key: string) => void;
    navigator: Navigator;
}

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    placeImage: {
        width: '100%',
        height: 200
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