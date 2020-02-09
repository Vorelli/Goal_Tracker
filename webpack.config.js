const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/Goal_Tracker/"
  },
  optimization: {
    minimize: false
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: ["./dist"],
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"]
      }
    ]
  }
};
