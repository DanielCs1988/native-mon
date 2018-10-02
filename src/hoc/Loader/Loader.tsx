import * as React from 'react';
import { ActivityIndicator } from "react-native";

const Loader = ({ loading, children }: Props) => (
    loading ? <ActivityIndicator /> : children
);

export interface Props {
    loading: boolean;
    children: any;
}

export default Loader;