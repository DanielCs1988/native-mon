import {all, call, cancel, fork, put, select, take} from "redux-saga/effects";
import * as Api from './api';
import {AuthPayload, Credentials} from "../../models";
import {AsyncStorage} from "react-native";
import {getTokenAndExpiry} from "../reducers/auth";
import {StorageKeys} from "../../constants";
import {Actions, ActionTypes} from "../actions/auth";

export function* authFlow() {
    while (true) {
        const loginAction = yield take([
            ActionTypes.AUTO_SIGN_IN,
            ActionTypes.INIT_SIGN_IN,
            ActionTypes.INIT_SIGN_UP
        ]);
        let process;
        if (loginAction.type === ActionTypes.AUTO_SIGN_IN) {
            const autoLoginSuccess = yield call(autoSignIn);
            if (!autoLoginSuccess) { continue; }
        } else if (loginAction.type === ActionTypes.INIT_SIGN_IN) {
            process = yield fork(authenticate, loginAction.payload, true);
        } else {
            process = yield fork(authenticate, loginAction.payload, false);
        }

        const logoutAction = yield take([
            ActionTypes.INIT_LOGOUT,
            ActionTypes.AUTH_FAILED
        ]);
        if (process && process.isRunning()) {
            yield cancel(process);
        }
        if (logoutAction.type === ActionTypes.INIT_LOGOUT) {
            yield call(logout);
        }
    }
}

export function* saveAuthData(authPayload: AuthPayload) {
    const transformedPayload = {
        ...authPayload,
        expiresIn: new Date().getTime() + authPayload.expiresIn! * 1000
    };
    yield put(Actions.authSuccess({
        token: transformedPayload.token,
        userId: transformedPayload.userId,
        expiresIn: transformedPayload.expiresIn
    }));
    yield call(storeAuthPayload, transformedPayload);
}

export function* authenticate(credentials: Credentials, isLogin: boolean) {
    try {
        yield put(Actions.authStarted());
        const authPayload = yield call(Api.authenticate, credentials, isLogin);
        yield call(saveAuthData, authPayload);
    } catch (error) {
        yield put(Actions.authFailed(error.message));
    }
}

export function* logout() {
    yield put(Actions.logout());
    yield call(clearStorage);
}

export function* refreshToken() {
    const rfToken = yield call([AsyncStorage, 'getItem'], StorageKeys.REFRESH_TOKEN);
    const authPayload = yield call(Api.fetchNewToken, rfToken);
    yield call(saveAuthData, authPayload);
}

export function* autoSignIn() {
    const expiresIn = yield call([AsyncStorage, 'getItem'], StorageKeys.EXPIRES_IN);
    if (!expiresIn) {
        return false;
    }
    const now = new Date().getTime();
    if (+expiresIn < now) {
        yield call(refreshToken);
        return true;
    }
    const [ token, userId ] = yield all([
        call([AsyncStorage, 'getItem'], StorageKeys.TOKEN),
        call([AsyncStorage, 'getItem'], StorageKeys.USER_ID)
    ]);
    yield put(Actions.authSuccess({ token, userId, expiresIn }));
    return true;
}

export function* storeAuthPayload(authPayload: AuthPayload) {
    yield call([AsyncStorage, 'multiSet'], [
        [StorageKeys.TOKEN, authPayload.token],
        [StorageKeys.USER_ID, authPayload.userId],
        [StorageKeys.EXPIRES_IN, authPayload.expiresIn!.toString()],
        [StorageKeys.REFRESH_TOKEN, authPayload.refreshToken!]
    ]);
}

export function* clearStorage() {
    yield call([AsyncStorage, 'multiRemove'], [
        StorageKeys.TOKEN,
        StorageKeys.USER_ID,
        StorageKeys.EXPIRES_IN,
        StorageKeys.REFRESH_TOKEN
    ]);
}

export function* getToken() {
    const { token, expiresIn } = yield select(getTokenAndExpiry);
    if (expiresIn < new Date().getTime()) {
        yield call(refreshToken);
        const { token: freshToken } = yield select(getTokenAndExpiry);
        return freshToken;
    }
    return token;
}