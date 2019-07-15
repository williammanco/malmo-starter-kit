const path = require('path');
const postCssPresetEnv = require('postcss-preset-env');

module.exports = () => ({
  js: {
    include: path.resolve(__dirname, 'node_modules/@aquestsrl/dev-utils'),
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  },
  postcss: {
    plugins: [
      postCssPresetEnv({
        stage: 0,
        browsers: process.env.NODE_ENV === 'development' ? '> 3%' : null,
      }),
    ],
  },
});
