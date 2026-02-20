"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import { registerSchema } from "@/schema/auth-schema"

import { useRegister } from "@/hooks/react-query/auth/useRegister"

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

function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })
  const { register, isLoading } = useRegister()

  const _onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = values => {
    register(values, {
      onSuccess: () => {
        form.reset({
          email: "",
          name: "",
          password: "",
          confirm_password: "",
        })
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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  type="text"
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
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
                  type="password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isLoading}>
          {isLoading && <Spinner />} Create new account
        </Button>
        <GoogleAuth disabled={isLoading}>Sign up with Google</GoogleAuth>
        <Footer
          link="Login"
          href="/login"
          description="Already have an account?"
        />
      </Form>
    </form>
  )
}

export default RegisterForm
