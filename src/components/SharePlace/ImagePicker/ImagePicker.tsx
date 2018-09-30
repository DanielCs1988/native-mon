import * as React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from "react-native";
import StyledBtn from "../../UI/StyledBtn/StyledBtn";

const ImagePicker = ({ image }: Props) => (
    <React.Fragment>
        <View style={styles.placeholder}>
            <Image source={image} style={styles.preview} />
        </View>
        <StyledBtn title="Pick Image" onPress={() => {}} />
    </React.Fragment>
);

export interface Props {
    image: ImageSourcePropType;
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

export default ImagePicker;