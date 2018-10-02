import {AppState} from "../../store/types";
import {connect} from "react-redux";
import Places from "../../components/Places/Places";
import {Actions} from "../../store/actions/places";

const mapStateToProps = ({ places: { places } }: AppState) => ({ places });

const mapDispatchToProps = (dispatch: Function) => ({
    getPlaces: () => dispatch(Actions.initGetPlaces())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Places);