import * as React from 'react';
import { Spinner } from "native-base";

const Loader = ({ loading, children }: Props) => (
    loading ? <Spinner color="green" /> : children
);

export interface Props {
    loading: boolean;
    children: any;
}

export default Loader;