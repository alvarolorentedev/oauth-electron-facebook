'use strict';
var oauthLib = require('oauth');
var queryString = require('query-string');
var urlLib = require("url");

class oauthInfo{
    constructor(){
        this.key ="";
        this.secret = "";
        this.window = "";
        this.base_url = "";
        this.auth_path = null;
        this.token_path = null;
        this.customHeaders = null;
        this.scope = "";
    }
}

exports.facebook = class facebookoauthInfo extends oauthInfo{
    constructor(key, secret, scope, params){
        super();
        this.key =key;
        this.secret = secret;
        this.base_url = "https://graph.facebook.com";
        this.redirect_url = "http://localhost:8080/fb/";
        this.code = "";
        this.scope = scope;
        this.params = params || {};
        params.redirect_uri = this.redirect_url;
    }
};

class oauth_local{
    constructor(info, window){
        this.oauth_token = "";
        this.oauth_token_secret = "";
        this.info = info;
        this.window = window;
        this.oauth = new oauthLib.OAuth2(this.info.key, this.info.secret, this.info.base_url, this.info.auth_path, this.info.token_path, this.info.customHeaders);
    }

    get_auth_url(){
        return this.oauth.getAuthorizeUrl({
            redirect_uri: this.info.redirect_url,
            scope: this.info.scope,
            state: 'kgjdlfklvjmklj'
        });
    }

    get_auth_tokens(code){
        return new Promise((resolve,reject) => {
            console.log(this.info.code);
            this.oauth.getOAuthAccessToken(this.info.code, this.info.params, (error, access_token, refresh_token, results) => {
                if (error) {
                    reject(error);
                }
                else {
                  resolve({ oauth_access_token: access_token, oauth_refresh_token: refresh_token});
                }
            });
        });
    }
}

exports.oauth = class Oauth_export{

    constructor(){
    }

    login(info, window){
        return new Promise((resolve,reject) => {
            var localoauth = new oauth_local(info, window);
            var url = localoauth.get_auth_url();
            console.log(url);
            var parsed = urlLib.parse(url, true);
            console.log(parsed);

            window.webContents.on('close', function(){
                reject('closed window');
            });

            window.webContents.on('will-navigate', function (event, url) {
                    console.log(url);
                    window.show();
                    localoauth.get_auth_tokens(parsed.query.code).then((result)=>{
                        resolve(result);
                    }).catch((error)=>{reject(error);});
            });

            localoauth.get_auth_tokens(parsed.query.code).then((result)=>{
                console.log(JSON.stringify(result));
                resolve(result);
            }).catch((error) => {
                console.log(error);
                window.loadURL(url);
            });

        });
    }
};
