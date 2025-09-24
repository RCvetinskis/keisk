import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Messages from "../_components/messages";
import WriteMessage from "../_components/write-message";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <Card className="h-[96svh] flex flex-col">
      <CardHeader>
        <CardTitle>Danielius R</CardTitle>
        <CardDescription>Active 2 hours ago</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <Messages />
      </CardContent>

      <CardFooter className="border-t p-4">
        <WriteMessage />
      </CardFooter>
    </Card>
  );
};

export default Page;
