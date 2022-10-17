const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");
// const TerserPlugin = require("terser-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
// const dotenv = require("dotenv");
// const env = dotenv.config().parsed;

// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});

module.exports = [
  {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./tests/web/index.tsx",
    output: {
      filename: "web-test.js",
      path: path.resolve(__dirname, "tests/web/www")
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    development: true
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource"
        },
        {
          test: /\.tsx?$/,
          use: ["ts-loader"]
        }
      ]
    },
    plugins: [
      // new webpack.DefinePlugin(envKeys),
      // new Dotenv(),
      new HtmlWebpackPlugin({
        title: "Output",
        myPageHeader: "web tests",
        template: "./tests/web/index.html",
        filename: "./index.html"
      })
    ],
    devServer: {
      static: "./test/web/www"
    }
    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         keep_classnames: true,
    //         keep_fnames: true
    //       }
    //     })
    //   ]
    // }
    // resolve: {
    //   fallback: {
    //     os: require.resolve("os-browserify/browser"),
    //     path: require.resolve("path-browserify")
    //   }
    // }
  },
  {
    mode: "production",
    entry: "./src/icon-bridge-sdk.ts",
    output: {
      filename: "icon-bridge-sdk.cjs.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2"
    },
    externals: {
      https: "https",
      http: "http"
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: "./src/tsconfig.json"
          }
        }
      ]
    }
  },
  {
    mode: "production",
    entry: "./src/icon-bridge-sdk.ts",
    output: {
      filename: "icon-bridge-sdk.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2"
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: "./src/tsconfig.json"
          }
        }
      ]
    }
  }
];
