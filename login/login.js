let template = await loadHtml('/login/login.html');
import { StateEnum } from "/top/top.js";
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
    
    onSubmit()
    {
        asc.Net.ajaxPost({
            url: '/api/login',
            data: this.form,
            success: x => this.#onLogin(x),
            error: x => this.#onError(x)
        })
        
    }

    /**
     * @param {ApiLoginResponse} login - Tokens generated from a successful login 
     */
    #onLogin(login)
    {
        console.log(login);
        
        this.top.state(StateEnum.timer);
    }

    #onError(message)
    {
        console.log("Login error: " + message.status);
        console.log(message);
    }
}
Login.register(Login.elementName);
