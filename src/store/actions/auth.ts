import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";
import {AuthPayload, Credentials} from "../../models";

export enum ActionTypes {
    AUTO_SIGN_IN = 'AUTO_SIGN_IN',
    INIT_SIGN_UP = 'INIT_SIGN_UP',
    INIT_SIGN_IN = 'INIT_SIGN_IN',
    AUTH_STARTED = 'AUTH_STARTED',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    INIT_LOGOUT = 'INIT_LOGOUT',
    LOGOUT = 'LOGOUT'
}

export const Actions = {
    autoSignIn: () => createAction(ActionTypes.AUTO_SIGN_IN),
    initSignUp: (credentials: Credentials) => createAction(ActionTypes.INIT_SIGN_UP, credentials),
    initSignIn: (credentials: Credentials) => createAction(ActionTypes.INIT_SIGN_IN, credentials),
    authStarted: () => createAction(ActionTypes.AUTH_STARTED),
    authSuccess: (authPayload: AuthPayload) => createAction(ActionTypes.AUTH_SUCCESS, authPayload),
    authFailed: (error: string) => createAction(ActionTypes.AUTH_FAILED, error),
    initLogout: () => createAction(ActionTypes.INIT_LOGOUT),
    logout: () => createAction(ActionTypes.LOGOUT)
};

export type AuthActions = ActionsUnion<typeof Actions>;