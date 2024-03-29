let template = await loadHtml('/timer/timer.html');
import { StateEnum } from "/top/top.js";
import { top } from "/top/top.js";
import { asc } from "/util/asc.js";
import { Duration } from "/timer/duration.js"

export class Timer extends ko.Component
{
    /** type {number} ID of browser's timer */
    #intervalId; 
    
    constructor()
    {
        super();
        this.top = top;
        this.top.components.timer(this);

        this.isTimerRunning = ko.observable(false);
        this.comment = ko.observable('');
        this.duration = ko.observable(new Duration());
        this.durationText = ko.computed(() => this.duration().toString());
        
        this.canResume = ko.computed(() => !this.duration().isZero());
        this.top.isTimer.subscribe(x => this.#onIsTimerChanged(x));
    }

    static get elementName() { return 'l-timer' };
    static get template() { return template };


    startTimer()
    {
        this.isTimerRunning(true);
        if (!this.#intervalId)
            this.#intervalId = window.setInterval(() => this.poll(), 1000);         // one second
    }

    stopTimer()
    {
        this.isTimerRunning(false);
    }

    poll()
    {
        if (!this.isTimerRunning())
            return;

        let duration = this.duration();
        duration.addSecond();
        this.duration(duration);
    }

    /**
     * @param isTimer - Value of whether the timer panel is showing or not
     */
    #onIsTimerChanged(isTimer)
    {
        if (isTimer)
            this.startTimer();
        else
            this.stopTimer();
    }
    
    onSubmit()
    {
        let data = { "comments": [{
            "emrPatientId": "HRLFK0S",
            "emrCommentId": crypto.randomUUID(),
            "emrStaffId": "badmother1234",
            "noteDateTimeUtc": new Date().toISOString(),
            "noteText": this.comment(),
            "offlineTime": this.durationText()
        }]};
        
        asc.Net.ajaxPost({
            url: '/api/account/comment',
            data: data,
            error: x => this.#onError(x),
            success: x => 
            {
                if (x.Processed > 0)
                {
                    asc.app.clearLoginTokens();
                    this.top.state(StateEnum.login);
                    return;
                }
                
                console.log('error');
                console.log(x);
            },
        })
        
    }
    
    #onError(x)
    {
        console.log('error');
        console.log(x);
    }    
}
Timer.register(Timer.elementName);
