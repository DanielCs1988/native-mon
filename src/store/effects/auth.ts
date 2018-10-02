import {all, call, put, takeLatest} from "redux-saga/effects";
import * as Api from './api';
import {Actions, AUTO_SIGN_IN, INIT_LOGOUT, INIT_SIGN_IN, INIT_SIGN_UP} from "../actions/auth";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import {AuthPayload, Credentials} from "../../models";
import {AsyncStorage} from "react-native";

export function* authSagas() {
    yield takeLatest(INIT_SIGN_UP, signUp);
    yield takeLatest(INIT_SIGN_IN, signIn);
    yield takeLatest(INIT_LOGOUT, logout);
    yield takeLatest(AUTO_SIGN_IN, autoSignIn);
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
        yield all([
            put(Actions.authSuccess(authPayload)),
            call(storeAuthPayload, authPayload),
            call(startMainTabs)
        ]);
    } catch (error) {
        yield put(Actions.authFailed(error.message));
        yield call(alert, 'Invalid credentials!');
    }
}

export function* logout() {
    yield put(Actions.logout());
    yield call(clearStorage);
}

export function* autoSignIn() {
    const [ token, userId, expiresIn ] = yield call(readAuthPayloadFromStore);
    if (expiresIn < new Date().getTime()) {
        return call(clearStorage);
    }
    yield put(Actions.authSuccess({ token, userId, expiresIn }));
    yield call(startMainTabs);
}

export function* storeAuthPayload(authPayload: AuthPayload) {
    const expiresIn = new Date().getTime() + authPayload.expiresIn * 1000;
    yield call([AsyncStorage, 'multiSet'], [
        ['nm:auth:token', authPayload.token],
        ['nm:auth:userId', authPayload.userId],
        ['nm:auth:expiresIn', expiresIn.toString()]
    ]);
}

export function* readAuthPayloadFromStore() {
    return yield all([
        call([AsyncStorage, 'getItem'], 'nm:auth:token'),
        call([AsyncStorage, 'getItem'], 'nm:auth:userId'),
        call([AsyncStorage, 'getItem'], 'nm:auth:expiresIn')
    ]);
}

export function* clearStorage() {
    yield call([AsyncStorage, 'multiRemove'], [
        'nm:auth:token', 'nm:auth:userId', 'nm:auth:expiresIn'
    ]);
}