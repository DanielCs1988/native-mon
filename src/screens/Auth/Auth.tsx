import * as React from 'react';
import {View, StyleSheet, ImageBackground} from "react-native";
import startMainTabs from "../startMainTabs/startMainTabs";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";
import backgroundImage from "../../assets/background.jpg";
import BgButton from "../../components/UI/BgButton/BgButton";

class AuthScreen extends React.Component {
    loginHandler = () => {
        startMainTabs();
    };

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.bgImage}>
                <View style={styles.container}>
                    <Header>Please Log In</Header>
                    <BgButton onPress={() => {}} color="#29AAF4">Switch to Login</BgButton>
                    <View style={styles.inputContainer}>
                        <Input placeholder="Your email..." style={styles.input} />
                        <Input placeholder="Your password..." style={styles.input} />
                        <Input placeholder="Confirm your password..." style={styles.input} />
                    </View>
                    <BgButton onPress={this.loginHandler} color="#29AAF4">Submit</BgButton>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    bgImage: {
        flex: 1,
        width: '100%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    }
});

export default AuthScreen;