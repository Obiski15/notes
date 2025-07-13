"use client"

import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { forgotPasswordSchema } from "@/schema/auth-schema"

import { useForgotPassword } from "@/hooks/react-query/auth/useForgotPassword"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const { forget, isLoading } = useForgotPassword()

  const _onSubmit: SubmitHandler<
    z.infer<typeof forgotPasswordSchema>
  > = values => {
    forget(values, {
      onSuccess: () =>
        form.reset({
          email: "",
        }),
    })
  }

  return (
    <form className="w-full space-y-6" onSubmit={form.handleSubmit(_onSubmit)}>
      <Form {...form}>
        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && (
            <Image
              src="/icons/loading.svg"
              alt="loading"
              width={20}
              height={20}
            />
          )}{" "}
          Reset Password
        </Button>
      </Form>
    </form>
  )
}

export default ForgotPasswordForm
