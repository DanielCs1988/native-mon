import React from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";

const PlaceInput = ({ value, onChange, onSubmit }: Props) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.placeNameInput}
            placeholder="An awesome place..."
            onChangeText={onChange}
            value={value}
        />
        <View style={styles.placeNameBtn}>
            <Button title="Add" onPress={onSubmit} />
        </View>
    </View>
);

export interface Props {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeNameInput: {
        width: '70%'
    },
    placeNameBtn: {
        width: '30%'
    }
});

export default PlaceInput;