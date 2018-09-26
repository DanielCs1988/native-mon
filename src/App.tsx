import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaceInput from "./components/PlaceInput/PlaceInput";
import Places from "./components/Places/Places";
import { Place } from "./models";
// @ts-ignore
import SmexyImage from "./assets/edinburgh-castle.jpg";
import PlaceDetails from "./components/Places/PlaceDetails/PlaceDetails";

export default class App extends React.Component<{}, State> {
    state = {
        places: [],
        selectedPlace: null
    };

    placeSubmitHandler = (name: string) => {
        const newItem = {
            key: Math.random().toString(),
            name,
            image: SmexyImage
        };
        this.setState(state => ({ places: [...state.places, newItem] }));
    };

    placeSelectedHandler = (key: string) => {
        this.setState(state => ({
            selectedPlace: state.places.find(place => place.key === key) || null
        }));
    };

    placeDeletedHandler = () => {
        this.setState(state => ({
            places: state.places.filter(place => place.key !== state.selectedPlace!.key),
            selectedPlace: null
        }));
    };

    modalClosedHandler = () => {
        this.setState({ selectedPlace: null });
    };
    
    render() {
        return (
            <View style={styles.container}>
                <PlaceDetails
                    place={this.state.selectedPlace}
                    onDelete={this.placeDeletedHandler}
                    onClose={this.modalClosedHandler}
                />
                <Text style={styles.welcome}>Welcome to my Super-Duper App!</Text>
                <PlaceInput onSubmit={this.placeSubmitHandler} />
                <Places places={this.state.places} onSelect={this.placeSelectedHandler} />
            </View>
        );
    }
}

export interface State {
    places: Place[],
    selectedPlace: Place | null
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
