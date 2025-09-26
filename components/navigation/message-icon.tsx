import { MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {};

const MessageIcon = ({}: Props) => {
  const count = 4;
  return (
    <div className="relative">
      <MessageCircle size={20} />
      {count > 0 && (
        <Badge className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs">
          {count}
        </Badge>
      )}
    </div>
  );
};

export default MessageIcon;
