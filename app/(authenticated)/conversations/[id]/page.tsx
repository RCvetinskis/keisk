import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Messages from "../_components/messages";
import WriteMessage from "../_components/write-message";
import { upsertConversations } from "@/actions/conversation-actions";
import { conversationMessages } from "@/lib/services/message-service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) return <div>Page not found</div>;
  const conversation = await upsertConversations({ receiverId: Number(id) });

  if (!conversation) return <div>Page not found</div>;

  const messages = await conversationMessages({
    conversationId: conversation.id,
  });

  console.log(messages);
  return (
    <Card className="h-[96svh] flex flex-col">
      <CardHeader>
        <CardTitle>Danielius R</CardTitle>
        <CardDescription>Active 2 hours ago</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <Messages messages={messages} />
      </CardContent>

      <CardFooter className="border-t p-4">
        <WriteMessage />
      </CardFooter>
    </Card>
  );
};

export default Page;
