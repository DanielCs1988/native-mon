import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import SharePlace from "../../components/SharePlace/SharePlace";
import {Place} from "../../models";

const mapDispatchToProps = (dispatch: Function) => ({
    onNewPlace: (place: Place) => dispatch(Actions.initAddPlace(place)),
});

export default connect(
    null,
    mapDispatchToProps
)(SharePlace);