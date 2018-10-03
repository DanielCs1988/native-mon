import { connect } from "react-redux";
import {AppState} from "../../store/types";
import {Credentials} from "../../models";
import {Actions} from "../../store/actions/auth";
import Auth from "../../components/Auth/Auth";
import {Navigation} from "react-native-navigation";

export const runApplication = () => Navigation.startSingleScreenApp({
    screen: {
        screen: 'native-mon.AuthScreen',
        title: 'Login'
    }
});

const mapStateToProps = ({ auth: { loading } }: AppState) => ({ loading });

const mapDispatchToProps = (dispatch: any) => ({
    onLogin: (authData: Credentials) => dispatch(Actions.initSignIn(authData)),
    onSignUp: (authData: Credentials) => dispatch(Actions.initSignUp(authData)),
    trySignIn: () => dispatch(Actions.autoSignIn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);