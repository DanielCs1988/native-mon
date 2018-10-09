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
import SideDrawer from "./containers/SideDrawer/SideDrawer";
import TabBar from "./components/UI/TabBar/TabBar";

const FindPlaceStack = createStackNavigator(
    {
        [Routes.FIND_PLACE]: FindPlace,
        [Routes.PLACE_DETAILS]: PlaceDetails
    },
    {
        initialRouteName: Routes.FIND_PLACE,
        navigationOptions: {
            header: null
        }
    }
);

const MainApplication = createBottomTabNavigator(
    {
        [Routes.SHARE_PLACE]: SharePlace,
        [Routes.FIND_PLACE_STACK]: FindPlaceStack
    },
    {
        initialRouteName: Routes.SHARE_PLACE,
        tabBarComponent: props => <TabBar {...props} />
    }
);

const Drawer = createDrawerNavigator(
    {
        [Routes.MAIN_APPLICATION]: MainApplication
    },
    {
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