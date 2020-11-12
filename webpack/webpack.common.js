const webpack = require('webpack');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils.js');

module.exports = (options) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
        mainFields: ['es2015', 'browser', 'module', 'main'],
        alias: utils.mapTypescriptAliasToWebpackAlias()
    },
    node: {
        fs: 'empty'
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    caseSensitive: true,
                    removeAttributeQuotes: false,
                    minifyJS: false,
                    minifyCSS: false
                },
                exclude: /(src\/main\/webapp\/index.html)/
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loader: 'file-loader',
                options: {
                    digest: 'hex',
                    hash: 'sha512',
                    name: 'content/[hash].[ext]'
                }
            },
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
            // Ignore warnings about System.import in Angular
            {test: /[\/\\]@angular[\/\\].+\.js$/, parser: {system: true}},
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${options.env}'`,
                BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
                VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
                DEBUG_INFO_ENABLED: options.env === 'development',
                // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
                // If this URL is left empty (""), then it will be relative to the current context.
                // If you use an API server, in `prod` mode, you will need to enable CORS
                // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
                SERVER_API_URL: `''`
            }
        }),
        new CopyWebpackPlugin([
            {from: './src/main/webapp/content/', to: 'content'},
            {from: './src/main/webapp/favicon.ico', to: 'favicon.ico'},
            {from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp'},
            // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
            {from: './src/main/webapp/robots.txt', to: 'robots.txt'},
            {from: './src/main/webapp/assets', to: 'assets'},
            {from: './src/main/webapp/system.js', to: 'system.js'},
            {from: './src/main/webapp/flex.js', to: 'flex.js'},
            {from: './src/main/webapp/moment-es6.js', to: 'moment-es6.js'},
            {from: './src/main/webapp/moment.min.js', to: 'moment.min.js'},
            {from: './src/main/webapp/sockjs.min.js', to: 'sockjs.min.js'},
            {from: './src/main/webapp/app.config.json', to: 'app.config.json'},
            {from: './node_modules/@alfresco/adf-core/bundles/assets', to: 'assets'},
            {from: './node_modules/@alfresco/adf-core/prebuilt-themes', to: 'assets/prebuilt-themes'},
            {from: './node_modules/pdfjs-dist/build/pdf.worker.min.js', to: 'pdf.worker.min.js'},
        ]),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/index.html',
            chunks: ['polyfills', 'main', 'global'],
            chunksSortMode: 'manual',
            inject: 'body'
        }),
        new BaseHrefWebpackPlugin({baseHref: '/'}),
        new webpack.ProvidePlugin({
            pdfjsLib: ['pdfjs-dist'],
            pdfjsViewer: ['pdfjs-dist/web/pdf_viewer.js']
        }),
        new MomentLocalesPlugin()
    ]
});
