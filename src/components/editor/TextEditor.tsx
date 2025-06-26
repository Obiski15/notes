"use client"

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { Highlight } from "@tiptap/extension-highlight"
import { Image } from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { TextAlign } from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { Content, EditorContent, EditorContext, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { all, createLowlight } from "lowlight"
import { toast } from "sonner"

import { Link } from "@/components/tiptap-extension/link-extension"
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import { ColorHighlightPopover } from "@/components/tiptap-ui/color-highlight-popover"
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { LinkPopover } from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/image-upload-node/image-upload-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"
import "@/components/tiptap-ui/code-block/code-block-theme.css"

import { Button } from "../ui/button"

const lowlight = createLowlight(all)

function TextEditor({ content }: { content: Content }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({ openOnClick: false }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error: unknown) => {
          toast.info((error as Error).message)
          console.error("Upload failed:", error)
        },
      }),
    ],
    content,
    autofocus: true,
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="flex items-center justify-start gap-[30px] border-b border-t border-foreground/10 py-2.5">
        <div className="tiptap-button-group" data-orientation="horizontal">
          <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="underline" />
          <ColorHighlightPopover />
        </div>
        <div className="tiptap-button-group" data-orientation="horizontal">
          <ImageUploadButton />
          <LinkPopover />
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </div>
        <div className="tiptap-button-group" data-orientation="horizontal">
          <CodeBlockButton />
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </div>
      </div>

      <EditorContent editor={editor} role="presentation" />
      <Button
        onClick={() => {
          console.log(editor.getJSON())
          console.log(typeof editor.getJSON())
        }}
      >
        Save
      </Button>
    </EditorContext.Provider>
  )
}

export default TextEditor
