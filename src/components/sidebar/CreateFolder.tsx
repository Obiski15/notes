"use client"

import { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FolderPlus } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

import schema from "@/schema/create-folder-schema"

import useCreateFolder from "@/hooks/react-query/folder/useCreateFolder"

import CustomIcon from "../shared/CustomIcon"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

function CreateFolder() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  const submitButton = useRef<HTMLButtonElement | null>(null)
  const { createFolder, isCreatingFolder } = useCreateFolder()

  const _onSubmit: SubmitHandler<z.infer<typeof schema>> = async values => {
    createFolder(values)
  }

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(_onSubmit)}>
        <button ref={submitButton} hidden></button>
        <Form {...form}>
          <DialogTrigger>
            <CustomIcon Icon={FolderPlus} className="text-foreground/40" />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Give your new folder a name to help organize your notes.
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="folder"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Folder name e.g., Meeting Notes, Ideas, Projects"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => submitButton.current?.click()}
                disabled={isCreatingFolder}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Form>
      </form>
    </Dialog>
  )
}

export default CreateFolder
