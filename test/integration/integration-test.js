const Application = require('spectron').Application
const electronPath = require('electron'),
    path = require('path')

describe('oauth electron', () => {
    let app
    beforeAll(async () => {
        jest.setTimeout(10000)
        app = new Application({
            path: electronPath,
            args: [path.join(__dirname, './app/main.js')]
        })
        await app.start()
    }) 

    afterAll(async () => {
        if (app && app.isRunning())
            await app.stop() 
    })

    it('should load electron app for facebook oauth', async () => {
        await app.client.setValue('#email', 'fmjmgokhna_1536522604@tfbnw.net')
        await app.client.setValue('#pass', 'sticky.benison.dodge')
        await app.client.click('#loginbutton') 
        await app.client.getMainProcessLogs().then(function (logs) {
            logs.forEach(function (log) {
              console.log(log)
            })
          })
        await app.client.waitUntilTextExists('#result', 'Success')
    });
});