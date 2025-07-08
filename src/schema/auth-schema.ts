import { object, string } from "zod"

export const forgotPasswordSchema = object({
  email: string({ required_error: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" })
    .trim()
    .toLowerCase(),
})

export const loginSchema = forgotPasswordSchema.extend({
  password: string({ required_error: "Password is required" }).min(
    8,
    "Password must be 8 or more characters long"
  ),
})

export const registerSchema = loginSchema
  .extend({
    confirm_password: string({
      required_error: "Confirm Password is required",
    }).min(8, "Password must be 8 or more characters long"),
  })
  .refine(val => val.password === val.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })

export const resetPasswordSchema = object({
  password: string({ required_error: "Please enter your password" }).min(
    8,
    "Password must be at least 8 characters long"
  ),

  confirm_password: string({
    required_error: "Please confirm your password",
  }).min(8, "Password must be at least 8 characters long"),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
})
