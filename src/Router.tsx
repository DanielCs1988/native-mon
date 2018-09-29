import {createStackNavigator} from "react-navigation";
import App from "./containers/App";

const Router = createStackNavigator({
    Home: App
}, {
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
});

export default Router;