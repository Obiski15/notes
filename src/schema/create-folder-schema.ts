import zod from "zod"

const schema = zod.object({
  folder: zod
    .string({ required_error: "Please enter a folder name" })
    .min(3, "Folder name must be at least 3 characters long")
    .toLowerCase()
    .trim(),
})

export default schema
