import React from 'react';
import excercises from '../data/excercises';

export const defaultExcercises = Object.keys(excercises).reduce(
  (values, type) => {
    values[type] = {
      progression: 0,
      day: 0
    };
    return values;
  },
  {}
);

export const ExcercisesContext = React.createContext({
  current: defaultExcercises,
  updateProgression: () => {}
});
