import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().max(1000),
});

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categoryId: z.coerce.number().positive("Category must be valid"),
});

export type FormSchema = z.infer<typeof formSchema>;
