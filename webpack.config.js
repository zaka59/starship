const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = false;

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/main.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.js'
  },

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, 'dist'),
	       watch : true
      },
      host : 'localhost',
      port : 9000,
      open : {
	  target : ['/'],
	  app : ['firefox']
      }
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'images'
            }
          }
        ]
      },
      {
        test: /\.(mp3)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name : '[name].[ext]',
              outputPath : 'sound'
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
	       template: "./src/index.html",
	        filename: "./index.html",
	        hash: true,
      }),
      new CopyPlugin({
         patterns: [
           //{
           //  context: path.resolve(__dirname, "src", "html"),
           // from: "**/*.html",
           // globOptions: { },
           // to:  'html'
           //},
            {
              from: 'src/style/*',
              to:  'style/[name].[ext]'
            },
            {
              from: 'src/images/*',
              to:  'images/[name].[ext]'
            },
            {
              from: 'src/sound/*',
              to:  'sound/[name].[ext]'
            },
         ]
       }),
     ],


  /*
  externals : {
    react: 'React',
    react-dom: 'ReactDom',
  },
  */

  optimization: {

    minimize: true,
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
             vendors: {
               priority: -10,
               test: /[\\/]node_modules[\\/]/
             }
           },

           chunks: 'async',
           minChunks: 1,
           minSize: 30000,
           name: false
       }
  }
}
