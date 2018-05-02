import React, { Component } from 'react';
import { Card, Icon, Tag, Tooltip } from 'antd';

import repsFromDay from '../util/reps-from-day';
import capitalizeFirstLetter from '../util/capitalize-first-letter';

class ExcerciseCard extends Component {
  nextProgression = () => {
    const { type, updateProgression, progression, day, maxProgression } = this.props;
    updateProgression(type, {
      progression: Math.min(progression + 1, maxProgression),
      day
    });
  };
  prevProgression = () => {
    const { type, updateProgression, progression, day } = this.props;
    updateProgression(type, {
      progression: Math.max(progression - 1, 0),
      day
    });
  };
  nextDay = () => {
    const { type, updateProgression, progression, day } = this.props;
    updateProgression(type, {
      progression,
      day: Math.min(day + 1, 12)
    });
  };
  prevDay = () => {
    const { type, updateProgression, progression, day } = this.props;
    updateProgression(type, {
      progression,
      day: Math.max(day - 1, 0)
    });
  };

  render() {
    const { type, progression, day, excercise } = this.props;
    return (
      <Card
        title={[
          `${capitalizeFirstLetter(type)}`,
          <Tag style={{ marginLeft: 12 }} color="blue">
            progression {progression+1}
          </Tag>,
          <Tag>day {day+1}</Tag>
        ]}
        bordered={false}
        style={{ marginBottom: 16 }}
        actions={[
          <Tooltip placement="bottom" title="Next progression">
            <Icon
              type="up-circle"
              style={{ color: '#1890ff' }}
              onClick={this.nextProgression}
            />
          </Tooltip>,
          <Tooltip placement="bottom" title="Previous progression">
            <Icon
              type="down-circle"
              style={{ color: '#1890ff' }}
              onClick={this.prevProgression}
            />
          </Tooltip>,
          <Tooltip placement="bottom" title="Next day">
            <Icon type="up-circle-o" onClick={this.nextDay} />
          </Tooltip>,
          <Tooltip placement="bottom" title="Previous day">
            <Icon type="down-circle-o" onClick={this.prevDay} />
          </Tooltip>
        ]}
      >
        <img src={`/images/${type}/${excercise.image}`} alt="" />
        <p
          className="excercise-name"
          style={{ marginTop: 20, marginBottom: 5 }}
        >
          <strong>{excercise.name}</strong>
        </p>
        <p>
          Reps per set: <Tag style={{ marginLeft: 5 }}>{repsFromDay(day)}</Tag>
        </p>
      </Card>
    );
  }
}

export default ExcerciseCard;
