import { app } from "/util/app.js";
import { TextUtil } from "/util/textUtil.js";
import { NetUtil } from "/util/netUtil.js";

class Asc
{
    /** @type {App} Instance of App object */
    app;

    /** @type {Class<TextUtil>} Reference to TextUtil class */
    Text;

    /** @type {Class<NetUtil>} Reference to NetUtil class */
    Net;

    constructor()
    {
        this.app = app;
        this.Text = TextUtil;
        this.Net = NetUtil;
    }
}

export let asc = new Asc(); 