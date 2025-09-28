import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ItemDeleteModal } from "./item-delete-modal";

type ItemCardProps = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
};

export function ItemCard({ id, title, description, imageUrl }: ItemCardProps) {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      {imageUrl && (
        <div className="relative h-40 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CardFooter className="flex gap-2">
          <Button variant="secondary" asChild>
            <Link href={`/items/${id}`}>View</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/items/${id}/edit`}>Edit</Link>
          </Button>
          <ItemDeleteModal id={id} />
        </CardFooter>
      </CardFooter>
    </Card>
  );
}
