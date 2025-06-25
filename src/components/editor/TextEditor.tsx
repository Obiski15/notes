"use client"

import { Image } from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { CalendarDays, Folder } from "lucide-react"

import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"

import "@/components/tiptap-node/image-upload-node/image-upload-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import { formatDate } from "@/lib/utils"

import { MarkButton } from "../tiptap-ui/mark-button"

function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "something",
      }),
      Underline,
      Image,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error: unknown) => console.error("Upload failed:", error),
      }),
    ],
    // content: "<p>Hello World! 🌎️</p>",
    autofocus: true,
    immediatelyRender: false,
  })

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="text-sm font-medium capitalize">
        <div className="flex w-full items-center justify-start gap-2 border-b border-b-foreground/10 pb-[15px]">
          <CalendarDays className="size-5 text-foreground/60" />
          <p className="min-w-[100px] text-foreground/60">Date</p>
          <p className="underline">{formatDate(new Date())}</p>
        </div>

        <div className="flex items-center justify-start gap-2 pt-[15px]">
          <Folder className="size-5 text-foreground/60" />
          <p className="min-w-[100px] text-foreground/60">Folder</p>
          <p className="underline">Personal</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-[30px] border-b border-t border-foreground/10 py-2.5">
        {/* <select>font-size</select> */}

        <div className="tiptap-button-group" data-orientation="horizontal">
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="underline" />
        </div>
        <div className="tiptap-button-group" data-orientation="horizontal">
          <ImageUploadButton />
        </div>
      </div>

      <EditorContent editor={editor} role="presentation" />
    </EditorContext.Provider>
  )
}

export default TextEditor
