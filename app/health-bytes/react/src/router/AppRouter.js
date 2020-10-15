import React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Route, Switch } from 'react-router-dom';

import HomeContent from '../components/home/HomeContent';

const AppRouter = () => (
  <HashRouter>
    <Route>
      <Switch>
        <Route exact path="/" render={(props) => React.createElement(HomeContent, props)} />
      </Switch>
    </Route>
  </HashRouter>
);

export default hot(AppRouter);
