const {app, BrowserWindow, session} = require('electron'),
    auth = require('../../../index')
  
  function createWindow () {
    let info = {
      key: "2144019505628525",
      secret: "8f7ee580aba72d9269c3db702a8b2617",
      scope: "user_posts,user_friends,publish_actions"
    },
    window = new BrowserWindow({"node-integration": false})
    window.webContents.session.cookies.remove("https://www.facebook.com/", 'c_user', () => {
      auth.login(info, window)    
      .then((result) => {
       window.webContents.executeJavaScript(`document.body.innerHTML += '<div id="result">Success</div>'`)
      })
      .catch((error) =>{
         window.webContents.executeJavaScript(`document.body.innerHTML += '<div id="result">Error</div>'`)
      })
    })
  }
  
  app.on('ready', createWindow)