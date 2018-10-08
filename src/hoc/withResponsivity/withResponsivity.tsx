import * as React from 'react';
import {Dimensions} from "react-native";

const initialState = {
    viewMode: Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
};
type State = Readonly<typeof initialState>;

const withResponsivity = (WrappedComponent: any) => class extends React.Component<any, State> {
    readonly state = initialState;

    constructor(props: any) {
        super(props);
        Dimensions.addEventListener('change', this.updateViewMode);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateViewMode);
    }

    private updateViewMode = (dims: any) => {
        this.setState({
            viewMode: dims.window.height > dims.window.width ? 'portrait' : 'landscape'
        });
    };

    render() {
        return <WrappedComponent {...this.props} viewMode={this.state.viewMode} />;
    }
};

export default withResponsivity;