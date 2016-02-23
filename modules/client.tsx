/// <reference path="./typescript/react-router.d.ts" />

import * as React from 'react'
import { match, Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import routes from './routes/RootRoute'
import { Promise } from 'es6-promise';
import * as _ from 'lodash';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({ routes, location, history: browserHistory }, (error, redirectLocation, renderProps) => {
    if(location == "/about") {
        // todo: need a better way to force System.import (async) to trigger
        Promise.all(
            System.import('./routes/AboutRoute')
        ).then(() => {
            render(
            <Router routes={routes} history={browserHistory} />,
                document.getElementById('app')
            )
        });
    } else {
        render(
            <Router {...renderProps} />,
            document.getElementById('app')
        )
    }
});
