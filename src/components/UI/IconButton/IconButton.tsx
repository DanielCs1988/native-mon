import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const IconButton = ({ icon, color, size, onClick }: Props) => (
    <TouchableOpacity onPress={onClick}>
        <View style={styles.button}>
            <Icon size={size} color={color} name={icon} />
        </View>
    </TouchableOpacity>
);

export interface Props {
    icon: string;
    color: string;
    size: number;
    onClick: () => void;
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center'
    }
});

export default IconButton;