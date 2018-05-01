import React from 'react';
import { Button } from 'antd';

import excercises from '../data/excercises';

const ExcercisesByType = ({ type }) => (
  <React.Fragment>
    <h1 style={{ marginBottom: 24 }}>Progressions for {type}</h1>
    {excercises[type].map((excercise, index) => (
      <div style={{ overflow: 'hidden', marginBottom: 20 }}>
        <img
          src={`/images/${type}/${excercise.image}`}
          style={{ float: 'left', marginRight: 18 }}
        />
        {excercise.name}
        <Button />
      </div>
    ))}
  </React.Fragment>
);

export default ExcercisesByType;
