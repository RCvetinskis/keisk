import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type Props = {};

const UserAvatar = (props: Props) => {
  const online = true;
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Badge
        className={cn(
          "absolute bottom-0 right-0 rounded-full w-3 h-3 border-white border-2 p-0",
          online ? "bg-green-500" : "bg-red-400"
        )}
      />
    </div>
  );
};

export default UserAvatar;
