import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';

import {
  defaultExcercises,
  ExcercisesContext
} from './contexts/ExcercisesContext';
import NavMenu from './NavMenu';
import Routes from './Routes';

const { Footer, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: defaultExcercises,
      updateProgression: this.updateProgression,
      updateAllProgressions: this.updateAllProgressions
    };
  }

  updateProgression = (type, newState) => {
    this.setState(prevState => ({
      current: {
        ...prevState.current,
        [type]: newState
      }
    }));
  };

  render = () => (
    <BrowserRouter>
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
              <Routes />
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
    </BrowserRouter>
  );
}

export default App;
