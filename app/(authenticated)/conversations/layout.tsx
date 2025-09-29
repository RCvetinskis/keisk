import ConversationsSideBar, {
  ConversationsSidebarSkeleton,
} from "@/components/conversations/conversations-sidebar";
import userConversations from "@/lib/services/conversation-service";

import { Suspense } from "react";

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await userConversations({});

  return (
    <div className="p-2 lg:p-4 flex h-screen">
      <main className="flex-1">{children}</main>
      <aside className="w-80 hidden md:block">
        <Suspense fallback={<ConversationsSidebarSkeleton />}>
          <ConversationsSideBar conversations={conversations} />
        </Suspense>
      </aside>
    </div>
  );
};

export default ConversationsLayout;
