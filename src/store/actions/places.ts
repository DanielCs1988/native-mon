import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";
import {Place} from "../../models";

export const INIT_ADD_PLACE = 'INIT_ADD_PLACE';
export const ADD_PLACE_STARTED = 'ADD_PLACE_STARTED';
export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const ADD_PLACE_FAILED = 'ADD_PLACE_FAILED';

export const INIT_GET_PLACES = 'INIT_GET_PLACES';
export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';
export const GET_PLACES_FAILED = 'GET_PLACES_FAILED';

export const INIT_REMOVE_PLACE = 'INIT_REMOVE_PLACE';
export const REMOVE_PLACE_SUCESS = 'REMOVE_PLACE_SUCESS';
export const REMOVE_PLACE_FAILED = 'REMOVE_PLACE_FAILED';

export const Actions = {
    initAddPlace: (place: Place) => createAction(INIT_ADD_PLACE, place),
    addPlaceStarted: () => createAction(ADD_PLACE_STARTED),
    addPlaceSuccess: (place: Place) => createAction(ADD_PLACE_SUCCESS, place),
    addPlaceFailed: (error: string) => createAction(ADD_PLACE_FAILED, error),
    initGetPlaces: () => createAction(INIT_GET_PLACES),
    getPlacesSuccess: (places: Place[]) => createAction(GET_PLACES_SUCCESS, places),
    getPlacesError: (error: string) => createAction(GET_PLACES_FAILED, error),
    initRemovePlace: (place: Place) => createAction(INIT_REMOVE_PLACE, place),
    removePlaceSuccess: (key: string) => createAction(REMOVE_PLACE_SUCESS, key),
    removePlaceFailed: (place: Place) => createAction(REMOVE_PLACE_FAILED, place)
};

export type PlaceActions = ActionsUnion<typeof Actions>;