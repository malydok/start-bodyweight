import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import WorkoutPage from './pages/WorkoutPage';
import MyProgress from './pages/MyProgress';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleProgression from './pages/SingleProgression';
import { isAuthenticated } from './firebase';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={WorkoutPage} />
    <PrivateRoute path="/my-progress" component={MyProgress} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/progression/:type" component={SingleProgression} />
  </Switch>
);

export default Routes;
