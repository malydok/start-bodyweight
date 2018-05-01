import React from 'react';
import { Col, Row, Button } from 'antd';

import { ExcercisesContext } from '../contexts/excercises-context';
import excercises from '../data/excercises';
import ExcerciseCard from './excercise-card';

const CurrentExcercisesList = () => (
  <ExcercisesContext.Consumer>
    {({ current, updateProgression }) => (
      <Row gutter={16}>
        <h1 style={{ marginBottom: 24 }}>My progressions</h1>
        <div>
          <Button
            icon="up-circle"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={() => {
              Object.entries(current).forEach(
                ([type, { progression, day }]) => {
                  const length = excercises[type].length - 1;
                  updateProgression(type, {
                    progression: Math.min(progression + 1, length),
                    day
                  });
                }
              );
            }}
          >
            Next progressions
          </Button>
          <Button
            icon="down-circle"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={() => {
              Object.entries(current).forEach(
                ([type, { progression, day }]) => {
                  updateProgression(type, {
                    progression: Math.max(progression - 1, 0),
                    day
                  });
                }
              );
            }}
          >
            Previous progressions
          </Button>
          <Button
            icon="up-circle-o"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={() => {
              Object.entries(current).forEach(
                ([type, { progression, day }]) => {
                  updateProgression(type, {
                    progression,
                    day: Math.min(day + 1, 12)
                  });
                }
              );
            }}
          >
            Next day
          </Button>
          <Button
            icon="down-circle-o"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={() => {
              Object.entries(current).forEach(
                ([type, { progression, day }]) => {
                  updateProgression(type, {
                    progression,
                    day: Math.max(day - 1, 0)
                  });
                }
              );
            }}
          >
            Previous day
          </Button>
        </div>
        {Object.entries(current).map(([type, { progression, day }]) => {
          const currentExcercise = excercises[type][progression];
          return (
            <Col span={6} key={type}>
              <ExcerciseCard
                type={type}
                progression={progression}
                day={day}
                excercise={currentExcercise}
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
