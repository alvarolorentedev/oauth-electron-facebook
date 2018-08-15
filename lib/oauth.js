const Oauth2 = require('oauth').OAuth2

class Oauth {
    constructor(info){
        this.info = info
        this.oauth = new Oauth2(info.key, info.secret, info.baseUrl, info.authPath, info.tokenPath, info.customHeaders)
    }

    getAuthUrl(){
        return this.oauth.getAuthorizeUrl({
                redirect_uri: this.info.redirectUrl,
                scope: this.info.scope
            });
    }

    getTokens(code) {
        return new Promise((resolve,reject) => {
            this.oauth.getOAuthAccessToken(code, this.info.params, (error, accessToken, refreshToken) => {
                if(error)
                    return reject(error)
                resolve({accessToken,refreshToken})
            })
        })
    }
}

module.exports = Oauth