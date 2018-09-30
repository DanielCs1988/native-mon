import * as React from 'react';
import PositionedButton from "../../UI/PositionedButton/PositionedButton";
import {Dimensions, StyleSheet, View} from "react-native";
import MapView, {Region, Marker, LatLng} from 'react-native-maps';
import {createRef} from "react";

class LocationPicker extends React.Component<Props, State> {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
        locationPicked: false
    };

    private map = createRef<MapView>();
    
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
                <PositionedButton title="Locate Me" onPress={this.getLocationHandler} />
            </View>
        );
    }
}

export interface Props {
    onLocationPicked: (coordinates: LatLng) => void;
}
export interface State {
    focusedLocation: Region;
    locationPicked: boolean;
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: 250
    }
});

export default LocationPicker;