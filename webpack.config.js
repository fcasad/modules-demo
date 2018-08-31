const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js/main.js'),
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    publicPath: 'http://localhost:3000/js/',
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
};
