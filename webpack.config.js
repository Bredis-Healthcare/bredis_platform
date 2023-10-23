const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                ],
              },
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  resolve: {   // 이 부분을 추가합니다.
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html',
        publicPath: '/'
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
