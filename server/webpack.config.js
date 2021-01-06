'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { DefinePlugin } = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const packageJson = require('./package.json');

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
    },
    stats: {
      modules: false, // We don't need to see this
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
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
            }
          ],
          exclude: /node_modules/,
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
    ],
  };

  if (env.nodemon) {
    config.watch = true;
    config.plugins.push(new NodemonPlugin());
  }

  return config;
};
