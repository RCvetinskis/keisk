"use client";
import { Conversation as PrismaConversation } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  conversation: PrismaConversation;
};

const Conversation = ({ conversation }: Props) => {
  const params = useParams();

  const seleceted = Number(params.id) || 1;
  return (
    <Link href={`${conversation.id}`}>
      <div className={cn("p-2 rounded w-full  hover:cursor-pointer hover:shadow shadow-foreground transition-shadow duration-300", seleceted === conversation.id && 'shadow-lg shadow-foreground')}>
        <div className="flex items-center gap-4 ">
          <UserAvatar />

          <p className="text-sm ">Jonas</p>
        </div>

        <div className="mt-1 text-gray-500 text-xs flex items-center justify-between">
          <p className="truncate ">Last message...</p>
          <p>2025-04-04</p>
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
