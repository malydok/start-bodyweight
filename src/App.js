import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import {
  defaultExcercises,
  ExcercisesContext
} from './contexts/excercises-context';
import Home from './pages/home';
import MyProgress from './pages/my-progress';
import SingleProgression from './pages/single-progression';

import excercises from './data/excercises';
import capitalizeFirstLetter from './util/capitalize-first-letter';

const { SubMenu } = Menu;
const { Footer, Sider, Content } = Layout;

const NavMenu = () => (
  <Route
    render={({ location }) => {
      return (
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={['progression']}
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="play-circle-o" />
              Workout
            </Link>
          </Menu.Item>
          <Menu.Item key="/my-progress">
            <Link to="/my-progress">
              <Icon type="schedule" />
              My progressions
            </Link>
          </Menu.Item>
          <SubMenu
            key="progression"
            title={
              <span>
                <Icon type="line-chart" />
                Progressions
              </span>
            }
          >
            {Object.keys(excercises).map(type => (
              <Menu.Item key={`/progression/${type}`}>
                <Link to={`/progression/${type}`}>
                  {capitalizeFirstLetter(type)}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      );
    }}
  />
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: defaultExcercises,
      updateProgression: this.updateProgression
    };
  }

  updateProgression = (type, newState) => {
    this.setState(state => ({
      ...state,
      current: {
        ...state.current,
        [type]: newState
      }
    }));
  };

  render() {
    return (
      <Router>
        <ExcercisesContext.Provider value={this.state}>
          <Layout>
            <Sider style={{ minHeight: '100vh' }}>
              <div style={{ padding: '20px 30px', color: 'white' }}>
                Start bodyweight
              </div>
              <NavMenu />
            </Sider>
            <Layout>
              <Content style={{ padding: '30px 50px' }}>
                <Route exact path="/" component={Home} />
                <Route path="/my-progress" component={MyProgress} />
                <Route
                  path="/progression/:type"
                  component={SingleProgression}
                />
              </Content>
              <Footer>
                Content and routine taken from&nbsp;
                <a href="http://www.startbodyweight.com/">
                  www.startbodyweight.com
                </a>.
              </Footer>
            </Layout>
          </Layout>
        </ExcercisesContext.Provider>
      </Router>
    );
  }
}

export default App;
