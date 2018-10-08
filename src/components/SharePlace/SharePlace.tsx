import * as React from 'react';
import {View, StyleSheet, ScrollView, ImageURISource} from "react-native";
import SplashScreen from 'react-native-splash-screen';
import ImagePickerForm from "./ImagePickerForm/ImagePickerForm";
import PositionedButton from "../UI/PositionedButton/PositionedButton";
import LocationPicker from "./LocationPicker/LocationPicker";
import Input from "../UI/Input/Input";
import {validate} from "../../utils";
import {LatLng} from "react-native-maps";
import {NavProp, Place} from "../../models";
import Loader from "../../hoc/Loader/Loader";
import {createRef} from "react";
import {Routes} from "../../constants";

type Props = NavProp & {
    loading: boolean;
    placeAdded: boolean;
    onNewPlace: (place: Place) => void;
    resetAddPlace: () => void;
}
const initialState = {
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
class SharePlace extends React.Component<Props, any> {
    readonly state = initialState;

    private imagePickerForm = createRef<ImagePickerForm>();
    private locationPicker = createRef<LocationPicker>();

    componentDidMount() {
        SplashScreen.hide();
    }

    componentDidUpdate() {
        if (this.props.placeAdded) {
            this.props.resetAddPlace();
            this.props.navigation.navigate(Routes.FIND_PLACE);
        }
    }

    private changeHandler = (placeName: string) => {
        this.setState(prevState => ({
            placeName: {
                ...prevState.placeName,
                value: placeName,
                valid: validate(placeName, prevState.placeName.rules),
                touched: true
            }
        }));
    };

    private locationPickedHandler = (coordinates: LatLng) => {
        this.setState({
            location: {
                value: coordinates,
                valid: true
            }
        });
    };

    private imagePickedHandler = (image: ImageURISource) => {
        this.setState({
            image: {
                value: image,
                valid: true
            }
        }, () => console.log('Callback can be called in SetState!'));
    };

    private newPlaceHandler = () => {
        this.props.onNewPlace({
            name: this.state.placeName.value,
            image: this.state.image.value!,
            location: this.state.location.value!
        });
        this.setState(initialState);
        this.imagePickerForm.current!.reset();
        this.locationPicker.current!.reset();
    };

    render() {
        const { placeName, location, image } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ImagePickerForm onImagePicked={this.imagePickedHandler} ref={this.imagePickerForm} />
                    <LocationPicker onLocationPicked={this.locationPickedHandler} ref={this.locationPicker} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center'
    }
});

export default SharePlace;