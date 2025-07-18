import zod from "zod"

const schema = zod.object({
  title: zod
    .string({ required_error: "Please enter a note title" })
    .min(3, "Note title must be at least 3 characters long")
    .toLowerCase()
    .trim(),
  tags: zod
    .string()
    .toLowerCase()
    .trim()
    .optional()
    .refine(
      tag => {
        if (!tag) return true
        return tag.length >= 3
      },
      {
        message: "Note tag must be at least 3 character long  ",
      }
    ),
  folder: zod
    .string()
    .toLowerCase()
    .trim()
    .optional()
    .refine(
      folder => {
        if (!folder) return true
        return folder.length >= 3
      },
      {
        message: "Folder name must be at least 3 character long  ",
      }
    ),
})

export default schema
