import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {PlatformIcon} from "../../utils";

const startMainTabs = async () => {
    const [ findIcon, shareIcon, toggle ] = await Promise.all([
        Icon.getImageSource(PlatformIcon('map'), 30),
        Icon.getImageSource(PlatformIcon('share'), 30),
        Icon.getImageSource(PlatformIcon('menu'), 30)
    ]);
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: 'native-mon.SharePlace',
                label: 'Share Place',
                title: 'Share Place',
                icon: shareIcon,
                navigatorButtons: {
                    leftButtons: [{
                        icon: toggle,
                        title: 'Menu',
                        id: 'sideDrawerToggle'
                    }]
                }
            },
            {
                screen: 'native-mon.FindPlace',
                label: 'Find Place',
                title: 'Find Place',
                icon: findIcon,
                navigatorButtons: {
                    leftButtons: [{
                        icon: toggle,
                        title: 'Menu',
                        id: 'sideDrawerToggle'
                    }]
                }
            }
        ],
        drawer: {
            left: {
                screen: 'native-mon.SideDrawer'
            }
        }
    });
};

export default startMainTabs;