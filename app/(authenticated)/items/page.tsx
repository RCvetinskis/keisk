import { getAllUsersItems } from "@/actions/item-actions";
import { ItemCard } from "./_components/item-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const usersItems = await getAllUsersItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Items</h1>
        <Link href="/items/new">
          <Button className="shadow-md">➕ Add New Item</Button>
        </Link>
      </div>

      {usersItems.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          You don’t have any items yet. Create one to get started!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {usersItems.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
