import ItemForm from "../_components/create-item";
import { BackButton } from "@/components/navigation/back-button";

export default function CreateItemPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Create Item</h1>
        <div />
      </div>

      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-xl p-6">
        <ItemForm />
      </div>
    </div>
  );
}
