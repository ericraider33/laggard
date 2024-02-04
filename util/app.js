class App
{
    /** @type {string} fully qualified URL to server; must start with HTTPS or HTTP */
    baseUrl;
    
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
}

export let app = new App(); 