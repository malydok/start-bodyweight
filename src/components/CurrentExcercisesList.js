import React from 'react';
import { Card, Col, Row } from 'antd';
import CurrentExcercises from '../contexts/CurrentExcercises';
import excercises from '../data/excercises';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CurrentExcercisesList = () => (
  <CurrentExcercises.Consumer>
    {current => (
      <Row gutter={16} className="excercises">
        {Object.entries(current).map(([type, progress]) => {
          const currentExcercise = excercises[type][progress];
          return (
            <Col span={6} key={type}>
              <Card
                title={`${capitalizeFirstLetter(
                  type
                )}: progression ${progress}`}
                bordered={false}
                style={{ marginBottom: '16px' }}
              >
                <img src={`/images/${type}/${currentExcercise.image}`} alt="" />
                <p className="excercise-name">{currentExcercise.name}</p>
              </Card>
            </Col>
          );
        })}
      </Row>
    )}
  </CurrentExcercises.Consumer>
);

export default CurrentExcercisesList;
