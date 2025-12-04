const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  productionSourceMap: false,

  pwa: process.env.NODE_ENV === 'local' ? {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker-disabled.js'
    }
  } : undefined,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          VUE_APP_HOST_API: JSON.stringify(process.env.VUE_APP_HOST_API),
          VUE_APP_API_KEY: JSON.stringify(process.env.VUE_APP_API_KEY),
          VUE_APP_MAINTENANCE_MODE: JSON.stringify(process.env.VUE_APP_MAINTENANCE_MODE),
        }
      })
    ],

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_variables.scss";`
      }
    }
  },
};
