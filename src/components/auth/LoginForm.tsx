"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { loginSchema } from "@/schema/auth-schema"

import { useLogin } from "@/hooks/react-query/auth/useLogin"

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
import Footer from "./Footer"
import GoogleAuth from "./GoogleAuth"

function LoginForm({ redirect }: { redirect?: string }) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()
  const { login, isLoading } = useLogin()

  const _onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = values => {
    login(values, {
      onSuccess: () => {
        form.reset({
          email: "",
          password: "",
        })
        router.push(redirect ? redirect : "/")
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(_onSubmit)} className="w-full space-y-6">
      <Form {...form}>
        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
        <Button className="w-full" disabled={isLoading}>
          {isLoading && <Spinner />} Login
        </Button>
        <GoogleAuth disabled={isLoading}>Sign in with Google</GoogleAuth>
        <Footer
          link="Create an account"
          href="/register"
          description="Don't have an account?"
        />
      </Form>
    </form>
  )
}

export default LoginForm
