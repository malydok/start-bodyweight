import React from 'react';
import { Card, Icon, Tag, Tooltip } from 'antd';
import repsFromDay from '../util/reps-from-day';
import capitalizeFirstLetter from '../util/capitalize-first-letter';

const ExcerciseCard = ({
  type,
  progression,
  day,
  excercise,
  updateProgression,
  length
}) => (
  <Card
    title={[
      `${capitalizeFirstLetter(type)}`,
      <Tag style={{ marginLeft: 12 }} color="blue">
        progression {progression}
      </Tag>,
      <Tag>day {day}</Tag>
    ]}
    bordered={false}
    style={{ marginBottom: 16 }}
    actions={[
      <Tooltip placement="bottom" title="Next progression">
        <Icon
          type="up-circle"
          style={{ color: '#1890ff' }}
          onClick={() => {
            updateProgression(type, {
              progression: Math.min(progression + 1, length),
              day
            });
          }}
        />
      </Tooltip>,
      <Tooltip placement="bottom" title="Previous progression">
        <Icon
          type="down-circle"
          style={{ color: '#1890ff' }}
          onClick={() => {
            updateProgression(type, {
              progression: Math.max(progression - 1, 0),
              day
            });
          }}
        />
      </Tooltip>,
      <Tooltip placement="bottom" title="Next day">
        <Icon
          type="up-circle-o"
          onClick={() => {
            updateProgression(type, {
              progression,
              day: Math.min(day + 1, 12)
            });
          }}
        />
      </Tooltip>,
      <Tooltip placement="bottom" title="Previous day">
        <Icon
          type="down-circle-o"
          onClick={() => {
            updateProgression(type, {
              progression,
              day: Math.max(day - 1, 0)
            });
          }}
        />
      </Tooltip>
    ]}
  >
    <img src={`/images/${type}/${excercise.image}`} alt="" />
    <p className="excercise-name" style={{ marginTop: 20, marginBottom: 5 }}>
      <strong>{excercise.name}</strong>
    </p>
    <p>
      Reps per set: <Tag style={{ marginLeft: 5 }}>{repsFromDay(day)}</Tag>
    </p>
  </Card>
);

export default ExcerciseCard;
