import React, { Component } from 'react';
import { Row, Col, Steps, Progress, Card, Button } from 'antd';

import excercises from '../data/excercises';
import { ExcercisesContext } from '../contexts/ExcercisesContext';
import capitalizeFirstLetter from '../util/capitalize-first-letter';
import repsFromDay from '../util/reps-from-day';

const Step = Steps.Step;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: this.props.seconds,
      timerID: null
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  timerTick = () => {
    const { seconds, timerID } = this.state;
    this.setState({
      seconds: seconds - 1,
      timerID
    });
  };

  setTimer = () => {
    this.setState({
      seconds: this.state.seconds,
      timerID: setInterval(this.timerTick, 1000)
    });
  };

  render() {
    return <p>{this.state.seconds}</p>;
  }
}

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentExcercise: 0,
      currentSet: 0
    };
  }

  getPercentDone = () => {
    const { currentExcercise, currentSet } = this.state;
    return Math.floor((currentExcercise * 3 + currentSet) / 0.21);
  };

  nextExcercise = () => {
    this.setState({
      currentExcercise: this.state.currentExcercise + 1,
      currentSet: 0
    });
  };

  nextSet = () => {
    const set = this.state.currentSet;
    if (set >= 2) {
      this.nextExcercise();
    } else {
      this.setState({
        currentExcercise: this.state.currentExcercise,
        currentSet: set + 1
      });
    }
  };

  render() {
    const { current } = this.props;
    const { currentExcercise, currentSet } = this.state;
    const excerciseType = Object.keys(current)[currentExcercise];
    const excerciseProgress = current[excerciseType];
    const excercise =
      excercises[excerciseType].progressions[excerciseProgress.progression];

    return (
      <React.Fragment>
        <Progress
          percent={this.getPercentDone()}
          style={{ marginBottom: 30 }}
        />
        {/* <Timer seconds={60}/> */}
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
                  <Step key={index} title={'Set'} description={`${rep} reps`} />
                ))}
            </Steps>
          </Col>
          <Col span={10}>
            <Card
              title={[excercise.name]}
              bordered={false}
              style={{ marginBottom: 16 }}
            >
              <img src={`/images/${excerciseType}/${excercise.image}`} alt="" />
            </Card>
            <Button size="large" onClick={this.nextSet}>
              Done
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <Workout {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);
