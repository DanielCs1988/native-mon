import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import {Actions, INIT_ADD_PLACE, INIT_GET_PLACES, INIT_REMOVE_PLACE} from "../actions/places";
import * as Api from './api';

export function* placesSagas() {
    yield takeLatest(INIT_GET_PLACES, getPlaces);
    yield takeEvery(INIT_ADD_PLACE, sendPlace);
    yield takeEvery(INIT_REMOVE_PLACE, removePlace);
}

export function* getPlaces() {
    try {
        const data = yield call(Api.fetchPlaces);
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
        yield put(Actions.addPlaceStarted());
        const { imageUrl } = yield call(Api.uploadImage, place.image);
        const image = { uri: imageUrl };
        const data = yield call(Api.sendPlace, { ...place, image });
        yield put(Actions.addPlaceSuccess({ ...place, key: data.name, image }));
    } catch (error) {
        yield put(Actions.addPlaceFailed(error.message));
        yield call(alert, error.message);
    }
}

export function* removePlace(action: any) {
    const place = action.payload;
    try {
        yield put(Actions.removePlaceSuccess(place.key));
        yield call(Api.removeImage, place.key);
    } catch (error) {
        yield put(Actions.removePlaceFailed(place));
        yield call(alert, error.message);
    }
}