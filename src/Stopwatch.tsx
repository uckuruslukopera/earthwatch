import * as React from "react";
import styled from "styled-components";
import Time from "./Time";
import Message from "./Message";
import randomBackground from "./utils/randomBackground";
import secondsToMessage from "./utils/secondsToMessage";

interface Props {}

interface State {
  seconds: number;
  isCounting: boolean;
  containerBackground: {backgroundImage: string};
  message: string;
}

const Button = styled.button`
  display: inline-block;
  border: 1px solid black;
  background-color: transparent;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  outline: unset;
`;

const ReplayButton = styled.button`
  border: none;
  background-color: transparent;
  outline: unset;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Icon = styled.i`
  font-size: 64px;
`;

const ReplayIcon = styled.i`
  font-size: 36px;
`;

const Div = styled.div`
  text-align: center;
  padding: 1rem;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class Stopwatch extends React.Component<Props, State> {
  timer;
  state: State = {
    seconds: 0,
    isCounting: false,
    containerBackground: {backgroundImage: randomBackground()},
    message: "The Earth is a fine place and worth fighting for."
  };

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      seconds: 0,
      isCounting: false
    });
  }

  start() {
    this.setState({ isCounting: !this.state.isCounting });
    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
      if(this.state.seconds % 10 === 0) {
        this.setState({
          containerBackground: {
            backgroundImage: randomBackground()
          },
          message: secondsToMessage(this.state.seconds)
        })
      }
    }, 1000);
  }

  pause() {
    this.setState({ isCounting: !this.state.isCounting });
    clearInterval(this.timer);
  }

  stop() {
    this.setState({ isCounting: !this.state.isCounting });
    clearInterval(this.timer);
  }

  render() {
    
    return (
      <Container style={this.state.containerBackground}>
        <Div>
          <Button onClick={this.state.isCounting ? this.stop : this.start}>
            <Icon className="material-icons">
              {this.state.isCounting ? "pause" : "play_arrow"}
            </Icon>
          </Button>
          <Time seconds={this.state.seconds} />

          <Message message={this.state.message} />

          <ReplayButton onClick={this.reset}>
            <ReplayIcon className="material-icons">replay</ReplayIcon>
          </ReplayButton>
        </Div>
      </Container>
    );
  }
}
