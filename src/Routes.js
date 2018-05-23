import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WorkoutPage from './pages/WorkoutPage';
import MyProgress from './pages/MyProgress';
import SingleProgression from './pages/SingleProgression';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={WorkoutPage} />
    <Route path="/my-progress" component={MyProgress} />
    <Route path="/progression/:type" component={SingleProgression} />
  </Switch>
);

export default Routes;