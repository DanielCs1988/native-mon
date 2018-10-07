export enum Routes {
    APP_LOADING = 'AppLoading',
    AUTHENTICATION = 'Authentication',
    MAIN_APPLICATION = 'MainApplication',
    SHARE_PLACE_STACK = 'SharePlaceStack',
    FIND_PLACE_STACK = 'FindPlaceStack',
    SHARE_PLACE = 'SharePlace',
    FIND_PLACE = 'FindPlace',
    PLACE_DETAILS = 'PlaceDetails'
}

export enum StorageKeys {
    TOKEN = 'nm:auth:token',
    USER_ID = 'nm:auth:userId',
    EXPIRES_IN = 'nm:auth:expiresIn',
    REFRESH_TOKEN = 'nm:auth:refreshToken'
}