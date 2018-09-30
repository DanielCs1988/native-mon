import {createAction} from "../action-creator";
import {ActionsUnion} from "../types";

export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';

export const Actions = {
    addPlace: (name: string) => createAction(ADD_PLACE, name),
    removePlace: (key: string) => createAction(REMOVE_PLACE, key)
};

export type PlaceActions = ActionsUnion<typeof Actions>;