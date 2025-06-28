import BaseService from "./base.service"
import { ICreateNote, INote, INotes, IUpdateNote } from "./serviceTypes"

export default class NoteService extends BaseService {
  constructor() {
    super("/note")
  }

  async createNote(data: ICreateNote) {
    return await this.post<ICreateNote, INote>("", data)
  }

  async getNotes({ folder, status }: { folder?: string; status?: string }) {
    return await this.get<INotes>(`?folder=${folder}&status=${status}`)
  }

  async getNote(id: string) {
    return await this.get<INote>(`/${id}`)
  }

  async updateNote(id: string, data: IUpdateNote) {
    return await this.patch<IUpdateNote, INote>(`/${id}`, data)
  }

  async deleteNote(id: string) {
    return await this.delete(`/${id}`)
  }

  async emptyTrash(notes: string[]) {
    return await this.delete("/trash", { data: { notes } })
  }
}
