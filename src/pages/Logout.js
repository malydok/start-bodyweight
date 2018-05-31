import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { authSignOut } from '../firebase';

class Login extends Component {
  logout = () => {
    authSignOut();
  };

  componentDidMount() {
    this.logout();
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/' }
    };

    return <Redirect to={from} />;
  }
}
export default Login;
