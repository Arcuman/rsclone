"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.analyze;
const nothing = () => { };
const formStylesRule = (useModules = false) => ({
    test: /\.(css|scss|sass)$/,
    [useModules ? 'exclude' : 'include']: /assets\/stylesheets|node_modules/,
    use: [
        isProduction ? mini_css_extract_plugin_1.default.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: Object.assign({ url: false, importLoaders: 1, sourceMap: true }, (useModules && {
                modules: {
                    localIdentName: '[local]-[hash:base64:5]',
                },
            })),
        },
        'sass-loader',
    ],
});
const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    entry: './src/index.tsx',
    output: {
        path: path_1.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
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
            {
                test: /\.svg$/,
                loader: 'react-svg-loader',
                options: {
                    svgo: {
                        plugins: [{ removeUselessStrokeAndFill: false }],
                        floatPrecision: 2,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.mjs', '.jsx', '.d.ts', '.ts', '.tsx'],
        alias: {
            '@': path_1.resolve(__dirname, 'src'),
        },
    },
    devServer: {
        contentBase: './src',
        historyApiFallback: true,
    },
    plugins: [
        new html_webpack_plugin_1.default({
            template: './index.html',
        }),
        new mini_css_extract_plugin_1.default({
            chunkFilename: '[id].css',
            filename: '[name].css',
        }),
        isAnalyze ? new webpack_bundle_analyzer_1.BundleAnalyzerPlugin() : nothing,
        isProduction
            ? new copy_webpack_plugin_1.default({ patterns: [{ from: './src', to: '.' }] })
            : nothing,
    ],
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map