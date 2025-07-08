import mongoose from "mongoose"

import { IFolderDocument } from "@/lib/api/types"

import User from "./user.model"

const folderSchema = new mongoose.Schema<IFolderDocument>(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Folder name is required"],
    },
    userId: {
      required: [true, "UserId is required"],
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
)

folderSchema.index({ name: 1, userId: 1 }, { unique: true })

const Folder =
  mongoose.models.Folder ||
  mongoose.model<IFolderDocument>("Folder", folderSchema)

export default Folder
