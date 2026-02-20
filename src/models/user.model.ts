import crypto from "crypto"
import config from "@/config"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

import createHash from "@/lib/api/helpers/createHash"
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
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
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
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetTokenExpiresIn: {
      type: Number,
      select: false,
    },
    passwordUpdatedAt: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds)
    this.confirm_password = undefined
  }

  next()
})

userSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password)
}

userSchema.methods.createResetToken = async function () {
  // create reset token
  const resetToken = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = createHash(resetToken)
  this.passwordResetTokenExpiresIn =
    Date.now() + config.AUTH.passwordResetTokenExpiresIn

  return resetToken
}

userSchema.methods.validateResetToken = async function () {
  const isTokenValid = Date.now() < this.passwordResetTokenExpiresIn

  return isTokenValid
}

userSchema.methods.confirmLastPasswordChange = async function (
  jwtIssuedAt: number
) {
  return this.passwordUpdatedAt > jwtIssuedAt
}

const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema)

export default User
