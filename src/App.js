import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  data,
  defaultExcercises,
  ExcercisesContext
} from './contexts/ExcercisesContext';
import Shell from './Shell';
import { onAuthChange } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      current: defaultExcercises,
      workoutSettings: {
        breakTime: 60,
        skip: 'dips',
        playSound: true
      },
      actions: {
        current: this.currentActions,
        settings: this.settingActions
      },
      user: null
    };
  }

  componentDidMount() {
    onAuthChange(user => {
      this.setState({
        user
      });
    });
  }

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
    setSkipped: event => {
      this.updateSettings({
        skip: event.target.value
      });
    },
    setPlaySound: event => {
      this.updateSettings({
        playSound: event.target.value
      });
    }
  };

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
        day: isNextProgression ? 0 : Math.min(current[type].day + 1, setMax)
      });
      if (isNextProgression) {
        nextProgression(type);
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
        prevProgression(type);
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
    <ExcercisesContext.Provider value={this.state}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ExcercisesContext.Provider>
  );
}

export default App;
