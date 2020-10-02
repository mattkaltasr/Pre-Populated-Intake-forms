module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', '../.eslintrc.js', 'prettier/react'],
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    'jsx-a11y/anchor-is-valid': 0,

    'react/no-did-update-set-state': 0,

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
