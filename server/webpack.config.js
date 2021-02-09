'use strict';
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { DefinePlugin } = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const packageJson = require('./package.json');
const path = require('path');


module.exports = (env = {}) => {
  const config = {
    entry: ['./src/index.ts'],
    mode: env.development ? 'development' : 'production',
    target: 'node',
    // devtool alternatives: cheap-module-eval-source-map (faster, less details) or cheap-eval-source-map (fastest, even less details)
    devtool: env.development ? 'inline-source-map' : false,
    node: {
      __dirname: false, // Fix for native node __dirname
      __filename: false, // Fix for native node __filename
    },
    output: {
      filename: `${packageJson.name}.js`,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules', 'src'],
      alias: {
        '@models': path.resolve(__dirname, 'src/models'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    stats: {
      modules: false, // We don't need to see this
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use:[
            {
              loader:'ts-loader'
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
          test: /\.yaml$/,
          use: [
            { loader: 'json-loader' },
            { loader: 'yaml-loader' }
          ]
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
      new DefinePlugin({
        VERSION: JSON.stringify(packageJson.version),
        DEVELOP: env.development,
      }),
      new CopyPlugin({
        patterns: [
            './node_modules/swagger-ui-dist/swagger-ui.css',
            './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
            './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
            './node_modules/swagger-ui-dist/favicon-16x16.png',
            './node_modules/swagger-ui-dist/favicon-32x32.png'
        ]
    }),
   ],
  };
  if (env.nodemon) {
    config.watch = true;
    config.plugins.push(new NodemonPlugin());
  }
  return config;
};
