import ConversationsSideBar from "@/components/conversations/conversations-sidebar";

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1">{children}</main>

      <aside className="w-86 hidden lg:block">
        <ConversationsSideBar />
      </aside>
    </div>
  );
};

export default ConversationsLayout;
