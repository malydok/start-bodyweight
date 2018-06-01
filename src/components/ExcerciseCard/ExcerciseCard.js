import React from 'react';
import { Card, Icon, Tag, Tooltip } from 'antd';

import { capitalizeFirstLetter, repsFromDay } from '../../util';

const ExcerciseCard = ({ type, progression, day, excercise, actions }) => (
  <Card
    title={[
      `${capitalizeFirstLetter(type)}`,
      <Tag key="1" style={{ marginLeft: 12 }} color="blue">
        progression {progression + 1}
      </Tag>,
      <Tag key="2">day {day + 1}</Tag>
    ]}
    bordered={false}
    style={{ marginBottom: 16 }}
    actions={[
      <Tooltip key="1" placement="bottom" title="Next progression">
        <Icon
          type="up-circle"
          style={{ color: '#1890ff' }}
          onClick={() => actions.nextProgression()}
        />
      </Tooltip>,
      <Tooltip key="2" placement="bottom" title="Previous progression">
        <Icon
          type="down-circle"
          style={{ color: '#1890ff' }}
          onClick={() => actions.prevProgression()}
        />
      </Tooltip>,
      <Tooltip key="3" placement="bottom" title="Next day">
        <Icon type="up-circle-o" onClick={() => actions.nextDay()} />
      </Tooltip>,
      <Tooltip key="4" placement="bottom" title="Previous day">
        <Icon type="down-circle-o" onClick={() => actions.prevDay()} />
      </Tooltip>
    ]}
  >
    <img style={{ maxWidth: '100%' }} src={`/images/${type}/${excercise.image}`} alt="" />
    <p className="excercise-name" style={{ marginTop: 20, marginBottom: 5 }}>
      <strong>{excercise.name}</strong>
    </p>
    {type === 'planks' ? (
      <div>
        Hold for: <Tag style={{ marginLeft: 5 }}>{30 + 5 * day} seconds</Tag>
      </div>
    ) : (
      <div>
        Reps per set: <Tag style={{ marginLeft: 5 }}>{repsFromDay(day)}</Tag>
      </div>
    )}
  </Card>
);

export default ExcerciseCard;
