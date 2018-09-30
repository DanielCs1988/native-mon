import * as React from 'react';
import { View, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";
import backgroundImage from "../../assets/background.jpg";
import StyledButton from "../../components/UI/StyledButton/StyledButton";
import ResponsiveStyle from "../../hoc/ResponsiveStyle/ResponsiveStyle";
import withResponsivity from "../../hoc/withResponsivity/withResponsivity";
import styles from "./Auth.styles";
import {validate} from "../../utils";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import {AuthData} from "../../models";

class AuthScreen extends React.Component<Props, any> {
    state = {
        onLoginPage: true,
        formData: {
            email: {
                value: '',
                valid: false,
                touched: false,
                rules: {
                    isEmail: true
                }
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                rules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: '',
                valid: false,
                touched: false,
                rules: {
                    equalTo: ''
                }
            }
        }
    };

    loginHandler = () => {
        this.props.onLogin({
            email: this.state.formData.email.value,
            password: this.state.formData.password.value
        });
        startMainTabs();
    };

    changeHandler = (inputName: string, newValue: string) => {
        if (inputName === 'password') {
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    confirmPassword: {
                        ...prevState.formData.confirmPassword,
                        rules: {
                            ...prevState.formData.confirmPassword.rules,
                            equalTo: newValue
                        },
                        valid: validate(prevState.formData.confirmPassword.value, { equalTo: newValue })
                    }
                }
            }));
        }
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [inputName]: {
                    ...prevState.formData[inputName],
                    value: newValue,
                    valid: validate(newValue, prevState.formData[inputName].rules),
                    touched: true
                }
            }
        }));
    };

    render() {
        const landscapeMode = this.props.viewMode === 'landscape';
        const { formData: { email, password, confirmPassword }, onLoginPage } = this.state;
        return (
            <ImageBackground source={backgroundImage} style={styles.bgImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            { landscapeMode ? null : <Header>{ onLoginPage ? 'Please Log In!' : 'Sign Up Today!' }</Header> }
                            <StyledButton
                                onPress={() => this.setState(prevState => ({ onLoginPage: !prevState.onLoginPage }))}
                                btnStyle={styles.button}
                            >{ onLoginPage ? 'Switch to Registration' : 'Back to Login' }</StyledButton>
                            <Input
                                placeholder="Your email..."
                                style={styles.input}
                                value={email.value}
                                valid={email.valid}
                                touched={email.touched}
                                keyboardType="email-address"
                                onChangeText={val => this.changeHandler('email', val)}
                            />
                            <ResponsiveStyle shouldStyle={landscapeMode} style={styles.passwordContainer}>
                                <Input
                                    placeholder="Your password..."
                                    style={[styles.input, landscapeMode && !onLoginPage ? styles.password : null]}
                                    value={password.value}
                                    valid={password.valid}
                                    touched={password.touched}
                                    secureTextEntry
                                    onChangeText={val => this.changeHandler('password', val)}
                                />
                                {
                                    onLoginPage ? null :
                                        <Input
                                            placeholder="Confirm your password..."
                                            style={[styles.input, landscapeMode ? styles.password: null]}
                                            value={confirmPassword.value}
                                            valid={confirmPassword.valid}
                                            touched={confirmPassword.touched}
                                            secureTextEntry
                                            onChangeText={val => this.changeHandler('confirmPassword', val)}
                                        />
                                }
                            </ResponsiveStyle>
                            <StyledButton
                                onPress={this.loginHandler}
                                btnStyle={styles.button}
                                disabled={!(
                                    email.valid && password.valid &&
                                    (onLoginPage || confirmPassword.valid)
                                )}
                            >Submit</StyledButton>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

export interface Props {
    viewMode: string;
    onLogin: (authData: AuthData) => void;
}

export default withResponsivity(AuthScreen);