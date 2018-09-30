import {AppState} from "../../store/types";
import {connect} from "react-redux";
import Places from "../../components/Places/Places";

const mapStateToProps = ({ places: { places } }: AppState) => ({ places });

export default connect(
    mapStateToProps
)(Places);