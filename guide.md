To compile SCSS files using Webpack, you'll need to add the necessary loaders for handling SCSS files. Here's an example of how you can modify your Webpack configuration to include SCSS support:

First, install the required npm packages:
npm install --save-dev style-loader css-loader sass-loader node-sass

Then, update your webpack.config.js:
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist')
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',  // Inject styles into the DOM
                    'css-loader',    // Translate CSS into CommonJS
                    'sass-loader'     // Compile Sass to CSS
                ]
            }
        ]
    }
};

Explanation:
style-loader: Adds CSS to the DOM by injecting a <style> tag.
css-loader: Translates CSS into CommonJS.
sass-loader: Compiles Sass/SCSS to CSS.

Now, you can import your SCSS files in your JavaScript code, and Webpack will handle the compilation and bundling.

Make sure your project structure looks like this:
project-root
|-- src
|   |-- index.js
|   |-- styles
|       |-- your-style.scss
|-- dist
|-- webpack.config.js
|-- package.json

And then in your index.js or any other entry point, you can import the SCSS file:
// index.js
import './styles/your-style.scss';


To write custom JavaScript code and compile it using Webpack, you can follow these steps:
-----------------------------------------------------------------------------------------
#Create a JavaScript file: Start by creating a JavaScript file in your src directory. For example, let's create a file named custom.js:

Update your Webpack configuration:
Modify your existing webpack.config.js to include the new JavaScript file:

const path = require('path');

module.exports = {
    entry: {
        main: "./src/index.js",
        custom: "./src/custom.js",  // Add your custom entry point
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, './dist')
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
Here, I've added the custom.js file to the entry object, and the output filename is dynamic based on the entry name ([name].bundle.js).

Install Babel for JavaScript compilation: You may also want to use Babel to transpile your JavaScript code, especially if you're using modern JavaScript features. Install the necessary Babel packages:

Command: npm install --save-dev babel-loader @babel/core @babel/preset-env
Update the Webpack configuration to include the Babel loader for JavaScript files.

Create a .babelrc file:
Create a file named .babelrc in your project root with the following content:

// .babelrc
{
    "presets": ["@babel/preset-env"]
}
This configuration tells Babel to use the @babel/preset-env preset for transpiling.

Now, you can import your custom JavaScript file in your index.js or any other entry point:

// index.js
import './styles/your-style.scss';
import './custom.js';

// rest of your code
When you run Webpack, it will compile both your SCSS and JavaScript files into the specified output directory (dist in this case).

What is the command ro run webpack file?
---------------------------------------
To run Webpack, you need to use the webpack command in the terminal. However, you should also have the webpack-cli package installed as a dev dependency in your project. If you haven't installed it yet, you can do so by running:


npm install --save-dev webpack webpack-cli
Once you've installed webpack and webpack-cli, you can add a script in your package.json file to make it easier to run. Open your package.json file and add the following:

{
  "scripts": {
    "build": "webpack"
  }
}
Now, you can run the following command in your terminal to build your project using Webpack:

npm run build
This will execute the webpack command, and it will use the configuration from your webpack.config.js file to bundle your JavaScript and SCSS files.

npm install webpack webpack-cli webpack-dev-server html-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin clean-webpack-plugin babel-loader @babel/core @babel/preset-env sass-loader sass postcss-loader autoprefixer cssnano

If you want to run Webpack in watch mode, where it automatically rebuilds when files change, you can modify the script in your package.json:

{
  "scripts": {
    "watch": "webpack --watch"
  }
}
And then run: npm run watch
This will keep Webpack running and watching for changes in your source files, recompiling as needed.


Now we have the advance webpack config code with explanation: 
-------------------------------------------------------------
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/scripts/main.js", // main custom js file
    vendor: "./src/scripts/vendor.js", // 3rd party js files
    styles: "./src/styles/main.scss", // main scss file
    vendorStyles: "./src/styles/vendor.scss", // 3rd party css files
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output files to dist folder directly
    publicPath: "",
    // filename: "[name].[contenthash].bundle.js",
    filename: "bundle.[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader", // This loader resolves url() and @imports inside CSS
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  "cssnano", // Minify CSS
                ],
              },
            },
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash].[ext]", // Output images to dist/images folder
        },
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash].[ext]", // Output fonts to dist/fonts folder
        },
      },
    ],
  },
  // devServer: {
  //   historyApiFallback: true,
  //   static: {
  //     directory: path.resolve(__dirname, "./dist"),
  //   },
  //   open: true,
  //   compress: true,
  //   hot: true,
  //   port: 8080,
  // },
  plugins: [
    new CleanWebpackPlugin(), // Clean output directory before each build
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html", // Output index.html to dist folder
      chunks: ["main", "vendor", "styles", "vendorStyles"], // Include necessary chunks
      minify: false, // Disable minification for easier debugging
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.[contenthash].css", // Output CSS file to dist folder
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // Minimize CSS
      new TerserPlugin(), // Minimize JavaScript
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devtool: "source-map", // Generate source maps for better debugging
};


// npm start => to run if hotmodule is used 

Explanation: 
Let's break down each part of the provided webpack configuration:

const path = require("path");: This line imports the Node.js core module path, which provides utilities for working with file and directory paths. It's being used later to resolve paths.

const HtmlWebpackPlugin = require("html-webpack-plugin");: This imports the HtmlWebpackPlugin plugin, which simplifies the creation of HTML files to serve your webpack bundles.

const MiniCssExtractPlugin = require("mini-css-extract-plugin");: This imports the MiniCssExtractPlugin plugin, which extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.

const { CleanWebpackPlugin } = require("clean-webpack-plugin");: This imports the CleanWebpackPlugin plugin, which cleans your build directory (dist in this case) before each build.

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");: This imports the CssMinimizerPlugin, which is used to minimize CSS files in your project.

const TerserPlugin = require("terser-webpack-plugin");: This imports the TerserPlugin, which is used to minimize JavaScript files in your project.

module.exports = { ... };: This exports an object containing the webpack configuration.

mode: "development",: This sets the mode of webpack to development, enabling helpful tools and defaults geared towards development.

entry: { ... },: This specifies the entry points for webpack. It defines different JS and SCSS files to be bundled.

output: { ... },: This specifies how and where webpack should output your bundles.

module: { rules: [...] },: This section defines rules for how webpack should process different types of files. It includes rules for JavaScript, CSS/SCSS, images, and fonts.

plugins: [ ... ],: This section defines the plugins that webpack should use. It includes CleanWebpackPlugin, HtmlWebpackPlugin, and MiniCssExtractPlugin.

optimization: { ... },: This section allows you to customize how webpack optimizes your bundles. It includes settings for minimizing CSS and JavaScript, as well as splitting chunks.

devtool: "source-map",: This specifies the type of source map that should be generated to enhance the debugging process.

// npm start => to run if hotmodule is used: This comment suggests that if you want to use hot module replacement (HMR), you can run npm start to start the webpack development server.

Overall, this configuration sets up webpack to bundle JavaScript, CSS/SCSS, images, and fonts while optimizing and preparing them for production deployment. It includes various plugins and optimizations to enhance the development and production build processes.