module.exports = {
  entry: './src/game-engine.js',
  output: {
    path: __dirname + '/dist',
    filename: 'ijmacd-game-engine.js',
    libraryTarget: 'umd'
  }
};
