const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const envConfigCopier = require('./tools/envConfigCopier');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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

const config = {
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
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

    //copy public dir
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: 'assets/' },
    ], {}),
    new CopyWebpackPlugin([
      {
        from: envConfigCopier.envConfigDIR + envConfigCopier.envConfigFileName(process.env.ENV || 'local'),
        to: envConfigCopier.envConfigProdDIR + envConfigCopier.envConfigFileName(),
      },
    ], {}),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
};

if (!devMode) {
  config.plugins = config.plugins.concat([

  ]);

  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            dead_code: true,
            unused: true
          }
        }
      })
    ]
  }
}

module.exports = config;