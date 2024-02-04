let template = await loadHtml('/login/login.html');
import { top } from "/top/top.js";
import { asc } from "/util/asc.js";

export class Login extends ko.Component
{
    constructor()
    {
        super();
        this.top = top;
        this.top.components.login(this);

        this.form = {}; 
        this.form.username = ko.observable();
        this.form.password = ko.observable();
        this.top.isLogin.subscribe(x => this.#onIsLoginChanged(x));
    }

    static get elementName() { return 'l-login' };
    static get template() { return template };

    /**
     * @param isLogin - Value of whether the login panel is showing or not
     */
    #onIsLoginChanged(isLogin)
    {
        if (!isLogin)
            return;

        this.form.username('');
        this.form.password('');
    }
    
    async onSubmit()
    {
        let apiLoginResponse;
        try 
        {
            const response = await fetch(asc.Net.url('/api/login/loginForm'), 
            {
                method: "POST",
                mode: "no-cors",
                cache: "no-cache",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(ko.toJS(this.form))
            });
            apiLoginResponse = await response.json();   
        }
        catch (err)
        {
            console.log('Login Failed');
            console.log(err);
            return;
        }

        console.log('Login successful');
        console.log(apiLoginResponse);
        
        this.top.state(this.top.StateEnum.timer);
    }
}
Login.register(Login.elementName);
