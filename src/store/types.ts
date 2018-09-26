import {Place} from "../models";
import {PlaceActions} from "./actions/places";

export interface PlaceState {
    places: Place[];
    selectedPlace: Place | null;
}

export interface AppState {
    places: PlaceState;
}

export type AppActions = PlaceActions;

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;