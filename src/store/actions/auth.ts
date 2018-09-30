import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";
import {AuthData} from "../../models";

export const TRY_AUTH = 'TRY_AUTH';

export const Actions = {
    tryAuth: (authData: AuthData) => createAction(TRY_AUTH, authData)
};

export type AuthActions = ActionsUnion<typeof Actions>;