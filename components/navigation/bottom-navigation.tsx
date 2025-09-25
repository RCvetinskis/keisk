"use client";
import useRoutes from "@/hooks/use-routes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BottomNavigation = () => {
  const routes = useRoutes();
  const router = useRouter();

  return (
    <div className="flex justify-around items-center p-4 w-full bg-accent shadow-lg shadow-black">
      {routes.map((item) => (
        <Button
          key={item.title}
          size="icon"
          variant="ghost"
          onClick={() => {
            item.action?.();
            router.push(item.url);
          }}
        >
          <item.icon />
        </Button>
      ))}
    </div>
  );
};

export default BottomNavigation;
