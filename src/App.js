import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  data,
  defaultExcercises,
  ExcercisesContext
} from './contexts/ExcercisesContext';
import Shell from './Shell';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      current: defaultExcercises,
      actions: this.actions
    };
  }

  updateCurrent = (type, newState) => {
    this.setState(prevState => ({
      current: {
        ...prevState.current,
        [type]: {
          ...prevState.current[type],
          ...newState
        }
      }
    }));
  };

  actions = defaultType => ({
    nextProgression: (type = defaultType) => {
      const { data, current } = this.state;
      const currentProgression = current[type].progression;
      const countExcercises = data[type].progressions.length - 1;
      this.updateCurrent(type, {
        progression: Math.min(currentProgression + 1, countExcercises)
      });
    },
    prevProgression: (type = defaultType) => {
      const { current } = this.state;
      const currentProgression = current[type].progression;
      this.updateCurrent(type, {
        progression: Math.max(currentProgression - 1, 0)
      });
    },
    nextDay: (type = defaultType) => {
      const { current } = this.state;
      const currentDay = current[type].day;
      this.updateCurrent(type, {
        day: Math.min(currentDay + 1, 12)
      });
    },
    prevDay: (type = defaultType) => {
      const { current } = this.state;
      const currentDay = current[type].day;
      this.updateCurrent(type, {
        day: Math.max(currentDay - 1, 0)
      });
    }
  });

  render = () => (
    <BrowserRouter>
      <ExcercisesContext.Provider value={this.state}>
        <Shell />
      </ExcercisesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
