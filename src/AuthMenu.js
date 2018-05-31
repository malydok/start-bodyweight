import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

import { ExcercisesContext } from './contexts/ExcercisesContext';

const AuthMenu = ({ user }) => (
  <React.Fragment>
    {user ? (
      <React.Fragment>
        <Tag color="#74b259">Logged in</Tag>
        <Link to="/logout" style={{ fontSize: 12, marginLeft: 6 }}>
          Log out
        </Link>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Tag color="#555555">Not logged in</Tag>
        <Link to="/login" style={{ fontSize: 12, marginLeft: 6 }}>
          Log in
        </Link>
      </React.Fragment>
    )}
  </React.Fragment>
);

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <AuthMenu {...props} user={contextProps.user} />}
  </ExcercisesContext.Consumer>
);
