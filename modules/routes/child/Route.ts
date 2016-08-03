import About from '../../components/About'
import {Promise} from 'es6-promise';

function timeSince(value: Date): string {
    return " [" + ((new Date().getTime() - value.getTime())) + "ms]";
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

console.log("AboutRoute - sleep")
sleep(400);

export default {
    path: 'about',
    component: About,
    // onEnter: function enter(nextState, replaceState, callback) {
    //     setTimeout(callback, 1000);
    // },
    getChildRoutes(location, cb) {

        console.log("getChildRoutes: START");
        let time1 = new Date();

        //const cached = System.get('./AboutRoute'); //[object Object] is not supported by webpack
        //if (cached) callback(null, cached.default);

        Promise.all([
            System.import('./child/Route')
        ]).then(function (modules) {
            console.log("getChildRoutes1: " + timeSince(time1));
            let time2 = new Date();
            Promise.all([
                System.import('./child/Route')
            ]).then(function (modules) {
                console.log("getChildRoutes2: " + timeSince(time2));
                let module = modules.shift();
                cb(null, [
                    module.default
                ])
            }).catch(err => {
                console.error("getChildRoutes: " + err + " " + err.stack);
            });
        }).catch(err => {
            console.error("getChildRoutes: " + err + " " + err.stack);
        });
    }
}
