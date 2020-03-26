import webpack from "webpack";
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const webpackConfig: webpack.Configuration = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/client'],
  mode: 'development',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/'
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

export const getMiddlewares = () => {
  const compiler = webpack(webpackConfig)

  return [
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output!.publicPath ?? '/static/',
      // writeToDisk: true
    }),
    webpackHotMiddleware(compiler)
  ]
}
