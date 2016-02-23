## Concepts

- Hot Reloading by Webpack
- Isomorphic / Universal / Server Rendering
- Code splitting by Webpack 2's `System.import`
- Lazy Routes by React-Router's getChildRoutes
- Treeshaking by `es2015-webpack` preset

## Technology

- react 0.14.6
- babel 6.4.0
- react-router 2.0.0
- typescript 1.8.0
- webpack 2.0.7-beta

## Running

```
npm install
typings install
npm start
open http://localhost:5000
```

## How it works

server
- src
  - typescript + ES6 + react
- ts-node
  - ES5

client
- src
  - typescript + ES6 + react
- babel
  - ts-loader
  - ES6+react
- babel
  - presets [react + es2015-webpack]
  - ES6
- webpack
  - tree shaking
  - ES5

# Thanks

ryanflorence: https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes