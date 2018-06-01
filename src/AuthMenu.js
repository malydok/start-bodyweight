import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Tag } from 'antd';

import { ExcercisesContext } from './contexts/ExcercisesContext';
import { authSignOut } from './server/auth';

const AuthMenu = ({ user }) => (
  <Route
    render={({ location }) => (
      <React.Fragment>
        {user ? (
          <React.Fragment>
            <Tag color="#74b259">Logged in</Tag>
            <a onClick={authSignOut} style={{ fontSize: 12, marginLeft: 6 }}>
              Log out
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tag color="#555555">Not logged in</Tag>
            <Link
              to={{
                pathname: '/login',
                state: {
                  from: location
                }
              }}
              style={{ fontSize: 12, marginLeft: 6 }}
            >
              Log in
            </Link>
          </React.Fragment>
        )}
      </React.Fragment>
    )}
  />
);

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <AuthMenu {...props} user={contextProps.user} />}
  </ExcercisesContext.Consumer>
);
