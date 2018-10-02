import * as React from 'react';
import {View, Dimensions, StyleSheet} from "react-native";
import IconButton from "../../components/UI/IconButton/IconButton";
import {PlatformIcon} from "../../utils";
import {connect} from "react-redux";
import {Actions} from "../../store/actions/auth";

class SideDrawer extends React.Component<Props, {}> {
    render() {
        return (
            <View style={styles.container}>
                <IconButton icon={PlatformIcon('log-out')}
                            color="#AAA"
                            size={30}
                            style={styles.logoutBtn}
                            onClick={this.props.onLogout}
                            text="Logout"
                />
            </View>
        );
    }
}

export interface Props {
    onLogout: () => void;
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

const mapDispatchToProps = (dispatch: Function) => ({
    onLogout: () => dispatch(Actions.initLogout())
});

export default connect(null, mapDispatchToProps)(SideDrawer);