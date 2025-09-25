import { getItem } from "@/actions/item-actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/navigation/back-button";
import { ItemDeleteModal } from "../_components/item-delete-modal";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function SingleItemPage({ params }: Props) {
  const item = await getItem(Number(params.id));

  if (!item) {
    redirect("/items");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Item Details</h1>

        <div />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-4">${item.price.toFixed(2)}</p>
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="w-full rounded-lg object-cover"
            />
          )}

          <div className="mt-6 flex gap-3">
            <Button variant="outline" asChild>
              <Link href={`/items/${item.id}/edit`}>Edit</Link>
            </Button>
            <ItemDeleteModal id={item.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
