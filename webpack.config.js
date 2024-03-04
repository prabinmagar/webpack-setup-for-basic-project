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