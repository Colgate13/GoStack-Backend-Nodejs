const path = require('path');

module.exports = {

  entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
		contentBase: path.resolve(__dirname, 'public'),	//Expondo pasta public
  },
	module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }// Resumo do que foi escrito -> Se tiver um arquivo .js fora da pasta node_modules converte usando babel
      }
    ]
  },
};