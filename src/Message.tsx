import * as React from "react";
import styled from "styled-components";

interface Props {
    message: string
}

const Paragraph = styled.p`
    font-size: 32px;
    padding: 0 10vh;
`;

const Message: React.FunctionComponent<Props> = props => {
  return <Paragraph>{props.message}</Paragraph>;
};

export default Message;