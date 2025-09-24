import { getItem } from "@/actions/item-actions";
import ItemForm from "../../_components/create-item";
import { BackButton } from "@/components/navigation/back-button";

type Props = {
  params: { id: string };
};

export default async function EditItemPage({ params }: Props) {
  const item = await getItem(Number(params.id));

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-lg font-semibold mb-4">No Content Found!</p>
        <a href="/items" className="text-blue-600 hover:underline font-medium">
          Go Home
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Edit Item</h1>
      </div>

      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6">
        <ItemForm mode="edit" item={item} />
      </div>
    </div>
  );
}
