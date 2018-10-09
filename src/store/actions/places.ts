import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";
import {Place} from "../../models";

export enum ActionTypes {
    INIT_ADD_PLACE = 'INIT_ADD_PLACE',
    ADD_PLACE_STARTED = 'ADD_PLACE_STARTED',
    ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS',
    ADD_PLACE_FAILED = 'ADD_PLACE_FAILED',
    ADD_PLACE_RESET = 'ADD_PLACE_RESET',

    INIT_GET_PLACES = 'INIT_GET_PLACES',
    GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS',
    GET_PLACES_FAILED = 'GET_PLACES_FAILED',

    INIT_REMOVE_PLACE = 'INIT_REMOVE_PLACE',
    REMOVE_PLACE_SUCCESS = 'REMOVE_PLACE_SUCESS',
    REMOVE_PLACE_FAILED = 'REMOVE_PLACE_FAILED'
}

export const Actions = {
    initAddPlace: (place: Place) => createAction(ActionTypes.INIT_ADD_PLACE, place),
    addPlaceStarted: () => createAction(ActionTypes.ADD_PLACE_STARTED),
    addPlaceSuccess: (place: Place) => createAction(ActionTypes.ADD_PLACE_SUCCESS, place),
    addPlaceFailed: (error: string) => createAction(ActionTypes.ADD_PLACE_FAILED, error),
    addPlaceReset: () => createAction(ActionTypes.ADD_PLACE_RESET),
    initGetPlaces: () => createAction(ActionTypes.INIT_GET_PLACES),
    getPlacesSuccess: (places: Place[]) => createAction(ActionTypes.GET_PLACES_SUCCESS, places),
    getPlacesFailed: (error: string) => createAction(ActionTypes.GET_PLACES_FAILED, error),
    initRemovePlace: (place: Place) => createAction(ActionTypes.INIT_REMOVE_PLACE, place),
    removePlaceSuccess: (key: string) => createAction(ActionTypes.REMOVE_PLACE_SUCCESS, key),
    removePlaceFailed: (place: Place, reason: string) => createAction(
        ActionTypes.REMOVE_PLACE_FAILED, { place, reason }
    )
};

export type PlaceActions = ActionsUnion<typeof Actions>;