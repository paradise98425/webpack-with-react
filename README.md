# Anatomy of Webpack with React
This project dives deep into the ecosystem of most popular bundler for Javascript i.e. Webpack. The project uses React as a frontend library and uses tailwindcss for styling. 
This repository also can be used as a boilerplate for getting started with React project from basic setup. However, it does not use typescript. Thus, you will have to make an effort
to install the typescript 🙃.

## Getting started
Let's start by setting up the folders and installation of the initial packages:

1. Create a folder. The folder is named as react-with-webpack in this case
2. Initilize the package.json file  `pnpm init`
3. Install the required dependencies 
  - `pnpm install react react-dom prop-types react-router-dom`
4. Install the required dev dependencies
  - `pnpm install @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-transform-class-properties @babel/plugin-syntax-dynamic-import css-loader style-loader html-webpack-plugin webpack webpack-nano webpack-plugin-serve  -D`

  Let's look into details what each of these packages does:
  * react — I’m sure you know what React is
  * react-dom — Provides DOM-specific methods for the browser
  * prop-types — Runtime type checking for React props
  * react-router-dom — Provides routing capabilities to React for the browser
  * @babel/core — Core dependencies for Babel
    - Babel is a transpiler that compiles JavaScript ES6 to JavaScript ES5 allowing you to write JavaScript “from the future” so that current browsers will understand it. Detailed description in Quora.
  * babel-loader — This package allows transpiling JavaScript files using Babel and webpack
  * @babel/preset-env — With this you don’t have to specify if you will be writing ES2015, ES2016 or ES2017. Babel will automatically detect and transpile accordingly.
  * @babel/preset-react — Tells Babel we will be using React
  * @babel/plugin-transform-class-properties — Use class properties. We don’t use Class Properties in this project, but you will more than likely use them in your project
  * @babel/plugin-syntax-dynamic-import — Be able to use dynamic imports
  * css-loader — Interprets @import and url() like import/require() and will resolve them
  * html-webpack-plugin — Can generate an HTML file for your application, or you can provide a template
  * style-loader — Adds CSS to the DOM by injecting a <style> tag
  * webpack — Module bundler
  * webpack-nano — Webpack CLI
  * webpack-plugin-serve — Provides a development server for your application

5. Setting up Babel
 - Create a file in the root of the project, and name it as ***.babelrc***
 - paste this piece of code inside the file
  `
    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        "@bable/plugin-transform-class-properties"
      ]
    }
  `
  This tells Babel to use the presets (plugins) we previously installed. Later when we call babel-loader from Webpack, this is where it will look to know what to do.

6. Setting up Webpack
 - Create a file inside *src* folder named as ***index.js***
 - Create another file in the root of the project, and name it as ***webpack.config.js***
 - paste this piece of code inside the file
  `
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { WebpackPluginServe } = require('webpack-plugin-serve');

    const port = process.env.PORT || 3000;

    module.exports = {
      mode: 'development',
      entry: ['./src/index.js', 'webpack-plugin-serve/client'],
      output: {
        filename: 'bundle.[fullhash].js',
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  esModule: true,
                },
              },
              {
                loader: 'css-loader',
                options: {
                  esModule: true,
                  modules: {
                    mode: 'local',
                    exportLocalsConvention: 'camelCaseOnly',
                    namedExport: true,
                  },
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html',
          favicon: 'public/favicon.ico',
        }),
        new WebpackPluginServe({
          host: 'localhost',
          port: port,
          historyFallback: true,
          open: true,
          liveReload: false,
          hmr: true,
          static: './dist',
        }),
      ],
      watch: true,
    };
  `

7. Creating the React App
  - Create a 'public' directory move into it and also create an index.html file. 
  - Also, add favicon.ico file here
  - Open the index.html file and copy the following:
    `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <title>webpack-for-react</title>
      </head>

      <body>
        <div id="root"></div>
      </body>

      </html>
    `
  - Now, inside your src/index.js file, copy the following:
    `
      import React from 'react';
      import { createRoot } from 'react-dom/client';
      import App from './components/App';

      createRoot(document.getElementById('root')).render(<App />);
    `
  - Create a 'components' folder & create files: App.js, Layout.js, Layout.css, Home.js, DynamicPage.js, NoMatch.js
  - Open App.js and copy the following:
    `
      import React from 'react';
      import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

      import Home from './Home';
      import DynamicPage from './DynamicPage';
      import NoMatch from './NoMatch';

      const App = () => {
        return (
          <Router>
            <div>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dynamic" element={<DynamicPage />} />
                <Route element={<NoMatch />} />
              </Routes>
            </div>
          </Router>
        );
      };

      export default App;
    `
  - Open Layout.css and copy the following:
    `
      .pull-right {
        display: flex;
        justify-content: flex-end;
      }
      .h1 {
        margin-top: 10px !important;
        margin-bottom: 20px !important;
      }
    `
  -  Open Layout.js and copy the following:
    `
      import React from 'react';
      import { Link } from 'react-router-dom';

      import { pullRight, h1 } from './layout.css';

      const Layout = ({ children }) => {
        return (
          <div >
            <Link to="/">
              <h1 as="h1" className={h1}>
                webpack-for-react
              </h1>
            </Link>
            {children}
            <br />
            <p className={pullRight}>
              Made with love by Roshan Pratap Katel
            </p>
          </div>
        );
      };

      export default Layout;
    `
  - Open Home.js and copy the following:
    `
      import React from 'react';
      import { Link } from 'react-router-dom';

      import Layout from './Layout';

      const Home = () => {
        return (
          <div>
            <p>Hello World of React and Webpack!</p>
            <p>
              <Link to="/dynamic">Navigate to Dynamic Page</Link>
            </p>
          </div>
        );
      };

      export default Home;
    `
  - open DynamicPage.js and copy the following:
    `
      import React from 'react';
      import Layout from './Layout';

      const DynamicPage = () => {
        return (
          <Layout>
            <h2>Dynamic Page</h2>
            <p>This page was loaded asynchronously!!!</p>
          </Layout>
        );
      };

      export default DynamicPage;
    `

## Setting up Fast Refresh

- From the root directory run the following command
  `pnpm install @pmmmwh/react-refresh-webpack-plugin react-refresh -D`
  Here, 
  @pmmmwh/react-refresh-webpack-plugin - Webpack plugin to enable 'Fast Refresh'
  @react-refresh - Implements the wiring necessary to integrate Fast Refresh

- Open webpack.config.js and add the following code:

  In the first rule of module:
  `
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
    ]
  `

  And in the plugin section:
  `
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: 'wps' },
    })
  `

## Code splitting

### By Route
1. Install the react-imported-component and react-delay-render from your terminal
  `pnpm install react-imported-component react-delay-render`

2. Now, create a Loading component inside your components directory and copy the following code:
  `
    import React from 'react';
    import ReactDelayRender from 'react-delay-render';

    const Loading = () => {
      return(
        <p>Loading ...</p>
      )
    }

    export default ReactDelayRender({ delay: 300 })(Loading);
  `

3. Open App.js and modify it as follows:
  `
    import React from 'react';
    import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
    import importedComponent from 'react-imported-component';

    import Home from './Home';
    import DynamicPage from './DynamicPage';
    import NoMatch from './DynamicPage';
    import Loading from './Loading';
    import '../main.css';

    const AsyncDynamicPage = importedComponent(
      () => import('./DynamicPage'),
      {
        LoadingComponent: Loading
      }
    );
    const AsyncNoMatch = importedComponent(
      () => import('./NoMatch'),
      {
        LoadingComponent: Loading
      }
    );
    
    const App = () => {
      return(
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/dynamic" element={<AsyncDynamicPage />} />
              <Route element={<AsyncNoMatch />} />
            </Routes>
          </div>
        </Router>
      )
    }
    export default App;
  `




  