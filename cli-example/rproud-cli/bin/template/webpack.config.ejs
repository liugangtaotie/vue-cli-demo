const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

let config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: './src/index',
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, isDev ? 'build/' : 'dist/'),
    clean: true,
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
      {
        test: /\.(css|scss|less)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'source-map-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};

if (isDev) {
  config = Object.assign(config, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './build',
      hot: true,
    },
    plugins: [
      ...config.plugins,
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  });
}

module.exports = config;
