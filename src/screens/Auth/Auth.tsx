import * as React from 'react';
import { View, StyleSheet, ImageBackground } from "react-native";
import startMainTabs from "../startMainTabs/startMainTabs";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";
import backgroundImage from "../../assets/background.jpg";
import BgButton from "../../components/UI/BgButton/BgButton";
import ResponsiveStyle from "../../hoc/ResponsiveStyle/ResponsiveStyle";
import withResponsivity from "../../hoc/withResponsivity/withResponsivity";

class AuthScreen extends React.Component<Props, {}> {
    loginHandler = () => {
        startMainTabs();
    };

    render() {
        const landscapeMode = this.props.viewMode === 'landscape';
        return (
            <ImageBackground source={backgroundImage} style={styles.bgImage}>
                <View style={styles.container}>
                    { landscapeMode ? null : <Header>Please Log In</Header> }
                    <BgButton onPress={() => {}} color="#29AAF4">Switch to Login</BgButton>
                    <Input placeholder="Your email..." style={styles.input} />
                    <ResponsiveStyle shouldStyle={landscapeMode} style={styles.passwordContainer}>
                        <Input
                            placeholder="Your password..."
                            style={[styles.input, landscapeMode ? styles.password : null]}
                        />
                        <Input
                            placeholder="Confirm your password..."
                            style={[styles.input, landscapeMode ? styles.password: null]}
                        />
                    </ResponsiveStyle>
                    <BgButton onPress={this.loginHandler} color="#29AAF4">Submit</BgButton>
                </View>
            </ImageBackground>
        );
    }
}

export interface Props {
    viewMode: string;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgImage: {
        flex: 1,
        width: '100%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#aaa',
        width: '80%'
    },
    password: {
        width: '45%'
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    }
});

export default withResponsivity(AuthScreen);