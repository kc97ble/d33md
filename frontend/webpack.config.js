const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@d33md/config": path.resolve(__dirname, "config.js"),
      src: path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                exportGlobals: true,
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  devServer: {
    historyApiFallback: {
      index: "/index.html",
      disableDotRule: true,
    },
    port: 8002,
    host: "0.0.0.0",
  },
};
