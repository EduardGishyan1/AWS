const slsw = require('serverless-webpack');

module.exports = {
  resolve: {
    mainFields: ['main', 'module'],
  },
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
