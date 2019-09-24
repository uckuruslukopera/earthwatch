import * as React from "react";
import styled from "styled-components";
import secondstoHms from './_utils/secondsToHms';

interface Props {
    seconds: number;
}

const Paragraph = styled.p`
  font-size: 64px;
`;

const Time: React.FunctionComponent<Props> = props => {
  return <div><Paragraph>{secondstoHms(props.seconds)}</Paragraph></div>;
};

export default Time;