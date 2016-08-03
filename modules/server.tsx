/// <reference path="./typescript/react-router.d.ts" />

import * as express from "express";
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import * as fs from 'fs'
import { createPage, write, writeError, writeNotFound, redirect } from './utils/server-utils'
import routes from './routes/Route'
import { default as webpackconfig } from "./webpack.config";
import * as webpack from "webpack";

console.log(" - starting express...");
const app = express();
console.log("  - done");

console.log(" - webpack config...");
const compiler = webpack(webpackconfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackconfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
console.log("  - done");

function renderApp(props, res) {
  const markup = renderToString(<RouterContext {...props}/>)
  const html = createPage(markup)
  write(html, 'text/html', res)
}

app.use( (req, res) => {

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error)
        writeError('ERROR!', res)
      else if (redirectLocation)
        redirect(redirectLocation, res)
      if (renderProps)
        renderApp(renderProps, res)
      else
        writeNotFound(res)
    })

});

function handler(err) {
  let host = server.address().address;
  let port = server.address().port;
  if (err) {
    console.log('[Error] Listening on http://%s:%s', host, port);
    //EADDRINUSE
    console.log(err);
  } else {
    console.log('Listening on http://%s:%s', host, port);
  }
  console.log(" - webpack compile...");
}

console.log(" - listen...");
const server = app.listen(5000, '0.0.0.0', handler);
console.log("  - done");

