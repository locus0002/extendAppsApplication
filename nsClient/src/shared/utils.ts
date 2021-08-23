import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import OAuth from 'oauth-1.0a';
import * as Constants from './constants';

export class Utils {

    signRequest(url: string, method: string, parameters?: any) {
        const auth = new OAuth({
            consumer: {
                key: Constants.CONSUMER_KEY,
                secret: Constants.CONSUMER_SECRET
            },
            signature_method: 'HMAC-SHA256',
            hash_function: function(base_string, key) {
                return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
            }
        });
        const token: OAuth.Token = {
            key: Constants.TOKEN_ID,
            secret: Constants.TOKEN_SECRET
        };
        const requestData: OAuth.RequestOptions = {
            url: url,
            method: method,
            data: parameters || {}
        };
        const authHeader = auth.toHeader(auth.authorize(requestData, token));
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': authHeader.Authorization + ', realm="' + Constants.REALM + '"'
            })
        };
    }
}