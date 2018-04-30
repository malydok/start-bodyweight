import React, { Component } from 'react';
import excercises from '../data/excercises';

export const DefaultExcercises = Object.keys(excercises).reduce((values, type) => {
  values[type] = 0;
  return values;
}, {});
const CurrentExcercises = React.createContext(DefaultExcercises);

export default CurrentExcercises;