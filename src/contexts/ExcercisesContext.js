import React from 'react';
import excercises from '../data/excercises';

export const data = excercises;

export const excerciseOrder = [
  'squats',
  'pull-ups',
  'handstands',
  'leg-raises',
  'push-ups',
  'dips',
  'pulls',
  'planks'
];

export const defaultExcercises = Object.keys(data).reduce((values, type) => {
  values[type] = {
    progression: 0,
    day: 0
  };
  return values;
}, {});

export const ExcercisesContext = React.createContext({
  data,
  current: defaultExcercises,
  workoutSettings: {},
  actions: () => {}
});
