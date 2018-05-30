import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WorkoutPage from './pages/WorkoutPage';
import MyProgress from './pages/MyProgress';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleProgression from './pages/SingleProgression';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={WorkoutPage} />
    <Route path="/my-progress" component={MyProgress} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/progression/:type" component={SingleProgression} />
  </Switch>
);

export default Routes;
