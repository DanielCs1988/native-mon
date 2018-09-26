import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaceInput from "./components/PlaceInput/PlaceInput";
import Places from "./components/Places/Places";

export default class App extends React.Component<{}, State> {
    state = {
        placeName: '',
        places: []
    };
    
    placeNameChangedHandler = (placeName: string) => {
        this.setState({ placeName });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim().length > 0) {
            this.setState(state => ({
                places: [ ...state.places, state.placeName ],
                placeName: ''
            }));
        }
    };
    
    render() {
        const { placeName, places } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to my Super-Duper App!</Text>
                <PlaceInput
                    value={placeName}
                    onChange={this.placeNameChangedHandler}
                    onSubmit={this.placeSubmitHandler}
                />
                <Places places={places} />
            </View>
        );
    }
}

export interface State {
    placeName: string;
    places: string[]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
