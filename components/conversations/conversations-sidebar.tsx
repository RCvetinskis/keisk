"use client";
import { Conversation as PrismaConversation } from "@prisma/client";
import Conversation from "./conersation";
import SearchConversation from "./search-conversation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSheetStore from "@/stores/sheet-stores";
import { useIsMobile } from "@/hooks/use-mobile";

export const mockConversations: PrismaConversation[] = [
  {
    id: 1,
    name: "Jonas",
    createdAt: new Date("2025-08-01T00:00:00.000Z"),
    updatedAt: new Date("2025-08-02T00:00:00.000Z"),
  },
  {
    id: 2,
    name: "Alice",
    createdAt: new Date("2025-09-01T00:00:00.000Z"),
    updatedAt: new Date("2025-09-02T00:00:00.000Z"),
  },
];

const ConversationsSideBar = () => {
  const { isOpen, close } = useSheetStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => (open ? null : close())}>
        <SheetContent className="p-2 pt-10">
          <SheetHeader className="p-0">
            <SearchConversation />
            <VisuallyHidden>
              <SheetTitle>Conversations</SheetTitle>
            </VisuallyHidden>
          </SheetHeader>

          <div>
            {mockConversations.map((conversation) => (
              <Conversation key={conversation.id} conversation={conversation} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="shadow p-2 h-full overflow-x-auto">
      <header className="mb-2">
        <SearchConversation />
      </header>
      <div>
        {mockConversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};

export default ConversationsSideBar;
