import * as path from "path";
import * as webpack from "webpack";
import {Configuration} from "webpack";
import {Resolve} from "webpack";

const config: Configuration = {
  entry: {
    app: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      //'babel-polyfill',
      './modules/client.tsx'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'es6-promise',
      'history',
      'core-js',
      'lodash',
      'eventsource-polyfill'
    ]
  },
  output: {
    path: path.resolve("./output/dist/"),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
    })
    //new webpack.DefinePlugin({
    //  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    //})
  ],
  module: {
    loaders: [{
      test: /\.(t|j)s(x?)$/,
      loaders: ['babel-loader?' + JSON.stringify({
        "cacheDirectory": "./output/babelcache/",
        "presets": ["react", "es2015-webpack"]
      }),'ts-loader?configFileName=tsconfig-client.json'],
      exclude: [
        /node_modules/,
        /typings/
      ],
      include: [
        path.resolve("./modules"),
      ]
    }]
  },
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'), //force sub node_modules of node_module to use the primary version of react (eg react-context)
    },
    extensions: ["", ".json", ".webpack.js", ".web.js", ".js", ".ts", ".tsx", ".css"]
  }
};

export default config;
