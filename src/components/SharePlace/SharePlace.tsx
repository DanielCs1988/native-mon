import * as React from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import Header from "../UI/Header/Header";
import imagePlaceholder from "../../assets/background.jpg";
import ImagePicker from "./ImagePicker/ImagePicker";
import StyledBtn from "../UI/StyledBtn/StyledBtn";
import {Navigator} from "react-native-navigation";
import LocationPicker from "./LocationPicker/LocationPicker";
import Input from "../UI/Input/Input";

class SharePlace extends React.Component<Props, {}> {
    state = {
        placeName: ''
    };

    constructor(props: Props) {
        super(props);
        props.navigator.setOnNavigatorEvent(event => {
            if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
                props.navigator.toggleDrawer({ side: 'left' });
            }
        });
    }


    newPlaceHandler = () => {
        if (this.state.placeName.trim().length > 0) {
            this.props.onNewPlace(this.state.placeName);
            this.setState({ placeName: '' });
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header>Share a place with us!</Header>
                    <ImagePicker image={imagePlaceholder} />
                    <LocationPicker location={imagePlaceholder} />
                    <Input
                        placeholder="An awesome place..."
                        value={this.state.placeName}
                        onChangeText={(placeName: string) => this.setState({ placeName })}
                    />
                    <StyledBtn title="Share the Place!" onPress={this.newPlaceHandler} />
                </View>
            </ScrollView>
        );
    }
}

export interface Props {
    onNewPlace: (name: string) => void;
    navigator: Navigator;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

export default SharePlace;