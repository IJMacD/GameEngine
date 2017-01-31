module.exports = {
  entry: './src/game-engine.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'ijmacd-game-engine.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};
