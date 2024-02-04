export const StateEnum =
{
    loading: 0,
    login: 1,
    noPatient: 2,
    timer: 3
};

export class Top
{
    static StateEnum = StateEnum;
    
    constructor()
    {
        this.state = ko.observable(StateEnum.loading);
        this.isLoading = ko.computed(() => this.state() === StateEnum.loading);
        this.isLogin = ko.computed(() => this.state() === StateEnum.login);
        this.isNoPatient = ko.computed(() => this.state() === StateEnum.noPatient);
        this.isTimer = ko.computed(() => this.state() === StateEnum.timer);

        this.patientDialogTitle = ko.observable();
        
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