const path = require("path");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      "/services/*": {
        target: "http://abakus.spacemaker.ai",
        changeOrigin: true
      }
    }
  }
};
