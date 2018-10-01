import {LatLng} from "react-native-maps";
import {ImageURISource} from "react-native";

export interface Place {
    key?: string;
    name: string;
    image: ImageURISource;
    location: LatLng;
}

export interface AuthData {
    email: string;
    password: string;
}