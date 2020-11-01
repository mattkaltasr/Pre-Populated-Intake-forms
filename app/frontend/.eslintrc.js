module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
      ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'airbnb-base', 'prettier', 'prettier/react'],
  plugins: ['react', 'jsx-a11y', 'react-hooks', 'prettier', 'import'],
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],

    'jsx-a11y/anchor-is-valid': 0,
    
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,

    // this documented as ok here: https://reactjs.org/docs/react-component.html#componentdidupdate
    'react/no-did-update-set-state': 0,

    // suggested by react-hooks plugin docs
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
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
};