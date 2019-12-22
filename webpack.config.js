const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const mode = argv.mode && argv.mode.toLowerCase();
  const isProduction = mode === "production";

  console.info("Mode: ", mode);

  return {
    target: "web",
    watch: !isProduction,
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "(none)" : "sourcemap",
    entry: {
      main: "./src/main.tsx",
    },
    output: {
      path: path.resolve(__dirname, "docs"),
      filename: "[name].js"
    },
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json",
        ".scss",
        "sass",
        ".less",
        ".css",
        ".html"
      ],
      modules: ["node_modules"]
    },
    optimization: {
      minimize: isProduction
    },
    module: {
      rules: [
        {
          test: /\.(ts)|(tsx)|(js)|(jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          test: /\.(json5)|(json)$/,
          use: "json5-loader",
          type: "javascript/auto"
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader" // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                modules: !isProduction,
                sourceMap: !isProduction
              }
            },
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: !isProduction
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            // Creates `style` nodes from JS strings
            { loader: "style-loader" },
            // Translates CSS into CommonJS
            {
              loader: "css-loader",
              options: {
                modules: !isProduction,
                sourceMap: !isProduction
              }
            },
            // Compiles LESS to CSS
            {
              loader: "less-loader",
              options: {
                sourceMap: !isProduction
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" }, // Creates `style` nodes from JS strings
            {
              loader: "css-loader", // Translates CSS into CommonJS
              options: {
                modules: !isProduction,
                sourceMap: !isProduction
              }
            }
          ]
        },

        {
          test: /\.(ico)$/,
          loader: "file-loader",
          options: { limit: 8192 }
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          loader: "url-loader",
          options: { limit: 8192 }
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/i,
          loaders: [
            {
              loader: "file-loader",
              options: {
                name: "[sha512:hash:base64:7].[ext]",
                useRelativePath: true
              }
            }
          ]
        },
        {
          test: /\.svgin$/,
          use: "svg-inline-loader"
        },

        {
          test: /\.(md)|(sql)$/,
          use: [
            {
              loader: "raw-loader"
            }
          ]
        },
        {
          test: /\.mdx$/i,
          use: [
            'babel-loader',
            'react-markdown-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: isProduction
          ? "!!prerender-loader?string!src/index.html"
          : "src/index.html",
        minify: {
          collapseWhitespace: isProduction,
          removeComments: isProduction,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
          useShortDoctype: true
        }
      })
    ]
  };
};
