# ![logo_fb](https://cloud.githubusercontent.com/assets/3071208/14721795/aa18135a-0808-11e6-987b-14583e3fbb1d.png)
[![Build Status](https://travis-ci.org/kanekotic/oauth-electron-facebook.svg?branch=master)](https://travis-ci.org/kanekotic/oauth-electron-facebook)
[![codecov](https://codecov.io/gh/kanekotic/oauth-electron-facebook/branch/master/graph/badge.svg)](https://codecov.io/gh/kanekotic/oauth-electron-facebook)
[![npm](https://img.shields.io/npm/dy/oauth-electron-facebook.svg)](https://github.com/kanekotic/oauth-electron-facebook)
[![GitHub license](https://img.shields.io/github/license/kanekotic/oauth-electron-facebook.svg)](https://github.com/kanekotic/oauth-electron-facebook/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/kanekotic/oauth-electron-facebook/graphs/commit-activity)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/kanekotic/)

Use Facebook OAuth in a simple way inside your electron App.

## Installation

add it to your electron project using `npm install oauth-electron-facebook --save` or `yarn add oauth-electron-facebook`

## Usage

require `oauth-electron-facebook` exports a function that requires a javascript object and an electron window, as seen on the next example:

```js
const auth = require('oauth-electron-facebook')
const { BrowserWindow, session } = require('electron')

let info = {
    key: ***,
    secret: ***,
    scope: ***
},
window = new BrowserWindow({webPreferences: {nodeIntegration: false}});

auth.login(info, window, session)
```

the login function will return a Promise with the access token and secret

```
{
    "access_token":<string>,
    "token_type":<string>,
    "expires_in":<number>
}
```

## Security

Consider this before you integrate this library in your application:
- It is a bad practice to hardcode `keys` & `secrets` in code that is going to be shipped.
- If you are looking to have your own backend, consider using it for authentication with 3rd party services. [IETF RFC 8252](https://tools.ietf.org/html/rfc8252).

## Migration V1.x to V2.x

- the response from facebook has changed so please adapt, there does not seem to be any refresh token anymore
- session is required to be passed as events of chromium have changed
- localhost is not anymore an accepted url for redirect configure and use "https://www.facebook.com/connect/login_success.html"

## Migration V0.x to V1.x

- there is no more need for the facebook object, info becomes a basic object with the properties stated in the usage step.
- the return object has a different format.


###### logo: Award graphic by <a href="http://www.freepik.com/">Freepik</a> and Letter F graphic by <a href="http://www.icomoon.io">Icomoon</a> from <a href="http://www.flaticon.com/">Flaticon</a> are licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Made and modified with <a href="http://logomakr.com" title="Logo Maker">Logo Maker</a>
