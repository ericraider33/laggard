import { TkoUtil } from "/util/tko-util.js";
import { Main } from '/main.js';
import { Top } from "/top/top.js";

let main = new Main();
ko
    .applyBindings(main, document.querySelector("body"))
    .then(() =>
    {
        console.log('Init Complete')
        main.top.state(Top.StateEnum.timer);
    });

console.log('Setup Complete');