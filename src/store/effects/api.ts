import axios from 'axios';
import {Place} from "../../models";

const placesBaseUrl = 'https://best-places-2k19.firebaseio.com';

export const sendPlace = async (place: Place) => {
    const { data } = await axios.post(`${placesBaseUrl}/places.json`, place);
    return data;
};