import * as React from 'react';
import { applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./rootSaga";
import authReducer from "./reducers/auth";
import placeReducer from "./reducers/places";
import { AppState } from "./types";
import Router from '../router';

const rootReducer = combineReducers({
    places: placeReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = __DEV__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store: Store<AppState> = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

const AppWithStore = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default AppWithStore;