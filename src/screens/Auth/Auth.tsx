import { connect } from "react-redux";
import {AppState} from "../../store/types";
import {Credentials} from "../../models";
import {Actions} from "../../store/actions/auth";
import Auth from "../../components/Auth/Auth";

const mapStateToProps = ({ auth: { loading } }: AppState) => ({ loading });

const mapDispatchToProps = (dispatch: any) => ({
    onLogin: (authData: Credentials) => dispatch(Actions.initSignIn(authData)),
    onSignUp: (authData: Credentials) => dispatch(Actions.initSignUp(authData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);