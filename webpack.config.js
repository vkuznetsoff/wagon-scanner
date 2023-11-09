
const  path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { LoaderOptionsPlugin } = require('webpack')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
    mode,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true
    },

    // devtools: 'eval-source-map',
    devServer: {
        hot: true
    },

    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'./src/index.html'),
        filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }),

    new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname,
          devtools: 'source-map'
        }
      })
    
],

    module: {
        

        rules: [
            { 
                test: /\.(html)$/, use: ['html-loader'],
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
           
        ]
    }
}