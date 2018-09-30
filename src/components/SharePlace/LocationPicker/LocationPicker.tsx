import * as React from 'react';
import StyledBtn from "../../UI/StyledBtn/StyledBtn";
import {Image, ImageSourcePropType, StyleSheet, View} from "react-native";

const LocationPicker = ({ location }: Props) => (
    <React.Fragment>
        <View style={styles.placeholder}>
            <Image source={location} style={styles.preview} />
        </View>
        <StyledBtn title="Locate Me" onPress={() => {}} />
    </React.Fragment>
);

export interface Props {
    location: ImageSourcePropType;
}

const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: 150,
        borderRadius: 10
    },
    preview: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
});

export default LocationPicker;