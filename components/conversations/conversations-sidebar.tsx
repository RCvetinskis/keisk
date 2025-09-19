import { Conversation as PrismaConversation } from "@prisma/client";
import Conversation from "./conersation";
import SearchConversation from "./search-conversation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
type Props = {};

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
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            <SearchConversation />
          </SidebarHeader>

          <SidebarMenu>
            {mockConversations.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Conversation conversation={item} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ConversationsSideBar;
