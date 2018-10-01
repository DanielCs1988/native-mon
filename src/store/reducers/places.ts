import { PlaceState } from "../types";
import * as fromActions from "../actions/places";

export const initialState: PlaceState = {
    places: [],
    loading: false
};

const placeReducer = (state = initialState, action: fromActions.PlaceActions) => {
    switch (action.type) {
        case fromActions.ADD_PLACE_SUCCESS:
            return {
                ...state,
                places: [...state.places, action.payload],
                loading: false
            };
        case fromActions.ADD_PLACE_FAILED:
            return {
                ...state,
                loading: false
            };
        case fromActions.ADD_PLACE_STARTED:
            return {
                ...state,
                loading: true
            };
        case fromActions.REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.payload)
            };
        default:
            return state;
    }
};

export default placeReducer;