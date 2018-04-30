import React from 'react';
import { Col, Row } from 'antd';
import { ExcercisesContext } from '../contexts/excercises-context';
import excercises from '../data/excercises';
import ExcerciseCard from './excercise-card';

const CurrentExcercisesList = () => (
  <ExcercisesContext.Consumer>
    {({ current, updateProgression }) => (
      <Row gutter={16} className="excercises">
        <h2 style={{ marginBottom: '24px' }}>Your progressions</h2>
        {Object.entries(current).map(([type, { progression, day }]) => {
          const currentExcercise = excercises[type][progression];
          return (
            <Col span={6} key={type}>
              <ExcerciseCard
                type={type}
                progression={progression}
                day={day}
                currentExcercise={currentExcercise}
                updateProgression={updateProgression}
                length={excercises[type].length - 1}
              />
            </Col>
          );
        })}
      </Row>
    )}
  </ExcercisesContext.Consumer>
);

export default CurrentExcercisesList;
