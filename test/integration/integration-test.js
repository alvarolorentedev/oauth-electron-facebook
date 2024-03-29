const Application = require('spectron').Application
const electronPath = require('electron'),
    path = require('path')

    jest.setTimeout(20000)
describe.skip('oauth electron', () => {
    let app
    beforeAll(async () => {
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
        await app.client.setValue('#email', process.env.FB_USERNAME)
        await app.client.setValue('#pass', process.env.FB_PASSWORD)
        await app.client.click('#loginbutton') 
        await app.client.waitUntilTextExists('#result', 'Success')
    });
});