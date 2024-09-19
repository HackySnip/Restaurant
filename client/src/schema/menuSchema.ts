import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Descrition is required" }),
  price: z.number().min(0, "Price can't be negative"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image is required" }),
});

export type menuFormSchema = z.infer<typeof menuSchema>;
