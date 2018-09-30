import * as React from 'react';
import {StyleSheet, TextInput} from "react-native";

const Input = (props: any) => (
    <TextInput {...props} autoCorrect={false} autoCapitalize="none" style={[
        styles.input,
        props.style,
        !props.valid && props.touched ? styles.invalid : null
    ]} />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginVertical: 8
    },
    invalid: {
        backgroundColor: '#F9C0C0',
        borderColor: 'red'
    }
});

export default Input;