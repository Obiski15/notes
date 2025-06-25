import mongoose from "mongoose"

import { IFolderDocument } from "../types"

const folderSchema = new mongoose.Schema<IFolderDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Folder =
  mongoose.models.Folder ||
  mongoose.model<IFolderDocument>("Folder", folderSchema)

export default Folder
