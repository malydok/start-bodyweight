import React, { Component } from 'react';
import { Col, Row, Button } from 'antd';

import { ExcercisesContext } from '../../contexts/ExcercisesContext';
import { ExcerciseCard } from '../../components';

class CurrentExcercisesList extends Component {
  actionsNoType = this.props.actions.current();

  updateAll = action => {
    const { current } = this.props;
    Object.keys(current).forEach(action);
  };

  nextProgressions = () => {
    this.updateAll(this.actionsNoType.nextProgression);
  };
  prevProgressions = () => {
    this.updateAll(this.actionsNoType.prevProgression);
  };
  nextDays = () => {
    this.updateAll(this.actionsNoType.nextDay);
  };
  prevDays = () => {
    this.updateAll(this.actionsNoType.prevDay);
  };

  render() {
    const { data, current, actions } = this.props;
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
          const currentExcercise = data[type].progressions[progression];
          const actionsWithType = actions.current(type);
          return (
            <Col span={6} key={type}>
              <ExcerciseCard
                type={type}
                progression={progression}
                day={day}
                excercise={currentExcercise}
                actions={actionsWithType}
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
