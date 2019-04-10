import React, { Component } from 'react';
import { Row, Col, Steps, Progress, Button, Popover } from 'antd';

import { capitalizeFirstLetter, repsFromDay } from '../../util';
import { data, excerciseOrder, ExcercisesContext } from '../../contexts/ExcercisesContext';
import { Timer, WorkoutSettings } from '../../components';

const Step = Steps.Step;

class Workout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentExcercise: 0,
      currentSet: 0,
      isBreak: false,
      isPlanking: false,
      isFinished: false
    };
    this.ping = new Audio('ping.mp3');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const exerciseTypes = excerciseOrder.filter(
      item => item !== nextProps.workoutSettings.skip
    );
    return {
      excercises: exerciseTypes,
      plankIndex: exerciseTypes.indexOf('planks')
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyboardShortcut);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyboardShortcut);
  }

  playPing() {
    if (this.props.workoutSettings.playSound) {
      this.ping.play();
    }
  }

  handleKeyboardShortcut = event => {
    switch (event.code) {
      case 'Space':
        this.nextSet();
        break;
      case 'KeyS':
        this.endBreak(true);
        break;
      default:
        break;
    }
  };

  getPercentDone = () => {
    const { currentExcercise, currentSet } = this.state;
    return Math.floor((currentExcercise * 3 + currentSet) / 0.19);
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
    if (this.state.plankIndex === this.state.currentExcercise) {
      this.startPlank();
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

  endBreak = skipPing => {
    if (!skipPing) {
      this.playPing();
    }
    this.setState({
      isBreak: false
    });
  };

  startPlank = () => {
    this.setState({
      isPlanking: true
    });
  };

  workoutFinished = () => {
    this.playPing();
    this.setState(prevState => ({
      currentSet: prevState.currentSet + 1,
      isPlanking: false,
      isFinished: true
    }));
  };

  render() {
    const { current, actions, workoutSettings } = this.props;
    const {
      currentExcercise,
      currentSet,
      isBreak,
      isPlanking,
      isFinished,
      excercises
    } = this.state;
    const excerciseType = excercises[currentExcercise];
    const excerciseProgress = current[excerciseType];
    const excercise =
      data[excerciseType].progressions[excerciseProgress.progression];
    const isPlank = excerciseType === 'planks';
    const plankTime = 30 + 5 * excerciseProgress.day;

    return (
      <React.Fragment>
        <WorkoutSettings
          actions={actions.settings}
          settings={workoutSettings}
        />

        <div style={{ backgroundColor: 'white', padding: 30 }}>
          <Progress
            percent={this.getPercentDone()}
            style={{ marginBottom: 30 }}
          />
          <Row gutter={16}>
            <Col span={5}>
              <Steps
                direction="vertical"
                current={isFinished ? currentExcercise + 1 : currentExcercise}
              >
                {excercises.map(type => (
                  <Step
                    key={type}
                    title={capitalizeFirstLetter(type)}
                    description={
                      data[type].progressions[Math.min(current[type].progression, data[type].progressions.length - 1)].name
                    }
                  />
                ))}
              </Steps>
            </Col>
            <Col span={5}>
              <Steps size="small" direction="vertical" current={currentSet}>
                {isPlank ? (
                  <Step title={'Set'} description={`${plankTime} seconds`} />
                ) : (
                  repsFromDay(excerciseProgress.day)
                    .split(' ')
                    .map((rep, index) => (
                      <Step
                        key={index}
                        title={'Set'}
                        description={`${rep} reps`}
                      />
                    ))
                )}
              </Steps>
            </Col>
            {isFinished ? (
              <Col span={10}>Workout finished! Congratulations!</Col>
            ) : (
              <Col span={10}>
                <h2 style={{ marginBottom: 16 }}>{excercise.name}</h2>
                <img
                  src={`/images/${excerciseType}/${excercise.image}`}
                  alt=""
                />
                <hr style={{ opacity: 0.2, marginTop: 30, marginBottom: 30 }} />
                {isPlank && !isBreak ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.nextSet}
                    disabled={isPlanking}
                  >
                    {isPlanking ? (
                      <React.Fragment>
                        Hold for{' '}
                        <Timer
                          seconds={plankTime}
                          onFinished={this.workoutFinished}
                        />s
                      </React.Fragment>
                    ) : (
                      'Start the timer'
                    )}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.nextSet}
                    disabled={isBreak}
                  >
                    {isBreak ? (
                      <React.Fragment>
                        Rest{' '}
                        <Timer
                          seconds={workoutSettings.breakTime}
                          onFinished={this.endBreak}
                        />s
                      </React.Fragment>
                    ) : (
                      'Next set'
                    )}
                  </Button>
                )}
                {isBreak && (
                  <Button
                    icon="close"
                    onClick={this.endBreak.bind(this, true)}
                    style={{ marginLeft: 15 }}
                  >
                    skip
                  </Button>
                )}
                <Popover
                  placement="right"
                  content={
                    <div>
                      <code style={{ color: '#1890ff' }}>Space</code> - next set
                      <br />
                      <code style={{ color: '#1890ff' }}>S</code> - skip rest
                      break
                    </div>
                  }
                  title="Keyboard shortcuts"
                >
                  <Button
                    shape="circle"
                    icon="info"
                    style={{ marginLeft: 15 }}
                  />
                </Popover>
              </Col>
            )}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default props => (
  <ExcercisesContext.Consumer>
    {contextProps => <Workout {...props} {...contextProps} />}
  </ExcercisesContext.Consumer>
);
