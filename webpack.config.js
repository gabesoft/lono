const path = require('path');
const webpack = require('webpack');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const showAnalysis = process.env.SHOW_ANALYSIS;

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks: (module) => /node_modules/.test(module.context)
  })
];

if (showAnalysis) {
  plugins.push(new BundleAnalyzer({ analyzerMode: 'static' }));
}

module.exports = {
  plugins,
  entry: './build/client/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    chunkFilename: '[name]-chunk.js',
    path: path.resolve(__dirname, 'build', 'public')
  },
  resolve: {
    modules: [
      path.resolve('./build'),
      path.resolve('./node_modules')
    ]
  }
};