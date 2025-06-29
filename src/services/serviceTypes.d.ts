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

export interface IResponse {
  status: "success" | "error" | "fail"
}

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
