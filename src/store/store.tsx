import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import createSagaMiddleware from 'redux-saga';
import placeReducer from "./reducers/places";
import {AppState} from "./types";
import authReducer from "./reducers/auth";
import { rootSaga } from "./rootSaga";

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

export default store;