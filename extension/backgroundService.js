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
        fetch(request.url, 
        {
                method: request.method,
                headers: 
                {
                    'Content-Type': request.contentType,
                },
                body: request.data,
            })
            .then(res => {
                return res.json();
            })
            .then(
                res => senderResponse(res)
            );
    }
}

const instance = new BackgroundService();
chrome.runtime.onMessage.addListener(instance.listener.bind(instance));
