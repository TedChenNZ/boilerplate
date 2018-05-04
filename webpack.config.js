const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

const getStyleLoader = () => {
  const loader = [];
  if (devMode) {
    loader.push('style-loader');
  } else {
    loader.push(MiniCssExtractPlugin.loader);
  }
  loader.push(
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoader: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
    'sass-loader',
  );
  return loader;
};

module.exports = {
  entry: {
    main: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: getStyleLoader(),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackMd5Hash(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
};
