import { connect } from "react-redux";
import {AppState} from "../../store/types";
import {Credentials} from "../../models";
import {Actions} from "../../store/actions/auth";
import Auth from "../../components/Auth/Auth";
import {compose} from "recompose";
import withResponsivity from "../../hoc/withResponsivity/withResponsivity";

const mapStateToProps = ({ auth: { loading, token } }: AppState) => ({ loading, token });

const mapDispatchToProps = (dispatch: any) => ({
    onLogin: (authData: Credentials) => dispatch(Actions.initSignIn(authData)),
    onSignUp: (authData: Credentials) => dispatch(Actions.initSignUp(authData)),
    trySignIn: () => dispatch(Actions.autoSignIn())
});

const enhance = compose<any, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withResponsivity
);

export default enhance(Auth);