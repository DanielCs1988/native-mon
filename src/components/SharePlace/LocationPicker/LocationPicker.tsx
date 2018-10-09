import * as React from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import {Button, Text} from "native-base";
import MapView, { Marker, LatLng } from 'react-native-maps';

const initialState = {
    focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    },
    locationPicked: false
};
type State = Readonly<typeof initialState>;
type Props = {
    onLocationPicked: (coordinates: LatLng) => void;
}
class LocationPicker extends React.Component<Props, State> {
    readonly state = initialState;

    private map = React.createRef<MapView>();

    reset = () => {
        this.setState(initialState);
    };
    
    pickLocationHandler = ({ nativeEvent: { coordinate: { latitude, longitude } } }) => {
        this.map.current!.animateToRegion({
            ...this.state.focusedLocation,
            latitude, longitude
        }, 300);
        this.setState(prevState => ({
            focusedLocation: {
                ...prevState.focusedLocation,
                latitude, longitude
            },
            locationPicked: true
        }));
        this.props.onLocationPicked({ latitude, longitude });
    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            this.pickLocationHandler({
                nativeEvent: {
                    coordinate: { latitude, longitude }
                }
            });
        }, (err) => alert(err.message));
    };

    render() {
        const { focusedLocation, locationPicked } = this.state;
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={focusedLocation}
                    style={styles.map}
                    ref={this.map}
                    // @ts-ignore
                    onPress={this.pickLocationHandler}
                >{
                        locationPicked ? <Marker coordinate={focusedLocation} /> : null
                }</MapView>
                <Button rounded onPress={this.getLocationHandler} style={styles.locateMeBtn}>
                    <Text>Locate Me</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: 250
    },
    locateMeBtn: {
        alignSelf: 'center',
        marginVertical: 8
    }
});

export default LocationPicker;