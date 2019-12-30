const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
      hot:true,
      inline:true,
      contentBase: ['./dist'],
      watchContentBase:true,
      watchOptions: {
          poll:true
      }
  }
};