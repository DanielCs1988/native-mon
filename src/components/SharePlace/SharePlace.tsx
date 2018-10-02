import * as React from 'react';
import {View, StyleSheet, ScrollView, ImageURISource} from "react-native";
import Header from "../UI/Header/Header";
import ImagePickerForm from "./ImagePicker/ImagePickerForm";
import PositionedButton from "../UI/PositionedButton/PositionedButton";
import {Navigator} from "react-native-navigation";
import LocationPicker from "./LocationPicker/LocationPicker";
import Input from "../UI/Input/Input";
import {validate} from "../../utils";
import {LatLng} from "react-native-maps";
import {Place} from "../../models";
import Loader from "../../hoc/Loader/Loader";

class SharePlace extends React.Component<Props, any> {
    state = {
        placeName: {
            value: '',
            valid: false,
            touched: false,
            rules: {
                minLength: 1
            }
        },
        location: {
            value: null,
            valid: false
        },
        image: {
            value: null,
            valid: false
        }
    };

    constructor(props: Props) {
        super(props);
        props.navigator.setOnNavigatorEvent(event => {
            if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
                props.navigator.toggleDrawer({ side: 'left' });
            }
        });
    }

    changeHandler = (placeName: string) => {
        this.setState(prevState => ({
            placeName: {
                ...prevState.placeName,
                value: placeName,
                valid: validate(placeName, prevState.placeName.rules),
                touched: true
            }
        }));
    };

    locationPickedHandler = (coordinates: LatLng) => {
        this.setState({
            location: {
                value: coordinates,
                valid: true
            }
        });
    };

    imagePickedHandler = (image: ImageURISource) => {
        this.setState({
            image: {
                value: image,
                valid: true
            }
        });
    };

    newPlaceHandler = () => {
        this.props.onNewPlace({
            name: this.state.placeName.value,
            image: this.state.image.value!,
            location: this.state.location.value!
        });
    };

    render() {
        const { placeName, location, image } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header>Share a place with us!</Header>
                    <ImagePickerForm onImagePicked={this.imagePickedHandler} />
                    <LocationPicker onLocationPicked={this.locationPickedHandler} />
                    <Input
                        placeholder="An awesome place..."
                        value={placeName.value}
                        valid={placeName.valid}
                        touched={placeName.touched}
                        onChangeText={this.changeHandler}
                    />
                    <Loader loading={this.props.loading}>
                        <PositionedButton
                            title="Share the Place!"
                            onPress={this.newPlaceHandler}
                            disabled={!(placeName.valid && location.valid && image.valid)}
                        />
                    </Loader>
                </View>
            </ScrollView>
        );
    }
}

export interface Props {
    loading: boolean;
    onNewPlace: (place: Place) => void;
    navigator: Navigator;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

export default SharePlace;