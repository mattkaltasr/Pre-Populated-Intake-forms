module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'import'],
  env: {
    jest: true,
  },
  rules: {
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'prettier/prettier': 'error',

    'class-methods-use-this': 0,

    'no-underscore-dangle': ['error', { allowAfterThis: true }],

    'no-return-assign': ['error', 'except-parens'],

    'no-param-reassign': 0,

    'no-continue': 0,

    'import/prefer-default-export': 0,
  },
  globals: {
    cy: true /* cypress test */,
  },
};
