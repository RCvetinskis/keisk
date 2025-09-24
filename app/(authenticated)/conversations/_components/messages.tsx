import React from "react";
import Message from "./message";
import { Message as PrismaMessage } from "@prisma/client";

type Props = {
  messages: PrismaMessage[];
};

const Messages = ({ messages }: Props) => {
  return (
    <div className="h-full overflow-auto">
      {messages.map((item) => (
        <Message key={item.id} message={item} />
      ))}
    </div>
  );
};

export default Messages;
