import * as React from 'react';
import {combineReducers, compose, createStore, Store} from "redux";
import placeReducer from "./reducers/places";
import {Provider} from "react-redux";
import {AppState} from "./types";
import Router from "../Router";

const rootReducer = combineReducers({
    places: placeReducer
});

const composeEnhancers = __DEV__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store: Store<AppState> = createStore(rootReducer, composeEnhancers());

const AppWithStore = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default AppWithStore;