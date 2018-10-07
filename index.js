import {AppRegistry} from 'react-native';
import {name as AppName} from './app.json';
import AppWithStore from "./src/store/store";

AppRegistry.registerComponent(AppName, () => AppWithStore);