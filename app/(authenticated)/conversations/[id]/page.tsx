import { Card } from "@/components/ui/card";
import { MessagesSkeleton } from "./_components/messages";
import { upsertConversations } from "@/actions/conversation-actions";
import ConversationHeader from "./_components/conversation-header";
import { Suspense } from "react";
import Screen from "./_components/screen";

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
    <Suspense fallback={<ConversationPageSkeleton />}>
      <Screen conversationId={conversation.id} query={query} />
    </Suspense>
  );
};

export default Page;

const ConversationPageSkeleton = () => (
  <Card className="h-[96svh] flex flex-col">
    <ConversationHeader />
    <MessagesSkeleton />
  </Card>
);
