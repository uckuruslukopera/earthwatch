import * as React from "react";
import styled from "styled-components";
import Time from "./Time";
import Message from "./Message";
import secondsToMessage from "./_utils/secondsToMessage";
import worker from "./webWorker.js";
import WebWorker from "./workerSetup";
const logo = require('./_assets/gp_logo_2_white.png');

interface Props { }

interface State {
  seconds: number;
  isCounting: boolean;
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
  flex-grow: 1;
 
`;

const Container = styled.div`
min-height: calc(100vh - 16px);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-image: linear-gradient(#04CE9B, #64E408)
`;

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  flex-shrink: 0;
  padding: 5px 15px;
`;

const Footer = styled.div`
  display:flex;
  justify-content: space-between;


  font-size: 13px;
  background-color: #fff;
  a, span {
    text-decoration: none;
    font-weight: 700;
    color: #6c0;
    font-famiy: Verdana
  }
`;

const FooterContainer = styled.div`

  flex-shrink: 0;
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
    message: ""
  };

  constructor(props: Props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);


  }

  componentDidMount = () => {
    if (typeof (Worker) !== "undefined") {
      this.timer = new WebWorker(worker);
      this.timer.onmessage = (event: any) => {
        this.setState({ seconds: event.data });
      };
    }
  };

  reset() {
    this.setState({
      seconds: 0,
      isCounting: false,
      message: ''
    });
    if (typeof (Worker) !== "undefined") {
      this.timer.postMessage({'msg':'reset'});
    } else {
      clearInterval(this.timer);
    }
  }

  start() {
    this.setState({ isCounting: !this.state.isCounting });
    // First check whether Web Workers are supported
    if (typeof (Worker) !== "undefined") {

      this.timer.postMessage({ 'msg': 'start' });
    } else {
      // Web workers are not supported by your browser
      this.timer = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
      }, 1000);
    }
  }

  stop() {
    this.setState({
      isCounting: !this.state.isCounting, message: secondsToMessage(this.state.seconds)
    });
    if (typeof (Worker) !== "undefined") {
      this.timer.postMessage({'msg':'stop'});
    } else {
      clearInterval(this.timer);
    }
  }

  render() {

    return (
      <Container>
        <Header>
          <Logo>
            <img src={logo} alt="Greenpeace Logo"/>
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
        <FooterContainer>
          <Footer>
          <span>Greenpeace Yüzyüze</span>
          <span>2019</span>
          </Footer>

        </FooterContainer>
      </Container>

    );
  }
}