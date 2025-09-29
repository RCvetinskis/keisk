"use client";
import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ConversationWithUsers } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { formatTimeAgo } from "@/lib/helpers/time-helpers";
import { useMemo, memo } from "react";

type Props = {
  conversation: ConversationWithUsers;
};

const Conversation = ({ conversation }: Props) => {
  const params = useParams();
  const { user } = useUser();

  const otherUser = useMemo(
    () =>
      conversation.userConversations.find(
        (cu) => cu.user.externalId !== user?.id
      )?.user,
    [conversation.userConversations, user?.id]
  );

  const displayName = otherUser ? otherUser.username : "N/A";
  console.log("render");
  const lastMessage = useMemo(
    () => (conversation.messages.length > 0 ? conversation.messages[0] : null),
    [conversation.messages]
  );
  const seleceted = Number(params.id) || 1;
  return (
    <Link href={`/conversations/${otherUser?.id}`}>
      <div
        className={cn(
          "p-2 rounded w-full  hover:cursor-pointer hover:shadow shadow-foreground transition-shadow duration-300",
          seleceted === otherUser?.id && "shadow-lg shadow-foreground"
        )}
      >
        <div className="flex items-center gap-4 ">
          <UserAvatar avatarUrl={otherUser?.avatar} />

          <p className="text-sm ">{displayName}</p>
        </div>

        <div className="mt-1 text-gray-500 text-xs flex items-center justify-between">
          <div className="truncate w-50">
            {otherUser?.id !== user?.id && <span className="mr-1">You: </span>}

            <span>{lastMessage?.content ?? "No messages yet"}</span>
          </div>
          <span className="text-xs text-gray-500">
            {lastMessage ? formatTimeAgo(lastMessage.updatedAt) : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default memo(Conversation);
