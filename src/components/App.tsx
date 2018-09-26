import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaceInput from "./PlaceInput/PlaceInput";
import Places from "./Places/Places";
import { Place } from "../models";
import PlaceDetails from "./Places/PlaceDetails/PlaceDetails";

export const App = ({ places, selectedPlace, onNewPlace, onDeletePlace, onSelectPlace, onDeselectPlace }: Props) => (
    <View style={styles.container}>
        <PlaceDetails
            place={selectedPlace}
            onDelete={onDeletePlace}
            onClose={onDeselectPlace}
        />
        <Text style={styles.welcome}>Welcome to my Super-Duper App!</Text>
        <PlaceInput onSubmit={onNewPlace} />
        <Places places={places} onSelect={onSelectPlace} />
    </View>
);

export interface Props {
    places: Place[],
    selectedPlace: Place | null;
    onNewPlace: (name: string) => void;
    onDeletePlace: () => void;
    onSelectPlace: (key: string) => void;
    onDeselectPlace: () => void;
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

export default App;
