const Oauth = require('./oauth'),
    url = require('url')

const getTokens = (oauth, address, resolve, reject) => {
    let parsed = url.parse(address, true)
            if(!parsed.query.code)
                return reject(`URL response is not correct, parameters are ${parsed.query}`)
            oauth.getTokens(parsed.query.code)
                .then(resolve)
                .catch(reject)
}

const bindWindowsEvents = (window, oauth) =>
    (resolve, reject) => {
        window.webContents.on('close', () => {
            reject('closed window')
        });
        window.webContents.on('will-navigate', (_, address) => getTokens(oauth, address, resolve, reject))
        window.webContents.on('did-get-redirect-request', (_, __, address) => {
            window.show()
            getTokens(oauth, address, resolve, reject)
        })
    }

const login = (info, window) => {
    let oauth = new Oauth(info)
    let promise = new Promise(bindWindowsEvents(window, oauth))
    window.loadURL(oauth.getAuthUrl())
    return promise
}

module.exports = login