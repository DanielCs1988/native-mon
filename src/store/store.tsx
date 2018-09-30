import {combineReducers, compose, createStore, Store} from "redux";
import placeReducer from "./reducers/places";
import {AppState} from "./types";

const rootReducer = combineReducers({
    places: placeReducer
});

const composeEnhancers = __DEV__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store: Store<AppState> = createStore(rootReducer, composeEnhancers());

export default store;