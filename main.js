import { Timer } from './timer/timer.js';

export class Main
{
    static StateEnum = 
    {
        loading: 0,
        login: 1,
        noPatient: 2,
        timer: 3
    }
    
    constructor() 
    {
        this.state = ko.observable();
        this.isLoading = ko.computed(() => this.state() === Main.StateEnum.loading);
        this.isLogin = ko.computed(() => this.state() === Main.StateEnum.login);
        this.isNoPatient = ko.computed(() => this.state() === Main.StateEnum.noPatient);
        this.isTimer = ko.computed(() => this.state() === Main.StateEnum.timer);
        
        this.components = {
            timer: { main: this }  
        };
    }
}