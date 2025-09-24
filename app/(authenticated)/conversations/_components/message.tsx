import { Message as MessageType } from "@prisma/client";
import React from "react";

type Props = {
  message: MessageType;
};

const Message = ({ message }: Props) => {
  return <div>{message.content}</div>;
};

export default Message;
