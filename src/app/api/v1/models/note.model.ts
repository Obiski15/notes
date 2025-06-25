import mongoose from "mongoose"

import { INoteDocument } from "../types"
import Folder from "./folder.model"

const noteSchema = new mongoose.Schema<INoteDocument>(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Folder,
    },
    content: {
      type: String,
      trim: true,
    },
    status: {
      default: "active",
      type: String,
      enum: {
        values: ["active", "trash", "archive", "favorite"],
        message: "Note status can either be active, trash, archive or favorite",
      },
    },
  },
  {
    timestamps: true,
  }
)

const Note =
  mongoose.models.Note || mongoose.model<INoteDocument>("Note", noteSchema)

export default Note
