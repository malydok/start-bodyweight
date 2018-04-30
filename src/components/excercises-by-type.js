import React from 'react';
import { ExcercisesContext } from '../contexts/excercises-context';
import { Card, Col, Row } from 'antd';

const ExcercisesByType = ({ type, levels }) => (
  <CurrentExcercises.Consumer>
    {({ current }) => (
      <Row gutter={16} className="excercises">
        {levels.map((excercise, index) => (
          <Col
            span={6}
            className={
              current[type] === index ? 'excercise current' : 'excercise'
            }
            key={excercise.image}
          >
            <Card
              title="Card title"
              bordered={false}
              style={{ marginBottom: '16px' }}
            >
              <img src={`/images/${type}/${excercise.image}`} alt="" />
              <p className="excercise-name">{excercise.name}</p>
            </Card>
          </Col>
        ))}
      </Row>
    )}
  </CurrentExcercises.Consumer>
);

export default ExcercisesByType;
