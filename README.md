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

5. Install the tailwindcss
  - `pnpm  install -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
  - Configure path to template files. Inside ***tailwind.config.js***, we need to specify the path to our React template files by adding the following configuration setting:
    `
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
  `
  - Create a file ***main.css*** inside the folder src, and add tailwind directives like this:
    `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    `
6. Setting up Babel
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

7. Setting up Webpack

 - Create a file in the root of the project, and name it as ***webpack.config.js***
 - paste this piece of code inside the file
  `
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { WebpackPluginServe } = require('webpack-plugin-serve');

    const port = process.env.PORT || 3000;

    module.exports = {
      // Webpack configuration goes here
    };
  `

  