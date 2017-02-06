const config = require('./webpack.config.js');

if(!config.module) {
  config.module = {};
}

if(!config.module.rules) {
  config.module.rules = [];
}

config.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
});

config.output.filename = 'ijmacd-game-engine.es5.js';

module.exports = config;
