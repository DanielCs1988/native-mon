import {all} from "redux-saga/effects";
import {authFlow} from "./effects/auth";
import {placesSagas} from "./effects/places";

export function* rootSaga() {
    yield all([
        authFlow(),
        placesSagas()
    ]);
}