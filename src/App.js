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
      workoutSettings: {
        breakTime: 60,
        skip: 'dips'
      },
      actions: {
        current: this.currentActions,
        settings: this.settingActions
      }
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

  updateSettings = setting => {
    this.setState(prevState => ({
      workoutSettings: {
        ...prevState.workoutSettings,
        ...setting
      }
    }));
  };

  settingActions = {
    setBreak: value => {
      this.updateSettings({
        breakTime: value
      });
    },
    switchSkipped: event => {
      this.updateSettings({
        skip: event.target.value
      });
    }
  };

  currentActions = defaultType => {
    const nextProgression = (type = defaultType) => {
      const { data, current } = this.state;
      const countExcercises = data[type].progressions.length - 1;
      this.updateCurrent(type, {
        progression: Math.min(current[type].progression + 1, countExcercises)
      });
    };
    const prevProgression = (type = defaultType) => {
      const { current } = this.state;
      this.updateCurrent(type, {
        progression: Math.max(current[type].progression - 1, 0)
      });
    };
    const nextDay = (type = defaultType) => {
      const { current } = this.state;
      const isPlank = type === 'planks';
      const setMax = isPlank ? 6 : 12;
      const countExcercises = data[type].progressions.length - 1;
      const isNextProgression =
        current[type].day === setMax &&
        current[type].progression < countExcercises;
      this.updateCurrent(type, {
        day: isNextProgression
          ? 0
          : Math.min(current[type].day + 1, countExcercises)
      });
      if (isNextProgression) {
        nextProgression();
      }
    };
    const prevDay = (type = defaultType) => {
      const { current } = this.state;
      const isPlank = type === 'planks';
      const setMax = isPlank ? 6 : 12;
      const isPrevProgression =
        current[type].day === 0 && current[type].progression > 0;
      this.updateCurrent(type, {
        day: isPrevProgression ? setMax : Math.max(0, current[type].day - 1)
      });
      if (isPrevProgression) {
        prevProgression();
      }
    };

    return {
      nextProgression,
      prevProgression,
      nextDay,
      prevDay
    };
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
