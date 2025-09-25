import { Card } from "@/components/ui/card";
import Messages from "./_components/messages";
import { upsertConversations } from "@/actions/conversation-actions";
import ConversationHeader from "./_components/conversation-header";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    query?: string;
  }>;
};
const Page = async ({ params, searchParams }: Props) => {
  const { id } = await params;

  if (!id) return <div>Page not found</div>;

  const conversation = await upsertConversations({ receiverId: Number(id) });

  if (!conversation) return <div>Page not found</div>;

  const { query } = await searchParams;

  return (
    <Card className="h-[96svh] flex flex-col">
      <Suspense fallback={<div>Loading messages...</div>}>
        <ConversationHeader />
        <Messages conversationId={conversation.id} query={query} />
      </Suspense>
    </Card>
  );
};

export default Page;
