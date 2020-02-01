/* eslint-disable no-param-reassign */
const webpack = require('webpack')

module.exports = baseConfig => {
  baseConfig.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]-[local]_[hash:base64:5]',
          importLoaders: 1,
        },
      }
    ],
  });
  baseConfig.devServer = {
    ...baseConfig.devServer,
    headers            : { 'Access-Control-Allow-Origin' : '*' },
  }

  baseConfig.plugins = [
    ...baseConfig.plugins,
		new webpack.DefinePlugin({
      'process.env.NGROK': JSON.stringify(process.env.NGROK),
    })
	];
  return baseConfig;
};
