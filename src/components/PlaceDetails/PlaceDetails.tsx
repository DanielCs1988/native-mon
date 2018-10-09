import React from 'react';
import {View, Image, Dimensions} from "react-native";
import {Button, Container, Content, H2, Icon, Text} from "native-base";
import {NavProp, Place} from "../../models";
import MapView, { Marker } from 'react-native-maps';
import {PlatformIcon} from "../../utils";
import styles from "./PlaceDetails.styles";
import NavBar from "../UI/NavBar/NavBar";

type Props = NavProp & {
    place: Place;
    viewMode: string;
    onRemovePlace: (place: Place) => void;
}
class PlaceDetails extends React.Component<Props> {
    render() {
        const { viewMode, onRemovePlace, navigation } = this.props;
        const place = navigation.getParam('place', {});
        return (
            <Container>
                <NavBar navigation={navigation} title={place.name} back />
                <Content contentContainerStyle={[styles.container, viewMode === 'landscape' ? styles.landscape : {}]}>
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
                        <H2 style={styles.placeName}>{place.name}</H2>
                        <Button iconLeft danger rounded style={styles.deleteBtn} onPress={() => {
                            onRemovePlace(place);
                            navigation.goBack();
                        }}>
                            <Icon name={PlatformIcon('trash')} />
                            <Text>Delete</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default PlaceDetails;