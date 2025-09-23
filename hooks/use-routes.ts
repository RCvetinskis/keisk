import useSheetStore from "@/stores/sheet-stores";
import { Home, LucideProps, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "./use-mobile";
import { ForwardRefExoticComponent, RefAttributes } from "react";
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
  const isMobile = useIsMobile();

  const isAuthenticated = true;
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
