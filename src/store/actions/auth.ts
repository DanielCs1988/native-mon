import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";
import {AuthPayload, Credentials} from "../../models";

export const INIT_SIGN_UP = 'INIT_SIGN_UP';
export const INIT_SIGN_IN = 'INIT_SIGN_IN';
export const AUTH_STARTED = 'AUTH_STARTED';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

export const INIT_LOGOUT = 'INIT_LOGOUT' ;
export const LOGOUT = 'LOGOUT';

export const Actions = {
    initSignUp: (credentials: Credentials) => createAction(INIT_SIGN_UP, credentials),
    initSignIn: (credentials: Credentials) => createAction(INIT_SIGN_IN, credentials),
    authStarted: () => createAction(AUTH_STARTED),
    authSuccess: (authPayload: AuthPayload) => createAction(AUTH_SUCCESS, authPayload),
    authFailed: (error: string) => createAction(AUTH_FAILED, error),
    initLogout: () => createAction(INIT_LOGOUT),
    logout: () => createAction(LOGOUT)
};

export type AuthActions = ActionsUnion<typeof Actions>;