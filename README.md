# Anatomy of Webpack with React
This project dives deep into the ecosystem of most popular bundler for Javascript i.e. Webpack. The project uses React as a frontend library and uses tailwindcss for styling. 

## Getting started
Let's start by setting up the folder and installation of the initial packages
1. Create a folder. The folder is named as react-with-webpack in this case
2. Initilize the package.json file  `pnpm init`
3. Install the required dependencies 
  - `pnpm install react react-dom prop-types react-router-dom`
4. Install the required dev dependencies
  - `pnpm install @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-transform-class-properties @babel/plugin-syntax-dynamic-import css-loader style-loader html-webpack-plugin webpack webpack-nano webpack-plugin-serve  -D`
5. Install the tailwindcss
  - `pnpm  install -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
  - Configure path to template files. ***Inside tailwind.config.js***, we need to specify the path to our React template files by adding the following configuration setting:
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
  