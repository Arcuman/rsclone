import { resolve } from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// eslint-disable-next-line import/no-extraneous-dependencies
import Dotenv from 'dotenv-webpack';

const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.analyze;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nothing = () => {};

const formStylesRule = (useModules = false) => ({
  test: /\.(css|scss|sass)$/,
  [useModules ? 'exclude' : 'include']: /styles|node_modules/,
  use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
});

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: '.eslintrc',
              fix: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: isProduction ? '[contenthash].[ext]' : '[name].[ext]',
              outputPath: 'static/images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/fonts',
            },
          },
        ],
      },
      formStylesRule(false),
      formStylesRule(true),
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.mjs', '.jsx', '.d.ts', '.ts', '.tsx'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
    isAnalyze ? new BundleAnalyzerPlugin() : nothing,
    isProduction ? new CopyWebpackPlugin({ patterns: [{ from: './src', to: '.' }] }) : nothing,
  ],
};

export default config;
