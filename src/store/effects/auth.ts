import {call, put, takeLatest} from "redux-saga/effects";
import * as Api from './api';
import {Actions, INIT_LOGOUT, INIT_SIGN_IN, INIT_SIGN_UP} from "../actions/auth";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import {Credentials} from "../../models";

export function* authSagas() {
    yield takeLatest(INIT_SIGN_UP, signUp);
    yield takeLatest(INIT_SIGN_IN, signIn);
    yield takeLatest(INIT_LOGOUT, logout);
}

export function* signUp(action: any) {
    yield call(authenticate, action.payload, true);
}
export function* signIn(action: any) {
    yield call(authenticate, action.payload, true);
}

export function* authenticate(credentials: Credentials, isLogin: boolean) {
    try {
        yield put(Actions.authStarted());
        const authPayload = yield call(Api.authenticate, credentials, isLogin);
        yield put(Actions.authSuccess(authPayload));
        yield call(startMainTabs);
    } catch (error) {
        yield put(Actions.authFailed(error.message));
        yield call(alert, 'Invalid credentials!');
    }
}

export function* logout() {
    yield put(Actions.logout());
}