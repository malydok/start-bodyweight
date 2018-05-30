import React from 'react';
import { Layout } from 'antd';

import AuthMenu from './AuthMenu';
import NavMenu from './NavMenu';
import Routes from './Routes';

const { Footer, Sider, Content } = Layout;

const Shell = () => (
  <Layout>
    <Sider style={{ minHeight: '100vh' }}>
      <div style={{ padding: '20px 30px', color: 'white' }}>
        <p style={{marginBottom: 20}}>Start bodyweight</p>
        <AuthMenu />
      </div>
      <NavMenu />
    </Sider>
    <Layout>
      <Content style={{ padding: '30px 50px' }}>
        <Routes />
      </Content>
      <Footer>
        Content and routine taken from&nbsp;
        <a href="http://www.startbodyweight.com/">www.startbodyweight.com</a>.
      </Footer>
    </Layout>
  </Layout>
);

export default Shell;