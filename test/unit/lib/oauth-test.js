jest.mock('oauth', () =>({
    OAuth2: jest.fn()
}))
const Oauth = require('../../../lib/oauth'),
    OAuth2 = require('oauth').OAuth2,
    { faker } = require('@faker-js/faker')

describe('oauth should', () => {
    test('construct using library', async () => {
        let info = { 
                key: faker.datatype.uuid(),
                secret: faker.datatype.uuid(),
            },
            expectedResult = { some: faker.datatype.uuid() }
        OAuth2.mockImplementation(() => expectedResult)

        let result = new Oauth(info)
        
        expect(OAuth2).toBeCalledWith(
            info.key, 
            info.secret,
            "", 
            "https://www.facebook.com/dialog/oauth",
            "https://graph.facebook.com/oauth/access_token")
        expect(result.oauth).toEqual(expectedResult)
    })

    test('getAuthUrl should return authorization url', async () => {
        let info = { 
                redirectUrl: faker.datatype.uuid(),
                scope: faker.datatype.uuid(),
            },
            expectedResult = faker.datatype.uuid(),
            mockOauth = { getAuthorizeUrl: jest.fn(() => expectedResult) }
            
        OAuth2.mockImplementation(() => mockOauth)

        let oauth = new Oauth(info)
        let url = oauth.getAuthUrl()
        
        expect(mockOauth.getAuthorizeUrl).toBeCalledWith({
            redirect_uri: "https://www.facebook.com/connect/login_success.html",
            scope: info.scope
        })
        expect(url).toEqual(expectedResult)
    })

    test('getTokens should return tokens if no error', async () => {
        let code = faker.datatype.uuid(),
            info = {
            },
            expected = {
                accessToken: faker.datatype.uuid(),
                other: faker.datatype.uuid()
            },
            mockOauth = { 
                getOAuthAccessToken: jest.fn((_,__,cb) => cb(undefined, undefined, undefined, expected)) 
            }
            
        OAuth2.mockImplementation(() => mockOauth)

        let oauth = new Oauth(info)
        let result = await oauth.getTokens(code)
        
        expect(mockOauth.getOAuthAccessToken).toBeCalledWith(
            code,
            {
                redirect_uri: "https://www.facebook.com/connect/login_success.html"
            },
            expect.anything()
        )
        return expect(result).toEqual(expected)
    })

    test('getTokens should reject if error', async () => {
        let error = faker.datatype.uuid(),
        mockOauth = { 
            getOAuthAccessToken: jest.fn((_,__,cb) => cb(error)) 
        }
            
        OAuth2.mockImplementation(() => mockOauth)

        let oauth = new Oauth({})
        try {
            await oauth.getTokens("pepe")
            fail()
        } catch (e) {
            expect(e).toEqual(error)
        } 
    })

})
