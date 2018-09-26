import {AppRegistry} from 'react-native';
import {name as NativeMon} from './app.json';
import AppWithStore from "./src/store/store";

AppRegistry.registerComponent(NativeMon, () => AppWithStore);
