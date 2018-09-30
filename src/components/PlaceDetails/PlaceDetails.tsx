import React from 'react';
import {View, Text, Image, ImageURISource, Platform, Dimensions} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {Place} from "../../models";
import {Navigator} from "react-native-navigation";
import MapView, { Marker } from 'react-native-maps';
import {PlatformIcon} from "../../utils";
import withResponsivity from "../../hoc/withResponsivity/withResponsivity";
import styles from "./PlaceDetails.styles";

const PlaceDetails = ({ place: { key, name, image, location }, viewMode, onRemovePlace, navigator }: Props) => (
    <View style={[styles.container, viewMode === 'landscape' ? styles.landscape : null]}>
        <View style={styles.imageAndMapContainer}>
            <View style={styles.subContainer}>
                <Image source={image as ImageURISource} style={styles.placeImage}/>
            </View>
            <View style={styles.subContainer}>
                <MapView style={styles.map} initialRegion={{
                    ...location,
                    latitudeDelta: 0.0122,
                    longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
                }}>
                    <Marker coordinate={location} />
                </MapView>
            </View>
        </View>
        <View style={styles.subContainer}>
            <Text style={styles.placeName}>{name}</Text>
            <IconButton
                icon={PlatformIcon('trash')} color="red" size={30} style={styles.deleteBtn}
                onClick={() => {
                    onRemovePlace(key);
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
    onRemovePlace: (key: string) => void;
    navigator: Navigator;
}

export default withResponsivity(PlaceDetails);