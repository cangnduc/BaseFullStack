import { z } from "zod";
export const createUserSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"),
  confirmPassword: z.string(),
});
//   .superRefine((data, ctx) => {
//     if (data.password !== data.confirmPassword) {
//       ctx.addIssue({
//         path: ["confirmPassword"],
//         message: "Passwords do not match",
//       });
//     }
//   });

export const updateUserSchema = z
  .object({
    username: z.string().min(4, "Username must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
