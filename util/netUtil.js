import { app } from "/util/app.js";

export class NetUtil
{
    /**
     * Builds an absolute URL from the passed path and query parameters
     *
     * @param {string} path - Relative or absolute path to endpoint. If string starts with 'http', then it is considered absolute.
     * @param {object} queryParams - (Optional) An object with name/value pairs for query parameter portion of resulting URL
     * @returns {string} Absolute URL with parameters encoded to safely use as a URL
     */
    static url(path, queryParams)
    {
        if (!path.startsWith('http'))
            path = app.url(path);            // converts to absolute URL

        if (queryParams && typeof queryParams === "object" && path.indexOf('?') < 0)
            path = path + "?" + NetUtil.query(queryParams);

        return path;
    }

    /**
     * Builds an query URL fragment from the passed object parameters
     *
     * @param {object} queryParams - An object with name/value pairs for query parameter portion of resulting URL
     * @returns {string} URL query fragment with parameters encoded to safely use as part of a URL
     */
    static query(queryParams)
    {
        let result = new URLSearchParams();
        let mapProperty = key =>
        {
            let value = queryParams[key];
            if (value == null)
                return;

            if (value instanceof Array)
            {
                value.forEach(x => result.append(key, x));
            }
            else
            {
                result.append(key, value);
            }
        };

        Object.keys(queryParams).forEach(mapProperty);
        return result.toString();
    }

    /**
     * @param {String} request.url 
     * @param {Object,String} request.data Object to post as either a JSON string or an object to be JSONified
     * @param {function} request.success Callback method for response
     * @param {function} request.error Callback method for error
     */
    static ajaxPost(request)
    {
        request = Object.assign(request, {
            method: 'POST', 
            url: this.url(request.url, request.queryParams), 
            contentType: 'application/json'
        });
        
        if (!(typeof request.data === 'string'))
            request.data = ko.toJSON(request.data);
        
        chrome.runtime.sendMessage({ 
            type: 'fetch', 
            request: request
        }, response => 
        {
            if (!response)
                return;

            if (response.error)
                request.error(response.error);
            else if (response.success)
                request.success(response.success);
        });
    }

    /**
     * @param {String} request.url
     * @param {Object,String} request.body Object to post as either a JSON string or an object to be JSONified
     * @param {function} request.success Callback method for response
     * @param {function} request.error Callback method for error
     */
    static ajaxGet(request)
    {
        request = Object.assign(request, {
            method: 'GET',
            url: this.url(request.url, request.queryParams),
            contentType: 'application/json'
        });

        chrome.runtime.sendMessage({
            type: 'fetch',
            request: request
        }, response =>
        {
            if (!response)
                return;
            
            if (response.error)
                request.error(response.error);
            else if (response.success)
                request.success(response.success);
        });
    }
}
