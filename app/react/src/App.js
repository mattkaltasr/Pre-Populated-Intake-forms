import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './router/AppRouter';

import '@babel/polyfill';
import './index.css';

const App = () => (
  <div className="root">
    <AppRouter />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
