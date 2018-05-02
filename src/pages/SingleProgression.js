import React from 'react';
import ExcercisesByType from '../components/ExcercisesByType';

const SingleProgression = ({ match }) => (
  <ExcercisesByType type={match.params.type} />
);

export default SingleProgression;
