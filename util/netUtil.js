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
}
