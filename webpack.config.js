module.exports = {
  entry: './src/game-engine.js',
  output: {
    path: __dirname + '/dist',
    filename: 'ijmacd-game-engine.js',
    library: 'IGE',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};
