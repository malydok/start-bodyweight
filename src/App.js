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

  actions = defaultType => {
    
    const nextProgression = (type = defaultType) => {
      const { data, current } = this.state;
      const currentProgression = current[type].progression;
      const countExcercises = data[type].progressions.length - 1;
      this.updateCurrent(type, {
        progression: Math.min(currentProgression + 1, countExcercises)
      });
    };
    const prevProgression = (type = defaultType) => {
      const { current } = this.state;
      const currentProgression = current[type].progression;
      this.updateCurrent(type, {
        progression: Math.max(currentProgression - 1, 0)
      });
    };
    const nextDay = (type = defaultType) => {
      const { current } = this.state;
      const currentDay = current[type].day;
      const currentProgression = current[type].progression;
      const countExcercises = data[type].progressions.length - 1;
      const isNextProgression = currentDay === 12;
      this.updateCurrent(type, {
        day: isNextProgression ? 0 : currentDay + 1
      });
      if (isNextProgression && currentProgression < countExcercises) {
        nextProgression();
      }
    };
    const prevDay = (type = defaultType) => {
      const { current } = this.state;
      const currentDay = current[type].day;
      const currentProgression = current[type].progression;
      const isPrevProgression = currentDay === 0;
      this.updateCurrent(type, {
        day: isPrevProgression ? 12 : currentDay - 1
      });
      if (isPrevProgression && currentProgression > 0) {
        prevProgression();
      }
    };

    return {
      nextProgression,
      prevProgression,
      nextDay,
      prevDay
    }
  };

  render = () => (
    <BrowserRouter>
      <ExcercisesContext.Provider value={this.state}>
        <Shell />
      </ExcercisesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
