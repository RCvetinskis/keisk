import React from "react";
import Message from "./message";

type Props = {};
const messages = [
  {
    id: 1,
    content: "Hey, how are you doing?",
    file: null,
    conversationId: 1,
    userId: 1,
    parentId: null,
    createdAt: new Date("2025-09-01T10:00:00.000Z"),
    updatedAt: new Date("2025-09-01T10:00:00.000Z"),
  },
  {
    id: 2,
    content: "I’m good, thanks! What about you?",
    file: null,
    conversationId: 1,
    userId: 2,
    parentId: 1, // reply to message 1
    createdAt: new Date("2025-09-01T10:01:00.000Z"),
    updatedAt: new Date("2025-09-01T10:01:00.000Z"),
  },
  {
    id: 3,
    content: "Doing well, just working on a new project 🚀",
    file: null,
    conversationId: 1,
    userId: 1,
    parentId: 2, // reply to message 2
    createdAt: new Date("2025-09-01T10:02:00.000Z"),
    updatedAt: new Date("2025-09-01T10:02:00.000Z"),
  },
  {
    id: 4,
    content: null,
    file: "/uploads/files/design.png", // mock file upload
    conversationId: 1,
    userId: 2,
    parentId: null,
    createdAt: new Date("2025-09-01T10:05:00.000Z"),
    updatedAt: new Date("2025-09-01T10:05:00.000Z"),
  },
  {
    id: 5,
    content: "Looks great! 👍",
    file: null,
    conversationId: 1,
    userId: 1,
    parentId: 4,
    createdAt: new Date("2025-09-01T10:06:00.000Z"),
    updatedAt: new Date("2025-09-01T10:06:00.000Z"),
  },
];

const Messages = (props: Props) => {
  return (
    <div className="h-full overflow-auto">
      {messages.map((item) => (
        <Message key={item.id} message={item} />
      ))}
    </div>
  );
};

export default Messages;
