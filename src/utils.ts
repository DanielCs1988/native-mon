import {Platform} from "react-native";

export const PlatformIcon = (name: string) => {
    return Platform.OS === 'android' ? `md-${name}` : `ios-${name}`;
};

export const validate = (value: string, rules: Rules) => {
    let valid = true;
    if (rules.isEmail && !emailValidator(value)) {
        valid = false;
    }
    if (rules.minLength && value.trim().length < rules.minLength) {
        valid = false;
    }
    if (rules.equalTo && value !== rules.equalTo) {
        valid = false;
    }
    return valid;
};

const emailValidator = (email: string) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
};

export interface Rules {
    isEmail?: boolean;
    minLength?: number;
    equalTo?: string;
}