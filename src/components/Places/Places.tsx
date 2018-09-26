import React from 'react';
import { View } from "react-native";
import Place from "./Place/Place";

const Places = ({ places }: Props) => (
    <View>{
        places.map((place, index) => <Place key={index} name={place} />)
    }</View>
);

export interface Props {
    places: string[];
}

export default Places;