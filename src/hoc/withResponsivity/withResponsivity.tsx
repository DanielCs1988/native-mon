import * as React from 'react';
import {Dimensions} from "react-native";

const withResponsivity = (WrappedComponent: any) => class extends React.Component<{}, State> {
    state = {
        viewMode: Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
    };

    constructor(props: any) {
        super(props);
        Dimensions.addEventListener('change', this.updateViewMode);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateViewMode);
    }

    updateViewMode = (dims: any) => {
        this.setState({
            viewMode: dims.window.height > dims.window.width ? 'portrait' : 'landscape'
        });
    };

    render() {
        return <WrappedComponent {...this.props} viewMode={this.state.viewMode} />;
    }
};

export interface State {
    viewMode: string;
}

export default withResponsivity;