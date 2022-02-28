const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'app.js'), // 번들 작업할 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들화 된 파일 경로
    filename: 'app.js', // 파일 명
    clean : true
  },
  module:{
      rules:[
          {
              test: /\.js$/,
              exclude: /(node_modules|pages)/,
              use:{
                  loader: 'babel-loader'
              }
          },
          {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          }
      ]
  },
  plugins:[
    new HtmlPlugin({template:'./index.html'})

  ],
  devServer: {
    historyApiFallback: true,
  },
  watch: true // 자동 번들화 작업 여부

}

// webpack.config.js 파일