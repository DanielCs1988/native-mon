import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";

export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const SELECT_PLACE = 'SELECT_PLACE';
export const DESELECT_PLACE = 'DESELECT_PLACE';

export const Actions = {
    addPlace: (name: string) => createAction(ADD_PLACE, name),
    removePlace: () => createAction(REMOVE_PLACE),
    selectPlace: (key: string) => createAction(SELECT_PLACE, key),
    deselectPlace: () => createAction(DESELECT_PLACE)
};

export type PlaceActions = ActionsUnion<typeof Actions>;