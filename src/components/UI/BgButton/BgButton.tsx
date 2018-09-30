import * as React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform} from 'react-native';

const BgButton = ({ onPress, children, color }: Props) => {
    const content = (
        <View style={[styles.button, {backgroundColor: color}]}>
            <Text>{children}</Text>
        </View>
    );
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
};

export interface Props {
    onPress: () => void;
    children: JSX.Element | string;
    color?: string;
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777'
    }
});

export default BgButton;