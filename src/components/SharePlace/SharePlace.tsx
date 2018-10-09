import * as React from 'react';
import {StyleSheet, ImageURISource} from "react-native";
import {Button, Item, Input, Text, Label, Icon, Container, Content} from "native-base";
import SplashScreen from 'react-native-splash-screen';
import ImagePickerForm from "./ImagePickerForm/ImagePickerForm";
import LocationPicker from "./LocationPicker/LocationPicker";
import {showErrorMessage, validate} from "../../utils";
import {LatLng} from "react-native-maps";
import {NavProp, Place} from "../../models";
import Loader from "../../hoc/Loader/Loader";
import {createRef} from "react";
import {Routes} from "../../constants";
import NavBar from "../UI/NavBar/NavBar";

type Props = NavProp & {
    loading: boolean;
    placeAdded: boolean;
    error: string | null;
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
        if (this.props.error) {
            showErrorMessage(this.props.error);
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
        });
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
            <Container>
                <NavBar navigation={this.props.navigation} title="Share a Place"/>
                <Content padder contentContainerStyle={styles.container}>
                    <ImagePickerForm onImagePicked={this.imagePickedHandler} ref={this.imagePickerForm} />
                    <LocationPicker onLocationPicked={this.locationPickedHandler} ref={this.locationPicker} />
                    <Item floatingLabel success={placeName.valid} style={styles.placeNameInput}>
                        <Label>An awesome place</Label>
                        <Input value={placeName.value} onChangeText={this.changeHandler} />
                        <Icon name="checkmark-circle" />
                    </Item>
                    <Loader loading={this.props.loading}>
                        <Button success rounded
                                style={styles.submitBtn}
                                onPress={this.newPlaceHandler}
                                disabled={!(placeName.valid && location.valid && image.valid)}>
                            <Text>Share the Place!</Text>
                        </Button>
                    </Loader>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        alignItems: 'center'
    },
    submitBtn: {
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 16
    },
    placeNameInput: {
        marginVertical: 16
    }
});

export default SharePlace;