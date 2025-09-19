import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="flex items-center flex-col justify-center h-full">
      <h2 className="text-2xl lg:text-4xl">No Contet Found!</h2>
      <Link href={"/"}>
        <Button size={"lg"}>Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
