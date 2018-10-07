import * as React from 'react';
import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";
import AppLoading from "./containers/Auth/AppLoading/AppLoading";
import Auth from "./containers/Auth/Auth";
import SharePlace from "./containers/SharePlace/SharePlace";
import FindPlace from "./containers/FindPlace/FindPlace";
import {Routes} from "./constants";
import PlaceDetails from "./containers/PlaceDetails/PlaceDetails";
import Icon from "react-native-vector-icons/Ionicons";
import {PlatformIcon} from "./utils";
import SideDrawer from "./containers/SideDrawer/SideDrawer";
import DrawerToggle from "./components/UI/DrawerToggle/DrawerToggle";

const TabIconNames = {
    [Routes.FIND_PLACE_STACK]: PlatformIcon('map'),
    [Routes.SHARE_PLACE_STACK]: PlatformIcon('share')
};

const SharePlaceStack = createStackNavigator(
    {
        [Routes.SHARE_PLACE]: SharePlace
    },
    {
        navigationOptions: ({ navigation }) => ({
            title: 'Share a place with us!',
            headerRight: <DrawerToggle navigation={navigation} />
        })
    }
);

const FindPlaceStack = createStackNavigator(
    {
        [Routes.FIND_PLACE]: FindPlace,
        [Routes.PLACE_DETAILS]: PlaceDetails
    },
    {
        initialRouteName: Routes.FIND_PLACE,
        navigationOptions: ({ navigation }) => ({
            headerRight: <DrawerToggle navigation={navigation} />
        })
    }
);

const MainApplication = createBottomTabNavigator(
    {
        [Routes.SHARE_PLACE_STACK]: SharePlaceStack,
        [Routes.FIND_PLACE_STACK]: FindPlaceStack
    },
    {
        initialRouteName: Routes.SHARE_PLACE_STACK,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name={TabIconNames[navigation.state.routeName]}
                    color={tintColor!}
                    size={30}
                />
            )
        })
    }
);

const Drawer = createDrawerNavigator(
    {
        [Routes.MAIN_APPLICATION]: MainApplication
    },
    {
        initialRouteName: Routes.MAIN_APPLICATION,
        contentComponent: props => <SideDrawer {...props} />
    }
);

const AuthRoutes = createSwitchNavigator(
    {
        [Routes.APP_LOADING]: AppLoading,
        [Routes.AUTHENTICATION]: Auth,
        [Routes.MAIN_APPLICATION]: Drawer
    },
    {
        initialRouteName: Routes.APP_LOADING
    }
);

export default AuthRoutes;