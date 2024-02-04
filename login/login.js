let template = await loadHtml('/login/login.html');
import { top } from "/top/top.js";

export class Login extends ko.Component
{
    constructor()
    {
        super();
        this.top = top;
        this.top.components.login(this);
    }

    static get elementName() { return 'l-login' };
    static get template() { return template };
}
Login.register(Login.elementName);
