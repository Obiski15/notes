"use client"

import { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import schema from "@/schema/create-note-schema"

import { useFolders } from "@/hooks/react-query/folder/useFolders"
import { useCreateNote } from "@/hooks/react-query/notes/useCreateNote"

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

function CreateNote() {
  const folders = useFolders()
  const { createNote, isCreatingNote } = useCreateNote()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "Obiski new note",
    },
  })
  const submitButton = useRef<HTMLButtonElement | null>(null)

  const _onSubmit: SubmitHandler<z.infer<typeof schema>> = values => {
    console.log(values)
    createNote(values, {
      onSuccess: () => toast.info(`${values.title} created`),
      onError: e => toast.error(e.message),
      onSettled: () => form.reset({ title: "", folder: "" }),
    })
  }

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(_onSubmit)}>
        <button ref={submitButton} hidden></button>
        <Form {...form}>
          <div className="px-5">
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full"
                Icon={Plus}
                IconPosition="left"
              >
                New note
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Note</DialogTitle>
              <DialogDescription>
                Start capturing your thoughts, ideas, or reminders. Give your
                note a title and add any details you&#39;d like to remember.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="title" className="w-fit"></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter note title" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  name="folder"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="folder" className="w-fit">
                        Folder
                      </FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger id="folder" className="w-full">
                            <SelectValue placeholder="Select a folder" />
                          </SelectTrigger>
                          <SelectContent>
                            {folders.data?.data.folders?.map(folder => (
                              <SelectItem key={folder._id} value={folder._id}>
                                {folder.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => submitButton.current?.click()}
                disabled={isCreatingNote}
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

export default CreateNote
