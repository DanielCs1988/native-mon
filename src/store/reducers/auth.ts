import {AppState, AuthState} from "../types";
import {ActionTypes, AuthActions} from "../actions/auth";

export const initialState: AuthState = {
    token: null,
    userId: null,
    expiresIn: null,
    loading: false,
    error: null
};

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        case ActionTypes.AUTH_STARTED:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null
            };
        case ActionTypes.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ActionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export const getTokenAndExpiry = ({ auth: { token, expiresIn } }: AppState) => {
    if (!(token && expiresIn)) {
        throw new Error('Token not found!');
    }
    return { token, expiresIn };
};

export default authReducer;