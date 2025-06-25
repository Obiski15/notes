import mongoose from "mongoose"

import { IUserDocument } from "../types"

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    last_name: {
      type: String,
      lowercase: true,
      trim: true,
    },
    first_name: {
      type: String,
      lowercase: true,
      trim: true,
    },
    googleId: String,
    username: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: String,
    confirm_password: String,
  },
  {
    timestamps: true,
  }
)

const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema)

export default User
