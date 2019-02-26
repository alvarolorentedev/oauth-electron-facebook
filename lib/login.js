const Oauth = require('./oauth'),
    url = require('url'),
    {dialog} = require('electron')

const getTokens = async (oauth, address) => {
    let parsed = url.parse(address, true)
    if(!parsed.query.code)
        throw `URL response is not correct, parameters are ${JSON.stringify(parsed.query)}`
    return await oauth.getTokens(parsed.query.code)
}

const bindWindowsEvents = (window, oauth, session) =>
    new Promise((resolve, reject) => {
        window.webContents.on('close', () => {
            reject('closed window')
        });

        const filter = {
            urls: ["https://www.facebook.com/connect/login_success.html*"]
        };
        session.defaultSession.webRequest.onCompleted(filter, async (details) => {
            try {
                resolve(await getTokens(oauth, details.url))
            } catch (error) {
                reject(error)
            }
        });
    })

const login = async (info, window, session) => {
    const oauth = new Oauth(info)
    const events = bindWindowsEvents(window, oauth, session)
    window.loadURL(oauth.getAuthUrl())
    return await events
}

module.exports = login