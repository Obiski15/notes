import { NOTESTATUS } from "@/types"
import mongoose from "mongoose"

export interface IError extends Error {
  statusCode?: number
  isOperational?: boolean
  code?: string | number
  status?: "fail" | "error"
  name?: string
  value?: string
  errors?: Record<string, unknown>
  keyValue?: Record<string, unknown>
}

export interface IFolderDocument {
  _id: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
  name: string
  created_at: Date
  updated_at: Date
}

export interface INoteDocument {
  _id: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
  folder: mongoose.Schema.Types.ObjectId
  content: mongoose.Schema.Types.Mixed
  title: string
  tags: string[]
  status: NOTESTATUS
  created_at: Date
  updated_at: Date
}

export interface IUserDocument {
  _id: mongoose.Schema.Types.ObjectId
  password: string
  confirm_password?: string
  passwordResetTokenExpiresIn?: number
  passwordResetToken?: string
  passwordUpdatedAt?: string
  googleId?: string
  email: string
  created_at: Date
  updated_at: Date

  // methods
  comparePassword: (userPassword: string) => Promise<boolean>
}
