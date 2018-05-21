import React from 'react';
import { ExcercisesByType } from '../components';

const SingleProgression = ({ match }) => (
  <ExcercisesByType type={match.params.type} />
);

export default SingleProgression;
