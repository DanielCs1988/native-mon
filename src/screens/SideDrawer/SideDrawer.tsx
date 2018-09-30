import * as React from 'react';
import {View, Dimensions, StyleSheet} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {PlatformIcon} from "../../utils";

class SideDrawer extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <IconButton icon={PlatformIcon('log-out')}
                            color="#AAA"
                            size={30}
                            style={styles.logoutBtn}
                            onClick={() => {}}
                            text="Logout"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        flex: 1
    },
    logoutBtn: {
        backgroundColor: '#EEE'
    }
});

export default SideDrawer;