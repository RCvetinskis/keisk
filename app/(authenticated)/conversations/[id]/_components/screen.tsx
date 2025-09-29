import { Card } from "@/components/ui/card";
import Messages from "../_components/messages";
import ConversationHeader from "../_components/conversation-header";

type Props = {
  conversationId: number;
  currentUserId: number;
  query?: string;
};

const Screen = ({ conversationId, currentUserId, query }: Props) => {
  return (
    <Card className="h-[96svh] flex flex-col">
      <ConversationHeader />
      <Messages
        conversationId={conversationId}
        currentUserId={currentUserId}
        query={query}
      />
    </Card>
  );
};

export default Screen;
