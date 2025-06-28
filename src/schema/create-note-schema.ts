import zod from "zod"

const schema = zod.object({
  title: zod
    .string({ required_error: "Please enter a note title" })
    .min(3, "Note title must be at least 3 characters long")
    .toLowerCase()
    .trim(),
  folder: zod
    .string()
    .min(3, "Folder name must be at least 3 characters long")
    .toLowerCase()
    .optional(),
})

export default schema
