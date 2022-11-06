const path = require("path");
const webpack = require("webpack");

// TODO: add configuration for production build
module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
              },
              {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
              }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
      },
      devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
      },
      plugins: [new webpack.HotModuleReplacementPlugin()]
}