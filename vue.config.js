const path = require('path');

module.exports = {
	publicPath: '',
	productionSourceMap: false,
    filenameHashing: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/')
            }
        },

        devtool: 'source-map'
    },

    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.fallback.options.name = 'img/[folder]/[hash].[ext]';
                return options;
            });
    },

    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    $environment: ${process.env.NODE_ENV};
                `
            }
        } 
    }
}