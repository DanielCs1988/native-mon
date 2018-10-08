import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import {Place} from "../../models";
import {compose, hoistStatics} from "recompose";
import withResponsivity from "../../hoc/withResponsivity/withResponsivity";

const mapDispatchToProps = (dispatch: Function) => ({
    onRemovePlace: (place: Place) => dispatch(Actions.initRemovePlace(place))
});

const enhance = compose<any, any>(
    connect(null, mapDispatchToProps),
    withResponsivity
);

export default hoistStatics(enhance)(PlaceDetails);