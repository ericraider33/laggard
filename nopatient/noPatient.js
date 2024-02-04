let template = await loadHtml('/nopatient/noPatient.html');
import { top } from "/top/top.js";

export class NoPatient extends ko.Component
{
    constructor()
    {
        super();
        this.top = top;
        this.top.components.noPatient(this);
    }

    static get elementName() { return 'l-no-patient' };
    static get template() { return template };
}
NoPatient.register(NoPatient.elementName);
