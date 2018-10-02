import React from 'react';
import {View, Text, Image, ImageURISource, Platform, Dimensions} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {Place} from "../../models";
import {Navigator} from "react-native-navigation";
import MapView, { Marker } from 'react-native-maps';
import {PlatformIcon} from "../../utils";
import withResponsivity from "../../hoc/withResponsivity/withResponsivity";
import styles from "./PlaceDetails.styles";

const PlaceDetails = ({ place, viewMode, onRemovePlace, navigator }: Props) => (
    <View style={[styles.container, viewMode === 'landscape' ? styles.landscape : null]}>
        <View style={styles.imageAndMapContainer}>
            <View style={styles.subContainer}>
                <Image source={place.image as ImageURISource} style={styles.placeImage}/>
            </View>
            <View style={styles.subContainer}>
                <MapView style={styles.map} initialRegion={{
                    ...place.location,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
                }}>
                    <Marker coordinate={place.location} />
                </MapView>
            </View>
        </View>
        <View style={styles.subContainer}>
            <Text style={styles.placeName}>{place.name}</Text>
            <IconButton
                icon={PlatformIcon('trash')} color="red" size={30} style={styles.deleteBtn}
                onClick={() => {
                    onRemovePlace(place);
                    navigator.pop({
                        animationType: Platform.OS === 'android' ? 'slide-horizontal' : 'fade'
                    });
                }}
            />
        </View>
    </View>
);

export interface Props {
    place: Place;
    viewMode: string;
    onRemovePlace: (place: Place) => void;
    navigator: Navigator;
}

export default withResponsivity(PlaceDetails);