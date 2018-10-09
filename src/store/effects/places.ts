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
        yield put(Actions.getPlacesFailed(error.message));
    }
}

export function* sendPlace(action) {
    const place  = action.payload;
    try {
        const token = yield call(getToken);
        yield put(Actions.addPlaceStarted());
        const { imageUrl } = yield call(Api.uploadImage, place.image, token);
        const image = { uri: imageUrl };
        const { name: key } = yield call(Api.sendPlace, { ...place, image }, token);
        yield put(Actions.addPlaceSuccess({ ...place, key, image }));
    } catch (error) {
        yield put(Actions.addPlaceFailed(error.message));
    }
}

export function* removePlace(action) {
    const place = action.payload;
    try {
        yield put(Actions.removePlaceSuccess(place.key));
        const token = yield call(getToken);
        yield call(Api.removePlace, place.key, token);
    } catch (error) {
        yield put(Actions.removePlaceFailed(place, error.message));
    }
}