"use client";

import useRoutes from "@/hooks/use-routes";
import { Button } from "../ui/button";
import Link from "next/link";


type Props = {};

const BottomNavigation = (props: Props) => {
  const routes = useRoutes();

  return (
    <div className="absolute bottom-0 left-0 p-4 w-full shadow-lg shadow-black">
      <div className="flex justify-around">

        {routes.map((item) => (
          <Button key={item.title} asChild size="icon" variant="ghost">
            <Link
              href={item.url}
              onClick={(e) => {
                item.action?.();
              }}
            >
              <item.icon />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
