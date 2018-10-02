import axios from 'axios';
import {Place} from "../../models";
import {ImageURISource} from "react-native";

const firebaseBaseUrl = 'https://best-places-2k19.firebaseio.com';
const imageHostingUrl = 'https://us-central1-best-places-2k19.cloudfunctions.net/storeImage';

export const fetchPlaces = async () => {
    const { data } = await axios.get(`${firebaseBaseUrl}/places.json`);
    return data;
};

export const sendPlace = async (place: Place) => {
    const { data } = await axios.post(`${firebaseBaseUrl}/places.json`, place);
    return data;
};

export const uploadImage = async (image: ImageURISource) => {
    const { data } = await axios.post(imageHostingUrl, {
        image: image.body
    });
    return data;
};

export const removeImage = (id: string) => {
    return axios.delete(`${firebaseBaseUrl}/places/${id}.json`);
};