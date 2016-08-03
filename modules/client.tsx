/// <reference path="./typescript/react-router.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import routes from './routes/Route'
import { Promise } from 'es6-promise';

function timeSince(value: Date): string {
    return " [" + ((new Date().getTime() - value.getTime())) + "ms]";
}

var time3 = new Date()
match({history: browserHistory, routes}, (err, redirectLocation, renderProps: any) => {
    console.log("match:first: " + timeSince(time3))
    const {components} = renderProps;
    if(err) console.log("err:" + err);
    console.log("redirectLocation:" + redirectLocation);
    console.log("renderProps:" + JSON.stringify(renderProps));

    let router = (
        <Router {...renderProps} children={routes} />
    )

    ReactDOM.render(router, document.getElementById('app'));
});

// browserHistory.listen(location => {
//     console.log("browserHistory.listen:location:", location)
//
//     setTimeout(function () {
//         var time4 = new Date()
//         match({history: browserHistory, routes}, (err, redirectLocation, renderProps: any) => { //todo: this is slow
//             console.log("match:second: " + timeSince(time4))
//             if(err) console.log("err:" + err);
//             console.log("renderProps:" + JSON.stringify(renderProps));
//         });
//     }, 100);
//
// });
