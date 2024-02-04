import { TkoUtil } from "/util/tko-util.js";
import { Main } from '/main.js';
import { Top } from "/top/top.js";
import { asc } from "/util/asc.js"

asc.app.baseUrl = 'https://dev1.chroniccareiq.com';

let main = new Main();
ko
    .applyBindings(main, document.querySelector("body"))
    .then(() =>
    {
        console.log('Init Complete')
        
        main.top.patientDialogTitle('Rodriguez, Roy (2/3/1965) ID: HRLFK0S');

//        main.top.state(Top.StateEnum.login);
        main.top.state(Top.StateEnum.timer);
    });

console.log('Setup Complete');