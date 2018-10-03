import {all, call, cancel, fork, put, select, take} from "redux-saga/effects";
import * as Api from './api';
import * as fromActions from "../actions/auth";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import {AuthPayload, Credentials} from "../../models";
import {AsyncStorage} from "react-native";
import {runApplication} from "../../screens/Auth/Auth";
import {getTokenAndExpiry} from "../reducers/auth";

export function* authFlow() {
    while (true) {
        const loginAction = yield take([
            fromActions.AUTO_SIGN_IN,
            fromActions.INIT_SIGN_IN,
            fromActions.INIT_SIGN_UP
        ]);
        let process;
        if (loginAction.type === fromActions.AUTO_SIGN_IN) {
            const autoLoginSuccess = yield call(autoSignIn);
            if (!autoLoginSuccess) { continue; }
        } else if (loginAction.type === fromActions.INIT_SIGN_IN) {
            process = yield fork(authenticate, loginAction.payload, true);
        } else {
            process = yield fork(authenticate, loginAction.payload, false);
        }

        const logoutAction = yield take([
            fromActions.INIT_LOGOUT,
            fromActions.AUTH_FAILED
        ]);
        if (process && process.isRunning()) {
            yield cancel(process);
        }
        if (logoutAction === fromActions.INIT_LOGOUT) {
            yield call(logout);
        }
    }
}

export function* saveAuthData(authPayload: AuthPayload) {
    const transformedPayload = {
        ...authPayload,
        expiresIn: new Date().getTime() + authPayload.expiresIn! * 1000
    };
    yield put(fromActions.Actions.authSuccess({
        token: transformedPayload.token,
        userId: transformedPayload.userId,
        expiresIn: transformedPayload.expiresIn
    }));
    yield call(storeAuthPayload, transformedPayload);
}

export function* authenticate(credentials: Credentials, isLogin: boolean) {
    try {
        yield put(fromActions.Actions.authStarted());
        const authPayload = yield call(Api.authenticate, credentials, isLogin);
        yield call(saveAuthData, authPayload);
        yield call(startMainTabs);
    } catch (error) {
        yield put(fromActions.Actions.authFailed(error.message));
        yield call(alert, 'Invalid credentials!');
    }
}

export function* logout() {
    yield put(fromActions.Actions.logout());
    yield call(clearStorage);
    yield call(runApplication)
}

export function* refreshToken() {
    const rfToken = yield call([AsyncStorage, 'getItem'], 'nm:auth:refreshToken');
    const authPayload = yield call(Api.fetchNewToken, rfToken);
    yield call(saveAuthData, authPayload);
}

export function* autoSignIn() {
    const expiresIn = yield call([AsyncStorage, 'getItem'], 'nm:auth:expiresIn');
    if (!expiresIn) { return false; }
    const now = new Date().getTime();
    if (+expiresIn < now) {
        yield call(refreshToken);
        yield call(startMainTabs);
        return true;
    }
    const [ token, userId ] = yield all([
        call([AsyncStorage, 'getItem'], 'nm:auth:token'),
        call([AsyncStorage, 'getItem'], 'nm:auth:userId')
    ]);
    yield put(fromActions.Actions.authSuccess({ token, userId, expiresIn }));
    yield call(startMainTabs);
    return true;
}

export function* storeAuthPayload(authPayload: AuthPayload) {
    yield call([AsyncStorage, 'multiSet'], [
        ['nm:auth:token', authPayload.token],
        ['nm:auth:userId', authPayload.userId],
        ['nm:auth:expiresIn', authPayload.expiresIn!.toString()],
        ['nm:auth:refreshToken', authPayload.refreshToken!]
    ]);
}

export function* clearStorage() {
    yield call([AsyncStorage, 'multiRemove'], [
        'nm:auth:token', 'nm:auth:userId', 'nm:auth:expiresIn', 'nm:auth:refreshToken'
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