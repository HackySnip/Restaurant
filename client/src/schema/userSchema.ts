import { z } from "zod";

export const userSignUpSchema = z.object({
  fullname: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be atleast 6 characters"),
  contact: z
    .string()
    .min(10, "Invalid contact number")
    .max(10, "Invalid contact number"),
});

export type SignupInputState = z.infer<typeof userSignUpSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password should be atleast 6 characters"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
