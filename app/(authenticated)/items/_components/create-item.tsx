"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItem, updateItem } from "@/actions/item-actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectCategoryComponent from "./select_category_components/select-category-component";
import { CategoryWithChildren } from "@/types/categoryTypes";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categoryId: z.coerce.number().positive("Price must be positive"),
});

type ItemFormProps = {
  mode?: "create" | "edit";
  item?: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string | null;
    categoryId: number;
  };
  categories: CategoryWithChildren[];
};

export default function ItemForm({
  mode = "create",
  item,
  categories,
}: ItemFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: item
      ? {
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl ?? "",
          categoryId: item.categoryId,
        }
      : {
          title: "",
          description: "",
          imageUrl: "",
          categoryId: 1,
        },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      if (mode === "edit" && item) {
        await updateItem(item.id, values);
      } else {
        await createItem(values);
      }

      router.push("/items");
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Upload picture</FormLabel>
              <FormControl>
                <div className="w-full">
                  {/* Upload box */}
                  <div className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-gray-300 rounded-lg bg-white relative">
                    {field.value ? (
                      <img
                        src={field.value}
                        alt="Preview"
                        className="h-full object-contain"
                      />
                    ) : (
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <svg
                            className="w-8 h-8 text-teal-600 mb-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <span className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md text-sm font-medium hover:bg-teal-50">
                            Upload picture
                          </span>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              field.onChange(url);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter item title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <SelectCategoryComponent
                  categories={categories}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Item"
            : "Create Item"}
        </Button>
      </form>
    </Form>
  );
}
