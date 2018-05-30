import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

import { ExcercisesContext } from './contexts/ExcercisesContext';

const AuthMenu = ({ user }) => (
  <React.Fragment>
    {user ? (
      <Tag color="#74b259">Logged in</Tag>
    ) : (
      <Tag color="#555555">Not logged in</Tag>
    )}
  </React.Fragment>
);

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <AuthMenu {...props} user={contextProps.user} />}
  </ExcercisesContext.Consumer>
);
