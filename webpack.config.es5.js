const config = require('./webpack.config.js');

// Reset module rules
config.module.rules = [
  {
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      compilerOptions: {
        target: "es5"
      }
    }
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }
]

config.output.filename = 'ijmacd-game-engine.es5.js';

module.exports = config;
