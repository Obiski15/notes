import mongoose from "mongoose"

import { INoteDocument } from "@/lib/api/types"

import Folder from "./folder.model"
import User from "./user.model"

const noteSchema = new mongoose.Schema<INoteDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "UserId is required"],
    },
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Missing note title"],
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Folder,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
        default: [],
      },
    ],
    content: {
      type: mongoose.Schema.Types.Mixed,
      trim: true,
      default: {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
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

noteSchema.index({ userId: 1, title: 1 }, { unique: true })

const Note =
  mongoose.models.Note || mongoose.model<INoteDocument>("Note", noteSchema)

export default Note
