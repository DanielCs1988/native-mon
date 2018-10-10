import * as React from 'react';
import { ImageBackground } from "react-native";
import {Button, Container, Content, Form, H1, Icon, Input, Item, Text} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import backgroundImage from "../../assets/background.jpg";
import styles from "./Auth.styles";
import {showErrorMessage, validate} from "../../utils";
import {Credentials, NavProp} from "../../models";
import Loader from "../../hoc/Loader/Loader";
import {Routes} from "../../constants";

const initialState = {
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
type State = Readonly<typeof initialState>;
type Props = NavProp & {
    viewMode: string;
    loading: boolean;
    token: string;
    error: string;
    onLogin: (credentials: Credentials) => void;
    onSignUp: (credentials: Credentials) => void;
};
class AuthScreen extends React.Component<Props, State> {
    readonly state = initialState;

    componentDidMount() {
        SplashScreen.hide();
    }

    componentDidUpdate() {
        if (this.props.token) {
            this.props.navigation.navigate(Routes.MAIN_APPLICATION);
        }
        if (this.props.error) {
            showErrorMessage('Invalid credentials!');
        }
    }

    authHandler = () => {
        const credentials = {
            email: this.state.formData.email.value,
            password: this.state.formData.password.value
        };
        if (this.state.onLoginPage) {
            this.props.onLogin(credentials);
        } else {
            this.props.onSignUp(credentials);
        }
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
            <Container>
                <ImageBackground source={backgroundImage} style={styles.bgImage}>
                    <Content padder contentContainerStyle={styles.container}>
                        {
                            landscapeMode ? null :
                                <H1>{ onLoginPage ? 'Please Log In!' : 'Sign Up Today!' }</H1>
                        }
                        <Button rounded style={styles.button}
                                onPress={() => this.setState(prevState => ({ onLoginPage: !prevState.onLoginPage }))}>
                            <Text>{ onLoginPage ? 'Switch to Registration' : 'Back to Login' }</Text>
                        </Button>
                        <Form>
                            <Item rounded success={email.valid} style={styles.input}>
                                <Input
                                    autoCorrect={false} autoCapitalize="none"
                                    value={email.value}
                                    placeholder="Your email..."
                                    keyboardType="email-address"
                                    onChangeText={val => this.changeHandler('email', val)}
                                />
                                <Icon name="checkmark-circle" />
                            </Item>
                            <Item rounded success={password.valid} style={styles.input}>
                                <Input
                                    value={password.value}
                                    secureTextEntry autoCorrect={false} autoCapitalize="none"
                                    placeholder="Your password..."
                                    onChangeText={val => this.changeHandler('password', val)}
                                />
                                <Icon name="checkmark-circle" />
                            </Item>
                            {
                                onLoginPage ? null :
                                    <Item rounded success={confirmPassword.valid} style={styles.input}>
                                        <Input
                                            value={confirmPassword.value}
                                            secureTextEntry autoCorrect={false} autoCapitalize="none"
                                            placeholder="Please repeat your password..."
                                            onChangeText={val => this.changeHandler('confirmPassword', val)}
                                        />
                                        <Icon name="checkmark-circle" />
                                    </Item>
                            }
                        </Form>
                        <Loader loading={this.props.loading}>
                            <Button rounded style={styles.button}
                                    onPress={this.authHandler}
                                    disabled={!(
                                        email.valid && password.valid &&
                                        (onLoginPage || confirmPassword.valid)
                                    )}>
                                <Text>Submit</Text>
                            </Button>
                        </Loader>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

export default AuthScreen;