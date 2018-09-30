import { connect } from "react-redux";
import {AppState} from "../../store/types";
import {AuthData} from "../../models";
import {Actions} from "../../store/actions/auth";
import Auth from "../../components/Auth/Auth";

const mapStateToProps = ({ auth }: AppState) => ({
    auth
});

const mapDispatchToProps = (dispatch: any) => ({
    onLogin: (authData: AuthData) => dispatch(Actions.tryAuth(authData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);