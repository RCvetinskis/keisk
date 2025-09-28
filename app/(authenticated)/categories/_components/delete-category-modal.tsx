"use client";

import { useRouter } from "next/navigation";
import { destroyCategory } from "@/actions/category-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  categoryId: number;
  categoryTitle: string;
};

const DeleteCategoryModal = ({ categoryId, categoryTitle }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await destroyCategory(categoryId);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete <b>{categoryTitle}</b>?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryModal;
