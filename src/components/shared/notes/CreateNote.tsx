"use client"

import { useRef } from "react"
import { IError } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useIsFetching } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import schema from "@/schema/create-note-schema"

import { useFolders } from "@/hooks/react-query/folder/useFolders"
import { useCreateNote } from "@/hooks/react-query/notes/useCreateNote"
import { useUpdateRecentNotes } from "@/hooks/react-query/notes/useUpdateRecentNotes"
import { useUser } from "@/hooks/react-query/user/useUser"

import { Button } from "../../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import CustomIcon from "../CustomIcon"

function CreateNote() {
  const folders = useFolders()

  const { createNote, isCreatingNote } = useCreateNote()
  const isFetchingNotes = useIsFetching({ queryKey: ["notes"] })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  const submitButton = useRef<HTMLButtonElement | null>(null)
  const cancelButton = useRef<HTMLButtonElement | null>(null)
  const { addRecentNote } = useUpdateRecentNotes()
  const { user } = useUser()

  const _onSubmit: SubmitHandler<z.infer<typeof schema>> = values => {
    const data = {
      ...values,
      tags: !values.tags ? [] : values.tags?.split(","),
    }

    createNote(data, {
      onSuccess: data => {
        toast.info(`${values.title} created`)
        form.reset({ title: "", folder: "" })
        cancelButton.current?.click()

        // update recent note
        addRecentNote({
          id: String(user?.data.user._id),
          note: { title: data.data.note.title, _id: data.data.note._id },
        })
      },
      onError: error => toast.error((error as unknown as IError).error.message),
    })
  }

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(_onSubmit)}>
        <button ref={submitButton} hidden></button>
        <Form {...form}>
          <div className="bottom-5 right-5 max-lg:absolute lg:px-5">
            <DialogTrigger asChild className="max-lg:hidden">
              <Button
                variant="secondary"
                className="w-full"
                Icon={Plus}
                IconPosition="left"
                disabled={!!isFetchingNotes}
              >
                New note
              </Button>
            </DialogTrigger>

            <DialogTrigger asChild className="lg:hidden">
              <Button
                className="size-10 rounded-full"
                disabled={!!isFetchingNotes}
              >
                <CustomIcon Icon={Plus} />
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
              <FormField
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="title" className="w-fit">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter note title" {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel htmlFor="title" className="w-fit">
                      Tags
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add tags separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="folder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem className="grid gap-3">
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
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="[&_button]:w-full">
              <DialogClose asChild>
                <Button ref={cancelButton} variant="outline">
                  Cancel
                </Button>
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
