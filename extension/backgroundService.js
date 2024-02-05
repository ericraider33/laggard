class BackgroundService
{
    listener(message, sender, senderResponse)
    {
        switch (message.type)
        {
            case 'fetch': 
                this.#fetch(message.request, sender, senderResponse);
                break;
        }
        
        return true;
    }

    #fetch(request, sender, senderResponse)
    {
        let headers = {};
        headers['Content-Type'] = request.contentType;
        if (request.accessToken)
            headers.Authorization = 'Bearer ' + request.accessToken;
        
        fetch(request.url, 
        {
                method: request.method,
                headers: headers,
                body: request.data,
            })
            .then(res => 
            {
                if (res.ok)
                    return res.json().then(obj => senderResponse({ success: obj }));

                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1)
                    return res.json().then(obj => senderResponse({ error: obj, status: res.status }));
                
                return new Promise((resolve, reject) => 
                    resolve(senderResponse({ error: res.statusText, status: res.status }))
                );
            });
    }
}

const instance = new BackgroundService();
chrome.runtime.onMessage.addListener(instance.listener.bind(instance));
