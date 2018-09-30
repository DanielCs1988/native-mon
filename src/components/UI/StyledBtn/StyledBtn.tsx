import * as React from 'react';
import {Button, StyleSheet, View} from "react-native";

const StyledBtn = (props: any) => (
    <View style={[styles.btn, props.style]}>
        <Button {...props} />
    </View>
);

const styles = StyleSheet.create({
    btn: {
        marginVertical: 8
    }
});

export default StyledBtn;