import { connect } from 'react-redux';
import { AppState } from "../store/types";
import { Actions } from "../store/actions/places";
import App from "../components/App";

const mapStateToProps = ({ places: { places, selectedPlace } }: AppState) => ({
    places, selectedPlace
});

const mapDispatchToProps = (dispatch: Function) => ({
    onNewPlace: (name: string) => dispatch(Actions.addPlace(name)),
    onDeletePlace: () => dispatch(Actions.removePlace()),
    onSelectPlace: (key: string) => dispatch(Actions.selectPlace(key)),
    onDeselectPlace: () => dispatch(Actions.deselectPlace())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);