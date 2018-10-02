import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import {Place} from "../../models";

const mapDispatchToProps = (dispatch: Function) => ({
    onRemovePlace: (place: Place) => dispatch(Actions.initRemovePlace(place))
});

export default connect(
    null,
    mapDispatchToProps
)(PlaceDetails);