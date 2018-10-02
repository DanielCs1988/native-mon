import {all} from "redux-saga/effects";
import {authSagas} from "./effects/auth";
import {placesSagas} from "./effects/places";

export function* rootSaga() {
    yield all([
        authSagas(),
        placesSagas()
    ]);
}