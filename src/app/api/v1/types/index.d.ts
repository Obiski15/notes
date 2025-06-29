import mongoose from "mongoose"

export interface IError extends Error {
  statusCode?: number
  isOperational?: boolean
  status?: "success" | "fail" | "error"
}

export interface IFolderDocument {
  _id: mongoose.Schema.Types.ObjectId
  name: string
  created_at: Date
  updated_at: Date
}

export interface INoteDocument {
  _id: mongoose.Schema.Types.ObjectId
  folder: mongoose.Schema.Types.ObjectId
  content: mongoose.Schema.Types.Mixed
  title: string
  tags: string[]
  status: "active" | "trash" | "archive" | "favorite"
  created_at: Date
  updated_at: Date
}

export interface IUserDocument {
  _id: mongoose.Schema.Types.ObjectId
  first_name: string
  last_name: string
  password: string
  confirm_password: string
  googleId: string
  email: string
  username: string
  created_at: Date
  updated_at: Date
}
