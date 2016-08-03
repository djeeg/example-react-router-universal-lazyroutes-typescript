/// <reference path="../typescript/System.d.ts" />

// polyfill webpack System.import on NodeJS
if (typeof System === 'undefined') {
  var System: ISystemExt = {};
  if (typeof System.import !== 'function') {
    System.import = (d) => {
      let module = require(d);
      return Promise.resolve(module);
    }
  }
}

import App from '../components/App'
import Index from '../components/Index'
import {Promise} from 'es6-promise';

function timeSince(value: Date): string {
  return " [" + ((new Date().getTime() - value.getTime())) + "ms]";
}

export default {
  path: '/',
  component: App,
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
  },
  indexRoute: {
    component: Index
  }
}
