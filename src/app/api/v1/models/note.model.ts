import mongoose from "mongoose"

import { INoteDocument } from "../types"
import Folder from "./folder.model"

const noteSchema = new mongoose.Schema<INoteDocument>(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Missing note title"],
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Folder,
      required: [true, "Missing folderId"],
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      trim: true,
      required: [true, "Missing content"],
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
