import React from 'react';
import { Row, Col, Collapse, Slider, InputNumber } from 'antd';

const Panel = Collapse.Panel;

const WorkoutSettings = ({ onChange, time }) => (
  <Collapse bordered={false} style={{ marginBottom: 30 }}>
    <Panel header="Settings" key="1">
      <hr style={{ opacity: 0.2, marginBottom: 25 }} />
      <Row>
        <Col span={2}>
          <p style={{ lineHeight: 2.5 }}>Rest time</p>
        </Col>
        <Col span={12}>
          <Slider min={30} max={180} onChange={onChange} value={time} />
        </Col>
        <Col span={4}>
          <InputNumber
            min={30}
            max={180}
            style={{ marginLeft: 16, marginRight: 6 }}
            value={time}
            onChange={onChange}
          />
          seconds
        </Col>
      </Row>
    </Panel>
  </Collapse>
);

export default WorkoutSettings;
