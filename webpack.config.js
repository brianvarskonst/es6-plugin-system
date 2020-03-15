const Encore = require('@symfony/webpack-encore');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('main', './src/js/main.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
;

let config = Encore.getWebpackConfig();

config.watchOptions = {
    poll: true,
    ignored: /node_modules/
};

config.plugins.push(
    new BrowserSyncPlugin(
        {
            host: 'localhost',
            port: '3000',
            server: {
                "baseDir": "./"
            },
            files: [ // watch on changes
                {
                    match: ['public/build/**/*.js'],
                    fn: function (event, file) {
                        if (event === 'change') {
                            const bs = require('browser-sync').get('bs-webpack-plugin');

                            bs.reload();
                        }
                    }
                }
            ]
        },
        {
            reload: false, // this allow webpack server to take care of instead browser sync
            name: 'bs-webpack-plugin',
        },
    )
);


module.exports = config;