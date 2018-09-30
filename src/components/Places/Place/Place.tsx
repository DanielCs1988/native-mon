import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageURISource} from "react-native";

const Place = ({ name, image, onSelect }: Props) => (
    <TouchableOpacity onPress={onSelect}>
        <View style={styles.place}>
            <Image source={image as ImageURISource} style={styles.placeImage} />
            <Text>{name}</Text>
        </View>
    </TouchableOpacity>
);

export interface Props {
    name: string;
    image: string;
    onSelect: () => void;
}

const styles = StyleSheet.create({
    place: {
        width: '100%',
        padding: 10,
        margin: 5,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    placeImage: {
        marginRight: 8,
        width: 30,
        height: 30
    }
});

export default Place;