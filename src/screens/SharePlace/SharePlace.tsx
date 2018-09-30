import {Actions} from "../../store/actions/places";
import {connect} from "react-redux";
import SharePlace from "../../components/SharePlace/SharePlace";

const mapDispatchToProps = (dispatch: Function) => ({
    onNewPlace: (name: string) => dispatch(Actions.addPlace(name)),
});

export default connect(
    null,
    mapDispatchToProps
)(SharePlace);