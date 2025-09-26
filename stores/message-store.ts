import { MessageWithRelations } from "@/lib/types";
import { create } from "zustand";

interface MessageState {
  messages: MessageWithRelations[];
  setMessages: (
    updater:
      | MessageWithRelations[]
      | ((prev: MessageWithRelations[]) => MessageWithRelations[])
  ) => void;
  addNewMessage: (message: MessageWithRelations) => void;
  removeMessage: (id: number) => void;
}

const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),
  addNewMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    })),
}));

export default useMessageStore;
