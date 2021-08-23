import { HttpHeaders } from "@angular/common/http";

export const HEADERS = {headers: new HttpHeaders(
    {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/plain'
    }
)};

export const CONSUMER_KEY = '';
export const CONSUMER_SECRET = '';
export const TOKEN_ID = '';
export const TOKEN_SECRET = '';
export const REALM = '';
export const URL_MIDDLE = 'http://192.168.0.6:8080/nsMiddle/api/v1';