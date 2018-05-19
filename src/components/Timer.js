import { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: this.props.seconds,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(this.timerTick, 1000);
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
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
  };

  render() {
    return this.state.seconds;
  }
}

export default Timer;