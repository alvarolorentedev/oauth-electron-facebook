const Oauth2 = require('oauth').OAuth2

class Oauth {
    constructor(info){
        this.info = info
        this.oauth = new Oauth2(
            info.key, 
            info.secret,
            "", 
            "https://www.facebook.com/dialog/oauth",
            "https://graph.facebook.com/oauth/access_token")
    }

    getAuthUrl(){
        return this.oauth.getAuthorizeUrl({
                redirect_uri: "https://www.facebook.com/connect/login_success.html",
                scope: this.info.scope
            });
    }

    getTokens(code) {
        return new Promise((resolve,reject) => {
            this.oauth.getOAuthAccessToken(code, {
                redirect_uri: "https://www.facebook.com/connect/login_success.html"
            }, (error, _, __, result) => {
                if(error)
                    return reject(error)
                resolve(result)
            })
        })
    }
}

module.exports = Oauth