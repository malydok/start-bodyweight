import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Alert } from 'antd';

import { authRegister } from '../server/auth';

const FormItem = Form.Item;

class Register extends Component {
  state = {
    isSending: false,
    redirectToReferrer: false,
    error: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.register(values);
      }
    });
  };

  register = credentials => {
    this.setState({ isSending: true });
    authRegister(credentials)
      .then(resp => {
        this.setState({ isSending: false });
        if (resp.error) {
          throw resp.error;
        }
        this.setState({ redirectToReferrer: true });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    const from = this.props.location.state.from || { pathname: '/' };
    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer, isSending, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <React.Fragment>
        <h1 style={{ marginBottom: 40 }}>Register account</h1>
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
              Register
            </Button>
          </FormItem>
          {error && <Alert message={error} type="error" />}
        </Form>
      </React.Fragment>
    );
  }
}
export default Form.create()(Register);
