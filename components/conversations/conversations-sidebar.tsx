"use client";
import { User } from "@prisma/client";
import Conversation from "./conersation";
import SearchInput from "./search-input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSheetStore from "@/stores/sheet-stores";
import { useIsMobile } from "@/hooks/use-mobile";
import { ConversationWithUsers } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  conversations: Array<ConversationWithUsers | User>;
};

const ConversationsSideBar = ({ conversations }: Props) => {
  const { isOpen, close } = useSheetStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => (open ? null : close())}>
        <SheetContent className="p-2 pt-10">
          <SheetHeader className="p-0">
            <SearchInput placeholder="Search conversations..." />
            <VisuallyHidden>
              <SheetTitle>Conversations</SheetTitle>
            </VisuallyHidden>
          </SheetHeader>

          <div>
            {conversations.map((conversation) => (
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
        <SearchInput placeholder="Search conversations..." />
      </header>
      <div>
        {conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};

export default ConversationsSideBar;


export const ConversationsSidebarSkeleton = () => (
  <div className="shadow p-2 h-full overflow-x-auto">
    <header className="mb-2">
      <Skeleton className="h-8 w-full mb-2" />
    </header>
    <div>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full mb-2" />
      ))}
    </div>
  </div>
);