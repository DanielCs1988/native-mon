import * as React from 'react';
import {StyleProp, View, ViewStyle} from "react-native";

const ResponsiveStyle = ({ shouldStyle, style, children }: Props) => {
    if (shouldStyle) {
        return <View style={style}>{children}</View>;
    }
    return children;
};

export interface Props {
    shouldStyle: boolean;
    style: StyleProp<ViewStyle>;
    children: any;
}

export default ResponsiveStyle;