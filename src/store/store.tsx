import * as React from 'react';
import {combineReducers, compose, createStore, Store} from "redux";
import placeReducer from "./reducers/places";
import {Provider} from "react-redux";
import App from "../containers/App";
import {AppState} from "./types";

const rootReducer = combineReducers({
    places: placeReducer
});

const composeEnhancers = __DEV__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store: Store<AppState> = createStore(rootReducer, composeEnhancers());

const AppWithStore = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppWithStore;