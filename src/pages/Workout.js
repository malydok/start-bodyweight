import React, { Component } from 'react';
import {
  Row,
  Col,
  Steps,
  Progress,
  Button,
  Collapse,
  Slider,
  InputNumber
} from 'antd';

import excercises from '../data/excercises';
import { ExcercisesContext } from '../contexts/ExcercisesContext';
import capitalizeFirstLetter from '../util/capitalize-first-letter';
import repsFromDay from '../util/reps-from-day';
import Timer from '../components/Timer';

const Step = Steps.Step;
const Panel = Collapse.Panel;

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentExcercise: 0,
      currentSet: 0,
      isBreak: false,
      breakTime: 60
    };
  }

  getPercentDone = () => {
    const { currentExcercise, currentSet } = this.state;
    return Math.floor((currentExcercise * 3 + currentSet) / 0.21);
  };

  nextExcercise = () => {
    this.setState(prevState => ({
      currentExcercise: prevState.currentExcercise + 1,
      currentSet: 0,
      isBreak: true
    }));
  };

  nextSet = () => {
    if (this.state.isBreak) {
      return;
    }
    if (this.state.currentSet >= 2) {
      this.nextExcercise();
    } else {
      this.setState(prevState => ({
        currentSet: prevState.currentSet + 1,
        isBreak: true
      }));
    }
  };

  endBreak = () => {
    this.setState({
      isBreak: false
    });
  };

  onBreakChange = value => {
    this.setState({ breakTime: value });
  };

  render() {
    const { current } = this.props;
    const { currentExcercise, currentSet, isBreak, breakTime } = this.state;
    const excerciseType = Object.keys(current)[currentExcercise];
    const excerciseProgress = current[excerciseType];
    const excercise =
      excercises[excerciseType].progressions[excerciseProgress.progression];

    return <React.Fragment>
        <Collapse bordered={false} style={{ marginBottom: 30 }}>
          <Panel header="Settings" key="1">
            <hr style={{ opacity: 0.2, marginBottom: 25 }} />
            <Row>
              <Col span={2}>
                <p style={{ lineHeight: 2.5 }}>Rest time</p>
              </Col>
              <Col span={12}>
                <Slider min={30} max={180} onChange={this.onBreakChange} value={this.state.breakTime} />
              </Col>
              <Col span={4}>
                <InputNumber min={30} max={180} style={{ marginLeft: 16, marginRight: 6 }} value={this.state.breakTime} onChange={this.onBreakChange} />
                seconds
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <div style={{ backgroundColor: 'white', padding: 30 }}>
          <Progress percent={this.getPercentDone()} style={{ marginBottom: 30 }} />
          <Row gutter={16}>
            <Col span={5}>
              <Steps direction="vertical" current={currentExcercise}>
                {Object.keys(current)
                  .filter(item => item !== 'dips')
                  .map((type, index) => (
                    <Step
                      key={type}
                      title={capitalizeFirstLetter(type)}
                      description={
                        excercises[type].progressions[
                          excerciseProgress.progression
                        ].name
                      }
                    />
                  ))}
              </Steps>
            </Col>
            <Col span={5}>
              <Steps size="small" direction="vertical" current={currentSet}>
                {repsFromDay(excerciseProgress.day)
                  .split(' ')
                  .map((rep, index) => (
                    <Step
                      key={index}
                      title={'Set'}
                      description={`${rep} reps`}
                    />
                  ))}
              </Steps>
            </Col>
            <Col span={10}>
              <h2 style={{ marginBottom: 16 }}>{excercise.name}</h2>
              <img src={`/images/${excerciseType}/${excercise.image}`} alt="" />
              <hr style={{ opacity: 0.2, marginTop: 30, marginBottom: 30 }} />
              <Button type="primary" size="large" onClick={this.nextSet} disabled={isBreak}>
                {isBreak ? <Timer seconds={breakTime} onFinished={this.endBreak} /> : 'Next set'}
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>;
  }
}

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <Workout {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);
