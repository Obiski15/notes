import BaseService from "./base.service"
import { INote, INotes } from "./serviceTypes"

export default class NoteService extends BaseService {
  constructor() {
    super("/note")
  }

  async getNotes({ folder, status }: { folder?: string; status?: string }) {
    return await this.get<INotes>(`?folder=${folder}&status=${status}`)
  }

  async getNote(id: string) {
    return await this.get<INote>(`/${id}`)
  }

  async deleteNote(id: string) {
    return await this.delete(`/${id}`)
  }
}
