import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: this.props.seconds,
    };
    this.timerID = null;
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  timerTick = () => {
    const { seconds } = this.state;
    if (seconds <= 1) {
      clearInterval(this.timerID);
      this.props.onFinished();
      return;
    }
    this.setState({
      ...this.state,
      seconds: seconds - 1
    });
  };

  setTimer = () => {
    this.timerID = setInterval(this.timerTick, 1000);
  };

  render() {
    return `Rest ${this.state.seconds}s`;
  }
}

export default Timer;