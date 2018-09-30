import * as React from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import Header from "../UI/Header/Header";
import imagePlaceholder from "../../assets/background.jpg";
import ImagePicker from "./ImagePicker/ImagePicker";
import PositionedButton from "../UI/PositionedButton/PositionedButton";
import {Navigator} from "react-native-navigation";
import LocationPicker from "./LocationPicker/LocationPicker";
import Input from "../UI/Input/Input";
import {validate} from "../../utils";
import {LatLng} from "react-native-maps";

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
        })
    };

    newPlaceHandler = () => {
        this.props.onNewPlace(
            this.state.placeName.value,
            this.state.location.value!
        );
        this.setState({ placeName: '' });
    };

    render() {
        const { placeName, location } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header>Share a place with us!</Header>
                    <ImagePicker image={imagePlaceholder} />
                    <LocationPicker onLocationPicked={this.locationPickedHandler} />
                    <Input
                        placeholder="An awesome place..."
                        value={placeName.value}
                        valid={placeName.valid}
                        touched={placeName.touched}
                        onChangeText={this.changeHandler}
                    />
                    <PositionedButton
                        title="Share the Place!"
                        onPress={this.newPlaceHandler}
                        disabled={!(placeName.valid && location.valid)}
                    />
                </View>
            </ScrollView>
        );
    }
}

export interface Props {
    onNewPlace: (name: string, location: LatLng) => void;
    navigator: Navigator;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

export default SharePlace;