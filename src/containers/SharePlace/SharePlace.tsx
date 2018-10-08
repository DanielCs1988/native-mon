import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import SharePlace from "../../components/SharePlace/SharePlace";
import {Place} from "../../models";
import {AppState} from "../../store/types";

const mapStateToProps = ({ places: { loading, placeAdded } }: AppState) => ({ loading, placeAdded });

const mapDispatchToProps = (dispatch: Function) => ({
    onNewPlace: (place: Place) => dispatch(Actions.initAddPlace(place)),
    resetAddPlace: () => dispatch(Actions.addPlaceReset())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharePlace);