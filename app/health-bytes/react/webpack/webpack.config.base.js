const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  entry: ['@babel/polyfill', `${srcPath}/App.js`],
  module: {
    rules: [
      {
        parser: {
          amd: false,
        },
      },
      {
        test: /^((?!\.min).)+\.js$/,
        include: srcPath,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        resolve: { extensions: ['.css'] },
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template-index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  node: { fs: 'empty' },
};
