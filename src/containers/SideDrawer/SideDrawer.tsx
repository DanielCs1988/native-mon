import * as React from 'react';
import {Image} from "react-native";
import {connect} from "react-redux";
import {Actions} from "../../store/actions/auth";
import {NavProp} from "../../models";
import {AppState} from "../../store/types";
import {Routes} from "../../constants";
import {Container, Content, Icon, Left, List, ListItem, Text} from "native-base";
import {PlatformIcon} from "../../utils";
import styles from './SideDrawer.styles';
import DrawerBg from '../../assets/drawer-bg.jpg';
import DrawerLogo from '../../assets/drawer-logo.png';

const MenuPoints = [
    {
        name: 'Share Place',
        route: Routes.SHARE_PLACE,
        icon: PlatformIcon('share')
    },
    {
        name: 'Find Place',
        route: Routes.FIND_PLACE_STACK,
        icon: PlatformIcon('map')
    },
    {
        name: 'Logout',
        route: null,
        icon: PlatformIcon('log-out')
    }
];

type Props = NavProp & {
    token: string | null;
    onLogout: () => void;
}
class SideDrawer extends React.Component<Props, {}> {
    componentDidUpdate() {
        if (!this.props.token) {
            this.props.navigation.navigate(Routes.AUTHENTICATION);
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Image source={DrawerBg} style={styles.drawerBg} />
                    <Image source={DrawerLogo} style={styles.drawerLogo} />
                    <List
                        contentContainerStyle={styles.drawerContent}
                        dataArray={MenuPoints}
                        renderRow={item => (
                            <ListItem button onPress={() => {
                                if (item.route) {
                                    this.props.navigation.navigate(item.route);
                                } else {
                                    this.props.onLogout();
                                }
                            }}>
                                <Left>
                                    <Icon name={item.icon} active style={styles.icon} />
                                    <Text style={styles.text}>{item.name}</Text>
                                </Left>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth: { token } }: AppState) => ({ token });
const mapDispatchToProps = (dispatch: Function) => ({
    onLogout: () => dispatch(Actions.initLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);