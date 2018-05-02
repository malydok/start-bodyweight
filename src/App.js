import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import {
  defaultExcercises,
  ExcercisesContext
} from './contexts/ExcercisesContext';
import NavMenu from './NavMenu';
import Workout from './pages/Workout';
import MyProgress from './pages/MyProgress';
import SingleProgression from './pages/SingleProgression';

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
    this.setState(state => ({
      ...state,
      current: {
        ...state.current,
        [type]: newState
      }
    }));
  };

  render = () => (
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
              <Route exact path="/" component={Workout} />
              <Route path="/my-progress" component={MyProgress} />
              <Route path="/progression/:type" component={SingleProgression} />
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

export default App;
