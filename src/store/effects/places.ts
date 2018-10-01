import {call, put, takeEvery} from "redux-saga/effects";
import {Actions, INIT_ADD_PLACE} from "../actions/places";
import * as Api from './api';

export function* placesSagas() {
    yield takeEvery(INIT_ADD_PLACE, sendPlace);
}

export function* sendPlace(action: any) {
    const place  = action.payload;
    try {
        yield put(Actions.addPlaceStarted());
        const data = yield call(Api.sendPlace, place);
        yield put(Actions.addPlaceSuccess({ ...place, key: data.name }));
    } catch (error) {
        yield put(Actions.addPlaceFailed(error.message));
    }
}