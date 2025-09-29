import { ConversationWithUsers } from "@/lib/types";
import Conversation from "./conersation";

type Props = {
  conversations: Array<ConversationWithUsers>;
};

const ConversationList = ({ conversations }: Props) => {
  return (
    <div>
      {conversations.length === 0 ? (
        <p className="text-lg grid items-center justify-center h-[70vh] text-gray-500">
          No conversations found.
        </p>
      ) : (
        conversations.map((conversation) => {
          return (
            <Conversation key={conversation.id} conversation={conversation} />
          );
        })
      )}
    </div>
  );
};

export default ConversationList;
