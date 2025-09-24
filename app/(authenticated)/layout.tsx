import ConversationsSideBar from "@/components/conversations/conversations-sidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <main className="flex-1">{children}</main>
      <aside className="w-80 hidden md:block">
        <ConversationsSideBar />
      </aside>
    </div>
  );
};

export default AuthenticatedLayout;
