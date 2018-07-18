const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        importLoader: 1,
        namedExport: true,
        camelCase: true,
        localIdentName: '[local]___[hash:base64:5]',
        sass: true,
      }
    },
    'sass-loader',
  );
  return loader;
};

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  devtool: devMode ? 'inline-source-map' : '',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' },
          { loader: 'eslint-loader', options: { transpileOnly: true } },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
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
    publicPath: '/',
  },
};
