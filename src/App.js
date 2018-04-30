import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  defaultExcercises,
  ExcercisesContext
} from './contexts/excercises-context';
import CurrentExcercisesList from './components/current-excercises-list';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.updateProgression = (type, newState) => {
      this.setState(state => ({
        current: {
          ...state.current,
          [type]: newState
        }
      }));
    };

    this.state = {
      current: defaultExcercises,
      updateProgression: this.updateProgression
    };
  }

  render() {
    return (
      <ExcercisesContext.Provider value={this.state}>
        <Layout>
          <Header>
            <span style={{ color: 'white' }}>Start bodyweight</span>
          </Header>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                theme="dark"
                selectedKeys="menu1"
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="menu1">Your progressions</Menu.Item>
                <SubMenu
                  key="menu2"
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
      </ExcercisesContext.Provider>
    );
  }
}

export default App;
