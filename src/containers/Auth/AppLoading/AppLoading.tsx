import {Actions} from "../../../store/actions/auth";
import {connect} from "react-redux";
import AppLoading from "../../../components/Auth/AppLoading/AppLoading";
import {AppState} from "../../../store/types";

const mapStateToProps = ({ auth: { token } }: AppState) => ({ token });

const mapDispatchToProps = (dispatch: Function) => ({
    trySignIn: () => dispatch(Actions.autoSignIn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppLoading);