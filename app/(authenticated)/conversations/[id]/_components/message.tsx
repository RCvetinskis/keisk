"use client";
import UserAvatar from "@/components/conversations/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { badgeColors } from "@/lib/constants";
import { formatTimeAgo } from "@/lib/helpers/time-helpers";
import { MessageWithUser, ReplyingToType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import MessageActions from "./message-actions";

type Props = {
  message: MessageWithUser;
  setReplyingTo?: (message: ReplyingToType | null) => void;
  level?: number;
};

const Message = ({ message, setReplyingTo, level = 0 }: Props) => {
  const { user } = useUser();

  const isSender = message.user.externalId === user?.id;
  const messagePosition = isSender ? "justify-end" : "justify-start";
  const color = isSender ? badgeColors[1] : badgeColors[3];
  const replies = message.replies || [];
  const isReply = message.parentId !== null;

  return (
    <div className="flex flex-col gap-1">
      <div className={cn("flex items-start gap-2", messagePosition)}>
        {!isSender && <UserAvatar avatarUrl={message.user.avatar} />}
        <div className="flex flex-col">
          {isReply && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1 py-0.5 w-fit"
            >
              Reply
            </Badge>
          )}
          <span className="text-xs text-gray-500">
            {formatTimeAgo(message.updatedAt)}
          </span>
          <MessageActions message={message} setReplyingTo={setReplyingTo}>
            <Badge className={cn(color, "max-w-lg break-words")}>
              {message.content}
            </Badge>
          </MessageActions>
        </div>
      </div>

      {/* Nested replies */}
      {replies.map((msg) => (
        <Message
          setReplyingTo={setReplyingTo}
          key={msg.id}
          message={msg}
          level={level + 1}
        />
      ))}
    </div>
  );
};

export default Message;
