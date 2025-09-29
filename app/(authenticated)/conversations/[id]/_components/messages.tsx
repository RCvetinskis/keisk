"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Message, { MessageSkeleton } from "./message";
import { MessageWithUser, ReplyingToType } from "@/lib/types";
import { io, Socket } from "socket.io-client";
import { CardContent, CardFooter } from "@/components/ui/card";
import WriteMessage, { WriteMessageSkeleton } from "./write-message";
import useScrollToBottom from "@/hooks/use-scroll-to-bottom";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { combineRefs } from "@/hooks/combine-refs";
import { conversationMessages } from "@/lib/services/message-service";
import useMessageStore from "@/stores/message-store";
import Spinner from "@/components/ui/spinner";
import { createMessage } from "@/actions/message-actions";
import { useUser } from "@clerk/nextjs";

type Props = {
  conversationId: number;
  query?: string;
};

const Messages = ({ conversationId, query }: Props) => {
  const { user } = useUser();
  const { messages, setMessages, addNewMessage } = useMessageStore();
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ReplyingToType | null>(null);

  const socketRef = useRef<Socket | null>(null);

  const saveMessage = async (msg: MessageWithUser) => {
    const message = await createMessage({
      conversationId: msg.conversationId,
      content: msg.content || "",
      // Only send notification if receiver is not in the conversation
      sendNotification: !msg.activeUsers?.includes(msg.receiverId),
    });
    return message as MessageWithUser;
  };

  useEffect(() => {
    if (!user) return;

    // Connect socket with userId
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL!, {
      transports: ["websocket"],
      query: { userId: user.id },
    });

    // Join current conversation room
    socketRef.current.emit("joinConversation", conversationId);

    socketRef.current.on("message", async (msg: MessageWithUser & { activeUsers?: string[] }) => {
      // Save message in DB and trigger notification if needed
      const message = await saveMessage(msg);
      if (message) {
        addNewMessage(message);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user, conversationId]);

  const { scrollRef } = useScrollToBottom({ changes: messages });

  const sendMessage = (content: string, senderId: number) => {
    socketRef.current?.emit("message", {
      content,
      conversationId,
      senderId,
      parentId: replyingTo?.messageId,
    });
  };

  const fetchMessages = useCallback(
    async (pageToLoad: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await conversationMessages({ conversationId, page: pageToLoad, query });
        setMessages((prev) =>
          pageToLoad === 1 ? result.messages : [...result.messages, ...prev]
        );
        setHasMoreMessages(result.hasMore);
        setPage(pageToLoad);
      } finally {
        setLoading(false);
      }
    },
    [conversationId, query, loading, setMessages]
  );

  useEffect(() => {
    fetchMessages(1);
  }, [conversationId, query]);

  const { infiniteRef } = useInfiniteScroll<HTMLDivElement>({
    onTopReached: async () => {
      if (hasMoreMessages && !loading) {
        await fetchMessages(page + 1);
      }
    },
    topThreshold: 100,
  });

  const combinedRef = combineRefs(scrollRef, infiniteRef);

  return (
    <>
      <CardContent ref={combinedRef} className="flex-1 overflow-y-scroll h-full flex flex-col gap-2">
        {loading ? (
          <Spinner />
        ) : (
          messages.map((msg) => (
            <Message setReplyingTo={setReplyingTo} key={msg.id} message={msg} />
          ))
        )}
      </CardContent>

      <CardFooter className="border-t p-4">
        <WriteMessage handleMessage={sendMessage} setReplyingTo={setReplyingTo} replyingTo={replyingTo} />
      </CardFooter>
    </>
  );
};

export default Messages;

export const MessagesSkeleton = () => (
  <>
    <CardContent className="flex-1 overflow-y-scroll h-full flex flex-col gap-2">
      {[...Array(10)].map((_, index) => (
        <MessageSkeleton key={index} />
      ))}
    </CardContent>
    <CardFooter className="border-t p-4">
      <WriteMessageSkeleton />
    </CardFooter>
  </>
);
