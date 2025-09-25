"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Message from "./message";
import {
  MessageWithRelations,
  MessageWithUser,
  ReplyingToType,
} from "@/lib/types";
import { io, Socket } from "socket.io-client";
import { CardContent, CardFooter } from "@/components/ui/card";
import WriteMessage from "./write-message";
import useScrollToBottom from "@/hooks/use-scroll-to-bottom";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { combineRefs } from "@/hooks/combine-refs";
import { conversationMessages } from "@/lib/services/message-service";

type Props = {
  conversationId: number;
  query?: string;
};

const Messages = ({ conversationId, query }: Props) => {
  const [messages, setMessages] = useState<MessageWithRelations[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ReplyingToType | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL!, {
      transports: ["websocket"],
    });

    socketRef.current.on("message", (msg: MessageWithUser) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

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
        const result = await conversationMessages({
          conversationId,
          page: pageToLoad,
          query,
        });

        setMessages((prev) =>
          pageToLoad === 1 ? result.messages : [...result.messages, ...prev]
        );

        setHasMoreMessages(result.hasMore);
        setPage(pageToLoad);
      } finally {
        setLoading(false);
      }
    },
    [conversationId, query, loading]
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
      <CardContent
        ref={combinedRef}
        className="flex-1 overflow-y-scroll h-full flex flex-col gap-2"
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {messages.map((msg) => (
              <Message
                setReplyingTo={setReplyingTo}
                key={msg.id}
                message={msg}
              />
            ))}
          </>
        )}
      </CardContent>

      <CardFooter className="border-t p-4">
        <WriteMessage
          handleMessage={sendMessage}
          setReplyingTo={setReplyingTo}
          replyingTo={replyingTo}
        />
      </CardFooter>
    </>
  );
};

export default Messages;
