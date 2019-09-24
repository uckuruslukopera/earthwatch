import * as React from "react";
import styled from "styled-components";
import Time from "./Time";
import Message from "./Message";
import randomBackground from "./_utils/randomBackground";
import secondsToMessage from "./_utils/secondsToMessage";
const logo = require('./_assets/gp_logo_2_white.png');

interface Props { }

interface State {
  seconds: number;
  isCounting: boolean;
  containerBackground: { backgroundImage: string };
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
`;

const Icon = styled.i`
  font-size: 64px;
`;

const ReplayIcon = styled.i`
  font-size: 36px;
`;

const Div = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

const Container = styled.div`
  height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  position:absolute;
  top: 8px;
  right: 8px;
  left: 8px;
  padding: 5px 15px;
`;

const Footer = styled.div`
  display:flex;
  justify-content: space-between;
  position: absolute;
  bottom: 8px;
  left: 8px;
  right:8px;
  padding: 10px;
  font-size: 13px;
  background-color: #fff;
  a, span {
    text-decoration: none;
    font-weight: 700;
    color: #6c0;
    font-famiy: Verdana
  }
`;

const Logo = styled.div`

`;

export default class Stopwatch extends React.Component<Props, State> {
  timer: any;
  state: State = {
    seconds: 0,
    isCounting: false,
    containerBackground: { backgroundImage: randomBackground() },
    message: ""
  };

  constructor(props: Props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      seconds: 0,
      isCounting: false,
      containerBackground: {
        backgroundImage: randomBackground()
      }
    });
    clearInterval(this.timer);
  }

  start() {
    this.setState({ isCounting: !this.state.isCounting });
    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
      if (this.state.seconds % 10 === 0) {
        this.setState({
          containerBackground: {
            backgroundImage: randomBackground()
          }
        })
      }
    }, 1000);
  }

  stop() {
    this.setState({
      isCounting: !this.state.isCounting, message: secondsToMessage(this.state.seconds)
    });
    clearInterval(this.timer);

  }

  render() {

    return (
      <Container style={this.state.containerBackground}>
        <Header>
          <Logo>
            <img src={logo} />
          </Logo>
          <ReplayButton onClick={this.reset}>
            <ReplayIcon className="material-icons">replay</ReplayIcon>
          </ReplayButton>
        </Header>

        <Div>

          <Button onClick={this.state.isCounting ? this.stop : this.start}>
            <Icon className="material-icons">
              {this.state.isCounting ? "pause" : "play_arrow"}
            </Icon>
          </Button>
          <Time seconds={this.state.seconds} />

          <Message message={this.state.message} />


        </Div>
        <Footer>
          <span>Greenpeace Yüzyüze</span>
          <span>2019</span>
        </Footer>
      </Container>

    );
  }
}