import React from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";

class PlaceInput extends React.Component<Props, State> {
    state = {
        placeName: ''
    };

    placeNameChangedHandler = (placeName: string) => {
        this.setState({ placeName });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim().length > 0) {
            this.props.onSubmit(this.state.placeName);
            this.setState({ placeName: '' });
        }
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeNameInput}
                    placeholder="An awesome place..."
                    onChangeText={this.placeNameChangedHandler}
                    value={this.state.placeName}
                />
                <View style={styles.placeNameBtn}>
                    <Button title="Add" onPress={this.placeSubmitHandler} />
                </View>
            </View>
        );
    }
}

export interface Props {
    onSubmit: (placeName: string) => void;
}
export interface State {
    placeName: string;
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeNameInput: {
        width: '70%'
    },
    placeNameBtn: {
        width: '30%'
    }
});

export default PlaceInput;