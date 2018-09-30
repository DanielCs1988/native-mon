import * as React from 'react';
import {StyleSheet, Text} from 'react-native';

const Header = (props: any) => (
    <Text {...props} style={[styles.header, props.style]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 14,
        backgroundColor: 'transparent'
    }
});

export default Header;