import { PlaceState } from "../types";
import { ADD_PLACE, PlaceActions, REMOVE_PLACE } from "../actions/places";
import SmexyImage from '../../assets/edinburgh-castle.jpg';

export const initialState: PlaceState = {
    places: []
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
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.payload)
            };
        default:
            return state;
    }
};

export default placeReducer;