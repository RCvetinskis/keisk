import { Card } from "@/components/ui/card";
import Messages from "../_components/messages";
import ConversationHeader from "../_components/conversation-header";

type Props = {
  conversationId: number;
  query?: string;
};

const Screen = ({ conversationId, query }: Props) => {
  return (
    <Card className="h-[96svh] flex flex-col">
      <ConversationHeader />
      <Messages conversationId={conversationId} query={query} />
    </Card>
  );
};

export default Screen;
