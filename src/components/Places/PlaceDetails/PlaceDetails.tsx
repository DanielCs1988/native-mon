import React from 'react';
import {Modal, View, Text, Image, Button, StyleSheet, ImageURISource} from "react-native";
import { Place } from "../../../models";
import IconButton from "../../UI/IconButton/IconButton";

const PlaceDetails = ({ place, onDelete, onClose }: Props) => (
    <Modal visible={place !== null} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
            {
                place ?
                    <View>
                        <Image source={place.image as ImageURISource} style={styles.placeImage} />
                        <Text style={styles.placeName}>{place.name}</Text>
                    </View>
                : null
            }
            <View>
                <IconButton icon="ios-trash" color="red" size={30} onClick={onDelete}/>
                <Button title="Close" onPress={onClose} />
            </View>
        </View>
    </Modal>
);

export interface Props {
    place: Place | null;
    onDelete: () => void;
    onClose: () => void;
}

const styles = StyleSheet.create({
    modalContainer: {
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
    }
});

export default PlaceDetails;