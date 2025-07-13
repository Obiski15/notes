export interface IResponse {
  status: "success" | "error" | "fail"
}
export interface IError {
  error: {
    message: string
    status: number
  }
}
interface Folder {
  _id: string
  name: string
}

interface Note {
  _id: string
  status: INoteStatus
  title: string
  content: unknown
  tags: string[]
  updateAt: Date
  folder: {
    _id: string
    name: string
  }
}

// folders
export interface IFolder extends IResponse {
  data: {
    folder: Folder
  }
}

export interface IFolders extends IResponse {
  data: {
    folders: Folder[]
  }
}

export interface ICreateFolder {
  folder: string
}

// notes
export type INoteStatus = "active" | "archive" | "favorites" | "trash"

export interface INote extends IResponse {
  data: {
    note: Note
  }
}

export interface INotes extends IResponse {
  data: {
    notes: Note[]
  }
}

export interface ICreateNote {
  title: string
  tags?: string[]
  folder?: string
}

export interface IUpdateNote extends Partial<Omit<Note, "folder">> {
  folder?: string
}

type IRecentNote = { title: string; _id: string }

type IRecentNotes = IRecentNote[]

export interface IUser extends IResponse {
  data: {
    user: {
      email: string
      _id: string
    }
  }
}

// auth
export interface IAuth extends IResponse {
  data: {
    _id: string
    email: string
  }
}

export interface IForgotPassword {
  email: string
}

export interface IResetPassword {
  resetToken: string
  password: string
  confirm_password: string
}

export interface ILogin extends IForgotPassword {
  password: string
}

export interface IRegister extends ILogin {
  confirm_password: string
}
