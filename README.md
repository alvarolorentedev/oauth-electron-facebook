# ![logo_fb](https://cloud.githubusercontent.com/assets/3071208/14721795/aa18135a-0808-11e6-987b-14583e3fbb1d.png)

**this package is currently in development and is not available for use**

Use Facebook OAuth in a simple way inside your electron App.

## Installation

add it to your elenctron project using npm command
```
npm install oauth-electron-facebook --save
```

## Usage

add the require for ouath and twitter specific code from this package

```js
var oauth = require('oauth-electron-facebook').oauth;
var facebook = require('oauth-electron-facebook').facebook;
```

declare a twitter object, and use it as parameter for the oauth in conjuntion with the electron window used to display the login
```js
var info = new facebook("key","secret", <scope>, <params>);
var auth = new oauth();
auth.login(info, window);
```
the login function will return a Promise with the acces token and secret
```
{
    oauth_access_token: ***,
    oauth_refresh_token: ***
}
```



###### logo: Award graphic by <a href="http://www.freepik.com/">Freepik</a> and Letter F graphic by <a href="http://www.icomoon.io">Icomoon</a> from <a href="http://www.flaticon.com/">Flaticon</a> are licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Made and modified with <a href="http://logomakr.com" title="Logo Maker">Logo Maker</a>
