import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import Place from "./Place/Place";
import { Place as IPlace } from "../../models";

const Places = ({ places, onSelect }: Props) => (
    <FlatList
        style={styles.listContainer}
        data={places}
        renderItem={({ item: { key, name, image } }) => (
            <Place name={name} image={image} onClick={() => onSelect(key)}/>
        )}
    />
);

export interface Props {
    places: IPlace[];
    onSelect: (key: string) => void;
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'

    }
});

export default Places;