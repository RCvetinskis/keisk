import useSheetStore from "@/stores/sheet-stores";
import { Home, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "./use-mobile";
import { ReactElement } from "react";
import { useUser } from "@clerk/nextjs";
import MessageIcon from "@/components/navigation/message-icon";

type RouteItem = {
  title: string;
  url: string;
  Icon: ReactElement;
  active: boolean;
  action?: () => void;
};

const useRoutes = () => {
  const path = usePathname();
  const { toggle } = useSheetStore();
  const user = useUser();
  const isMobile = useIsMobile();

  const isAuthenticated = user.isSignedIn && user.isLoaded;

  const authenticatedRoutes: RouteItem[] = [
    {
      title: "Conversations",
      url: "/conversations",
      Icon: <MessageIcon />,
      active: path.includes("/conversations"),
      action: () => {
        if (isMobile) {
          toggle();
        }
      },
    },
    {
      title: "Items",
      url: "/items",
      Icon: (
        <div>
          <List size={20} />
        </div>
      ),
      active: path.includes("/items"),
      action: () => {
        if (isMobile) {
          toggle();
        }
      },
    },
    {
      title: "Categories",
      url: "/categories",
      Icon: (
        <div>
          <List size={20} />
        </div>
      ),
      active: path.includes("/categories"),
      action: () => {
        if (isMobile) {
          toggle();
        }
      },
    },
  ];

  const routes: RouteItem[] = [
    {
      title: "Home",
      url: "/",
      Icon: (
        <div>
          <Home size={20} />
        </div>
      ),
      active: path === "/",
    },
  ];

  return isAuthenticated ? [...routes, ...authenticatedRoutes] : routes;
};

export default useRoutes;
