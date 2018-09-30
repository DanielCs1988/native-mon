import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";

const mapDispatchToProps = (dispatch: Function) => ({
    onRemovePlace: (key: string) => dispatch(Actions.removePlace(key))
});

export default connect(
    null,
    mapDispatchToProps
)(PlaceDetails);