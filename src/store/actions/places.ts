import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";
import {Place} from "../../models";

export const INIT_ADD_PLACE = 'INIT_ADD_PLACE';
export const ADD_PLACE_STARTED = 'ADD_PLACE_STARTED';
export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const ADD_PLACE_FAILED = 'ADD_PLACE_FAILED';
export const REMOVE_PLACE = 'REMOVE_PLACE';

export const Actions = {
    initAddPlace: (place: Place) => createAction(INIT_ADD_PLACE, place),
    addPlaceStarted: () => createAction(ADD_PLACE_STARTED),
    addPlaceSuccess: (place: Place) => createAction(ADD_PLACE_SUCCESS, place),
    addPlaceFailed: (error: string) => createAction(ADD_PLACE_FAILED, error),
    removePlace: (key: string) => createAction(REMOVE_PLACE, key)
};

export type PlaceActions = ActionsUnion<typeof Actions>;