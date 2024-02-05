class BackgroundService
{
    listener(message, sender, senderResponse)
    {
        switch (message.type)
        {
            case 'fetch': this.#fetch(message.request, sender, senderResponse); break;
        }
    }

    #fetch(request, sender, senderResponse)
    {
        senderResponse({ success: { hi: 'mom' } });
        
        // fetch(request.url, 
        // {
        //         method: request.method,
        //         headers: 
        //         {
        //             'Content-Type': request.contentType,
        //         },
        //         body: request.data,
        //     })
        //     .then(res => {
        //         return res.json();
        //     })
        //     .then(
        //         res => senderResponse(res)
        //     );
    }
}

const instance = new BackgroundService();
chrome.runtime.onMessage.addListener(instance.listener.bind(instance));
