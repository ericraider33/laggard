export class Top
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
        this.state = ko.observable(Top.StateEnum.loading);
        this.isLoading = ko.computed(() => this.state() === Top.StateEnum.loading);
        this.isLogin = ko.computed(() => this.state() === Top.StateEnum.login);
        this.isNoPatient = ko.computed(() => this.state() === Top.StateEnum.noPatient);
        this.isTimer = ko.computed(() => this.state() === Top.StateEnum.timer);
        
        this.components = 
        {
            main: ko.observable(),
            timer: ko.observable(),
            noPatient: ko.observable(),
            login: ko.observable()
        }
    }
}

export let top = new Top();