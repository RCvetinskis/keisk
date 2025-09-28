"use client";

import { useRouter } from "next/navigation";
import {
  createParentCategory,
  createChildCategory,
} from "@/actions/category-actions";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  forChild?: boolean;
  parentId?: number;
  parentTitle?: string;
};

const AddNewCategoryModal = ({ forChild, parentId, parentTitle }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (forChild && parentId) {
      await createChildCategory(title, description, parentId);
    } else {
      await createParentCategory(title, description);
    }

    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {forChild ? `Create child for ${parentTitle}` : "Add parent category"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {forChild ? `Add child for ${parentTitle}` : "Add parent category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Title" required />
          <Input name="description" placeholder="Description" />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCategoryModal;
