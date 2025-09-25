"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { messageSchema } from "@/schemas/zod-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useCurrentInternalUser from "@/hooks/use-current-internal-user";
import { ReplyingToType } from "@/lib/types";

type Props = {
  handleMessage: (content: string, senderId: number) => void;
  setReplyingTo?: (message: ReplyingToType | null) => void;
  replyingTo?: ReplyingToType;
};

const WriteMessage = ({ handleMessage, setReplyingTo, replyingTo }: Props) => {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const currentIternalUser = useCurrentInternalUser();

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    if (!currentIternalUser) return;
    handleMessage(values.content, currentIternalUser?.id);
    setReplyingTo?.(null);
    form.reset();
  };

  return (
    <div className="w-full">
      {replyingTo && (
        <div className="p-2 flex items-center justify-between bg-gray-100 rounded mb-2">
          <div>
            <p>Replying {replyingTo.username}</p>
            <p className="text-xs text-gray-500">{replyingTo.content}</p>
          </div>

          <div>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                if (setReplyingTo) {
                  setReplyingTo(null);
                }
              }}
            >
              <X />
            </Button>
          </div>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 w-full"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    className="min-h-0 h-10 resize-none"
                    placeholder="Aa"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="ghost" size={"icon"}>
            <Send />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WriteMessage;
