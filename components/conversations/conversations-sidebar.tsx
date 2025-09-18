import { Conversation as PrismaConversation } from "@prisma/client";
import Conversation from "./conersation";
import SearchConversation from "./search-conversation";

type Props = {};

export const mockConversations: PrismaConversation[] = [
  {
    id: 1,
    name: "Jonas",
    createdAt: new Date("2025-08-01T00:00:00.000Z"),
    updatedAt: new Date("2025-08-02T00:00:00.000Z"),
  },
  {
    id: 2,
    name: "Alice",
    createdAt: new Date("2025-09-01T00:00:00.000Z"),
    updatedAt: new Date("2025-09-02T00:00:00.000Z"),
  },

];
const ConversationsSideBar = () => {
  return (
    <div className="shadow p-1 h-full overflow-x-auto">
      <header>
        <SearchConversation />
      </header>

      <main>
        {mockConversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      </main>
    </div>
  );
};

export default ConversationsSideBar;
