import * as React from 'react';
import {Image, ImageSourcePropType, ImageURISource, StyleSheet, View} from "react-native";
import {Button, Text} from "native-base";
import ImagePicker from 'react-native-image-picker';

type Props = {
    onImagePicked: (image: ImageURISource) => void;
}
type State = {
    pickedImage: ImageSourcePropType | null;
}
class ImagePickerForm extends React.Component<Props, State> {
    state = {
        pickedImage: null
    };

    reset = () => {
        this.setState({ pickedImage: null });
    };

    pickImageHandler = () => {
        ImagePicker.showImagePicker({
            title: 'Pick an Image',
            maxWidth: 800,
            maxHeight: 600
        }, res => {
            if (res.didCancel) { return; }
            if (res.error) { alert(res.error); }
            this.setState({
                pickedImage: { uri: res.uri }
            });
            this.props.onImagePicked({ uri: res.uri, body: res.data });
        });
    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage!} style={styles.preview} />
                </View>
                <Button rounded onPress={this.pickImageHandler} style={styles.imagePickerBtn}>
                    <Text>Pick Image</Text>
                </Button>
            </React.Fragment>
        );
    }
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
    },
    imagePickerBtn: {
        alignSelf: 'center',
        marginVertical: 8
    }
});

export default ImagePickerForm;