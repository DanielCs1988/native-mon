import {LatLng} from "react-native-maps";

export interface Place {
    key: string;
    name: string;
    image: string;
    location: LatLng;
}

export interface AuthData {
    email: string;
    password: string;
}