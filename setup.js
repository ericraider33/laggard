import { Main } from './main.js';

let main = new Main();
ko
    .applyBindings(main, document.querySelector("body"))
    .then(() =>
    {
        console.log('Init Complete')
        main.state(Main.StateEnum.timer);
    });

console.log('Setup Complete');