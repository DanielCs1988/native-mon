import {AuthState} from "../types";
import { AuthActions } from "../actions/auth";

export const initialState: AuthState = {

};

const authReducer = (state = initialState, action: AuthActions) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default authReducer;