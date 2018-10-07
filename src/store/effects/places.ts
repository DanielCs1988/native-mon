import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as Api from './api';
import { getToken } from "./auth";
import { Actions, ActionTypes } from "../actions/places";

export function* placesSagas() {
    yield takeLatest(ActionTypes.INIT_GET_PLACES, getPlaces);
    yield takeEvery(ActionTypes.INIT_ADD_PLACE, sendPlace);
    yield takeEvery(ActionTypes.INIT_REMOVE_PLACE, removePlace);
}

export function* getPlaces() {
    try {
        const token = yield call(getToken);
        const data = yield call(Api.fetchPlaces, token);
        const places = Object.keys(data).map(key => ({ ...data[key], key }));
        yield put(Actions.getPlacesSuccess(places));
    } catch (error) {
        yield put(Actions.addPlaceFailed(error.message));
        yield call(alert, error.message);
    }
}

export function* sendPlace(action: any) {
    const place  = action.payload;
    try {
        const token = yield call(getToken);
        yield put(Actions.addPlaceStarted());
        const { imageUrl } = yield call(Api.uploadImage, place.image, token);
        const image = { uri: imageUrl };
        const data = yield call(Api.sendPlace, { ...place, image }, token);
        yield put(Actions.addPlaceSuccess({ ...place, key: data.name, image }));
    } catch (error) {
        yield call(handleSendingError, error);
    }
}

export function* handleSendingError(error: Error) {
    yield put(Actions.addPlaceFailed(error.message));
    yield call(alert, error.message);
}

export function* removePlace(action: any) {
    const place = action.payload;
    try {
        yield put(Actions.removePlaceSuccess(place.key));
        const token = yield call(getToken);
        yield call(Api.removePlace, place.key, token);
    } catch (error) {
        yield put(Actions.removePlaceFailed(place));
        yield call(alert, error.message);
    }
}