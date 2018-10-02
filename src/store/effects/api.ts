import axios from 'axios';
import {Credentials, Place} from "../../models";
import {ImageURISource} from "react-native";

const firebaseBaseUrl = 'https://best-places-2k19.firebaseio.com';
const imageHostingUrl = 'https://us-central1-best-places-2k19.cloudfunctions.net/storeImage';
const authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const authApiKey = '';

export const fetchPlaces = async (token: string) => {
    const { data } = await axios.get(`${firebaseBaseUrl}/places.json`, {
        params: { auth: token }
    });
    return data;
};

export const sendPlace = async (place: Place, token: string) => {
    const { data } = await axios.post(`${firebaseBaseUrl}/places.json`, place, {
        params: { auth: token }
    });
    return data;
};

export const uploadImage = async (image: ImageURISource, token: string) => {
    const { data } = await axios.post(imageHostingUrl, {
        image: image.body
    }, {
        headers: { authorization: `Bearer ${token}` }
    });
    return data;
};

export const removePlace = (id: string, token: string) => {
    return axios.delete(`${firebaseBaseUrl}/places/${id}.json`, {
        params: { auth: token }
    });
};

export const authenticate = async (credentials: Credentials, isLogin: boolean) => {
    const path = isLogin ? 'verifyPassword' : 'signupNewUser';
    const { data: { idToken, localId, expiresIn } } = await axios.post(`${authUrl}/${path}`, {
        ...credentials, returnSecureToken: true
    }, {
        params: { key: authApiKey }
    });
    return { token: idToken, userId: localId, expiresIn };
};