import React from 'react';
import {StyleSheet, ImageURISource} from "react-native";
import {Body, Left, ListItem, Thumbnail, Text} from "native-base";

type Props = {
    name: string;
    image: ImageURISource;
    onSelect: () => void;
}
const Place = ({ name, image, onSelect }: Props) => (
    <ListItem thumbnail onPress={onSelect} style={styles.place}>
        <Left>
            <Thumbnail square source={image} />
        </Left>
        <Body>
            <Text>{name}</Text>
        </Body>
    </ListItem>
);

const styles = StyleSheet.create({
    place: {
        marginBottom: 10
    }
});

export default Place;