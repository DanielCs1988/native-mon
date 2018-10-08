import React from 'react';
import {View, Text, Image, Dimensions} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {NavProp, Place} from "../../models";
import MapView, { Marker } from 'react-native-maps';
import {PlatformIcon} from "../../utils";
import styles from "./PlaceDetails.styles";

type Props = NavProp & {
    place: Place;
    viewMode: string;
    onRemovePlace: (place: Place) => void;
}
class PlaceDetails extends React.Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('place', {}).name || ''
    });

    render() {
        const { viewMode, onRemovePlace, navigation } = this.props;
        const place = navigation.getParam('place', {});
        return (
            <View style={[styles.container, viewMode === 'landscape' ? styles.landscape : null]}>
                <View style={styles.imageAndMapContainer}>
                    <View style={styles.subContainer}>
                        <Image source={place.image} style={styles.placeImage}/>
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
                            navigation.goBack();
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default PlaceDetails;