import React from 'react';
import { Row, Col, Button, Card } from 'antd';

import excercises from '../data/excercises';

const { Meta } = Card;

const ExcercisesByType = ({ type }) => (
  <React.Fragment>
    <h1 style={{ marginBottom: 12 }}>Progressions for {type}</h1>
    <Button href={excercises[type].url} style={{ marginBottom: 24 }}>
      Description on startbodyweight.com
    </Button>
    <Row gutter={16}>
      {excercises[type].progressions.map((excercise, index) => (
        <Col span={4} key={index} style={{ clear: index % 6 === 0 ? 'left' : '' }}>
          <Card
            style={{ marginBottom: 16 }}
            cover={<img alt="" src={`/images/${type}/${excercise.image}`} />}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 18,
                color: 'white',
                fontSize: '5em',
                textShadow: '-1px -1px 0 rgba(0,0,0,0.3)'
              }}
            >
              {index+1}
            </span>
            <Meta title={excercise.name} />
          </Card>
        </Col>
      ))}
    </Row>
  </React.Fragment>
);

export default ExcercisesByType;
