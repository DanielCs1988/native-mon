import * as React from 'react';
import {StyleSheet, TextInput} from "react-native";

const Input = (props: any) => (
    <TextInput {...props} style={[styles.input, props.style]} />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginVertical: 8
    }
});

export default Input;