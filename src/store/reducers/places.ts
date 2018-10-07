import { PlaceState } from "../types";
import { PlaceActions, ActionTypes } from "../actions/places";

export const initialState: PlaceState = {
    places: [],
    loading: false,
    placeAdded: false
};

const placeReducer = (state = initialState, action: PlaceActions) => {
    switch (action.type) {
        case ActionTypes.GET_PLACES_SUCCESS:
            return {
                ...state,
                places: action.payload
            };
        case ActionTypes.ADD_PLACE_SUCCESS:
            return {
                ...state,
                places: [...state.places, action.payload],
                loading: false,
                placeAdded: true
            };
        case ActionTypes.ADD_PLACE_FAILED:
            return {
                ...state,
                loading: false
            };
        case ActionTypes.ADD_PLACE_RESET:
            return {
                ...state,
                placeAdded: false
            };
        case ActionTypes.ADD_PLACE_STARTED:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.REMOVE_PLACE_SUCESS:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.payload)
            };
        case ActionTypes.REMOVE_PLACE_FAILED:
            return {
                ...state,
                places: [...state.places, action.payload]
            };
        default:
            return state;
    }
};

export default placeReducer;