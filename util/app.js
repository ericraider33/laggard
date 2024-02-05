class App
{
    /** @type {String} fully qualified URL to server; must start with HTTPS or HTTP */
    baseUrl;

    /** @type {String} current access token to authorize API access or null if unauthorized */
    accessToken;
    
    refreshToken;
    accessTokenExpiryUtc;
    
    constructor() 
    {
    }

    /**
     * @param {String} path Relative path to convert into a fully qualified URL; should start with a slash 
     */
    url(path)
    {
        return this.baseUrl + path;
    }

    /**
     * @param {ApiLoginResponse} token
     */
    setLoginTokens(token)
    {
        this.accessToken = token.AccessToken;
        this.refreshToken = token.RefreshToken;
        this.accessTokenExpiryUtc = token.AccessTokenExpiryUtc;
    }
    
    clearLoginTokens()
    {
        this.accessToken = null;
        this.refreshToken = null;
        this.accessTokenExpiryUtc = null;
    }
}

export let app = new App(); 