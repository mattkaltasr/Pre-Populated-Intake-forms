module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
  ],
  env: {
    test: {
      plugins: ['dynamic-import-node'],
    },
  },
};