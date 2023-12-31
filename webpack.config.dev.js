const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        client: { overlay: false },
    },
    entry: {
        main: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'swc-loader',
                        options: {
                            env: { mode: 'usage' },
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                    tsx: true,
                                    dynamicImport: true,
                                },
                                transform: {
                                    react: {
                                        // swc-loader will check whether webpack mode is 'development'
                                        // and set this automatically starting from 0.1.13. You could also set it yourself.
                                        // swc won't enable fast refresh when development is false
                                        runtime: 'automatic',
                                        refresh: true,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ReactRefreshPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};