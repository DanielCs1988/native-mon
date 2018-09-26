import { PlaceState } from "../types";
import {ADD_PLACE, DESELECT_PLACE, PlaceActions, REMOVE_PLACE, SELECT_PLACE} from "../actions/places";
// @ts-ignore
import SmexyImage from '../../assets/edinburgh-castle.jpg';

export const initialState: PlaceState = {
    places: [],
    selectedPlace: null
};

const placeReducer = (state = initialState, action: PlaceActions) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: [...state.places, {
                    key: Math.random().toString(),
                    name: action.payload,
                    image: SmexyImage
                }]
            };
        case REMOVE_PLACE:
            const key = state.selectedPlace ? state.selectedPlace.key : null;
            return {
                ...state,
                places: state.places.filter(place => place.key !== key),
                selectedPlace: null
            };
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => place.key === action.payload) || null
            };
        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default placeReducer;