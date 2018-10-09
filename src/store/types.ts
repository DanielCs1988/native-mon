import {Place} from "../models";
import {PlaceActions} from "./actions/places";
import {AuthActions} from "./actions/auth";

export interface PlaceState {
    places: Place[];
    loading: boolean;
    placeAdded: boolean;
    error: string | null;
}

export interface AuthState {
    token: string | null;
    userId: string | null;
    expiresIn: number | null;
    loading: boolean;
    error: string | null;
}

export interface AppState {
    places: PlaceState;
    auth: AuthState;
}

export type AppActions = PlaceActions | AuthActions;

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;