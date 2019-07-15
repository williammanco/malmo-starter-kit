const fs = require('fs');
const path = require('path');
const HtmlWebpackReloadPlugin = require('html-webpack-reload-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackDynamicTemplateParametersPlugin = require('./build/HtmlWebpackDynamicTemplateParametersPlugin');

const views = fs.readdirSync('./src/views');

module.exports = () => ({
  plugins: [
    ...views.map(view => new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'views', view),
      filename: view.replace('.hbs', '.html'),
    })),
    ...views.map(view => new HtmlWebpackDynamicTemplateParametersPlugin({ path: path.resolve(__dirname, 'src', 'data', view.replace('.hbs', '.json')) })),
    new CopyPlugin([
      {
        from: './src/assets',
        to: 'assets',
      },
    ]),
    process.env.NODE_ENV === 'development' ? new HtmlWebpackReloadPlugin() : undefined,
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
});
