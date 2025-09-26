import { Button } from "@/components/ui/button";
import { Copy, Reply, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageWithUser, ReplyingToType } from "@/lib/types";
import { toast } from "sonner";
import { handleDeleteMessage } from "@/actions/message-actions";
import useMessageStore from "@/stores/message-store";

type Props = {
  children: React.ReactNode;
  message: MessageWithUser;
  setReplyingTo?: (MessageWithUser: ReplyingToType | null) => void;
};

const MessageActions = ({ children, message, setReplyingTo }: Props) => {
  const { removeMessage } = useMessageStore();
  const handleReplying = () => {
    if (setReplyingTo) {
      setReplyingTo({
        messageId: message.id,
        content: message.content || "",
        username: message.user.username,
      });
    }
  };

  // TODO: Implement notifications for new messages
  const handleCopy = () => {
    toast.success("Message copied to clipboard");
    navigator.clipboard.writeText(message.content || "");
  };

  const handleDelete = async () => {
    try {
      await handleDeleteMessage(message.id);
      removeMessage(message.id);
      toast.success("Message deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete message");
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="flex items-center gap-2">
        <Button onClick={handleReplying} variant={"secondary"} size={"icon"}>
          <Reply />
        </Button>

        <Button onClick={handleCopy} variant={"secondary"} size={"icon"}>
          <Copy />
        </Button>

        <Button onClick={handleDelete} variant={"secondary"} size={"icon"}>
          <Trash />
        </Button>
      </TooltipContent>
    </Tooltip>
  );
};

export default MessageActions;
