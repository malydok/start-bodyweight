import React from 'react';
import ExcercisesByType from '../components/excercises-by-type';

const SingleProgression = ({ match }) => (
  <ExcercisesByType type={match.params.type} />
);

export default SingleProgression;
