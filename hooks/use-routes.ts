import useSheetStore from "@/stores/sheet-stores";
import { Home, LucideProps, MessageCircle, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "./use-mobile";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useUser } from "@clerk/nextjs";
type RouteItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  active: boolean;
  action?: () => void;
};
const useRoutes = () => {
  const path = usePathname();
  const { toggle } = useSheetStore();
  const user = useUser();
  const isMobile = useIsMobile();

  const isAuthenticated = user.isSignedIn && user.isLoaded;

  const authenticatedRoutes = [
    {
      title: "Conversations",
      url: "/conversations",
      icon: MessageCircle,
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
      icon: List,
      active: path.includes("/items"),
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
      icon: Home,
      active: path === "/",
    },
  ];
  return isAuthenticated ? [...routes, ...authenticatedRoutes] : routes;
};

export default useRoutes;
