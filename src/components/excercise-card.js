import React from 'react';
import { Card, Icon } from 'antd';
import repsFromDay from '../util/reps-from-day';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ExcerciseCard = ({
  type,
  progression,
  day,
  currentExcercise,
  updateProgression,
  length
}) => (
  <Card
    title={`${capitalizeFirstLetter(
      type
    )}: progression ${progression}, day ${day}`}
    bordered={false}
    actions={[
      <Icon
        type="up"
        onClick={() => {
          updateProgression(type, {
            progression: Math.min(progression + 1, length),
            day
          });
        }}
      />,
      <Icon
        type="down"
        onClick={() => {
          updateProgression(type, {
            progression: Math.max(progression - 1, 0),
            day
          });
        }}
      />,
      <Icon
        type="caret-left"
        onClick={() => {
          updateProgression(type, {
            progression,
            day: Math.max(day - 1, 0)
          });
        }}
      />,
      <Icon
        type="caret-right"
        onClick={() => {
          updateProgression(type, {
            progression,
            day: Math.min(day + 1, 15)
          });
        }}
      />
    ]}
    style={{ marginBottom: '16px' }}
  >
    <img src={`/images/${type}/${currentExcercise.image}`} alt="" />
    <p className="excercise-name" style={{ marginTop: '20px' }}><strong>{currentExcercise.name}</strong></p>
    <p>Reps per set: {repsFromDay(day)}</p>
  </Card>
);

export default ExcerciseCard;
