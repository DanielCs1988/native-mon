import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageURISource} from "react-native";

type Props = {
    name: string;
    image: ImageURISource;
    onSelect: () => void;
}
const Place = ({ name, image, onSelect }: Props) => (
    <TouchableOpacity onPress={onSelect}>
        <View style={styles.place}>
            <Image source={image} style={styles.placeImage} />
            <Text>{name}</Text>
        </View>
    </TouchableOpacity>
);

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