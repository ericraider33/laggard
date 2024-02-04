export class Duration
{
    /**
     * @param args.hour {number} (Optional) Hours value to start duration, or defaults to zero
     * @param args.minute {number} (Optional) Minutes value to start duration, or defaults to zero
     * @param args.second {number} (Optional) Seconds value to start duration, or defaults to zero
     */
    constructor(args)
    {
        args = args || {};
        this.hour = typeof args.hour === "number" ? args.hour : 0;
        this.minute = typeof args.minute === "number" ? args.minute : 0;
        this.second = typeof args.second === "number" ? args.second : 0;
    }
    
    isZero()
    {
        return this.hour === 0 && this.minute === 0 && this.second === 0;
    }

    addSecond()
    {
        this.second++;
        if (this.second < 60)
            return;

        this.second -= 60;
        this.minute++;
        if (this.minute < 60)
            return;

        this.minute -= 60;
        this.hour++;
    }

    getTotalSeconds()
    {
        return this.hour * 3600 + this.minute * 60 + this.second;
    }

    toString()
    {
        return this.hour.toString().padStart(2, '0') + ":" +
            this.minute.toString().padStart(2, '0') + ":" +
            this.second.toString().padStart(2, '0');
    }
}
