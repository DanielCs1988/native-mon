import * as React from 'react';
import { AsyncStorage } from "react-native";
import {NavProp} from "../../../models";
import {Routes, StorageKeys} from "../../../constants";

type Props = NavProp & {
    token: string | null;
    trySignIn: () => void;
}
class AppLoading extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.checkStorage();
    }

    private checkStorage = async () => {
        const token = await AsyncStorage.getItem(StorageKeys.TOKEN);
        if (!token) {
            this.props.navigation.navigate(Routes.AUTHENTICATION);
        } else {
            this.props.trySignIn();
        }
    };

    componentDidUpdate() {
        if (this.props.token) {
            this.props.navigation.navigate(Routes.MAIN_APPLICATION);
        }
    }

    render() {
        return null;
    }
}

export default AppLoading;