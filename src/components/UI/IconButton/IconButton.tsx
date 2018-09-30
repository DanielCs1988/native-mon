import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, StyleProp} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const IconButton = ({ icon, color, size, onClick, text, style }: Props) => (
    <TouchableOpacity onPress={onClick}>
        <View style={[styles.button, style]}>
            { text ? <Text style={styles.text}>{text}</Text> : null }
            <Icon size={size} color={color} name={icon} />
        </View>
    </TouchableOpacity>
);

export interface Props {
    icon: string;
    color: string;
    size: number;
    onClick: () => void;
    text?: string;
    style?: StyleProp<any>;
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    text: {
        marginRight: 10,
        fontSize: 20
    }
});

export default IconButton;