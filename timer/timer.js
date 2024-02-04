let template = await loadHtml('/timer/timer.html');
import { top } from "/top/top.js";

export class Timer extends ko.Component
{
    constructor()
    {
        super();
        this.top = top;
        this.top.components.timer(this);
    }

    static get elementName() { return 'l-timer' };
    static get template() { return template };
}
Timer.register(Timer.elementName);
