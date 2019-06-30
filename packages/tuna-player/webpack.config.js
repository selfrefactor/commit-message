const webpack = require("webpack")

module.exports = {
    entry: `./renderer.js`,
    output: {
        path: __dirname,
        filename: `bundle.js`
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                include: __dirname,
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            }
        ]
    },
    externals: [
      (function () {
        var IGNORES = [
          'electron'
        ];
        return function (context, request, callback) {
          if (IGNORES.indexOf(request) >= 0) {
            return callback(null, "require('" + request + "')");
          }
          return callback();
        };
      })()
    ]
}
