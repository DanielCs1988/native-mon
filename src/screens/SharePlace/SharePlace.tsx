import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import SharePlace from "../../components/SharePlace/SharePlace";
import {LatLng} from "react-native-maps";

const mapDispatchToProps = (dispatch: Function) => ({
    onNewPlace: (name: string, location: LatLng) => dispatch(Actions.addPlace(name, location)),
});

export default connect(
    null,
    mapDispatchToProps
)(SharePlace);