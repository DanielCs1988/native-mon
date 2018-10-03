import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import store from "./src/store/store";
import AuthScreen, { runApplication } from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetails from "./src/screens/PlaceDetails/PlaceDetails";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

Navigation.registerComponent('native-mon.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('native-mon.SharePlace', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('native-mon.FindPlace', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('native-mon.PlaceDetailScreen', () => PlaceDetails, store, Provider);
Navigation.registerComponent('native-mon.SideDrawer', () => SideDrawer, store, Provider);

runApplication();