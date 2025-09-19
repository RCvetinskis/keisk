import { useSidebar } from "@/components/ui/sidebar";
import { Home, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const useRoutes = () => {
  const path = usePathname();
  const { toggleSidebar: toggleChatBar } = useSidebar();
  const routes = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      active: path === "/",
    },

    {
      title: "Conversations",
      url: "/conversations",
      icon: MessageCircle,
      active: path.includes("/conversations"),
      action: () => toggleChatBar(),
    },
  ];
  return routes;
};

export default useRoutes;
