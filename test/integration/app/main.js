const {app, BrowserWindow, session} = require('electron'),
    auth = require('../../../index')
  
  function createWindow () {
    let info = {
      key: process.env.FB_KEY,
      secret: process.env.FB_SECRET,
      scope: "email"
    },
    window = new BrowserWindow({"node-integration": false})
    window.webContents.session.cookies.remove("https://www.facebook.com/", 'c_user', async () => {
      try {
        await auth.login(info, window, session) 
        window.webContents.executeJavaScript(`document.body.innerHTML += '<div id="result">Success</div>'`)
      } catch (_) {
        window.webContents.executeJavaScript(`document.body.innerHTML += '<div id="result">Error</div>'`)
      }  
    })
  }
  
  app.on('ready', createWindow)