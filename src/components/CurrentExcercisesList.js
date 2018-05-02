import React, { Component } from 'react';
import { Col, Row, Button } from 'antd';

import { ExcercisesContext } from '../contexts/ExcercisesContext';
import excercises from '../data/excercises';
import ExcerciseCard from './ExcerciseCard';

class CurrentExcercisesList extends Component {
  nextProgressions = () => {
    const { current, updateProgression } = this.props;
    Object.entries(current).forEach(([type, { progression, day }]) => {
      const length = excercises[type].progressions.length - 1;
      updateProgression(type, {
        progression: Math.min(progression + 1, length),
        day
      });
    });
  };
  prevProgressions = () => {
    const { current, updateProgression } = this.props;
    Object.entries(current).forEach(([type, { progression, day }]) => {
      updateProgression(type, {
        progression: Math.max(progression - 1, 0),
        day
      });
    });
  };
  nextDays = () => {
    const { current, updateProgression } = this.props;
    Object.entries(current).forEach(([type, { progression, day }]) => {
      updateProgression(type, {
        progression,
        day: Math.min(day + 1, 12)
      });
    });
  };
  prevDays = () => {
    const { current, updateProgression } = this.props;
    Object.entries(current).forEach(([type, { progression, day }]) => {
      updateProgression(type, {
        progression,
        day: Math.max(day - 1, 0)
      });
    });
  };

  render() {
    const { current, updateProgression } = this.props;
    return (
      <Row gutter={16}>
        <h1 style={{ marginBottom: 24 }}>My progressions</h1>
        <div>
          <Button
            icon="up-circle"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={this.nextProgressions}
          >
            Next progressions
          </Button>
          <Button
            icon="down-circle"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={this.prevProgressions}
          >
            Previous progressions
          </Button>
          <Button
            icon="up-circle-o"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={this.nextDays}
          >
            Next day
          </Button>
          <Button
            icon="down-circle-o"
            style={{ marginRight: 10, marginBottom: 20 }}
            onClick={this.prevDays}
          >
            Previous day
          </Button>
        </div>
        {Object.entries(current).map(([type, { progression, day }]) => {
          const currentExcercise = excercises[type].progressions[progression];
          const progressionsCount = excercises[type].progressions.length - 1;
          return (
            <Col span={6} key={type}>
              <ExcerciseCard
                type={type}
                progression={progression}
                day={day}
                excercise={currentExcercise}
                updateProgression={updateProgression}
                maxProgression={progressionsCount}
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <CurrentExcercisesList {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);
