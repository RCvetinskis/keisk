import { Button } from "@/components/ui/button";
import { Copy, Delete, Reply } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageWithUser, ReplyingToType } from "@/lib/types";

type Props = {
  children: React.ReactNode;
  message: MessageWithUser;
  setReplyingTo?: (MessageWithUser: ReplyingToType | null) => void;
};

const MessageActions = ({ children, message, setReplyingTo }: Props) => {
  const handleReplying = () => {
    if (setReplyingTo) {
      setReplyingTo({
        messageId: message.id,
        content: message.content || "",
        username: message.user.username,
      });
    }
  };
// TODO: implement delete message
// TODO: Implement toast message for copied
// TODO: Implement notifications for new messages
// TODO: Implement loading for screens and fix hydration errors
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content || "");
  };
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="flex items-center gap-2">
        <Button onClick={handleReplying} variant={"secondary"} size={"icon"}>
          <Reply />
        </Button>
        <Button variant={"secondary"} size={"icon"}>
          <Delete />
        </Button>

        <Button onClick={handleCopy} variant={"secondary"} size={"icon"}>
          <Copy />
        </Button>
      </TooltipContent>
    </Tooltip>
  );
};

export default MessageActions;
