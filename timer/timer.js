let template = await (await fetch('./timer/timer.html')).text();

export class Timer extends ko.Component
{
    #main;
    
    constructor({ main })
    {
        super();
        
        this.#main = main;
    }

    static get elementName() { return 'l-timer' };
    static get template() { return template };
}
Timer.register(Timer.elementName);
