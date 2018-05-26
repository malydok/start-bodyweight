import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { authLogin } from '../firebase';
import { Form, Icon, Input, Button, Alert } from 'antd';

const FormItem = Form.Item;

class Login extends Component {
  state = {
    isSending: false,
    redirectToReferrer: false,
    error: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.login(values);
      }
    });
  };

  login = credentials => {
    this.setState({ isSending: true });
    authLogin(credentials)
      .then(resp => {
        this.setState({ isSending: false });
        if (resp.error) {
          throw resp.error;
        }
        console.log(resp);
        this.setState({ redirectToReferrer: true });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from, registerSuccess } = this.props.location.state || {
      from: { pathname: '/' }
    };
    const { redirectToReferrer, isSending, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <React.Fragment>
        {registerSuccess && (
          <Alert
            message="Registration succeeded, you may now log in"
            type="success"
          />
        )}
        <h1 style={{ marginBottom: 40 }}>Login</h1>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300 }}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="email"
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              loading={isSending}
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
            <a style={{ float: 'right' }} href="">
              Forgot password
            </a>
          </FormItem>
          {error && <Alert message={error} type="error" />}
        </Form>
      </React.Fragment>
    );
  }
}
export default Form.create()(Login);
