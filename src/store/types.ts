import {Place} from "../models";

export interface PlaceState {
    places: Place[];
    selectedPlace: Place | null;
}

export interface AppState {
    places: PlaceState;
}

// export type AppActions =

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {
    [actionCreator: string]: FunctionType
};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;