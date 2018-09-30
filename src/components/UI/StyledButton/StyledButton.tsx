import * as React from 'react';
import {
    TouchableOpacity, TouchableNativeFeedback, Text, View,
    Platform, StyleProp, ViewStyle, TextStyle
} from 'react-native';

const StyledButton = ({ onPress, children, btnStyle, textStyle }: Props) => {
    const content = (
        <View style={btnStyle}>
            <Text style={textStyle}>{children}</Text>
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
    btnStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default StyledButton;