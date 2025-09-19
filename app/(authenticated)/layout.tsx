import ConversationsSideBar from "@/components/conversations/conversations-sidebar";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <SidebarProvider>
        <ConversationsSideBar />
        <footer className="block md:hidden">
          <BottomNavigation />
        </footer>
      </SidebarProvider>
    </div>
  );
};

export default AuthenticatedLayout;
