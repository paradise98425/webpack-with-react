// 'html-webpack-plugin' can generate HTML for your application or you can provide template
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 'webpack-plugin-serve' provides a development server for your application 
const { WebpackPluginServe } = require('webpack-plugin-serve');
// webpack plugin to enable "Fast Refresh"
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const port = process.env.PORT || 3000;
/** 
 'mode' tells webpack this configuration will be either 'development' or 'Production'. 'Development' mode is optimized for speed and 
  developer expeience. 'Production' will give you a set of defaults that are useful for deploying your application, focusing on small
  output size, fast code at runtime, omitting development-only code, not exposing source code or file paths, easy to use output assets. 
  Read about modes in details here: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a 
*/
const mode = process.env.MODE || 'development';

module.exports = {
  mode: mode,  
  /**
   * 'webpack-plugin-serve' is a plugin that provides a development server for your application during development. When you include 
   * 'webpack-plugin-serve/client' in your entry configuration, it enables features like live reloading, hot module replacement (HMR), and 
   * other development-related functionality provided by webpack-plugin-serve. This client code is responsible for communication between 
   * your application code and the development server, allowing for real-time updates and better developer experience.
   */
  entry: ['./src/index.js', 'webpack-plugin-serve/client'],
  output: {
    // This will be the filename of the bundled application. The [fullhash] portion of the filename will be replaced by a hash generated
    // by Webpack every time your application changes and is recompiled. 
    filename: 'bundle.[fullhash].js', 
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // First Rule - We test for files with a .js extension excluding the node_modules directory and use Babel, via 'babel-loader', to 
      // transpile down to vanilla JavaScript (basically, looking for our React files).
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [require('react-refresh/babel')].filter(Boolean),
            }
          }
        ]
      },
      // Second Rule - We test for CSS files with a .css extension. Here we use two loaders, 'style-loader' and 'css-loader', to handle our CSS files. 
      // Then we configure the loaders to use CSS Modules (esModule), camel case (exportLocalsConvention) and create source maps. This gives us the 
      // ability to use import Styles from ‘./styles.css’ syntax (or destructuring like this import { style1, style2 } from ‘./styles.css’).
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              esModule: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                mode: 'local',
                exportLocalsConvention: 'camelCaseOnly',
                namedExport: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /**
     * The HtmlWebpackPlugin generates an HTML file that includes links to your bundled JavaScript files and other assets, making it easier to include these 
     * resources in your HTML without manual adjustments. The HtmlWebpackPlugin will use public/index.html template to generate HTML file in the output. 
     */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon:  'public/favicon.ico'
    }),
    /**
     * WebpackPluginServe is an instance of the 'WebpackPluginServe' plugin. This creates a development server with features like automatic browser,
     * opening, HMR and more.  
     */
    new WebpackPluginServe({
      host: 'localhost',
      port: port,
      historyFallback: true,
      open: true,
      liveReload: false,
      hmr: true,
      static: './dist',
    }),
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: 'wps' },
    })
  ],
  watch: true,
}