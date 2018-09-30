import * as React from 'react';
import {
    TouchableOpacity, TouchableNativeFeedback, Text, View,
    Platform, StyleProp, ViewStyle, TextStyle, StyleSheet
} from 'react-native';

const StyledButton = ({ onPress, children, btnStyle, disabled, textStyle }: Props) => {
    const content = (
        <View style={[btnStyle, disabled? styles.disabled : null]}>
            <Text style={[textStyle, disabled? styles.disabledText : null]}>{children}</Text>
        </View>
    );
    if (disabled) {
        return content;
    }
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
};

export interface Props {
    onPress: () => void;
    children: JSX.Element | string;
    disabled?: boolean;
    btnStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: '#777',
        borderColor: '#AAA'
    },
    disabledText: {
        color: '#AAA'
    }
});

export default StyledButton;