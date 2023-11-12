const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/script.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            // Add any loaders you need for your project (e.g., for CSS, images)
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new DotenvWebpackPlugin(), // Load environment variables from .env
        new CleanWebpackPlugin(), // Clean the 'dist' folder before each build
        new CopyPlugin({
            patterns: [
                { from: "src/images", to: "images"},
                { from: "src/data", to: "data"},
                { from: "src/css", to: "css"},
            ]
        })
    ],
};
