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
                redirect_uri: "http://localhost/",
                scope: this.info.scope
            });
    }

    getTokens(code) {
        return new Promise((resolve,reject) => {
            this.oauth.getOAuthAccessToken(code, {
                redirect_uri: "http://localhost/"
            }, (error, accessToken, refreshToken) => {
                if(error)
                    return reject(error)
                resolve({accessToken,refreshToken})
            })
        })
    }
}

module.exports = Oauth