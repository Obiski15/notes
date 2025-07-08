import config from "@/config"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

import { IUserDocument } from "@/lib/api/types"

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    email: {
      unique: [true, "User already exists. Kindly login to you account"],
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
    },
    confirm_password: {
      type: String,
      select: false,
      validate: [
        function (this: IUserDocument, val: string) {
          return this.password === val
        },
        "Passwords don't match",
      ],
    },
    googleId: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, config.saltRounds)
    this.confirm_password = undefined
  }

  next()
})

userSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password)
}

const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema)

export default User
