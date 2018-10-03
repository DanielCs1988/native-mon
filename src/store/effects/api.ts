import axios from 'axios';
import {AuthPayload, Credentials, Place} from "../../models";
import {ImageURISource} from "react-native";
import { stringify } from "qs";

const firebaseBaseUrl = 'https://best-places-2k19.firebaseio.com';
const imageHostingUrl = 'https://us-central1-best-places-2k19.cloudfunctions.net/storeImage';
const authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const refreshTokenUrl = 'https://securetoken.googleapis.com/v1/token';
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

export const authenticate = async (credentials: Credentials, isLogin: boolean): Promise<AuthPayload> => {
    const path = isLogin ? 'verifyPassword' : 'signupNewUser';
    const { data: { idToken, localId, expiresIn, refreshToken } } = await axios.post(`${authUrl}/${path}`, {
        ...credentials, returnSecureToken: true
    }, {
        params: { key: authApiKey }
    });
    return { token: idToken, userId: localId, expiresIn, refreshToken };
};

export const fetchNewToken = async (rfToken: string): Promise<AuthPayload> => {
    const { data: { id_token, user_id, expires_in, refresh_token } } = await axios.post(refreshTokenUrl, stringify({
        grant_type: 'refresh_token',
        refresh_token: rfToken
    }), {
        params: { key: authApiKey },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return {
        token: id_token,
        userId: user_id,
        expiresIn: expires_in,
        refreshToken: refresh_token
    };
};