import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import CurrentExcercises, {
  DefaultExcercises
} from './contexts/CurrentExcercises';
import CurrentExcercisesList from './components/CurrentExcercisesList';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <CurrentExcercises.Provider value={DefaultExcercises}>
        <Layout>
          <Header>
            <span style={{ color: 'white' }}>Start bodyweight</span>
          </Header>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu
                  key="menu1"
                  title={
                    <span>
                      <Icon type="user" />Progressions
                    </span>
                  }
                >
                  <Menu.Item key="prog1">Squats</Menu.Item>
                  <Menu.Item key="prog2">Pull-ups</Menu.Item>
                  <Menu.Item key="prog3">Hand stands</Menu.Item>
                  <Menu.Item key="prog4">Leg raises</Menu.Item>
                  <Menu.Item key="prog4">Push-ups</Menu.Item>
                  <Menu.Item key="prog4">Dips</Menu.Item>
                  <Menu.Item key="prog4">Pull-ups</Menu.Item>
                  <Menu.Item key="prog4">Planks</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '24px' }}>
              <CurrentExcercisesList />
            </Content>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
      </CurrentExcercises.Provider>
    );
  }
}

export default App;
