import {AppState, AuthState} from "../types";
import * as fromActions from "../actions/auth";

export const initialState: AuthState = {
    token: null,
    userId: null,
    expiresIn: null,
    loading: false
};

const authReducer = (state = initialState, action: fromActions.AuthActions) => {
    switch (action.type) {
        case fromActions.AUTH_STARTED:
            return {
                ...state,
                loading: true
            };
        case fromActions.AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case fromActions.AUTH_FAILED:
            return {
                ...state,
                loading: false
            };
        case fromActions.LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export const getToken = (state: AppState) => {
    const token = state.auth.token;
    if (!token) {
        throw new Error('Token not found!');
    }
    return token;
};

export default authReducer;