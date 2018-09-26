import React from 'react';
import { View, Text } from "react-native";

const Place = ({ name }: Props) => (
    <View>
        <Text>{name}</Text>
    </View>
);

export interface Props {
    name: string;
}

export default Place;