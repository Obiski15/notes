"use client"

import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { resetPasswordSchema } from "@/schema/auth-schema"

import { useResetPassword } from "@/hooks/react-query/auth/useResetPassword"

import Spinner from "../shared/Spinner"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

function ResetPasswordForm() {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const { resetPassword, isLoading: isResetting } = useResetPassword()
  const params = useParams()

  const _onSubmit: SubmitHandler<
    z.infer<typeof resetPasswordSchema>
  > = values => {
    resetPassword(
      { ...values, resetToken: params.resetToken as string },
      {
        onSuccess: () =>
          form.reset({
            password: "",
            confirm_password: "",
          }),
      }
    )
  }

  return (
    <form className="w-full space-y-6" onSubmit={form.handleSubmit(_onSubmit)}>
      <Form {...form}>
        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  disabled={isResetting}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  disabled={isResetting}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isResetting}>
          {isResetting && <Spinner />} Reset Password
        </Button>
      </Form>
    </form>
  )
}

export default ResetPasswordForm
