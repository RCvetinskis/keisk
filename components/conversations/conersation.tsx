"use client";
import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ConversationWithUsers } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { formatTimeAgo } from "@/lib/helpers/time-helpers";

type Props = {
  conversation: ConversationWithUsers | User;
};

const Conversation = ({ conversation }: Props) => {
  const params = useParams();
  const { user } = useUser();

  const otherUser =
    "messages" in conversation
      ? conversation.users.find(
          (conversationUser) => conversationUser.externalId !== user?.id
        )
      : conversation;

  const displayName = otherUser ? otherUser.username : "N/A";

  const lastMessage =
    "messages" in conversation && conversation.messages.length > 0
      ? conversation.messages[0]
      : null;

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
          <UserAvatar />

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

export default Conversation;
